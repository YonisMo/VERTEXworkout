# API Design — VERTEXworkout
**الجزء 2 من 4: Schemas, Validation, Errors, Pagination/Filtering/Sorting/Search, Caching, Logging, Monitoring**

---

## 10. Response Envelope الموحّد

كل استجابة API (نجاح أو فشل) تتبع **شكلاً واحدًا ثابتًا** — يُسهِّل التعامل معها من أي عميل (Web, Mobile, Third-party):

**نجاح:**
```json
{
  "success": true,
  "data": { /* المورد أو المصفوفة المطلوبة */ },
  "meta": { "requestId": "req_8f3a...", "timestamp": "2026-07-15T10:30:00Z" }
}
```

**نجاح مع Pagination:**
```json
{
  "success": true,
  "data": [ /* عناصر الصفحة الحالية */ ],
  "pagination": { "page": 1, "perPage": 20, "totalItems": 154, "totalPages": 8, "hasNextPage": true },
  "meta": { "requestId": "req_8f3a...", "timestamp": "2026-07-15T10:30:00Z" }
}
```

**فشل:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "البيانات المُدخلة غير صحيحة",
    "details": [ { "field": "email", "message": "بريد إلكتروني غير صحيح" } ]
  },
  "meta": { "requestId": "req_8f3a...", "timestamp": "2026-07-15T10:30:00Z" }
}
```

**Helper موحّد (يُستخدم في كل Route Handler):**
```ts
// packages/lib/src/api-response.ts
export function apiSuccess<T>(data: T, pagination?: Pagination) {
  return NextResponse.json({ success: true, data, pagination, meta: buildMeta() });
}
export function apiError(code: ApiErrorCode, message: string, status: number, details?: unknown) {
  return NextResponse.json({ success: false, error: { code, message, details }, meta: buildMeta() }, { status });
}
```

---

## 11. Zod Validation في طبقة API

كل Route Handler يُعرِّف مخطط Zod منفصل لكل من: **Body**، **Query Params**، و**Path Params** — استيرادًا من `packages/validation` المركزي (نفس المخططات المستخدمة في الفورمات، القسم 25-26 من Frontend Architecture).

**Example كامل:**
```ts
// packages/validation/src/store/product-query-schema.ts
export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(20),
  categoryId: z.string().uuid().optional(),
  sortBy: z.enum(['newest', 'price-asc', 'price-desc', 'rating']).default('newest'),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
}).strict();

