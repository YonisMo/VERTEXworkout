# Performance Strategy — VERTEXworkout
**الجزء 2 من 3: Bundle/Code Splitting, Database/Query Performance, API Performance, Search, Edge Runtime, Background Jobs**

---

## 9. Code Splitting

Next.js يُقسِّم الكود **تلقائيًا حسب المسار (Route-based Splitting)** — كل صفحة تحمّل فقط الـ JavaScript الذي تحتاجه، بدون تدخل يدوي إضافي. فوق هذا الأساس:

| التقنية | التفصيل |
|---|---|
| **تقسيم حسب Route Group** | `(marketing)`, `(client)`, `(checkout)` كل منها يحمّل مكوناته الخاصة فقط — زائر يتصفح المتجر لا يحمّل كود لوحة تحكم المتدرب إطلاقًا |
| **فصل مكتبات ثقيلة عن الحزمة الرئيسية** | `recharts` (الرسوم البيانية) يُستخدم فقط في لوحة التحكم — يُحمَّل فقط عند دخول تلك الصفحات تحديدًا، لا في الحزمة العامة المشتركة |
| **`packages/ui` كحزمة مُصدَّرة بعناية** | Barrel export (`index.ts`) يُصدِّر فقط ما يُستخدم فعليًا؛ Tree-shaking فعّال يعتمد على عدم استيراد الحزمة كاملة (`import { Button } from '@vertex/ui'` وليس `import * as UI from '@vertex/ui'`) |

---

## 10. Dynamic Imports (تعميق فوق Frontend Architecture القسم 34-35)

**معيار القرار العملي:** أي مكوّن/مكتبة تحقق **شرطين معًا** تُصبح مرشَّحة لـ Dynamic Import:
1. حجمها في الحزمة يتجاوز ~15KB (gzip) بشكل ملحوظ.
2. لا تظهر فورًا عند تحميل الصفحة (تظهر بعد تفاعل: فتح Modal، تبديل Tab، ضغط زر).

**قائمة مُطبَّقة فعليًا في VERTEXworkout:**
- محرر/عارض المحتوى الغني في لوحة تحكم الأدمن (Phase 3).
- مكوّن مقارنة المنتجات (Compare Products - غير مفعّل في MVP لكن مُجهَّز).
- `recharts` بالكامل (كما في القسم 9).
- مكتبة تصدير PDF للفواتير (تُستورد فقط عند الضغط على "تحميل الفاتورة").

---

## 11. Bundle Optimization

| الأداة/التقنية | الغرض |
|---|---|
| **`@next/bundle-analyzer`** | تحليل بصري لحجم كل جزء من الحزمة النهائية — يُشغَّل دوريًا (أسبوعيًا أثناء التطوير النشط) لاكتشاف أي انتفاخ غير متوقع مبكرًا |
| **فحص Bundle Size ضمن CI** | `size-limit` (أو مكافئ) يفشل الـ Build إن تجاوزت حزمة صفحة معينة حدًا مُعرَّفًا مسبقًا (مثال: 200KB gzip للصفحة الرئيسية) — يمنع "الانجراف التدريجي" في حجم الحزمة دون ملاحظة |
| **إزالة Polyfills غير الضرورية** | `browserslist` في `package.json` يُحدَّد بدقة (متصفحات حديثة فقط، آخر إصدارين) — يمنع Next.js من إضافة Polyfills لمتصفحات قديمة غير مستهدفة أصلاً |
| **مكتبات خفيفة بديلة** | تفضيل `date-fns` (Tree-shakable) على `moment.js` (ثقيلة وغير قابلة للتقسيم) لكل عمليات التاريخ |

---

## 12. Database Performance

بناءً على الفهارس المصمَّمة في Database Schema (القسم 14)، ممارسات تشغيلية إضافية:

