# Security Architecture — VERTEXworkout
**الجزء 4 من 4 (الأخير): Incident Response, Hardening Checklist, Testing, Dependencies, Compliance, Folder Structure**

---

## 31. Incident Response Plan

### مراحل الاستجابة (منهجية قياسية: Identify → Contain → Eradicate → Recover → Learn)

| المرحلة | الإجراءات |
|---|---|
| **1. الاكتشاف (Identify)** | تنبيه من Sentry/Monitoring، أو تقرير من مستخدم/باحث أمني عبر قناة إبلاغ مخصصة (`security@vertexworkout.com`) |
| **2. الاحتواء (Contain)** | عزل النظام المتأثر فورًا: تعطيل حساب مخترَق، إيقاف مفتاح API متأثر، أو تفعيل Maintenance Mode للموقع بالكامل إن لزم — **الأولوية القصوى إيقاف الضرر قبل التحقيق** |
| **3. الاستئصال (Eradicate)** | تحديد السبب الجذري (ثغرة كود، مفتاح مسرَّب، هندسة اجتماعية)، وإصلاحه فعليًا، وليس فقط معالجة الأثر |
| **4. الاستعادة (Recover)** | إعادة تفعيل الخدمة تدريجيًا مع مراقبة مكثفة، استعادة من نسخة احتياطية نظيفة إن لزم |
| **5. التعلّم (Post-Mortem)** | تقرير مكتوب خلال 72 ساعة: ماذا حدث، لماذا، وماذا تغيّر لمنع تكراره — **بدون لوم فردي (Blameless Post-Mortem)**، التركيز على النظام لا الأشخاص |

### فريق الاستجابة (الأدوار)
| الدور | المسؤولية |
|---|---|
| Incident Commander | يقود الاستجابة، يتخذ القرار النهائي (عزل/إيقاف/استمرار) |
| Technical Lead | ينفّذ الاحتواء والإصلاح التقني الفعلي |
| Communications Lead | يُعلم المستخدمين المتأثرين (إن لزم قانونيًا وأخلاقيًا) بشفافية دون إفشاء تفاصيل تُسهِّل هجمات مماثلة |

### إشعار المستخدمين المتأثرين
عند تأكد اختراق بيانات شخصية: إشعار مباشر (بريد إلكتروني) للمستخدمين المتأثرين خلال **72 ساعة** من التأكد (متوافق مع أفضل ممارسات معايير حماية البيانات الدولية)، يوضح: ما البيانات المتأثرة، الإجراء المتخذ من VERTEX، والإجراء المُوصى به للمستخدم (مثل تغيير كلمة المرور).

---

## 32. Production Hardening Checklist

قائمة إلزامية **قبل** أي إطلاق فعلي للإنتاج — لا استثناء لأي بند:

