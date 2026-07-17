# API Design — VERTEXworkout
**الجزء 4 من 4 (الأخير): Uploads, Webhooks, Server Actions, Edge Functions, Versioning, OpenAPI, Testing**

---

## 21. File Upload API

### `POST /api/v1/uploads`
**Auth:** Client/Coach/Admin مطلوب | **Content-Type:** `multipart/form-data`
```
Request (FormData):
  file: <binary>
  purpose: "avatar" | "review-image" | "product-gallery" (Admin only)

Response 201:
{ "success": true, "data": { "mediaId": "uuid", "url": "https://[project].supabase.co/storage/v1/.../avatar-123.webp", "width": 512, "height": 512 } }
```

**تدفق التنفيذ الداخلي (عبر `packages/storage` المعتمدة حديثًا):**
```
1. Route Handler يستقبل الملف (multipart/form-data)
2. تحقق أولي: النوع (image/*, video/mp4) والحجم الأقصى (5MB صور، 100MB فيديو - Admin فقط)
3. packages/storage/image.ts: ضغط + تحويل لصيغة WebP + توليد أحجام متعددة (thumbnail/medium/original)
4. packages/storage/upload.ts: رفع لـ Supabase Storage bucket المناسب
5. packages/database: إنشاء سجل في جدول media
6. إرجاع media record كاملاً للعميل
```
**أخطاء:** `400 VALIDATION_ERROR` (نوع/حجم غير مسموح)، `413 Payload Too Large`.

**Buckets مُنظَّمة حسب الغرض** (عزل صلاحيات الوصول لكل Bucket في Supabase Storage):
| Bucket | المحتوى | الوصول |
|---|---|---|
| `avatars` | صور الملفات الشخصية | عام للقراءة، خاص للكتابة (المالك فقط) |
| `products` | صور/فيديوهات المنتجات | عام للقراءة، Admin فقط للكتابة |
| `exercises` | فيديوهات وصور التمارين | عام للقراءة، Admin فقط للكتابة |
| `reviews` | صور مرفقة بمراجعات العملاء | عام للقراءة، صاحب المراجعة فقط للكتابة |
| `documents` | ملفات طبية اختيارية (Client Profile) | **خاص تمامًا** — لا قراءة عامة، فقط صاحب الملف والأدمن (Row Level Security صارم) |

---

## 22. Image Processing

**المكتبة:** `sharp` (تعمل داخل `packages/storage/src/image.ts`، تُنفَّذ في Node.js Runtime — **ليس** Edge Runtime، لأن `sharp` تعتمد على Native Bindings).

**المعالجة التلقائية عند كل رفع صورة:**
1. تحويل لصيغة **WebP** (أخف حجمًا بـ 25-35% من JPEG بنفس الجودة المرئية).
2. توليد 3 أحجام: `thumbnail` (200px)، `medium` (800px)، `original` (حتى 2000px كحد أقصى — لا صور أكبر من اللازم تُخزَّن).
3. ضغط بجودة `80%` (توازن مثالي بين الحجم والوضوح).
4. استخراج الأبعاد (`width`, `height`) وتخزينها في سجل `media` — تُستخدم في `next/image` لمنع Layout Shift (كما في Frontend Architecture، القسم 36).

**Common Mistake يُتجنَّب:** تخزين الصورة الأصلية كما رُفعت دون معالجة — يُبطئ الموقع بشكل كبير مع تراكم مئات صور المنتجات وفيديوهات التمارين عالية الدقة.

---

## 23. Webhooks

### `POST /api/v1/webhooks/paymob`
**Auth:** **بدون** جلسة مستخدم — التحقق عبر **HMAC Signature** فقط.
```ts
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-paymob-signature');
  if (!verifyPaymobSignature(rawBody, signature)) {
    return apiError('FORBIDDEN', 'توقيع غير صالح', 403); // رفض فوري - قد تكون محاولة تزوير
  }
  const payload = JSON.parse(rawBody);
  await handlePaymentWebhook(payload); // packages/api - يحدّث order.status → 'paid' أو 'failed'
  return apiSuccess({ received: true });
}
```
**قاعدة أمنية حاسمة:** **لا يُثَق أبدًا بأي Webhook بدون التحقق من التوقيع (Signature Verification) أولاً** — بدون هذا التحقق، أي طرف يعرف رابط الـ Webhook يستطيع تزوير "تم الدفع بنجاح" لأي طلب. هذا أول سطر تنفيذي في كل Webhook Handler، بلا استثناء.

