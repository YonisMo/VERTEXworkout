# Security Architecture — VERTEXworkout
**الجزء 2 من 4: SQL Injection, RLS Policies, File/Storage Security, API/CORS/CSP, Secrets & Env Security**

---

## 11. SQL Injection Prevention

**الحماية البنيوية:** Supabase Client (`@supabase/supabase-js`) يبني كل الاستعلامات عبر **Parameterized Query Builder** — لا يوجد أي مكان في الكود يُركَّب فيه SQL من تسلسل نصوص (`String Concatenation`) بمدخلات مستخدم.

```ts
// ✅ آمن — Query Builder يتعامل مع القيمة كمعامل منفصل تلقائيًا
const { data } = await supabase.from('products').select('*').eq('category_id', userInput);

// ❌ ممنوع تمامًا في هذا المشروع — SQL خام مُركَّب بمدخل مستخدم
const { data } = await supabase.rpc('raw_sql', { query: `SELECT * FROM products WHERE id = '${userInput}'` });
```
**القاعدة الصارمة:** استخدام `supabase.rpc()` لاستدعاء SQL Functions مُعرَّفة مسبقًا في قاعدة البيانات (Stored Procedures) مسموح ومُشجَّع للاستعلامات المعقدة (مثل Full-text Search)، لكن **يُمنع منعًا باتًا** بناء أي SQL كنص من مدخلات مستخدم مباشرة في أي مكان بالكود — يُفرض هذا عبر مراجعة الكود (Code Review) كقاعدة إلزامية، وليس فقط أداة آلية.

---

## 12. RLS Security Policies (تفصيل كامل)

RLS مفعّلة على **كل جدول بدون استثناء** في Supabase — حتى لو كان الجدول "عامًا للقراءة"، يُفعَّل RLS صراحة مع سياسة `USING (true)` بدل تركه معطَّلًا (تعطيل RLS بالكامل يعني ثقة كاملة بطبقة التطبيق، وهو ما نرفضه وفق مبدأ Defense in Depth).

**أمثلة سياسات حقيقية لأهم الجداول:**

```sql
-- دالة مساعدة مركزية: تتحقق حيًّا من جدول user_roles، لا تعتمد على أي JWT claim مجمَّد
CREATE OR REPLACE FUNCTION has_role(required_role text)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid() AND r.code = required_role
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- products: قراءة عامة، كتابة للأدمن فقط
CREATE POLICY "public_read_published_products" ON products
  FOR SELECT USING (deleted_at IS NULL AND is_published = true);

CREATE POLICY "admin_full_access_products" ON products
  FOR ALL USING (has_role('admin'));

-- orders: كل مستخدم يرى طلباته فقط، الأدمن يرى الكل
CREATE POLICY "users_view_own_orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "admin_view_all_orders" ON orders
  FOR SELECT USING (has_role('admin'));

-- client_profiles: المستخدم نفسه فقط، أو المدرب المرتبط به عبر enrollment نشط
CREATE POLICY "client_own_profile" ON client_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "coach_view_enrolled_clients" ON client_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_program_enrollments
      WHERE client_program_enrollments.client_id = client_profiles.id
      AND client_program_enrollments.coach_id = auth.uid()
      AND client_program_enrollments.status = 'active'
    )
  );

-- documents (ملفات طبية): المالك فقط، لا حتى الأدمن بدون سبب موثّق (استثناء الطوارئ يتطلب دالة منفصلة موثّقة بالكامل في audit_logs)
CREATE POLICY "strictly_owner_only_medical_files" ON media
  FOR ALL USING (auth.uid() = uploaded_by AND bucket_id = 'documents');
```

**Common Mistake يُتجنَّب:** كتابة سياسة RLS فضفاضة `USING (true)` "مؤقتًا أثناء التطوير" ونسيان تضييقها قبل الإنتاج — كل سياسة RLS تخضع لمراجعة أمنية إلزامية ضمن Checklist ما قبل الإطلاق (القسم 32، الجزء 4).

---