- [ ] كل جدول في Supabase لديه RLS **مفعّلة** (لا جدول واحد بدون سياسات).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` غير موجود في أي كود عميل (Client-side) — تم فحصه عبر `gitleaks`.
- [ ] كل Security Headers مُفعَّلة وتم التحقق منها فعليًا عبر أداة مثل securityheaders.com.
- [ ] CSP لا يحتوي `unsafe-eval`، ويحتوي `unsafe-inline` لأضيق نطاق ممكن فقط.
- [ ] Rate Limiting مُفعَّل وتم اختباره فعليًا (ليس فقط مكتوبًا في الكود).
- [ ] كل Webhook يتحقق من التوقيع فعليًا (تم اختباره بإرسال طلب مزوَّر والتأكد من الرفض).
- [ ] `pnpm audit` بدون ثغرات حرجة (Critical/High) غير معالَجة.
- [ ] كل متغيرات البيئة الإلزامية موجودة في بيئة Production (تحقق عبر `env.ts` عند البناء).
- [ ] النسخ الاحتياطي التلقائي مُفعَّل ومُختبَر (استعادة تجريبية ناجحة موثّقة).
- [ ] `robots.txt` يمنع فهرسة `/dashboard`, `/checkout`, `/cart`, `/api`.
- [ ] لا بيانات تجريبية (Seed Data) وهمية في قاعدة بيانات Production.
- [ ] شهادة SSL صالحة ومُجدَّدة تلقائيًا (مُدارة عبر Vercel).
- [ ] MFA مُفعَّل إلزاميًا لكل حسابات الأدمن (لا استثناء حتى لصاحب المشروع).
- [ ] Incident Response Plan مُوزَّع على كل الفريق التقني ومفهوم من الجميع.

---

## 33. Security Testing Strategy

| النوع | الأداة/المنهجية | التكرار |
|---|---|---|
| **Static Application Security Testing (SAST)** | ESLint Security Plugins + `semgrep` ضمن CI | كل Pull Request |
| **Dependency Scanning** | `pnpm audit` + GitHub Dependabot | يومي (آلي) |
| **Secret Scanning** | `gitleaks` ضمن CI | كل Commit |
| **Dynamic Application Security Testing (DAST)** | فحص آلي دوري لبيئة Staging (مثل OWASP ZAP) | شهري |
| **Penetration Testing** | تقييم أمني يدوي من طرف ثالث متخصص | قبل الإطلاق الرسمي، ثم سنويًا |
| **RLS Policy Testing** | اختبارات Vitest مخصصة تحاول الوصول لبيانات مستخدم آخر عبر Supabase Client مباشرة، والتأكد من الرفض | ضمن Test Suite العادي |

**Example — اختبار RLS فعلي:**
```ts
// packages/database/src/rls-policies.test.ts
it('يمنع مستخدم من رؤية طلب مستخدم آخر', async () => {
  const clientA = createTestClient(userA.token);
  const { data, error } = await clientA.from('orders').select('*').eq('id', userBOrderId);
  expect(data).toEqual([]); // RLS يُرجع نتيجة فارغة، وليس خطأ صريحًا (سلوك متوقّع وآمن)
});
```

---

## 34. Dependency Security

| الممارسة | التفصيل |
|---|---|
| **تثبيت الإصدارات الدقيقة** | `pnpm-lock.yaml` مُرفَق في Git دائمًا — يضمن أن كل بيئة (تطوير/CI/إنتاج) تستخدم **نفس** نسخ الحزم بالضبط |
| **فحص آلي مستمر** | GitHub Dependabot يفتح Pull Request تلقائيًا لكل تحديث أمني حرج، مع مراجعة وموافقة قبل الدمج (ليس دمجًا تلقائيًا أعمى) |
| **تقليل عدد التبعيات** | مراجعة دورية لأي حزمة غير مستخدمة فعليًا (`depcheck`) — كل تبعية إضافية هي سطح هجوم إضافي محتمل |
| **تفضيل حزم مُصانة بنشاط** | تجنّب حزم متوقفة عن الصيانة (Unmaintained) لوظائف حساسة (مصادقة، تشفير، معالجة مدفوعات) — يُفحص هذا عند اختيار أي مكتبة جديدة |

---

## 35. Supply Chain Security

| التهديد | الحماية |
|---|---|
| حزمة npm مخترقة تُنشر بتحديث خبيث (Supply Chain Attack) | `pnpm` يستخدم Lockfile صارم + التحقق من الأصل (Integrity Hashes) لكل حزمة — أي تغيير في محتوى الحزمة عن المُسجَّل في Lockfile يُرفض تلقائيًا |
| Typosquatting (تثبيت حزمة بالخطأ باسم مشابه لحزمة شرعية) | مراجعة يدوية لكل تبعية جديدة قبل إضافتها لـ `package.json` — لا تثبيت حزم دون التحقق من المصدر الرسمي |
| CI/CD Pipeline مخترَق | صلاحيات GitHub Actions محدودة بأضيق نطاق ممكن (`permissions: read-only` افتراضيًا، صلاحيات كتابة فقط للخطوات التي تحتاجها فعليًا) |
| صور Docker/بيئة تشغيل مخترقة | Vercel يُدير بيئة التشغيل بالكامل (لا صور Docker مخصصة يُديرها الفريق) — يقلل هذا النوع من المخاطر بشكل كبير في هذا المشروع تحديدًا |

---

## 36. Secure Coding Standards

- **مراجعة كود إلزامية (Code Review)** لكل Pull Request يمس: المصادقة، الصلاحيات، معالجة المدفوعات، أو رفع الملفات — لا استثناء حتى للتعديلات "البسيطة" في هذه المناطق.
- **مبدأ "Never Trust, Always Verify"** على كل مدخل، بغض النظر عن مصدره (حتى لو كان من Server Action داخلي يبدو "موثوقًا").
- **لا معالجة أخطاء صامتة (Silent Failures)** لعمليات أمنية — أي فشل في تحقق RBAC أو Zod يجب أن يُرمى كخطأ صريح ويُسجَّل، وليس أن يُتجاهَل ويستمر التنفيذ.
- **تعليقات `// SECURITY:`** إلزامية أعلى أي كود يتعامل مع منطق حساس (تحقق صلاحيات، تشفير، معالجة Webhook) يشرح **لماذا** هذا الكود ضروري أمنيًا — يمنع إزالته بالخطأ لاحقًا من مطوّر لا يدرك أهميته.

