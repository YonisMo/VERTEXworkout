# Monitoring & Observability Strategy — VERTEXworkout
**المرحلة 15 من 18 — المرجع الموحّد للمراقبة والرصد**
**الجزء 1 من 2: Observability Architecture, Logs/Metrics/Traces, Tool Stack, Correlation IDs, SLOs**

---

## 1. لماذا مرحلة مستقلة رغم أن المراقبة ذُكرت سابقًا؟

عبر المراحل 10 (Security)، 11 (Performance)، و14 (Deployment)، وُثِّقت أدوات وآليات مراقبة متفرقة حسب سياق كل مرحلة (تنبيهات أمنية، Core Web Vitals، مراقبة ما بعد النشر). **هذه المرحلة توحِّد كل ذلك في نموذج رصد واحد متماسك (Single Pane of Glass)** — بدل التعامل مع كل نوع مراقبة بمعزل عن الآخر، فريق العمليات يحتاج رؤية واحدة مترابطة: خطأ أمني وتدهور أداء وفشل نشر قد تكون **نفس الحادثة** تحتاج نفس التحقيق المترابط.

---

## 2. Observability Architecture — الركائز الثلاث

```
Logs (ماذا حدث بالتفصيل؟)  +  Metrics (كم مرة؟ بأي معدل؟)  +  Traces (أين استغرق الوقت عبر الطبقات؟)
                              = Observability كاملة
```

| الركيزة | الأداة في VERTEXworkout | الغرض |
|---|---|---|
| **Logs** | `packages/lib/logger.ts` (Structured JSON) → Sentry + Vercel Logs | تفاصيل حدث واحد بدقة: من، ماذا، متى، لماذا فشل |
| **Metrics** | Vercel Analytics + Supabase Dashboard + Sentry Performance | اتجاهات رقمية عبر الزمن: معدل الأخطاء، TTFB، عدد الطلبات/الثانية |
| **Traces** | Sentry Distributed Tracing | رحلة طلب واحد كاملة عبر الطبقات: Middleware → Server Component → packages/api → Database — أين استُهلك الوقت بالضبط |

**مبدأ التكامل:** الركائز الثلاث **مربوطة بنفس معرّف الطلب (`requestId`)** — عند التحقيق في مشكلة، ننتقل من Metric (لاحظنا ارتفاع TTFB) إلى Trace (أي طبقة استغرقت الوقت) إلى Log (تفاصيل الطلبات المحدَّدة التي فشلت) بسلاسة، بدل البحث في 3 أنظمة منفصلة بلا رابط بينها.

---

## 3. Correlation ID — الخيط الرابط عبر كل الطبقات

```ts
// packages/lib/src/request-context.ts
export function getOrCreateRequestId(headers: Headers): string {
  return headers.get('x-request-id') ?? crypto.randomUUID();
}
```
**التدفق:**
```
Middleware (Edge) يُولِّد requestId → يُمرَّر عبر Header X-Request-Id
        ↓
Server Component/Action → يُستخدَم requestId في كل استدعاء packages/api
        ↓
packages/database → أي استعلام بطيء يُسجَّل مع نفس requestId
        ↓
Sentry (Logs + Traces) → كل حدث مرتبط بنفس requestId قابل للتجميع والبحث الموحَّد
```
**الفائدة العملية:** عندما يُبلِّغ مستخدم عن مشكلة ("طلبي فشل الساعة 10:15")، رقم `requestId` المُرفَق في استجابة الخطأ (القسم 12، API Design) يسمح بإيجاد **كل** ما يخص هذا الطلب تحديدًا عبر Logs/Metrics/Traces في ثوانٍ، بدل البحث اليدوي بالتوقيت التقريبي.

---

## 4. Structured Logging Schema الموحَّد

كل سجل (Log Entry) عبر كل النظام يتبع نفس الشكل الثابت — لا صيغ متفرقة حسب مطوّر كتبه:

```json
{
  "timestamp": "2026-07-16T10:15:32.104Z",
  "level": "error",
  "requestId": "req_8f3a2b1c",
  "userId": "uuid-or-null",
  "app": "web",
  "environment": "production",
  "path": "/api/v1/orders",
  "method": "POST",
  "durationMs": 342,
  "message": "فشل إنشاء الطلب: نفاد المخزون",
  "errorCode": "CONFLICT",
  "context": { "productVariantId": "uuid", "requestedQty": 3, "availableQty": 1 }
}
```
| المستوى (level) | متى يُستخدَم |
|---|---|
| `debug` | تفاصيل تطوير محلية فقط، **لا تصل أبدًا لبيئة Production** |
| `info` | أحداث طبيعية مهمة (طلب جديد تم إنشاؤه، تسجيل دخول ناجح) |
| `warn` | حالة غير طبيعية لكن مُعالَجة (محاولة دخول فاشلة، إعادة محاولة API خارجي نجحت في المرة الثانية) |
| `error` | فشل فعلي يستحق تدخلًا أو مراجعة |
| `fatal` | تعطل يمنع الخدمة من العمل — يُصعَّد فورًا |

