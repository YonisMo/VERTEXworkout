# API Design — VERTEXworkout
**المرحلة 9 من 18 — Production-Ready API Specification**
**الجزء 1 من 4: Architecture, Auth, Security, Structure**

---

## 1. API Architecture — الفلسفة العامة

VERTEXworkout يعتمد **نموذجًا هجينًا (Hybrid)**، وليس REST API تقليدي فقط:

| الاستهلاك | الآلية | السبب |
|---|---|---|
| `apps/web` يجلب بيانات لعرضها | **Server Components** تستدعي `packages/api` مباشرة (بدون HTTP) | أسرع (لا Round-trip شبكي)، وأفضل لـ SEO |
| `apps/web` ينفّذ عملية تغيير (فورم) | **Server Actions** تستدعي `packages/api` مباشرة | أبسط من بناء REST Endpoint لكل فورم |
| تكامل خارجي (بوابات دفع، Webhooks) | **REST API** (`/api/v1/...`) عبر Route Handlers | الجهة الخارجية لا تملك وصولًا لـ Server Actions |
| تطبيقات مستقبلية (Mobile, Public API لعملاء API خارجيين) | **REST API** (`/api/v1/...`) | تحتاج بروتوكول HTTP قياسي مستقل عن Next.js |
| `apps/admin` / `apps/coach` (تطبيقات منفصلة في Monorepo) | **REST API الداخلي** أو استدعاء مباشر لـ `packages/api` إن سُمح بالمشاركة عبر نفس الشبكة الداخلية | التفاصيل تُحسم في مرحلة Development حسب بنية النشر النهائية |

**المبدأ الأهم:** **REST API لا يحتوي أي منطق أعمال خاص به إطلاقًا** — كل Route Handler هو غلاف رقيق (Thin Adapter) يستدعي نفس دوال `packages/api` المستخدمة من Server Components/Actions. هذا يضمن **مصدر حقيقة واحد للمنطق** بغض النظر عن طريقة الاستهلاك — مبدأ DRY مطبَّق على مستوى معماري كامل.

```
Route Handler (app/api/v1/products/route.ts)
        │
        ▼
   packages/api (نفس الدالة المستخدمة من Server Components)
        │
        ▼
   packages/database (Repository Pattern)
        │
        ▼
     Supabase (PostgreSQL)
```

---

## 2. REST API Design — القواعد العامة

- **Base URL:** `https://vertexworkout.com/api/v1`
- **صيغة البيانات:** JSON حصريًا (`Content-Type: application/json`) لكل الطلبات والاستجابات، عدا رفع الملفات (`multipart/form-data`).
- **أسماء الموارد بصيغة الجمع:** `/products` وليس `/product` — اتساق مع تسمية الجداول في Database Schema.
- **لا أفعال في الرابط:** `POST /orders` وليس `/create-order` — الفعل يُحدَّد عبر HTTP Method لا الرابط.
- **تداخل الموارد المرتبطة منطقيًا فقط:** `GET /orders/{id}/items` مسموح (علاقة احتواء مباشرة)، لكن `GET /products/{id}/reviews` يُفضَّل كـ `GET /reviews?product_id={id}` (تفاديًا لتضخم شجرة الروابط — راجع قسم Filtering).

---

## 3. API Folder Structure

```
apps/web/src/app/api/
├── v1/
│   ├── auth/{login,register,logout,refresh}/route.ts
│   ├── products/
│   │   ├── route.ts                    # GET (list), POST (admin only - Phase 3)
│   │   └── [id]/route.ts               # GET, PATCH, DELETE
│   ├── programs/{route.ts, [id]/route.ts}
│   ├── exercises/{route.ts, [id]/route.ts}
│   ├── content/{route.ts, [id]/route.ts}       # academy + blog موحّدين (content_items)
│   ├── search/route.ts
│   ├── cart/{route.ts, items/route.ts}
│   ├── orders/{route.ts, [id]/route.ts}
│   ├── wishlist/route.ts
│   ├── reviews/route.ts
│   ├── client/{profile,measurements,achievements,enrollments}/route.ts
│   ├── notifications/route.ts
│   ├── uploads/route.ts
│   └── webhooks/
│       ├── paymob/route.ts
│       └── stripe/route.ts
├── og/route.tsx                        # Dynamic Open Graph image generation
└── health/route.ts                     # Health check للمراقبة (Uptime monitoring)
```