---

## 37. Compliance Considerations

| الجانب | التفصيل |
|---|---|
| **حماية البيانات الشخصية** | سياسة الخصوصية (مُعتمدة في Sitemap) توضح بدقة: ما البيانات المُجمَّعة، الغرض منها، ومدة الاحتفاظ — متوافقة مع مبادئ حماية البيانات العامة (مشابهة لـ GDPR كأفضل ممارسة عالمية، حتى لو لم تكن مصر خاضعة له مباشرة) |
| **حق الحذف (Right to Erasure)** | آلية فعلية لحذف حساب المستخدم بالكامل عند الطلب (Soft Delete أولاً لفترة سماح قانونية، ثم Hard Delete نهائي) — مُصمَّمة ضمن `client_profiles` وdeleted_at |
| **بيانات القُصَّر (تحت 16 سنة ضمن نطاق 16-55 المستهدف)** | الحد الأدنى المُعلَن للتسجيل هو 16 سنة — لا معالجة بيانات لمن هم دون ذلك |
| **بيانات الدفع (PCI-DSS)** | VERTEX **خارج نطاق** متطلبات PCI-DSS المباشرة لأنه لا يخزّن/يعالج بيانات البطاقات مطلقًا — كل ذلك عبر بوابات دفع مُعتمدة ومتوافقة (Paymob/Stripe) |
| **الملفات الطبية الاختيارية** | تُعامَل بأعلى درجة حساسية ممكنة في التصميم (RLS صارم، تشفير، Signed URLs مؤقتة) رغم عدم وجود تصنيف طبي رسمي (HIPAA لا ينطبق خارج الولايات المتحدة) — نطبّق نفس المعيار احتياطيًا |

---

## 38. Security Folder Structure

```
packages/
├── auth/
│   └── src/
│       ├── guards.ts              # requireRole, requireOwnership, requirePermission
│       ├── permissions.ts         # مصفوفة الصلاحيات لكل دور
│       ├── api-guards.ts          # Guards خاصة بـ REST Route Handlers
│       └── session.ts             # إدارة الجلسة (getServerSession...)
│
├── lib/
│   └── src/
│       ├── env.ts                 # التحقق من Environment Variables عبر Zod
│       ├── rate-limit.ts          # Upstash Ratelimit instances
│       ├── cors.ts                # قائمة CORS البيضاء
│       ├── csp.ts                 # بناء Content-Security-Policy ديناميكيًا
│       ├── sanitize.ts            # DOMPurify wrapper
│       ├── errors.ts              # ApiError class
│       └── with-error-handler.ts
│
└── database/
    └── migrations/
        └── *_rls_policies.sql      # كل سياسات RLS، مُراجَعة ومُختبَرة قبل كل migration

apps/web/src/
├── middleware.ts                   # نقطة تفتيش i18n + Auth الأولى
└── app/api/v1/webhooks/
    └── */route.ts                  # كل Webhook يتحقق من التوقيع كأول سطر تنفيذي

docs/
└── security/
    ├── threat-model.md
    ├── incident-response-plan.md
    └── production-hardening-checklist.md
```