### `POST /api/v1/webhooks/stripe`
نفس المبدأ تمامًا، عبر `stripe.webhooks.constructEvent()` (التحقق الرسمي المدمج في SDK الخاص بـ Stripe).

**معالجة الأحداث المدعومة:**
| الحدث | الإجراء |
|---|---|
| `payment.success` / `checkout.session.completed` | تحديث `orders.status = 'paid'` + إرسال بريد تأكيد (`packages/email`) + إشعار In-App |
| `payment.failed` | تحديث `orders.status = 'payment_failed'` + إشعار العميل لإعادة المحاولة |
| `refund.processed` | تحديث `orders.status = 'refunded'` + Audit Log |

**Idempotency:** كل Webhook يُسجَّل بمعرّف الحدث الفريد القادم من المزوّد (`event.id`)؛ إن وصل نفس الحدث مرتين (شائع جدًا في أنظمة Webhooks) يُتجاهل التكرار بدل معالجة الطلب مرتين.

---

## 24. Server Actions Strategy — متى REST ومتى Server Action؟

| المعيار | Server Action | REST API Route |
|---|---|---|
| المصدر | فورم داخل `apps/web` فقط | أي مصدر (Web, Webhook, مستقبلاً Mobile/Public) |
| الغرض | Mutation بسيطة مرتبطة مباشرة بفورم (تعديل ملف شخصي، إضافة مراجعة) | عمليات تحتاج بروتوكول HTTP مستقل، أو استهلاك خارجي |
| مثال هنا | `submitReviewAction`, `updateProfileAction`, `enrollInProgramAction` | كل الكتالوج في الجزء 3 + كل الـ Webhooks |

**القرار العملي:** كل ميزة داخل `apps/web` تُبنى **أولاً** كـ Server Action (أبسط، أقل Boilerplate)؛ إن ظهرت حاجة لاحقًا لاستهلاك نفس العملية من مصدر خارجي (Mobile App مثلاً)، تُبنى نسخة REST مقابلة تستدعي **نفس دالة `packages/api`** بالضبط — لا تكرار منطق أبدًا، فقط واجهة استدعاء إضافية.

---

## 25. Supabase Edge Functions (عند الحاجة)

**متى تُستخدم بدل Next.js Route Handlers؟**
- عمليات تحتاج **زمن تنفيذ أطول** من حدود Vercel Functions القياسية (مثل معالجة فيديو ثقيلة).
- عمليات **مجدولة (Cron Jobs)** مثل: تنظيف عربات التسوق المهجورة يوميًا، إرسال تذكيرات تلقائية للمتدربين غير النشطين، أرشفة الإشعارات القديمة.
- عمليات تحتاج تنفيذًا **قريبًا جدًا من قاعدة البيانات** لتقليل زمن الاستجابة (Database Triggers → Edge Function مباشرة).

**أمثلة مخطَّطة لـ Phase لاحقة (غير مطلوبة في MVP):**
```
supabase/functions/
├── cleanup-abandoned-carts/     # Cron: يوميًا - يحذف عربات فارغة من نشاط > 30 يوم
├── send-inactivity-reminders/   # Cron: أسبوعيًا - تذكير المتدربين غير النشطين
└── update-product-ratings/      # Trigger: عند إضافة مراجعة جديدة، تحديث average_rating (الحقل المُكرَّر في Database Schema، القسم 9)
```
**ملاحظة:** هذه غير مطلوبة في Phase 1/MVP — تُبنى لاحقًا عند التنفيذ الفعلي، لكن البنية موثّقة الآن حتى لا تحتاج قرارًا معماريًا جديدًا وقتها.

---

## 26. API Versioning

**الاستراتيجية:** **URL Path Versioning** (`/api/v1/...`) — الأوضح والأسهل للتوثيق والتصحيح، مقارنة بـ Header Versioning (أقل وضوحًا للمطورين الخارجيين).

**قواعد الترقية:**
- تعديل **غير جذري** (إضافة حقل اختياري جديد للاستجابة) → **لا يتطلب** نسخة جديدة، يبقى `v1`.
- تعديل **جذري** (حذف حقل، تغيير شكل الاستجابة، تغيير سلوك Endpoint) → نسخة جديدة `v2`، مع إبقاء `v1` يعمل بالتوازي لفترة انتقالية معلَنة (Deprecation Notice في الرأس `X-API-Deprecated: true` + تاريخ إيقاف نهائي في التوثيق).
- **لا يُحذف** أي إصدار API فجأة دون فترة سماح لا تقل عن 3 أشهر بعد الإعلان — أساسي عند وجود أي مستهلك خارجي (Mobile App لاحقًا).

