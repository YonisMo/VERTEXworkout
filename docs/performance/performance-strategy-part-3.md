# Performance Strategy — VERTEXworkout
**الجزء 3 من 3 (الأخير): Core Web Vitals, Lighthouse, Monitoring, Load/Stress Testing, Scalability, Budgets, Checklist**

---

## 20. Core Web Vitals — الأهداف الرقمية الملزمة

| المقياس | الهدف (Good) | كيف يُحقَّق في VERTEXworkout |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 ثانية | Server Components + صورة Hero بـ `priority` + Preload الخط الأساسي + ISR للصفحات العامة |
| **INP** (Interaction to Next Paint) | < 200 مللي ثانية | Client Components ضيقة النطاق، تفادي JavaScript ثقيل غير ضروري في مسار التفاعل الأول |
| **CLS** (Cumulative Layout Shift) | < 0.1 | `aspect-ratio` محدَّد لكل صورة/فيديو مسبقًا (موضّح في Wireframes)، Skeleton بنفس أبعاد المحتوى الفعلي، لا إعلانات/عناصر تُدرَج ديناميكيًا فتُزيح المحتوى |
| **TTFB** (Time to First Byte) | < 600 مللي ثانية | Edge Network + ISR (لا انتظار استعلام قاعدة بيانات حي لكل زيارة لصفحة عامة) |
| **FCP** (First Contentful Paint) | < 1.8 ثانية | نتيجة طبيعية لتحقيق LCP وTTFB الجيدين |

**القياس الفعلي:** عبر **Vercel Analytics** (بيانات مستخدمين حقيقيين - Real User Monitoring، وليس فقط قياسات معملية) — لوحة تحكم تعرض توزيع هذه المقاييس فعليًا حسب الجهاز والموقع الجغرافي لزوار VERTEXworkout تحديدًا.

---

## 21. Lighthouse Optimization

**الهدف الأدنى المقبول لإطلاق الإنتاج:** درجة **90+** في كل الفئات الأربع (Performance, Accessibility, Best Practices, SEO) لأهم 5 صفحات (الرئيسية، المتجر، تفاصيل منتج، البرامج، مكتبة التمارين).

| الفحص | آلية الالتزام |
|---|---|
| **Lighthouse CI** | يُشغَّل تلقائيًا ضمن Pull Requests للصفحات الحرجة — يفشل الـ Build إن انخفضت الدرجة عن العتبة المُحدَّدة (Regression Prevention) |
| **مراجعة يدوية دورية** | فحص Lighthouse كامل شهريًا لكل الصفحات (وليس فقط الحرجة) لرصد أي تدهور تدريجي غير ملحوظ في CI |

---

## 22. Performance Monitoring

| الأداة | الغرض |
|---|---|
| **Vercel Analytics** | Core Web Vitals لمستخدمين حقيقيين (RUM)، موزَّعة حسب الصفحة والجهاز |
| **Sentry Performance Monitoring** | تتبع زمن استجابة كل Route Handler/Server Action + تتبع Traces عبر الطبقات (من الطلب حتى استعلام قاعدة البيانات) |
| **Supabase Dashboard** | مراقبة أداء قاعدة البيانات (زمن الاستعلامات، استخدام الـ Connections، الاستعلامات البطيئة) |
| **لوحة تنبيهات موحّدة** | تنبيه Slack فوري عند: تجاوز TTFB متوسط 1 ثانية لمدة 10 دقائق متتالية، أو ظهور استعلام يتجاوز 500ms بتكرار غير طبيعي |

---

## 23. Load Testing

**الأداة:** k6 (سكربتات JavaScript بسيطة، تكامل جيد مع CI/CD).

**السيناريوهات المُختبَرة قبل الإطلاق:**
| السيناريو | الحمل المستهدَف | معيار النجاح |
|---|---|---|
| تصفح عام (رئيسية، متجر، منتج) | 500 مستخدم متزامن | زمن استجابة p95 < 1 ثانية، معدل خطأ 0% |
| عملية شراء كاملة (تصفح → سلة → دفع) | 100 مستخدم متزامن | إتمام العملية بنجاح لكل المستخدمين، لا تعارض في تحديث المخزون |
| بحث موحّد | 200 طلب/ثانية | زمن استجابة p95 < 800ms |

---

## 24. Stress Testing

**الهدف:** إيجاد **نقطة الانهيار الفعلية** للنظام (وليس فقط التأكد من الأداء ضمن حمل متوقَّع) — رفع الحمل تدريجيًا (Ramp-up) حتى ظهور أول علامات تدهور حقيقي (أخطاء 5xx، زمن استجابة يتجاوز 5 ثوانٍ) لتحديد السقف الفعلي لقدرة النظام الحالية، وتوثيقه كمرجع لقرارات التوسع (Scaling) المستقبلية.

**نقاط الضعف المتوقَّعة للاختبار تحديدًا:**
- حد اتصالات Supabase (Connection Pool) تحت ضغط شديد ومفاجئ.
- عملية الدفع تحت حمل عالٍ (تعارض تحديث `stock_quantity` لنفس المنتج من عدة مستخدمين متزامنين — يُختبَر صراحة عبر **Optimistic Locking** أو قيد `CHECK (stock_quantity >= 0)` على مستوى قاعدة البيانات لمنع بيع نفس القطعة الأخيرة مرتين).