## 13. File Upload Security

بالإضافة لآليات API Design (القسم 21-22)، الطبقات الأمنية الإضافية:

| التهديد | الحماية |
|---|---|
| رفع ملف تنفيذي مموَّه كصورة (`.php` بامتداد `.jpg`) | فحص **Magic Bytes** الفعلية للملف (وليس الاعتماد على الامتداد أو `Content-Type` المُرسَل من العميل فقط) عبر مكتبة `file-type` قبل القبول |
| Zip Bomb / ملفات ضخمة مموَّهة | حد أقصى صارم للحجم يُتحقق منه **قبل** بدء المعالجة (`sharp`)، ليس بعدها |
| تنفيذ كود عبر SVG (يمكن أن يحتوي `<script>`) | **رفض ملفات SVG بالكامل** من رفع المستخدمين (مراجعات، صور شخصية) — يُسمح بها فقط من الأدمن للأيقونات الثابتة بعد فحص يدوي |
| اسم ملف يحتوي مسارًا خبيثًا (Path Traversal، مثل `../../etc/passwd`) | اسم الملف المخزَّن يُولَّد دائمًا بـ UUID عشوائي من السيرفر — **لا يُستخدم اسم الملف الأصلي المُرسَل من العميل إطلاقًا** في مسار التخزين |

---

## 14. Storage Security

- **Buckets خاصة بشكل افتراضي** — يُفتح الوصول العام فقط للـ Buckets التي تحتاج ذلك صراحة (`products`, `exercises`, `avatars`)، أما `documents` (الملفات الطبية) فتبقى خاصة 100% ويُصدَر لها **Signed URL** مؤقت (صلاحية دقائق معدودة) عند الحاجة الفعلية للعرض، وليس رابطًا دائمًا.
- **حصص تخزين (Storage Quotas)** لكل مستخدم لمنع إساءة الاستخدام (مثال: حد أقصى 10 صور مراجعات لكل مستخدم شهريًا).
- **فحص الفيروسات/البرمجيات الخبيثة (Antivirus Scanning)** على الملفات المرفوعة من الأدمن (فيديوهات التمارين، صور المنتجات) عبر خدمة خارجية (مثل ClamAV integration) قبل النشر العام — أولوية لملفات تُعرض لعموم الزوار.

---

## 15. API Security (تعميق إضافي فوق ما ورد في API Design)

| الإجراء الإضافي | التفصيل |
|---|---|
| **Request Size Limiting** | حد أقصى لحجم Body لكل طلب JSON (100KB) عدا رفع الملفات — يمنع هجمات إغراق الذاكرة |
| **Timeout صارم** | كل استعلام قاعدة بيانات له Timeout أقصى (5 ثوانٍ) — يمنع استعلامات معلَّقة تستنزف الموارد (Slow Query DoS) |
| **إخفاء تفاصيل السيرفر** | رأس `X-Powered-By` وأي معلومات تقنية عن الإصدار (Next.js version, Node version) تُزال من كل استجابة — تقليل المعلومات المتاحة لمهاجم محتمل (Security through obscurity كطبقة إضافية، وليست وحيدة) |
| **API Keys مستقبلية (Public API)** | تُخزَّن مُشفَّرة (Hashed) في قاعدة البيانات — **لا** تُخزَّن كنص صريح حتى في جانب VERTEX نفسه، تمامًا مثل كلمات المرور |

---

## 16. CORS Strategy (مرجع)

موثّقة بالكامل في API Design (الجزء 1، القسم 8) — قائمة بيضاء صارمة، لا `*` مع Credentials. لا تكرار هنا.

---

## 17. CSP (Content Security Policy)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://*.supabase.co https://www.facebook.com;
  font-src 'self';
  connect-src 'self' https://*.supabase.co https://api.paymob.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```
