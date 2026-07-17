# API Design — VERTEXworkout
**الجزء 3 من 4: كتالوج كامل لكل Endpoints مع أمثلة Request/Response**

> كل Endpoint هنا مُحمي بـ Zod (Request Schema) وRBAC (Authorization) كما وُصِف في الجزأين 1 و2. الأمثلة مختصرة الحقول للتوضيح، لكن كل حقل مطابق تمامًا لتصميم Database Schema (المرحلة 2).

---

## أ. Authentication

### `POST /api/v1/auth/register`
**Auth:** عام | **Rate Limit:** 3/ساعة لكل IP
```json
// Request
{ "fullName": "أحمد محمد", "email": "ahmed@example.com", "password": "SecurePass123" }

// Response 201
{ "success": true, "data": { "userId": "uuid", "email": "ahmed@example.com", "emailVerificationSent": true } }
```
**أخطاء محتملة:** `409 CONFLICT` (البريد مستخدم مسبقًا)، `400 VALIDATION_ERROR`.

### `POST /api/v1/auth/login`
**Auth:** عام | **Rate Limit:** 5/15 دقيقة لكل IP
```json
// Request
{ "email": "ahmed@example.com", "password": "SecurePass123" }
// Response 200
{ "success": true, "data": { "userId": "uuid", "roles": ["client"], "fullName": "أحمد محمد" } }
```
**ملاحظة:** الجلسة نفسها تُدار عبر Cookie من Supabase Auth مباشرة (`Set-Cookie` في رأس الاستجابة) — الـ Body لا يحتوي أي Token يدوي.
**أخطاء:** `401 UNAUTHENTICATED` (بيانات خاطئة).

### `POST /api/v1/auth/logout`
**Auth:** مطلوب → `200 { "success": true, "data": null }`

### `POST /api/v1/auth/forgot-password`
```json
// Request
{ "email": "ahmed@example.com" }
// Response 200 (نفس الاستجابة دائمًا بغض النظر عن وجود البريد فعليًا — منع تسريب معلومة "هذا البريد مسجّل")
{ "success": true, "data": { "message": "إن كان البريد مسجلاً، ستصلك رسالة إعادة التعيين" } }
```

### `POST /api/v1/auth/reset-password`
```json
// Request
{ "token": "reset_token_xyz", "newPassword": "NewSecurePass456" }
// Response 200 { "success": true, "data": null }
```
**أخطاء:** `400 VALIDATION_ERROR` (Token منتهي/غير صالح).

---

## ب. Store — Products

### `GET /api/v1/products`
**Auth:** عام | **Query:** `page, perPage, categoryId, sortBy, minPrice, maxPrice, tagId, search`
```json
// Response 200
{
  "success": true,
  "data": [
    { "id": "uuid", "slug": "vertex-power-bag-15kg", "name": "VERTEX Power Bag 15kg", "price": 1200, "compareAtPrice": 1500,
      "averageRating": 4.7, "reviewsCount": 32, "coverImageUrl": "https://...", "inStock": true }
  ],
  "pagination": { "page": 1, "perPage": 20, "totalItems": 48, "totalPages": 3, "hasNextPage": true }
}
```

### `GET /api/v1/products/{slug}`
**Auth:** عام
```json
// Response 200
{
  "success": true,
  "data": {
    "id": "uuid", "slug": "vertex-power-bag-15kg", "name": "VERTEX Power Bag 15kg",
    "description": "وصف كامل...", "price": 1200, "averageRating": 4.7, "reviewsCount": 32,
    "variants": [ { "id": "uuid", "attributes": { "color": "أسود" }, "stockQuantity": 14, "priceOverride": null } ],
    "gallery": [ "https://.../1.jpg", "https://.../2.jpg" ],
    "relatedProducts": [ { "id": "uuid", "slug": "resistance-band-set", "name": "..." } ]
  }
}
```
**أخطاء:** `404 NOT_FOUND`.

### `POST /api/v1/reviews`
**Auth:** Client مطلوب
```json
// Request
{ "productId": "uuid", "rating": 5, "comment": "منتج ممتاز الجودة عالية" }
// Response 201 { "success": true, "data": { "id": "uuid", "isApproved": false } }
```
**ملاحظة:** `isApproved: false` افتراضيًا — تخضع المراجعات لمراجعة الأدمن قبل الظهور العلني (Moderation Queue، تفصيل لوحة الأدمن في Phase 3).