---

## 39. Security Best Practices — ملخص القواعد الذهبية

1. **Deny by Default** — أي مسار بدون تصريح صريح يُرفض.
2. **Defense in Depth** — لا طبقة حماية وحيدة لأي أصل حساس.
3. **Never Trust Client Input** — كل مدخل يُتحقق منه في السيرفر، بغض النظر عن تحقق العميل.
4. **Least Privilege** — كل مفتاح/دور يملك أضيق صلاحية ممكنة يحتاجها فعليًا.
5. **Fail Securely** — عند حدوث خطأ غير متوقع، النظام يميل دائمًا لرفض الوصول، لا السماح به.
6. **Don't Roll Your Own Crypto** — الاعتماد على معايير الصناعة المُختبرة دائمًا.
7. **Log Everything Sensitive, Expose Nothing Sensitive** — تسجيل داخلي شامل، رسائل خطأ عامة للمستخدم.
8. **Assume Breach** — التخطيط (Backup, Incident Response) كأن الاختراق سيحدث يومًا، وليس "إن حدث".

---

## 40. أمثلة عملية شاملة — أين تُطبَّق كل آلية في الكود فعليًا

| الآلية | الملف/الموقع الفعلي في المشروع |
|---|---|
| RBAC + Ownership | `packages/auth/src/guards.ts` → يُستدعى في كل Server Action وRoute Handler حساس |
| RLS | `packages/database/migrations/*_rls_policies.sql` → مُفعَّل على كل جدول |
| Zod Validation | `packages/validation/src/**` → أول سطر في كل Route Handler/Server Action |
| CSRF | مدمج في Next.js Server Actions تلقائيًا + `SameSite=Lax` على الكوكي |
| XSS | `packages/lib/src/sanitize.ts` (DOMPurify) → يُستخدم في `ArticleBody` وأي محتوى HTML من قاعدة البيانات |
| Rate Limiting | `packages/lib/src/rate-limit.ts` → يُستدعى في `middleware.ts` وRoute Handlers الحساسة |
| Webhook Verification | أول سطر في `app/api/v1/webhooks/*/route.ts` |
| Security Headers/CSP | `next.config.js` → `headers()` function |
| Secrets Validation | `packages/lib/src/env.ts` → يُنفَّذ عند بدء تشغيل التطبيق |
| Audit Logging | `packages/api/src/with-audit-log.ts` → يُغلِّف كل دالة إدارية حساسة |

---

## ✅ يرجى المراجعة والموافقة على المرحلة 10 بكل أجزائها (1-4):
- [ ] Overview وThreat Modeling (STRIDE) وOWASP Top 10 Mapping
- [ ] Authentication وAuthorization وSession/Cookie/JWT Security
- [ ] CSRF وXSS Prevention
- [ ] SQL Injection Prevention وRLS Policies بأمثلة SQL فعلية
- [ ] File Upload وStorage Security
- [ ] API Security المتعمّق وCORS وCSP وSecurity Headers
- [ ] Secrets Management وEnvironment Variables Security
- [ ] Encryption Strategy وPassword Hashing
- [ ] Webhook Security المتعمّق
- [ ] Rate Limiting وBrute Force وDDoS Protection
- [ ] Audit Logging وMonitoring & Alerts
- [ ] Backup Strategy وDisaster Recovery Plan
- [ ] Incident Response Plan الكامل
- [ ] Production Hardening Checklist
- [ ] Security Testing وDependency/Supply Chain Security
- [ ] Secure Coding Standards وCompliance Considerations
- [ ] Security Folder Structure وملخص القواعد الذهبية

بانتظار موافقتك الصريحة على المرحلة 10 كاملة قبل الانتقال إلى **المرحلة 11: Performance Strategy**.