| التوجيه | الغرض |
|---|---|
| `default-src 'self'` | كل مورد غير محدَّد صراحة يُرفض افتراضيًا من مصادر خارجية |
| `script-src` بقائمة بيضاء دقيقة | يمنع تحميل أي JavaScript من نطاق غير موثوق — دفاع حاسم إضافي ضد XSS حتى لو نجح حقن كود بطريقة ما |
| `frame-ancestors 'none'` | يمنع تضمين موقع VERTEX داخل `<iframe>` من مواقع أخرى — حماية من هجمات Clickjacking |
| `object-src 'none'` (ضمنيًا عبر default-src) | يمنع تحميل Flash/Plugins قديمة الثغرات |

**آلية التوليد:** CSP يُبنى ديناميكيًا في `next.config.js` مع **Nonce عشوائي** لكل طلب لأي Script Inline ضروري (بدل `unsafe-inline` الفضفاض حيثما أمكن تجنبه)، لتقييد إضافي أدق.

---

## 18. Security Headers (القائمة الكاملة)

```ts
// next.config.js — headers()
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];
```
| الرأس | الغرض |
|---|---|
| `X-Content-Type-Options: nosniff` | يمنع المتصفح من "تخمين" نوع الملف خلافًا للمُعلَن — يمنع بعض هجمات MIME Sniffing |
| `Strict-Transport-Security` (HSTS) | يجبر المتصفح على استخدام HTTPS فقط لهذا النطاق لمدة سنتين، حتى لو حاول المستخدم كتابة `http://` يدويًا |
| `Permissions-Policy` | يعطّل صراحة وصول الموقع لكاميرا/ميكروفون المستخدم افتراضيًا (لا حاجة لهما في VERTEXworkout حاليًا) |

---

## 19. Secrets Management

| القاعدة | التفصيل |
|---|---|
| **لا Secrets في الكود المصدري مطلقًا** | يُفرض عبر أداة فحص تلقائي (`gitleaks` أو `trufflehog`) ضمن CI Pipeline — يفشل الـ Build فورًا لو اكتُشف أي مفتاح مسرَّب في Commit |
| **مصدر واحد للحقيقة** | كل الـ Secrets تُدار حصريًا عبر **Vercel Environment Variables** (مُشفَّرة عند التخزين)، مقسَّمة حسب البيئة (Development/Staging/Production) — لا ملفات `.env` حقيقية تُرفع لأي مكان |
| **مبدأ الحد الأدنى من الصلاحيات (Least Privilege)** | `SUPABASE_SERVICE_ROLE_KEY` (صلاحيات كاملة، يتجاوز RLS) يُستخدم **فقط** في عمليات سيرفر محدَّدة جدًا وموثّقة (مثل Webhooks، عمليات إدارية) — **لا يُستخدم كإعداد افتراضي** في أي مكان آخر بالكود |
| **تدوير دوري (Rotation)** | مفاتيح API لبوابات الدفع والخدمات الخارجية تُجدَّد كل 90 يومًا كسياسة وقائية، حتى بدون وجود اشتباه تسريب |

---

## 20. Environment Variables Security

يُبنى فوق الأساس الموضّح في Frontend Architecture (القسم 51)، بإضافات أمنية:

```ts
// packages/lib/src/env.ts — تحقق إلزامي عند بدء التشغيل
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SENTRY_DSN: z.string().url().optional(),
});
export const env = envSchema.parse(process.env); // يُفشل الـ Build فورًا لو نقص أي متغيّر إلزامي
```
**قاعدة صارمة:** أي متغيّر بدون بادئة `NEXT_PUBLIC_` **يُمنع برمجيًا** من الاستيراد داخل أي ملف يحمل `"use client"` — يُفرض عبر ESLint rule مخصصة تفحص استيراد `process.env.SUPABASE_SERVICE_ROLE_KEY` (أو أي مفتاح خاص) داخل ملفات العميل وتُفشل الـ Build فورًا عند اكتشافه.

---

*(الجزء 3 التالي: Encryption Strategy، Password Hashing، Webhook Security المتعمّق، Rate Limiting/Brute Force/DDoS، Audit Logging، Monitoring & Alerts، Backup Strategy، Disaster Recovery Plan.)*