---

## 27. OpenAPI / Swagger Specification

**القرار:** توليد مواصفة OpenAPI 3.1 **تلقائيًا** من نفس مخططات Zod المستخدمة فعليًا في الكود (عبر `zod-to-openapi`)، بدل كتابة ملف YAML/JSON منفصل يدويًا يخرج عن التزامن مع الكود الفعلي بسرعة.

```ts
// packages/validation/src/store/product-query-schema.ts (تمديد نفس الملف)
extendZodWithOpenApi(z);
export const productQuerySchema = z.object({...}).openapi('ProductQuery');
```
**الناتج:** ملف `docs/api/openapi.json` يُولَّد عبر سكربت (`scripts/generate-openapi.ts`) يُشغَّل ضمن CI عند كل تغيير في `packages/validation` أو `packages/api` — يبقى التوثيق **مطابقًا للكود دائمًا بشكل آلي**، لا توثيق يدوي قد يصبح قديمًا.

**الاستخدام:** يُعرض عبر **Swagger UI** أو **Scalar** على `docs.vertexworkout.com` (نطاق فرعي مستقبلي مخصص للمطورين الخارجيين وفريق Mobile).

**Common Mistake يُتجنَّب:** كتابة توثيق Swagger يدويًا منفصلًا عن الكود الفعلي — يصبح غير دقيق خلال أسابيع من التطوير النشط ويفقد الفريق الثقة به.

---

## 28. API Testing Strategy

| المستوى | الأداة | ماذا يُختبر |
|---|---|---|
| **Unit** | Vitest | كل دالة في `packages/api` بمعزل عن HTTP (Input → Output مباشرة)، ومخططات Zod (حالات صحيحة/خاطئة) |
| **Integration** | Vitest + `packages/testing/mocks` (MSW لمحاكاة Supabase) | كل Route Handler فعليًا: يُرسَل طلب HTTP وهمي، ويُتحقق من الاستجابة (Status + Body) بدون الحاجة لقاعدة بيانات حقيقية |
| **Contract Testing** | مقارنة استجابة API الفعلية مع مواصفة OpenAPI المولَّدة (القسم 27) | ضمان أن التنفيذ الفعلي لا ينحرف عن التوثيق المُعلَن |
| **E2E** | Playwright (كما في Frontend Architecture، القسم 58) | رحلات كاملة عبر الواجهة تستهلك API فعليًا (وليس API منفصلًا عن الواجهة) |
| **Load Testing** | k6 أو مكافئ (Phase لاحقة، قبل الإطلاق الفعلي) | التأكد من أداء Endpoints الحرجة (الدفع، البحث) تحت ضغط حركة مرور واقعي |

**Example — اختبار تكامل لـ Route Handler:**
```ts
// app/api/v1/products/route.test.ts
describe('GET /api/v1/products', () => {
  it('يُرجع 400 عند تمرير perPage أكبر من الحد المسموح', async () => {
    const response = await GET(mockRequest({ perPage: '999' }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

---

## ✅ يرجى المراجعة والموافقة على المرحلة 9 بكل أجزائها (1-4):
- [ ] API Architecture الهجينة (Server Components/Actions + REST للتكاملات الخارجية)
- [ ] REST Design Rules وFolder Structure وNaming Conventions
- [ ] Authentication (Cookies + API Keys مستقبلية) وAuthorization (RBAC + Ownership Checks)
- [ ] API Security وCORS وRate Limiting
- [ ] Response Envelope الموحّد وZod Validation وError Handling وHTTP Status Codes
- [ ] Pagination وFiltering وSorting وSearching
- [ ] Caching وLogging وMonitoring
- [ ] الكتالوج الكامل لكل Endpoints (Auth, Store, Programs, Exercise Library, Academy, Client, Notifications, Search)
- [ ] File Upload API وImage Processing
- [ ] Webhooks (Paymob/Stripe) مع التحقق من التوقيع
- [ ] Server Actions Strategy وSupabase Edge Functions
- [ ] API Versioning وOpenAPI/Swagger وAPI Testing Strategy

بانتظار موافقتك الصريحة على المرحلة 9 كاملة قبل الانتقال إلى **المرحلة 10: Security Architecture**.
