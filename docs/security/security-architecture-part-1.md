# Security Architecture — VERTEXworkout
**المرحلة 10 من 18 — Enterprise Production-Ready Security Design**
**الجزء 1 من 4: Overview, Threat Model, OWASP, Auth/Session/Cookie Security, CSRF/XSS**

---

## 1. Security Architecture Overview

**الفلسفة:** **Defense in Depth** — لا نعتمد على طبقة حماية واحدة لأي أصل حساس. كل بيانات المستخدم محمية على الأقل بطبقتين مستقلتين (مثال: RBAC على مستوى التطبيق + RLS على مستوى قاعدة البيانات معًا، وليس أحدهما فقط).

**نموذج الثقة (Trust Boundaries):**
```
[متصفح المستخدم]  ← غير موثوق بالكامل
        │ HTTPS
[Vercel Edge / Middleware]  ← نقطة تفتيش أولى (i18n + Auth check سطحي)
        │
[Next.js Server (Server Components/Actions/Route Handlers)]  ← نقطة تحقق ثانية (Zod + RBAC + Ownership)
        │
[packages/api]  ← منطق أعمال، لا يثق بمدخلات غير مُتحقَّقة
        │
[Supabase (PostgreSQL + RLS)]  ← خط الدفاع الأخير (حتى لو تجاوز مهاجم كل ما سبق)
```
**القاعدة الذهبية:** أي طبقة يجب أن تفترض أن الطبقة التي "فوقها" قد تكون فُشِلت أو تم تجاوزها — ولذلك RLS مفعّلة دائمًا حتى لو كان التطبيق نفسه يتحقق من RBAC بدقة.

---

## 2. Threat Modeling (منهجية STRIDE مطبَّقة على VERTEXworkout)

| فئة التهديد | مثال فعلي على المنصة | الحماية المقابلة |
|---|---|---|
| **Spoofing** (انتحال هوية) | مهاجم يحاول انتحال جلسة عميل آخر لعرض طلباته | Cookies موقّعة `httpOnly` من Supabase Auth، تحقق من الجلسة في كل طلب |
| **Tampering** (تلاعب بالبيانات) | تعديل سعر منتج في الطلب من جهة العميل قبل الإرسال | السعر يُحسب **من السيرفر دائمًا** (`packages/api`) من `products.price`، ولا يُقبل أي سعر مُرسَل من العميل |
| **Repudiation** (إنكار تنفيذ عملية) | أدمن يعدّل سعر منتج وينكر لاحقًا | `audit_logs` (Immutable) يسجّل كل عملية إدارية بمعرّف المُنفِّذ |
| **Information Disclosure** (تسريب بيانات) | الوصول لطلب عميل آخر عبر تخمين الـ ID | UUID (غير قابل للتخمين التسلسلي) + `requireOwnership` في كل Endpoint |
| **Denial of Service** | إغراق `/api/v1/search` بطلبات متكررة لإبطاء الخدمة | Rate Limiting (موثّق في API Design) + Vercel/Cloudflare DDoS Protection |
| **Elevation of Privilege** (تصعيد صلاحيات) | Client يحاول استدعاء Server Action مخصص للأدمن مباشرة | كل Server Action حساس يتحقق من `requireRole(['admin'])` داخليًا، بغض النظر عن إخفاء الزر في الواجهة |

**الأصول الأكثر حساسية في VERTEXworkout (مرتبة حسب الأولوية):**
1. بيانات مصادقة المستخدم (كلمات مرور، جلسات).
2. بيانات الدفع (لا تُخزَّن مباشرة — تُدار بالكامل عبر Paymob/Stripe، VERTEX لا يلمس أرقام البطاقات إطلاقًا — تفصيل في القسم 21).
3. الملفات الطبية الاختيارية للمتدربين (`client_profiles`).
4. مفاتيح API الخاصة (`SUPABASE_SERVICE_ROLE_KEY`, مفاتيح بوابات الدفع).
5. سجلات `audit_logs` نفسها (يجب ألا تكون قابلة للتعديل حتى من مهاجم بصلاحيات أدمن مخترقة).

---

## 3. OWASP Top 10 (2021) — خريطة التغطية الكاملة