**قاعدة صارمة (امتداد مباشر لـ Security Architecture، القسم 19):** أي حقل حساس (`password`, `token`, `cardNumber`, `medicalNotes`) يُستبدَل تلقائيًا بـ `[REDACTED]` عبر فلتر مركزي في `logger.ts` **قبل** إرسال أي سجل لأي وجهة خارجية (Sentry، ملفات، إلخ) — لا استثناء ولا اعتماد على انتباه المطوّر لتذكّر هذا يدويًا في كل استدعاء.

---

## 5. مكدّس الأدوات الموحَّد (Tool Stack Consolidation)

| الأداة | الدور الموحَّد | يغطي أيضًا (مراجع سابقة) |
|---|---|---|
| **Sentry** | Logs (الأخطاء) + Traces (الأداء) + Alerts | Security Architecture (القسم 28)، Performance Strategy (القسم 22) |
| **Vercel Analytics** | Metrics (Core Web Vitals لمستخدمين حقيقيين) | Performance Strategy (القسم 20-22) |
| **Vercel Deployment Logs** | Metrics + Logs خاصة بعمليات النشر | Deployment Strategy (القسم 11) |
| **Supabase Dashboard** | Metrics قاعدة البيانات (اتصالات، استعلامات بطيئة) | Performance Strategy (القسم 12)، Deployment Strategy (القسم 11) |
| **Better Uptime (أو مكافئ)** | Synthetic Monitoring (فحص دوري خارجي) | Deployment Strategy (القسم 5، 11) |
| **PostHog (اختياري لاحقًا)** | Product Analytics (سلوك المستخدم الفعلي، Funnels) | `packages/analytics` |
| **Slack** | قناة التنبيهات الموحَّدة لكل الأدوات أعلاه | Security Architecture، Deployment Strategy |

**لماذا هذا المكدّس تحديدًا وليس أدوات أكثر؟** كل أداة إضافية تعني نقطة تكامل إضافية وتكلفة إضافية (Cost Monitoring، Deployment Strategy القسم 17) — هذا المكدّس يغطي الركائز الثلاث بالكامل دون تكرار وظيفي بين أداتين لنفس الغرض.

---

## 6. Service Level Objectives (SLOs) & Service Level Indicators (SLIs)

**الفرق:** SLI = مقياس فعلي قابل للقياس. SLO = الهدف الذي نلتزم به لهذا المقياس.

| SLI (المقياس) | SLO (الهدف الملتزم به) | نافذة القياس |
|---|---|---|
| توفر الخدمة (Uptime) | 99.9% (يسمح بحد أقصى ~43 دقيقة تعطّل شهريًا) | شهري |
| زمن استجابة API (p95) | أقل من 500ms لـ 95% من الطلبات | يومي |
| نجاح عمليات الدفع | 99.5% من محاولات الدفع تكتمل بنجاح تقني (بصرف النظر عن رفض البنك نفسه) | أسبوعي |
| TTFB (p75، مستخدمين حقيقيين) | أقل من 600ms | أسبوعي (متوافق مع Performance Strategy، القسم 20) |
| نجاح Deployment Verification | 95% من عمليات النشر تجتاز كل الفحوصات من أول محاولة | شهري |

### Error Budget

**التعريف:** الفرق بين SLO المُعلَن (مثال: 99.9% Uptime) والكمال المطلق (100%) — هو "الميزانية" المسموح بإنفاقها من الأعطال قبل اعتبار الالتزام مكسورًا.

**سياسة استهلاك الميزانية:**
| حالة الميزانية | السياسة |
|---|---|
| متبقٍّ أكثر من 50% من الميزانية الشهرية | النشر يستمر بالوتيرة الطبيعية، لا قيود إضافية |
| متبقٍّ بين 20%-50% | مراجعة إضافية لكل نشر عالي الخطورة قبل الترقية للإنتاج |
| أقل من 20% متبقٍّ | **تجميد إنتاج جزئي** (يتقاطع مع Production Freeze Policy، Deployment Strategy القسم 18) — الأولوية القصوى لاستقرار الخدمة، لا ميزات جديدة حتى تتعافى الميزانية |

**الفائدة:** يحوّل "الاستقرار" من شعور عام غامض إلى **رقم مُتَّفَق عليه** يقود قرارات فعلية (متى نبطئ وتيرة النشر، متى نُعطي الأولوية لإصلاح الديون التقنية على الميزات الجديدة).

---

*(الجزء 2 التالي: Dashboards الموحَّدة، Alerting Policy وOn-Call، مستويات شدة الحوادث، Business Metrics Monitoring، Synthetic Monitoring، سياسة الاحتفاظ بالسجلات، وChecklist نهائي.)*