---

## ج. Store — Cart & Orders

### `GET /api/v1/cart`
**Auth:** Client أو Guest (عبر `X-Guest-Cart-Id` header للزوار غير المسجلين)
```json
// Response 200
{ "success": true, "data": { "id": "uuid", "items": [
    { "id": "uuid", "productVariantId": "uuid", "productName": "VERTEX Power Bag 15kg", "quantity": 2, "unitPrice": 1200, "lineTotal": 2400 }
  ], "subtotal": 2400 } }
```

### `POST /api/v1/cart/items`
**Auth:** Client أو Guest
```json
// Request
{ "productVariantId": "uuid", "quantity": 1 }
// Response 201 { "success": true, "data": { "cartId": "uuid", "itemsCount": 3 } }
```
**أخطاء:** `409 CONFLICT` (الكمية المطلوبة أكبر من المخزون المتاح — رسالة توضح الكمية المتبقية فعليًا).

### `PATCH /api/v1/cart/items/{itemId}`
```json
// Request { "quantity": 3 } → Response 200 { "success": true, "data": { "lineTotal": 3600 } }
```

### `DELETE /api/v1/cart/items/{itemId}`
→ `204 No Content`

### `POST /api/v1/orders`
**Auth:** Client مطلوب (السلة يجب أن تكون مرتبطة بحساب مسجَّل عند هذه الخطوة — إجبار تسجيل الدخول قبل الدفع، كما في User Flow)
```json
// Request
{ "addressId": "uuid", "paymentProvider": "paymob" }
// Response 201
{ "success": true, "data": { "id": "uuid", "orderNumber": "VX-2026-00142", "status": "pending_payment",
    "total": 2400, "paymentRedirectUrl": "https://accept.paymob.com/..." } }
```
**ملاحظة معمارية:** هذا الـ Endpoint **لا يُكمل الدفع فعليًا** — يُنشئ الطلب بحالة `pending_payment` ويُرجع رابط تحويل لبوابة الدفع؛ تأكيد الدفع الفعلي يصل لاحقًا عبر Webhook (الجزء 4).

### `GET /api/v1/orders`
**Auth:** Client (يرى طلباته فقط تلقائيًا عبر `requireOwnership`)
```json
// Response 200 { "success": true, "data": [ { "id": "uuid", "orderNumber": "VX-2026-00142", "status": "paid", "total": 2400, "placedAt": "2026-07-10T14:22:00Z" } ], "pagination": {...} }
```

### `GET /api/v1/orders/{id}`
```json
// Response 200 { "success": true, "data": { "id": "uuid", "orderNumber": "VX-2026-00142", "status": "shipped",
    "items": [ { "productName": "...", "quantity": 2, "unitPrice": 1200 } ], "address": {...}, "timeline": [
      { "status": "pending_payment", "at": "..." }, { "status": "paid", "at": "..." }, { "status": "shipped", "at": "..." }
    ] } }
```
**أخطاء:** `403 FORBIDDEN` (محاولة عرض طلب لا يخص المستخدم الحالي).

---

## د. Wishlist

### `GET /api/v1/wishlist` → قائمة منتجات محفوظة (نفس شكل `GET /products` تقريبًا)
### `POST /api/v1/wishlist` — `{ "productId": "uuid" }` → `201`
### `DELETE /api/v1/wishlist/{productId}` → `204`

---

## هـ. Programs & Enrollments

### `GET /api/v1/programs`
**Query:** `goal, level, durationWeeks, sortBy, page`
```json
{ "success": true, "data": [ { "id": "uuid", "slug": "fat-loss-8-weeks", "title": "برنامج خسارة الوزن - 8 أسابيع",
    "level": "beginner", "durationWeeks": 8, "price": 0, "isFree": true, "coverImageUrl": "..." } ], "pagination": {...} }
```

### `GET /api/v1/programs/{slug}`
```json
{ "success": true, "data": { "id": "uuid", "title": "...", "description": "...", "workouts": [
    { "dayNumber": 1, "title": "يوم الدفع", "exercises": [ { "exerciseId": "uuid", "name": "ضغط بار مسطح", "sets": 4, "reps": 10, "restSeconds": 90 } ] }
  ] } }
```