| # | الثغرة | الحالة في VERTEXworkout | آلية الحماية |
|---|---|---|---|
| A01 | Broken Access Control | ✅ مُعالَج | RBAC ثلاثي المستوى (Middleware + Server + RLS) + `requireOwnership` في كل مورد شخصي |
| A02 | Cryptographic Failures | ✅ مُعالَج | HTTPS إلزامي، تشفير كلمات المرور عبر Supabase Auth (bcrypt)، لا تخزين بيانات دفع خام |
| A03 | Injection | ✅ مُعالَج | Supabase Client (Parameterized Queries) + Zod على كل مدخل + `sortBy` عبر Enum مغلق فقط |
| A04 | Insecure Design | ✅ مُعالَج | Threat Modeling هذا القسم، Clean Architecture تفرض التحقق في كل طبقة |
| A05 | Security Misconfiguration | ✅ مُعالَج | Security Headers إلزامية (القسم 18 لاحقًا)، بيئات منفصلة تمامًا (`.env.*`) |
| A06 | Vulnerable & Outdated Components | ✅ مُعالَج | `pnpm audit` + Dependabot ضمن CI (تفصيل القسم 34 في الجزء 4) |
| A07 | Identification & Authentication Failures | ✅ مُعالَج | Rate Limiting على تسجيل الدخول، CAPTCHA بعد محاولات فاشلة، Session عبر Cookies آمنة |
| A08 | Software & Data Integrity Failures | ✅ مُعالَج | Webhook Signature Verification إلزامي، `pnpm-lock.yaml` مثبَّت في Git (Supply Chain، القسم 35) |
| A09 | Security Logging & Monitoring Failures | ✅ مُعالَج | `audit_logs` + Sentry + Structured Logging + تنبيهات فورية (القسم 28) |
| A10 | Server-Side Request Forgery (SSRF) | ✅ مُعالَج | لا يقبل النظام أي URL خارجي من المستخدم يُستدعى من السيرفر مباشرة؛ روابط الصور تُرفع كملفات لا كروابط خارجية يجلبها السيرفر |

---

## 4. Authentication Security

**آلية الأساس:** Supabase Auth (يدير Hashing، Token Rotation، Email Verification داخليًا وفق معايير الصناعة).

| الإجراء | التفصيل |
|---|---|
| الحد الأدنى لكلمة المرور | 8 أحرف، تشمل حرفًا وحرفًا كبيرًا ورقمًا (تُفرض عبر Zod schema في `packages/validation/auth`) |
| تأكيد البريد الإلكتروني | إلزامي قبل تفعيل الحساب بالكامل (`email_confirmed_at` في Supabase) |
| قفل الحساب المؤقت | بعد 5 محاولات دخول فاشلة متتالية → قفل 15 دقيقة (مدمج مع Rate Limiting، القسم 24) |
| إعادة تعيين كلمة المرور | Token صالح لـ 15 دقيقة فقط، يُستخدم مرة واحدة (Single-use)، يُبطَل فور الاستخدام أو انتهاء الصلاحية |
| Social Login (Google) | عبر OAuth 2.0 القياسي من Supabase — لا كلمة مرور تُخزَّن لهذه الحسابات إطلاقًا |
| Multi-Factor Authentication (MFA) | **غير مُفعَّل في Phase 1**، لكن Supabase Auth يدعمه أصلاً — يُفعَّل لاحقًا لحسابات Admin تحديدًا كأولوية (قسم Roadmap مستقبلي) |

---

## 5. Authorization Security (RBAC + Ownership) — تعميق إضافي

موضّح معماريًا في API Design (القسم 6)، هنا التعميق الأمني الإضافي:

**مبدأ "Deny by Default":** أي مسار أو Server Action **بدون** تصريح RBAC صريح يُعامَل كمرفوض تلقائيًا (Fail Closed)، وليس مسموحًا افتراضيًا (Fail Open) — خطأ برمجي في تعريف الصلاحيات يؤدي لرفض الوصول (آمن)، وليس السماح به (خطر).

```ts
// packages/auth/src/api-guards.ts
export async function requirePermission(session: Session | null, permission: string) {
  if (!session) throw new ApiError('UNAUTHENTICATED', '...', 401);
  const hasPermission = await checkUserPermission(session.userId, permission); // يتحقق من DB مباشرة، لا كاش قديم لصلاحيات حساسة
  if (!hasPermission) throw new ApiError('FORBIDDEN', '...', 403);
}
```
**Common Mistake يُتجنَّب:** تخزين صلاحيات المستخدم في الجلسة (Cookie) عند تسجيل الدخول واستخدامها طوال مدة الجلسة دون تحديث — لو سُحبت صلاحية أدمن من مستخدم، يجب أن يفقدها فورًا في الطلب التالي، لا أن تبقى فعالة حتى انتهاء الجلسة القديمة.

---

## 6. Session Management

| الخاصية | القيمة |
|---|---|
| آلية التخزين | Cookie فقط (`httpOnly`, `secure`, `sameSite=lax`) — لا `localStorage`/`sessionStorage` إطلاقًا |
| مدة صلاحية الجلسة | Access Token: ساعة واحدة. Refresh Token: 7 أيام (قابلة للتجديد التلقائي طالما المستخدم نشط) |
| تجديد الجلسة | تلقائي عبر Supabase SSR Middleware — لا يشعر المستخدم بانتهاء الصلاحية طالما يتصفح بانتظام |
| إنهاء الجلسة | عند Logout: إبطال فوري للـ Refresh Token من جهة Supabase (وليس فقط حذف الـ Cookie من المتصفح) |
| جلسات متعددة الأجهزة | مدعومة (تسجيل دخول من جهازين لا يُبطل الآخر) — يُضاف لاحقًا خيار "تسجيل الخروج من كل الأجهزة" في الإعدادات (Phase 2) |

---

