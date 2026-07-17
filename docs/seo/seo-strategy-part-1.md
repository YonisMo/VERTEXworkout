# SEO Strategy — VERTEXworkout
**المرحلة 12 من 18 — Enterprise SEO Architecture**
**الجزء 1 من 2: Architecture, Technical SEO, Metadata, URLs, Sitemap/Robots, Structured Data, Social Cards**

---

## 1. SEO Architecture — الفلسفة العامة

**المبدأ الأساسي:** SEO في VERTEXworkout **ليس طبقة تُضاف لاحقًا فوق الموقع** — هو نتيجة مباشرة لقرارات معمارية سابقة تم اعتمادها بالفعل: Server Components (محتوى مفهرَس بالكامل من أول تحميل)، ISR (صفحات سريعة ومحدَّثة)، بنية Route Groups نظيفة (روابط وصفية)، وPerformance Strategy (Core Web Vitals كعامل تصنيف مباشر من Google).

**3 ركائز SEO في VERTEXworkout:**
```
1. Technical SEO   → هل يستطيع Google أصلاً الزحف والفهرسة بكفاءة؟
2. On-Page SEO     → هل كل صفحة مُحسَّنة لكلماتها المفتاحية ومحتواها؟
3. Content & Authority → هل المحتوى (Academy, Blog) يبني سلطة الموضوع (Topical Authority) للعلامة؟
```

---

## 2. Technical SEO — قائمة الأساسيات الملزمة

| العنصر | الحالة في VERTEXworkout | المرجع |
|---|---|---|
| Server-Side Rendering | ✅ افتراضي لكل الصفحات العامة | Frontend Architecture، القسم 22 |
| سرعة التحميل (Core Web Vitals) | ✅ أهداف رقمية ملزمة | Performance Strategy، القسم 20 |
| بنية روابط نظيفة (kebab-case, بدون معرّفات غامضة) | ✅ معتمدة | Sitemap، القسم 1 |
| HTTPS إلزامي | ✅ | Security Architecture |
| Mobile-First (Responsive كامل) | ✅ | Wireframes، Design System |
| لا محتوى مكرر (Duplicate Content) | ✅ عبر Canonical + hreflang | القسم 5 أدناه |
| بنية عناوين هرمية صحيحة (H1 واحد لكل صفحة، H2/H3 منطقية) | يُفرض كقاعدة تصميم صارمة في كل قالب صفحة | القسم 3 أدناه |

---

## 3. Metadata Strategy & Dynamic Metadata

يُبنى فوق الأساس المُعتمَد في Frontend Architecture (الأقسام 38-39) وAPI Design — هنا التفاصيل الإضافية الخاصة بجودة المحتوى نفسه:

**قواعد كتابة Metadata لكل نوع صفحة:**
| نوع الصفحة | صيغة `<title>` | صيغة `description` |
|---|---|---|
| منتج | `{اسم المنتج} | تسوق أونلاين | VERTEXworkout` (≤ 60 حرفًا) | يبدأ بالفائدة الأساسية للمنتج + السعر إن أمكن (≤ 155 حرفًا) |
| برنامج تدريبي | `{اسم البرنامج} - برنامج {المستوى} لـ {الهدف} | VERTEXworkout` | مدة البرنامج + الفئة المستهدفة + الفائدة الرئيسية |
| مقال أكاديمية/مدونة | `{عنوان المقال} | VERTEX Academy` | ملخص حقيقي للمقال (وليس عامًا) — أول 155 حرفًا فعلية من المحتوى غالبًا |
| الصفحة الرئيسية | `VERTEXworkout | منصة اللياقة البدنية المتكاملة` (ثابت) | وصف شامل للعلامة والخدمات الأربع الرئيسية |

**قاعدة صارمة:** **لا يوجد `<title>` أو `description` مكرر بين أي صفحتين** — يُفحص هذا آليًا (سكربت في CI يقارن كل الـ Metadata المُولَّدة من `sitemap.ts` ويُبلِّغ عن أي تكرار).

**بنية العناوين الهرمية (Heading Hierarchy):**
- **H1 واحد فقط** لكل صفحة (اسم المنتج/البرنامج/المقال) — يُفرض عبر مراجعة قالب الصفحة، وليس تركه لتقدير كل مطوّر.
- H2 للأقسام الرئيسية (المواصفات، المراجعات، برامج ذات صلة).
- لا تخطي مستويات (H2 مباشرة لـ H4 دون H3) — يُربك محركات البحث وقارئات الشاشة معًا (تقاطع مع Accessibility).

---

## 4. URL Structure & Canonical URLs (مرجع + تعميق)

موثّقة بالكامل في Sitemap (الأقسام 1-3) — البنية معتمدة ومجمَّدة. تعميق إضافي هنا:

**Canonical عند وجود فلاتر/Query Params:**
```
/ar/store?sortBy=price-asc&page=2  →  <link rel="canonical" href="https://vertexworkout.com/ar/store" />
```
**القاعدة:** أي صفحة نتائج مُفلترة أو مُرتَّبة تُشير بـ Canonical **للنسخة الأساسية غير المُفلترة** من نفس المسار — يمنع تفتيت "قوة" الصفحة (Link Equity) بين عشرات الاختلافات الطفيفة لنفس المحتوى الأساسي.

**استثناء:** صفحة نتائج تصنيف مُحدَّد (`/store/category/resistance-bands`) هي صفحة **مستقلة بذاتها** ولها Canonical خاص بها (وليس إشارة لصفحة `/store` العامة) — لأنها تستهدف نية بحث مختلفة فعليًا ("أربطة مقاومة" وليس "منتجات VERTEX عمومًا").