// app/api/v1/products/route.ts
export async function GET(request: NextRequest) {
  const rawParams = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = productQuerySchema.safeParse(rawParams);
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 'معايير البحث غير صحيحة', 400, parsed.error.flatten().fieldErrors);
  }
  const products = await getProducts(parsed.data); // packages/api
  return apiSuccess(products.items, products.pagination);
}
```

**قاعدة صارمة:** **لا يصل أي Body/Query غير مُتحقَّق منه إلى `packages/api` إطلاقًا** — التحقق يحدث في أول سطر من كل Route Handler، لا استثناء ولا "سنتحقق لاحقًا".

---

## 12. Error Handling — كتالوج أكواد الأخطاء الموحّد

| Code | HTTP Status | الاستخدام |
|---|---|---|
| `VALIDATION_ERROR` | 400 | فشل التحقق من صحة المدخلات (Zod) |
| `UNAUTHENTICATED` | 401 | لا توجد جلسة صالحة |
| `FORBIDDEN` | 403 | جلسة صالحة، لكن بلا صلاحية للمورد (RBAC) |
| `NOT_FOUND` | 404 | المورد غير موجود |
| `CONFLICT` | 409 | تعارض حالة (مثال: محاولة اشتراك مكرر في نفس البرنامج) |
| `RATE_LIMITED` | 429 | تجاوز حد الطلبات |
| `PAYMENT_FAILED` | 402 | فشل عملية الدفع تحديدًا (كود مخصص لتمييزه عن أخطاء عامة) |
| `INTERNAL_ERROR` | 500 | خطأ غير متوقع في السيرفر |
| `SERVICE_UNAVAILABLE` | 503 | خدمة خارجية معطلة مؤقتًا (بوابة الدفع، Supabase) |

**كلاس خطأ موحّد عبر كل الطبقات:**
```ts
// packages/lib/src/errors.ts
export class ApiError extends Error {
  constructor(public code: ApiErrorCode, message: string, public status: number, public details?: unknown) {
    super(message);
  }
}
```
يُستخدم هذا الكلاس نفسه داخل `packages/api` (وليس فقط داخل Route Handlers) — عند رميه من طبقة الأعمال، يلتقطه Route Handler (أو Server Action) عبر `try/catch` موحّد ويحوّله لاستجابة JSON متسقة.

**Global Error Handler لكل Route Handlers:**
```ts
// packages/lib/src/with-error-handler.ts
export function withErrorHandler(handler: RouteHandler) {
  return async (req: NextRequest, ctx: unknown) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      if (err instanceof ApiError) return apiError(err.code, err.message, err.status, err.details);
      logger.error('Unhandled API error', { err, requestId: req.headers.get('x-request-id') });
      Sentry.captureException(err);
      return apiError('INTERNAL_ERROR', 'حدث خطأ غير متوقع', 500);
    }
  };
}
```

---

## 13. HTTP Status Codes — الاستخدام القياسي

| Method | نجاح | فشل شائع |
|---|---|---|
| `GET` | `200 OK` | `404 Not Found` |
| `POST` (إنشاء) | `201 Created` | `400`, `409` |
| `POST` (إجراء بدون إنشاء مورد، مثل تسجيل دخول) | `200 OK` | `401` |
| `PATCH` (تعديل جزئي) | `200 OK` | `404`, `400` |
| `DELETE` | `204 No Content` | `404` |
| `PUT` | **غير مستخدم في هذا المشروع** — `PATCH` فقط للتعديل الجزئي (أنسب لطبيعة الموارد هنا، لا حاجة لاستبدال المورد كاملاً) |

---

## 14. Pagination

**النمط المعتمد:** Offset-based (`page` + `perPage`) للواجهات الإدارية والقوائم العامة — أبسط للتنفيذ والفهم من Cursor-based، ومناسب تمامًا لحجم بيانات VERTEXworkout المتوقع.

```
GET /api/v1/products?page=2&perPage=20
```
- الحد الأقصى لـ `perPage`: **50** (يُرفض أي طلب أعلى بـ `VALIDATION_ERROR`) — حماية من طلبات تستنزف الموارد.
- الاستجابة تتضمن دائمًا كائن `pagination` كاملاً (موضّح في القسم 10) — لا حاجة لطلب إضافي لمعرفة العدد الكلي.

**استثناء:** `GET /exercise-library` و`GET /search` قد يُستخدم فيهما **Cursor-based Pagination** مستقبلاً (`?cursor=...`) لدعم Infinite Scroll بكفاءة أعلى عند نمو البيانات بشكل كبير — البنية الحالية بـ Offset تكفي لحجم الإطلاق الأول.

---

## 15. Filtering

قاعدة موحّدة: كل حقل قابل للفلترة يُمرَّر كـ Query Parameter مباشر بنفس اسم الحقل (camelCase):
```
GET /api/v1/products?categoryId=uuid&minPrice=100&maxPrice=500&inStock=true
GET /api/v1/exercises?muscleId=uuid&equipmentId=uuid&difficulty=beginner
GET /api/v1/programs?goal=weight-loss&level=beginner
```
- فلاتر متعددة القيم لنفس الحقل: `?tagId=uuid1,uuid2` (مفصولة بفاصلة) — تُحوَّل داخليًا لـ `IN (...)` في الاستعلام.
- كل مخطط Zod للـ Query يحدد صراحة الحقول القابلة للفلترة لكل Endpoint — لا فلترة "حرة" غير موثّقة.

---

## 16. Sorting

```
GET /api/v1/products?sortBy=price-asc
GET /api/v1/programs?sortBy=newest
```
- قيم `sortBy` محدودة بـ `z.enum([...])` صريح لكل Endpoint (وليس تمرير اسم عمود قاعدة بيانات خام من العميل — **حماية أساسية من SQL Injection عبر ORDER BY** وهي ثغرة شائعة عند السماح بتمرير اسم عمود حر).
- الترتيب الافتراضي دائمًا مُحدَّد صراحة (`newest` غالبًا) — لا يُترك الترتيب لقرار قاعدة البيانات العشوائي.

---

## 17. Searching

موضّح معماريًا في Sitemap (`/search`) — على مستوى API:
```
GET /api/v1/search?q=vertex+power+bag&type=all&page=1
```
| Query Param | الوصف |
|---|---|
| `q` | نص البحث (إلزامي، حد أدنى حرفين) |
| `type` | `all` \| `products` \| `programs` \| `exercises` \| `content` |
| `page`, `perPage` | نفس معيار Pagination العام |

**التنفيذ الداخلي:** PostgreSQL Full-text Search (`tsvector` + `GIN Index`، مصمَّم مسبقًا في Database Schema) عبر دالة `search()` في `packages/api/src/search/`، تجمع نتائج من `product_translations`, `content_item_translations`, `exercise_translations`, `program_translations` في استعلام واحد موحَّد (`UNION` مُرتَّب حسب درجة التطابق `ts_rank`).

---

## 18. Caching Strategy على مستوى API

| نوع البيانات | استراتيجية الكاش |
|---|---|
| قوائم منتجات/برامج/تمارين (عامة، تتغير ببطء) | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` (Vercel Edge Cache) |
| تفاصيل مورد واحد (منتج، مقال) | نفس ما سبق، + `revalidatePath` فوري عند أي تعديل من الأدمن |
| بيانات خاصة بالمستخدم (سلة، طلباته، إشعاراته) | `Cache-Control: private, no-store` — لا يُخزَّن في أي كاش مشترك إطلاقًا |
| نتائج البحث | `Cache-Control: public, s-maxage=60` (قصير — البحث ديناميكي بطبيعته) |