## 7. Cookie Security

```
Set-Cookie: sb-access-token=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
```
| الخاصية | لماذا |
|---|---|
| `HttpOnly` | يمنع الوصول للكوكي عبر JavaScript — الحماية الأساسية ضد سرقة الجلسة عبر XSS |
| `Secure` | الكوكي لا يُرسَل إلا عبر HTTPS — يمنع الاعتراض عبر شبكات غير آمنة |
| `SameSite=Lax` | يمنع إرسال الكوكي في طلبات Cross-Site (حماية أساسية إضافية ضد CSRF) مع السماح بالتنقل الطبيعي من روابط خارجية |
| `Path=/` محدَّد بدقة | يمنع تسرّب الكوكي لنطاقات فرعية غير مقصودة |

---

## 8. JWT Strategy

Supabase Auth يستخدم **JWT** داخليًا للـ Access Token، مُوقَّع بخوارزمية **HS256** بمفتاح سري خاص بالمشروع (`JWT_SECRET`، يُدار من Supabase تلقائيًا، لا يُكشف أبدًا في الكود).

| الممارسة | التفصيل |
|---|---|
| مدة الصلاحية القصيرة | ساعة واحدة فقط للـ Access Token — يقلل نافذة الخطر لو سُرِّب Token |
| **الـ JWT يحتوي `userId` فقط — لا يحتوي أي دور (Role) مُضمَّن إطلاقًا** | نظام VERTEXworkout يدعم أدوارًا متعددة لكل مستخدم (`user_roles`، Many-to-Many، Database Schema)، وأي دور مُضمَّن داخل الـ JWT وقت تسجيل الدخول يبقى **قيمة مجمَّدة** لمدة صلاحية الـ Token كاملة (حتى ساعة)؛ لو سُحبت صلاحية أدمن من مستخدم أثناء هذه الساعة، سيبقى الـ JWT القديم "يظن" أنه لا يزال أدمن. لذلك **كل تحقق من الدور يتم حيًّا من جدول `user_roles` مباشرة** عبر دالة `has_role()` (تفصيل كامل في القسم 12)، وليس من أي قيمة مخزَّنة في الـ Token |
| التحقق من التوقيع في كل طلب | Middleware يتحقق من صحة توقيع الـ JWT قبل الوثوق حتى بـ `userId` نفسه |

---

## 9. CSRF Protection

**آلية الحماية المزدوجة:**
1. **`SameSite=Lax`** على الكوكي (القسم 7) — يمنع أغلب سيناريوهات CSRF تلقائيًا دون أي كود إضافي.
2. **Server Actions من Next.js تتحقق تلقائيًا من `Origin` Header** مقابل النطاق المتوقع — حماية مدمجة أصلاً في إطار العمل، لا حاجة لتنفيذ يدوي.
3. لعمليات REST API الحساسة (POST/PATCH/DELETE) الإضافية: تحقق صريح إضافي من رأس `Origin`/`Referer` مقابل قائمة النطاقات الموثوقة (نفس قائمة CORS البيضاء من API Design).

**Common Mistake يُتجنَّب:** الاعتماد فقط على `SameSite=Lax` دون أي تحقق إضافي على العمليات شديدة الحساسية (مثل تغيير كلمة المرور أو حذف الحساب) — نضيف تحققًا ثانيًا (مثل طلب كلمة المرور الحالية) لهذه العمليات تحديدًا.

---

## 10. XSS Prevention

| المصدر | الحماية |
|---|---|
| React JSX | يُعقِّم (Escapes) كل قيمة نصية مُدرجة تلقائيًا بشكل افتراضي — الحماية الأكبر مدمجة أصلاً |
| محتوى غني قادم من قاعدة البيانات (مقالات Academy/Blog بصيغة HTML) | يمر عبر **DOMPurify** قبل استخدام `dangerouslySetInnerHTML` — **لا** يُعرض أي محتوى HTML من قاعدة البيانات مباشرة بدون تعقيم، حتى لو أدخله الأدمن نفسه (دفاع إضافي حتى ضد حساب أدمن مخترق) |
| المدخلات من المستخدم (مراجعات المنتجات، التعليقات) | نص عادي فقط (Plain Text) — **لا** يُسمح بـ HTML خام في المراجعات إطلاقًا، تُعرض دائمًا كنص، حتى لو كتب المستخدم وسوم HTML يدويًا (تُعرض كنص حرفي، لا تُفسَّر) |
| Content-Security-Policy | طبقة حماية أخيرة حتى لو نجح هجوم XSS بطريقة ما (تفصيل كامل في القسم 17، الجزء 2) |

```tsx
// features/academy/components/article-body.tsx
import DOMPurify from 'isomorphic-dompurify';
export function ArticleBody({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'li', 'a', 'img', 'h2', 'h3'] });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

---

*(الجزء 2 التالي: SQL Injection Prevention، RLS Policies بالتفصيل، File/Storage Security، API Security الموسّع، CORS، CSP، Security Headers، Secrets Management، Environment Variables Security.)*