---

## 5. Robots.txt & XML Sitemap (مرجع + تعميق)

موثّقة تقنيًا في Frontend Architecture (الأقسام 40-41). تعميق استراتيجي إضافي:

**Sitemap مُقسَّم (Sitemap Index)** بدل ملف واحد ضخم، أفضل لإدارة الفهرسة مع نمو المحتوى:
```xml
<!-- /sitemap.xml (Index) -->
<sitemapindex>
  <sitemap><loc>https://vertexworkout.com/sitemap-static.xml</loc></sitemap>
  <sitemap><loc>https://vertexworkout.com/sitemap-products.xml</loc></sitemap>
  <sitemap><loc>https://vertexworkout.com/sitemap-programs.xml</loc></sitemap>
  <sitemap><loc>https://vertexworkout.com/sitemap-content.xml</loc></sitemap>
</sitemapindex>
```
**الفائدة:** لو تجاوز عدد المنتجات 50,000 (حد Google لكل ملف Sitemap)، يُقسَّم `sitemap-products.xml` تلقائيًا لملفات مرقَّمة إضافية دون التأثير على باقي الأقسام — بنية قابلة للتوسع من اليوم الأول.

**`lastmod` دقيق لكل URL:** يُؤخذ مباشرة من `products.updated_at` / `content_items.updated_at` الفعلي في قاعدة البيانات — **وليس تاريخ اليوم الحالي لكل الروابط** (خطأ شائع يُفقد Google الثقة في دقة إشارات "آخر تحديث").

---

## 6. Structured Data (Schema.org) — الكتالوج الكامل

يُبنى فوق الأساس في API Design (القسم 43)، هنا الكتالوج الكامل لكل نوع صفحة:

| نوع الصفحة | نوع Schema | الحقول الأساسية |
|---|---|---|
| الرئيسية | `Organization` + `WebSite` (مع `SearchAction` لصندوق البحث في نتائج Google) | الاسم، الشعار، روابط التواصل الاجتماعي |
| منتج | `Product` + `Offer` + `AggregateRating` | السعر، العملة (EGP)، توفر المخزون، متوسط التقييم وعدد المراجعات |
| برنامج تدريبي | `Course` (الأنسب دلاليًا لبرنامج تعليمي/تدريبي) | المستوى، المدة، المدرّب إن وُجد |
| مقال (Academy/Blog) | `Article` أو `HowTo` (للمقالات ذات خطوات، مثل "كيفية أداء تمرين معين") | تاريخ النشر، الكاتب، الصورة |
| تمرين (Exercise Library) | `ExerciseAction` (نوع Schema متخصص من Google لهذا الغرض تحديدًا) | العضلات المستهدفة، المعدات |
| كل الصفحات الداخلية | `BreadcrumbList` | مسار التنقل الكامل |
| صفحة اتصل بنا | `LocalBusiness` (إن وُجد عنوان فعلي/صالة، Phase لاحقة) أو `Organization` فقط حاليًا | — |

**آلية التنفيذ:** مكوّن `<StructuredData type="Product" data={product} />` مركزي في `packages/ui` يُولِّد JSON-LD الصحيح حسب النوع — لا تكرار كتابة JSON-LD يدويًا في كل صفحة.

---

## 7. Open Graph & Twitter Cards (مرجع + تعميق)

موثّقة تقنيًا في API Design (القسم 42). إضافات استراتيجية:

- **صورة OG ديناميكية للمنتجات:** إن لم يوجد تصميم مخصص، تُولَّد صورة OG تلقائيًا (`app/og/route.tsx` باستخدام `next/og`) تجمع صورة المنتج + السعر + شعار VERTEX — بدل الاعتماد فقط على صورة المنتج الخام التي قد لا تحمل هوية العلامة بصريًا عند المشاركة.
- **`twitter:card` = `summary_large_image`** لكل الصفحات (أكثر جذبًا بصريًا من `summary` الافتراضي الأصغر).
- **اختبار دوري:** فحص شهري عبر أدوات المعاينة الرسمية (Facebook Sharing Debugger, Twitter Card Validator) للتأكد من ظهور المعاينة بشكل صحيح، خصوصًا بعد أي تعديل في بنية `generateMetadata`.

---

## 8. Breadcrumb SEO

بالإضافة لـ `BreadcrumbList` Schema (القسم 6)، Breadcrumbs **مرئية فعليًا** في كل صفحة داخلية (وليست فقط بيانات مخفية للسيرش إنجن):
```
الرئيسية > المتجر > معدات القوة الوظيفية > VERTEX Power Bag 15kg
```
**الفائدة المزدوجة:** (1) تحسين تجربة المستخدم (يعرف مكانه، يتنقل بسهولة للخلف)، (2) تُظهرها Google أحيانًا **بدل الرابط الخام** في نتائج البحث، مما يحسّن معدل النقر (CTR) بصريًا. مبنية كمكوّن مشترك واحد (`packages/ui/breadcrumb-nav.tsx`) يُستدعى بأي مسار ديناميكي.

---

*(الجزء 2 التالي: Internal Linking، Image/Video SEO، Content SEO، Multi-language SEO المتعمّق، Local SEO، علاقة Core Web Vitals بالتصنيف، Indexing Strategy، Crawl Budget، Redirect Strategy، Monitoring، Search Console، Rich Results، وChecklist نهائي.)*