| الممارسة | التفصيل |
|---|---|
| **Connection Pooling** | Supabase يستخدم **PgBouncer** مدمجًا (Transaction Mode) — أساسي لبيئة Serverless (Vercel Functions) حيث قد تُفتح مئات الاتصالات المتزامنة القصيرة العمر؛ بدون Pooling تُستنزَف اتصالات Postgres بسرعة |
| **قراءة من Read Replica (مستقبلي عند النمو)** | Supabase يدعم Read Replicas جغرافية — تُفعَّل عند نمو حركة المرور القرائية (المتجر، مكتبة التمارين) بشكل كبير، توجَّه القراءات لها والكتابات فقط للـ Primary |
| **مراقبة الاستعلامات البطيئة** | Supabase Dashboard + `pg_stat_statements` (مدمج) لرصد أي استعلام يتجاوز 200ms بانتظام — يُراجَع فورًا لإضافة Index مفقود أو إعادة هيكلة الاستعلام |
| **تجنّب N+1 Queries** | استخدام `select()` مع `.select('*, category:categories(*)')` (Supabase الطريقة المدمجة لجلب علاقات مرتبطة في استعلام واحد) بدل استعلام منفصل لكل عنصر في حلقة تكرار |

---

## 13. Query Optimization

**أمثلة فعلية من مخطط VERTEXworkout:**

```ts
// ❌ N+1 — استعلام منفصل لكل منتج لجلب تصنيفه
const products = await supabase.from('products').select('*');
for (const p of products) {
  p.category = await supabase.from('categories').select('*').eq('id', p.category_id).single();
}

// ✅ استعلام واحد يجلب العلاقة مباشرة
const { data: products } = await supabase
  .from('products')
  .select('*, category:categories(name_ar:category_translations(name))')
  .eq('is_published', true)
  .order('created_at', { ascending: false })
  .range(0, 19); // Pagination عبر range() بدل جلب كل الصفوف ثم القص في JavaScript
```

**قواعد صارمة:**
- **لا يُجلَب عمود `SELECT *` عند عدم الحاجة لكل الأعمدة** — تحديد الأعمدة المطلوبة فعليًا فقط (خصوصًا لأعمدة كبيرة مثل نصوص المقالات الطويلة عند جلب قائمة مختصرة).
- **الـ Pagination يحدث في قاعدة البيانات (`range()`)، وليس بجلب كل البيانات ثم قصّها في JavaScript** — خطأ أداء شائع وخطير مع نمو البيانات.
- **استخدام `count: 'exact'` بحذر** — حساب العدد الكلي الدقيق (`totalItems` في Pagination) مكلف على جداول كبيرة جدًا؛ يُستخدم `count: 'estimated'` (يعتمد على إحصائيات Postgres الداخلية) للجداول الضخمة إن لزم مستقبلاً.

---

## 14. API Performance

| الممارسة | التفصيل |
|---|---|
| **Response Compression** | `gzip`/`brotli` مفعَّلة تلقائيًا عبر Vercel لكل استجابة API |
| **تقليل حجم Payload** | حقول DTO مُصمَّمة عمدًا لإرجاع فقط ما تحتاجه الواجهة (مثال: قائمة المنتجات لا تُرجع الوصف الكامل، فقط `shortDescription`) |
| **Batching للطلبات المتعددة** | TanStack Query يدعم دمج طلبات متزامنة عند الإمكان؛ لصفحات تحتاج بيانات من عدة مصادر (مثال: لوحة التحكم)، تُبنى دالة `getDashboardSummary()` واحدة في `packages/api` تُرجع كل البيانات المطلوبة في استدعاء واحد بدل عدة نداءات منفصلة |
| **Timeout ومراقبة زمن الاستجابة** | كل Route Handler يُقاس زمن تنفيذه (عبر Middleware اللوجينج من Security Architecture) — أي Endpoint يتجاوز 500ms بانتظام يُراجَع كأولوية |

---

## 15. Search Performance