### `POST /api/v1/client/enrollments`
**Auth:** Client مطلوب
```json
// Request { "programId": "uuid" }
// Response 201 { "success": true, "data": { "enrollmentId": "uuid", "status": "active", "startedAt": "..." } }
```
**أخطاء:** `409 CONFLICT` (مشترك بالفعل في نفس البرنامج ولم يُكمله بعد).

### `GET /api/v1/client/enrollments` → برامج المستخدم الحالي المشترك بها، مع نسبة `progressPct`.

---

## و. Exercise Library

### `GET /api/v1/exercises`
**Query:** `muscleId, equipmentId, difficulty, page`
```json
{ "success": true, "data": [ { "id": "uuid", "slug": "flat-bench-press", "name": "ضغط بار مسطح",
    "difficulty": "intermediate", "primaryMuscle": "الصدر", "videoThumbnailUrl": "..." } ], "pagination": {...} }
```

### `GET /api/v1/exercises/{slug}`
```json
{ "success": true, "data": { "id": "uuid", "name": "ضغط بار مسطح", "videoUrl": "https://...",
    "muscles": [ { "name": "الصدر", "role": "primary" }, { "name": "الترايسبس", "role": "secondary" } ],
    "equipment": [ { "name": "بار حديد" }, { "name": "بنش" } ],
    "commonMistakes": "...", "performanceTips": "..." } }
```

---

## ز. VERTEX Academy & Blog (موحّدة عبر `content_items`)

### `GET /api/v1/content`
**Query:** `type (blog|academy_article|smart_card), categorySlug, page`
```json
{ "success": true, "data": [ { "id": "uuid", "slug": "protein-intake-guide", "title": "دليل استهلاك البروتين",
    "excerpt": "...", "category": "Nutrition", "publishedAt": "...", "readingTimeMinutes": 6 } ], "pagination": {...} }
```

### `GET /api/v1/content/{slug}`
```json
{ "success": true, "data": { "id": "uuid", "title": "...", "body": "... (HTML/Markdown مُعقَّم)", "relatedContent": [...], "relatedExercises": [...] } }
```

---

## ح. Client Profile

### `GET /api/v1/client/profile` / `PATCH /api/v1/client/profile`
```json
// PATCH Request { "heightCm": 178, "weightKg": 82, "goal": "muscle-gain" }
// Response 200 { "success": true, "data": { "id": "uuid", "heightCm": 178, "weightKg": 82, "goal": "muscle-gain" } }
```

### `POST /api/v1/client/measurements`
```json
// Request { "weightKg": 81.5, "bodyFatPct": 18.2, "chestCm": 102, "waistCm": 84 }
// Response 201 { "success": true, "data": { "id": "uuid", "measuredAt": "2026-07-15T10:00:00Z" } }
```

### `GET /api/v1/client/measurements?from=2026-01-01&to=2026-07-15`
→ سلسلة زمنية للرسم البياني في لوحة التحكم.

### `GET /api/v1/client/achievements` → قائمة الإنجازات المكتسبة.

---

## ط. Notifications

### `GET /api/v1/notifications?unreadOnly=true`
```json
{ "success": true, "data": [ { "id": "uuid", "title": "طلبك في الطريق", "body": "...", "isRead": false, "createdAt": "..." } ], "pagination": {...} }
```
### `PATCH /api/v1/notifications/{id}` — `{ "isRead": true }` → `200`
### `PATCH /api/v1/notifications/read-all` → `200` (تحديد الكل كمقروء دفعة واحدة)

---

## ي. Search

### `GET /api/v1/search?q=vertex+bag&type=all`
```json
{ "success": true, "data": {
    "products": [ { "id": "uuid", "name": "VERTEX Power Bag", "slug": "..." } ],
    "programs": [], "exercises": [], "content": [],
    "totalResultsCount": 3
  } }
```

---

*(الجزء 4 والأخير: File Upload API، Image Processing، Webhooks، Server Actions Strategy، Supabase Edge Functions، API Versioning، OpenAPI/Swagger، API Testing Strategy.)*