---

## 25. Scalability Strategy

| البُعد | الاستراتيجية |
|---|---|
| **التطبيق (Compute)** | Serverless بالكامل عبر Vercel Functions — توسّع تلقائي أفقي مع الحمل، لا خادم واحد يُمثِّل نقطة اختناق |
| **قاعدة البيانات** | تبدأ بخطة Supabase قياسية → ترقية للخطة الأعلى (موارد أكبر) عند الحاجة → Read Replicas عند نمو حركة القراءة بشكل كبير (موضّح في القسم 12) |
| **الوسائط (Media)** | Supabase Storage + CDN يتوسعان تلقائيًا مع حجم الملفات دون تدخل يدوي |
| **البحث** | PostgreSQL Full-text Search يكفي حتى عشرات الآلاف من المنتجات/المقالات؛ عند تجاوز ذلك بشكل كبير (مئات الآلاف)، يُقيَّم الانتقال لمحرك بحث متخصص (Meilisearch/Algolia) كخطوة منفصلة لاحقة موثّقة كقرار مستقبلي وليس حاجة حالية |
| **Monorepo/Turborepo** | Remote Caching يضمن أن نمو عدد المطورين والحزم لا يبطئ CI/CD بشكل متناسب — البناء يبقى سريعًا بفضل ذكاء التخزين المؤقت بغض النظر عن حجم الفريق |

---

## 26. Performance Budgets

حدود صارمة تُفرَض آليًا ضمن CI (`size-limit` + Lighthouse CI):

| المورد | الحد الأقصى |
|---|---|
| حجم JavaScript لكل صفحة (gzip) | 200KB للصفحة الرئيسية والمتجر، 250KB للوحة التحكم (تفاعلية أكبر) |
| حجم CSS الكلي | 50KB (gzip) |
| عدد طلبات الشبكة للصفحة الرئيسية | ≤ 25 طلبًا |
| وزن الصفحة الكلي (بما فيها الصور فوق الطية) | ≤ 1.5MB |
| TTFB | < 600ms (كما في القسم 20) |

**عند تجاوز أي حد:** يفشل الـ Pull Request في CI تلقائيًا مع تقرير يوضح أي جزء تحديدًا تسبب في التجاوز — القرار يقع على الفريق: تبرير التجاوز صراحة (نادر) أو تحسين الكود قبل الدمج.

---

## 27. Production Performance Checklist

- [ ] كل صفحة حرجة (رئيسية، متجر، منتج، برامج، مكتبة تمارين) تحقق Lighthouse ≥ 90 في كل الفئات.
- [ ] Core Web Vitals الثلاثة (LCP, INP, CLS) ضمن الأهداف المحددة (القسم 20) على بيانات مستخدمين حقيقيين لمدة أسبوعين على الأقل قبل الإعلان عن الجاهزية الكاملة.
- [ ] `@next/bundle-analyzer` تم تشغيله ومراجعة تقريره قبل الإطلاق، لا مكتبات غير مستخدمة في الحزمة النهائية.
- [ ] Load Testing (القسم 23) اجتاز كل السيناريوهات الثلاثة بمعايير النجاح المحددة.
- [ ] Stress Testing (القسم 24) نُفِّذ وتم توثيق نقطة الانهيار الفعلية كمرجع.
- [ ] كل الصور تُقدَّم عبر `next/image` بصيغ حديثة (AVIF/WebP) دون استثناء.
- [ ] لا استعلام قاعدة بيانات واحد يتجاوز 200ms في المسارات الحرجة (تصفح، شراء).
- [ ] `revalidatePath`/`revalidateTag` مُطبَّقة على كل عملية تعديل من الأدمن، لا اعتماد فقط على انتهاء صلاحية زمنية سلبي.
- [ ] Performance Budgets (القسم 26) مفروضة فعليًا ضمن CI ولا تُتجاوَز.
- [ ] لوحات مراقبة الأداء (Vercel Analytics + Sentry Performance) مفعَّلة ومتصلة بتنبيهات فعلية، لا مجرد أدوات مُثبَّتة دون مراقبة نشطة.

---

## ✅ يرجى المراجعة والموافقة على المرحلة 11 بكل أجزائها (1-3):
- [ ] Performance Architecture وRendering Strategy وServer Components/React Optimization
- [ ] Caching الشامل (4 مستويات) وCDN Strategy
- [ ] Image/Font Optimization المتعمّق
- [ ] Code Splitting وDynamic Imports وBundle Optimization
- [ ] Database Performance وQuery Optimization بأمثلة فعلية
- [ ] API Performance وSearch Performance
- [ ] Edge Runtime Strategy (متى Edge ومتى Node.js تحديدًا)
- [ ] Background Jobs Strategy
- [ ] Core Web Vitals بأهداف رقمية ملزمة
- [ ] Lighthouse Optimization وPerformance Monitoring
- [ ] Load Testing وStress Testing بسيناريوهات محددة
- [ ] Scalability Strategy عبر كل الأبعاد
- [ ] Performance Budgets المفروضة آليًا
- [ ] Production Performance Checklist

بانتظار موافقتك الصريحة على المرحلة 11 كاملة قبل الانتقال إلى **المرحلة 12: SEO Strategy**.