**لماذا `v1/` من اليوم الأول؟** حتى لو لم نطلق نسخة عامة بعد، البدء بترقيم الإصدار يمنع كسر أي تكامل مستقبلي (Mobile App، شركاء) عند إجراء تغيير جذري لاحقًا — التفاصيل الكاملة في قسم Versioning (الجزء 4).

---

## 4. Naming Conventions للـ API

| العنصر | القاعدة | مثال |
|---|---|---|
| مسارات الموارد | kebab-case، جمع | `/exercise-library`, `/program-enrollments` |
| حقول JSON (Request/Response) | camelCase (توافقًا مع اصطلاحات JavaScript/TypeScript على العميل، رغم أن قاعدة البيانات نفسها snake_case) | `{ "productId": "...", "createdAt": "..." }` |
| Query Parameters | camelCase | `?sortBy=price&categoryId=...` |
| رؤوس مخصصة (Headers) | `X-` بادئة لرؤوس VERTEX الخاصة | `X-Request-Id`, `X-Client-Version` |

**ملاحظة تحويل حاسمة:** طبقة `packages/api` مسؤولة عن تحويل `snake_case` (قادم من `packages/database`) إلى `camelCase` (خارج للعميل) والعكس عند الإدخال — تحويل مركزي في مكان واحد، وليس متكررًا في كل Route Handler.

---

## 5. Authentication

### آلية المصادقة
- **للمستخدم النهائي (Browser):** Supabase Auth عبر **Cookies آمنة** (`httpOnly`, `secure`, `sameSite=lax`) — لا Tokens تُخزَّن في `localStorage` إطلاقًا (حماية من XSS).
- **للتكاملات الخارجية المستقبلية (Public API):** **API Keys** (`Authorization: Bearer vk_live_...`) مُصدرة من لوحة تحكم الأدمن، مربوطة بصلاحيات محددة (Scoped API Keys) — تُبنى بنيتها الآن في `packages/auth`، تُفعَّل عند الحاجة الفعلية.

### تدفق المصادقة في REST API
```
1. الطلب يصل لـ Route Handler
2. Middleware (على مستوى apps/web) يتحقق من الجلسة عبر Cookie
3. Route Handler يستدعي packages/auth/getSession()
4. إن لم توجد جلسة صالحة → 401 Unauthorized فورًا (قبل أي منطق أعمال)
5. إن وُجدت → تمرير user context لـ packages/api
```

**Example — التحقق داخل Route Handler:**
```ts
// app/api/v1/orders/route.ts
export async function GET(request: NextRequest) {
  const session = await getServerSession(request);
  if (!session) {
    return apiError('UNAUTHENTICATED', 'يجب تسجيل الدخول', 401);
  }
  const orders = await getOrdersByUser(session.userId); // packages/api
  return apiSuccess(orders);
}
```

---

## 6. Authorization (RBAC) في طبقة API

نفس نظام RBAC المصمَّم في Database Schema، مُطبَّق هنا كـ **Guard على مستوى كل Endpoint**:

| نوع الـ Endpoint | من يُسمح له |
|---|---|
| قراءة عامة (منتجات، برامج، تمارين، محتوى) | بدون مصادقة (Public) |
| قراءة/كتابة بيانات المستخدم نفسه (سلته، طلباته، ملفه) | Client المُصادَق فقط، ويُتحقق أن `resource.userId === session.userId` |
| كتابة/تعديل محتوى (منتجات، برامج) | `admin` فقط (عبر `apps/admin` — Phase 3) |
| قراءة بيانات عميل من مدرب | `coach` فقط، **ويُتحقق أن هذا العميل مرتبط فعليًا بهذا المدرب** عبر `client_program_enrollments.coach_id` — ليس أي Coach لأي Client |

**Example — Guard مركزي قابل لإعادة الاستخدام:**
```ts
// packages/auth/src/api-guards.ts
export async function requireOwnership(session: Session, resourceUserId: string) {
  if (session.userId !== resourceUserId && !session.roles.includes('admin')) {
    throw new ApiError('FORBIDDEN', 'لا تملك صلاحية الوصول لهذا المورد', 403);
  }
}
```
**Common Mistake يُتجنَّب صراحة:** التحقق من الدور فقط (`role === 'client'`) دون التحقق من الملكية الفعلية للمورد (`userId` مطابق) — ثغرة IDOR (Insecure Direct Object Reference) شائعة جدًا، حيث يستطيع Client A الوصول لطلب Client B لمجرد معرفة الـ ID.