بناءً على PostgreSQL Full-text Search (Database Schema، `tsvector` + `GIN Index`):
- **فهرسة مُحدَّثة تلقائيًا:** عمود `search_vector` (مُولَّد Generated Column) يتحدث تلقائيًا عند أي تعديل على العنوان/الوصف — لا حاجة لإعادة فهرسة يدوية.
- **Debounce على العميل:** حقل البحث (Global Search، Exercise Library) يستخدم `useDebounce` (300ms) قبل إرسال الطلب — يمنع إرسال طلب لكل حرف يُكتب.
- **حد أقصى لعدد الكلمات المُعالَجة:** حماية من استعلامات بحث ضخمة مقصودة (DoS عبر نص بحث بآلاف الكلمات) — يُقصّ النص المُدخل عند حد معقول (200 حرف) قبل معالجته في `tsquery`.

---

## 16. Edge Runtime Strategy (تعميق فوق Frontend Architecture القسم 46)

| الحالة | Runtime المُختار | السبب |
|---|---|---|
| `middleware.ts` | Edge (إلزامي) | زمن استجابة أدنى عالميًا لكل طلب يمر عبر الموقع |
| صفحات ثابتة تمامًا (Privacy, Terms) | Edge (اختياري، مُفعَّل) | لا تعتمد على مكتبات Node.js محددة |
| Webhooks (Paymob/Stripe) | **Node.js Runtime** (وليس Edge) | تحتاج مكتبات SDK رسمية (`stripe` npm package) غير متوافقة بالكامل مع قيود Edge Runtime |
| رفع/معالجة الصور (`sharp`) | **Node.js Runtime إلزاميًا** | `sharp` تعتمد على Native Bindings غير مدعومة على Edge إطلاقًا |
| باقي Route Handlers العامة (منتجات، برامج) | Node.js (افتراضي) — يُفعَّل Edge اختياريًا لاحقًا عند قياس فعلي يثبت الفائدة | لا داعٍ للتعقيد المبكر قبل إثبات الحاجة |

---

## 17. Streaming & Suspense (مرجع)

موضّح بالتفصيل الكامل في Frontend Architecture (القسم 33) — الاستراتيجية نفسها هنا بلا تكرار: فصل الأقسام السريعة عن البطيئة داخل نفس الصفحة عبر `<Suspense>` يدوي، مع `loading.tsx` للتحميل التلقائي على مستوى الصفحة كاملة.

## 18. Lazy Loading (مرجع)

موضّح بالتفصيل الكامل في Frontend Architecture (القسم 34) وWireframes (معايير الأداء أثناء التحميل) — لا تكرار هنا.

---

## 19. Background Jobs

**متى تُستخدم؟** أي عملية لا تحتاج نتيجتها فورًا في استجابة الطلب للمستخدم (لا يجب أن ينتظرها المستخدم).

| المهمة | الآلية المخطَّطة |
|---|---|
| إرسال بريد تأكيد الطلب | Supabase Edge Function مُشغَّلة عبر Webhook بعد نجاح الدفع — لا يُنتظر إرسال البريد فعليًا قبل إرجاع استجابة "تم الطلب" للمستخدم |
| تحديث `products.average_rating` بعد مراجعة جديدة | Database Trigger (PostgreSQL Function) يُنفَّذ تلقائيًا عند إدراج صف جديد في `product_reviews` — لا حاجة لاستدعاء يدوي من التطبيق |
| تنظيف عربات التسوق المهجورة | Supabase Edge Function مجدولة (Cron) يوميًا (موضّحة في API Design، القسم 25) |
| توليد Sitemap.xml للمنتجات الجديدة | يحدث تلقائيًا عند كل طلب لـ `/sitemap.xml` عبر ISR الخاص بـ Next.js — لا حاجة لمهمة خلفية منفصلة فعليًا بفضل بنية Next.js نفسها |

**قاعدة تصميم:** أي عملية تستغرق أكثر من ~1 ثانية ولا يحتاج المستخدم رؤية نتيجتها فورًا **تُنقَل خارج دورة الاستجابة الرئيسية** (Webhook/Trigger/Cron)، بدل تأخير استجابة الطلب الأساسي بانتظارها.

---

*(الجزء 3 والأخير: Core Web Vitals بأهداف رقمية محددة، Lighthouse Optimization، Performance Monitoring، Load/Stress Testing، Scalability Strategy، Performance Budgets، Production Performance Checklist.)*