---

## 19. Logging Strategy

كل Route Handler مُغلَّف تلقائيًا بـ `withErrorHandler` (القسم 12) الذي يُسجِّل:
- **كل خطأ 5xx** فورًا إلى Sentry + Structured Logger (`packages/lib/logger.ts`، تنسيق JSON: `{ level, message, requestId, userId, path, timestamp }`).
- **كل طلب** (نجاح أو فشل) بشكل مختصر لتحليل الأداء لاحقًا (`method, path, status, durationMs`) — عبر Middleware مركزي، وليس تكرارًا يدويًا في كل Handler.
- **لا تُسجَّل أبدًا بيانات حساسة** (كلمات مرور، أرقام بطاقات، رموز الجلسة) حتى في السجلات — تُستبدل بـ `[REDACTED]` تلقائيًا عبر فلتر في `logger.ts`.

---

## 20. Monitoring

| الأداة | الغرض |
|---|---|
| **Sentry** | تتبع الأخطاء (Exceptions) + Performance Monitoring (زمن استجابة كل Endpoint) |
| **Vercel Analytics** | مراقبة Core Web Vitals وأداء الصفحات الفعلي للمستخدمين (Real User Monitoring) |
| **`/api/health`** | Endpoint بسيط (`{ status: 'ok', database: 'connected', timestamp }`) يُستخدم من أداة Uptime Monitoring خارجية (مثل Better Uptime) لتنبيه الفريق فورًا عند تعطل الخدمة |
| **تنبيهات Rate Limit** | عند وصول معدل الأخطاء 5xx أو 429 لعتبة معينة خلال نافذة زمنية قصيرة → تنبيه فوري عبر Slack/Email للفريق التقني |

---

*(الجزء 3 التالي: الكتالوج الكامل لكل Endpoint حسب النطاق — Auth, Store, Programs, Exercise Library, Academy, Client, Notifications — مع أمثلة Request/Response كاملة لكل واحد.)*