---

## 7. API Security

| الإجراء | التفصيل |
|---|---|
| **HTTPS إلزامي** | لا استثناء، حتى في بيئة Staging |
| **Input Sanitization** | كل مدخل يمر عبر Zod قبل الوصول لأي منطق (تفصيل كامل في الجزء 2) |
| **SQL Injection** | غير ممكن بنيويًا — Supabase Client يستخدم Parameterized Queries دائمًا، لا SQL خام مُركَّب من نصوص |
| **Security Headers** | `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` — تُضاف في `next.config.js` لكل استجابة |
| **حماية من Mass Assignment** | Zod schema يحدد صراحة الحقول المسموح بها في كل Request — أي حقل إضافي غير معرَّف يُرفض تلقائيًا (`.strict()`) |
| **حماية من Timing Attacks** | مقارنة كلمات المرور/التوكنز عبر دوال مقارنة ثابتة الزمن (تُدار داخليًا عبر Supabase Auth) |
| **تدقيق التبعيات** | `pnpm audit` ضمن CI Pipeline، وتنبيهات Dependabot مفعّلة |

---

## 8. CORS Strategy

| المصدر | السياسة |
|---|---|
| `vertexworkout.com`, `www.vertexworkout.com` | مسموح دائمًا (نفس الأصل أساسًا لطلبات المتصفح العادية) |
| `admin.vertexworkout.com`, `coach.vertexworkout.com` | مسموح صراحة (نطاقات فرعية موثوقة) عبر `Access-Control-Allow-Origin` مُحدَّد بقائمة بيضاء، وليس `*` |
| أي مصدر خارجي آخر | **مرفوض افتراضيًا** — يُفتح مستقبليًا فقط لعملاء Public API المسجَّلين رسميًا عبر API Keys (لا يعتمدون على CORS أصلاً لأن الطلبات تأتي من Server-to-Server غالبًا) |

**Example Configuration:**
```ts
// packages/lib/src/cors.ts
const ALLOWED_ORIGINS = ['https://vertexworkout.com', 'https://admin.vertexworkout.com', 'https://coach.vertexworkout.com'];
export function corsHeaders(origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Credentials': 'true' };
  }
  return {};
}
```
**Common Mistake يُتجنَّب:** استخدام `Access-Control-Allow-Origin: *` مع `Allow-Credentials: true` معًا — مرفوض من المتصفحات أصلاً لأسباب أمنية، ويُظهر جهلًا بأساسيات CORS إن حاول أحدهم فرضه.

---

## 9. Rate Limiting

| نوع الـ Endpoint | الحد | النافذة الزمنية |
|---|---|---|
| تسجيل الدخول (`POST /auth/login`) | 5 محاولات | لكل 15 دقيقة لكل IP |
| إنشاء حساب (`POST /auth/register`) | 3 محاولات | لكل ساعة لكل IP |
| نسيت كلمة المرور | 3 طلبات | لكل ساعة لكل بريد إلكتروني |
| البحث (`GET /search`) | 60 طلبًا | لكل دقيقة لكل مستخدم/IP |
| باقي الـ Endpoints العامة (قراءة) | 100 طلب | لكل دقيقة لكل IP |
| Webhooks (بوابات الدفع) | بدون حد (لكن يُتحقق من التوقيع Signature إلزاميًا — قسم Webhooks بالجزء 4) | — |

**آلية التنفيذ:** `@upstash/ratelimit` + Upstash Redis (يعمل على Edge Runtime، متوافق مع `middleware.ts`) — نافذة منزلقة (Sliding Window)، وليست ثابتة، لدقة أعلى.

```ts
// packages/lib/src/rate-limit.ts
export const authRateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:auth',
});
```
عند تجاوز الحد: استجابة `429 Too Many Requests` + رأس `Retry-After` يوضح الوقت المتبقي.

---

*(الجزء 2 التالي مباشرة: Request/Response Schemas، Zod Validation، Error Handling، HTTP Status Codes، Pagination، Filtering، Sorting، Searching، Caching، Logging، Monitoring.)*
