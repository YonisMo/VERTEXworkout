# وثيقة متطلبات المنتج (PRD)
# VERTEXworkout — Fitness Ecosystem المتكامل

**الإصدار:** 2.0
**التاريخ:** يوليو 2026
**الحالة:** بانتظار الموافقة النهائية

---

## 0. رؤية المشروع (Vision)

> VERTEXworkout ليس مجرد موقع إلكتروني، بل نظام بيئي (Fitness Ecosystem) متكامل يجمع بين التدريب، والتعليم، والمحتوى، والمنتجات، وإدارة العملاء، ومتابعة الأداء، مع بنية تقنية قابلة للتوسع إلى تطبيقات الهاتف ولوحات التحكم والذكاء الاصطناعي مستقبلاً.

---

## 1. نظرة عامة على المشروع (Executive Summary)

VERTEXworkout منصة رقمية شاملة للياقة البدنية، تجمع بين المتجر الإلكتروني (منتجات VERTEX الخاصة)، الاشتراكات التدريبية، أكاديمية تعليمية (VERTEX Academy)، ومكتبة تمارين احترافية، موجهة لعموم المهتمين باللياقة والصحة من عمر 16 إلى 55 سنة.

الهدف: بناء منصة بهوية بصرية قوية تنافس العلامات العالمية (Nike, Gymshark)، مبنية على بنية تقنية قابلة للتوسع لسنوات، وصولًا لتطبيقات الجوال والذكاء الاصطناعي دون الحاجة لإعادة البناء.

---

## 2. الجمهور المستهدف (Target Audience)

| الفئة | الوصف |
|---|---|
| المبتدئون | يبحثون عن إرشاد وبرامج بسيطة للبدء |
| الراغبون في خسارة الوزن | يحتاجون خطط تغذية وتمارين محددة |
| الراغبون في بناء العضلات | برامج تضخيم وتقوية |
| الباحثون عن اللياقة العامة | صحة عامة ونمط حياة نشط |
| رياضيو القوة الوظيفية | برامج متقدمة (Functional Fitness) |

**النطاق العمري:** 16–55 سنة، رجال ونساء، بدون تخصيص لفئة واحدة.

---

## 3. الهوية البصرية (Brand Identity)

- **شعار جاهز** ومعتمد يُستخدم أساسًا للتصميم.
- **الألوان:**
  - Primary: `#022859` (Dark Blue)
  - Accent: `#F2EA79` (Gold)
  - White: `#FFFFFF`
  - Light Gray: `#EAEAEA`
  - Black: للنصوص والتفاصيل فقط عند الحاجة
- **الطابع:** قوة + انضباط رياضي + فخامة بلا مبالغة + حداثة ونظافة بصرية.
- **الأسلوب:** Hero Sections كبيرة، صور/فيديوهات عالية الجودة، خطوط قوية وواضحة، Animations ناعمة (Framer Motion)، Premium UI/UX.
- **يدعم Dark Mode & Light Mode** بالكامل، معتمدين على نفس هوية العلامة.

---

## 4. المتجر الإلكتروني (Store)

### 4.1 نطاق المنتجات — المرحلة الأولى
التركيز على منتجات **VERTEX الخاصة فقط** (وليس المكملات الغذائية):
- VERTEX Power Bags
- Resistance Bands
- Functional Training Equipment
- Training Accessories
- Apparel *(مستقبلاً)*

> المكملات الغذائية: خيار مستقبلي، خارج نطاق MVP.

### 4.2 ميزات مُجهّزة بنيويًا (غير مفعّلة بالضرورة في المرحلة الأولى)
يجب أن تدعمها قاعدة البيانات والواجهة منذ البداية دون الحاجة لإعادة هيكلة:
- Wishlist
- Compare Products
- Product Reviews
- Product Ratings
- Related Products

---

## 5. Exercise Library (مكتبة التمارين)

مكتبة تمارين احترافية، كل تمرين يحتوي على:
- فيديو توضيحي
- شرح مفصل للأداء
- العضلات المستهدفة (Primary/Secondary Muscles)
- المعدات المستخدمة
- مستوى الصعوبة (مبتدئ/متوسط/متقدم)
- الأخطاء الشائعة
- نصائح الأداء الصحيح
- **بحث وتصفية** حسب: العضلة المستهدفة، المعدة المتاحة، الهدف التدريبي

---

## 6. VERTEX Academy

قسم تعليمي مستقل ضمن المنصة، يضم:
- Smart Cards (بطاقات معرفية سريعة)
- Exercise Library (مرتبطة بنفس مكتبة التمارين)
- Articles (مقالات تعليمية)
- Nutrition (تغذية)
- Anatomy (تشريح وظيفي)
- Mobility & Flexibility
- Recovery (التعافي)
- Injury Prevention (الوقاية من الإصابات)
- Functional Fitness Education

---

## 7. حساب المتدرب (Client Profile)

يشمل الحساب الكامل (يُبنى تدريجيًا حسب المرحلة):
- الصورة الشخصية
- الوزن، الطول، العمر
- الهدف التدريبي
- القياسات الجسدية (Body Measurements)
- البرامج المشتركة
- تقدم المتدرب (Progress Tracking)
- الإنجازات (Achievements/Badges)
- سجل النشاط (Activity Log)
- الملفات الطبية *(اختياري، بخصوصية عالية)*

---

## 8. الأدوار والصلاحيات (Roles & Permissions)

تُصمَّم قاعدة البيانات منذ البداية لدعم نظام أدوار متعدد (Role-Based Access Control):

| الدور | الصلاحيات الأساسية |
|---|---|
| **Admin** | إدارة كاملة: مستخدمين، منتجات، برامج، طلبات، محتوى |
| **Coach** | إدارة برامجه، متابعة عملائه، تحديث تقدمهم |
| **Client** | حسابه الشخصي، برامجه، مشترياته |

> البنية قابلة لإضافة أدوار أخرى مستقبلًا (مثل Content Editor أو Support) دون تعديل جوهري.

---

## 9. النطاق الوظيفي والخارطة الزمنية (Roadmap)

### Phase 1 — MVP
Home · About · Services · Programs · VERTEX Academy · Exercise Library · Blog · Login/Register · Basic Profile · Store (عرض) · Contact

### Phase 2
Shopping Cart · Checkout · Online Payments (Paymob → Stripe) · Bookings · Wishlist · Reviews · Ratings

### Phase 3
Admin Dashboard · Coach Dashboard · Client Management · Program Management · Progress Tracking · Reports & Analytics

### Phase 4
Android App · iOS App · AI Fitness Coach · Wearables Integration (Apple Health, Google Fit) · Smart Notifications

---

## 10. المتطلبات غير الوظيفية (Non-Functional Requirements)

### الأداء وتجربة المستخدم
- Core Web Vitals ممتازة (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Responsive 100% على كل الأجهزة
- Clean Architecture + Component-Based Design + مكونات قابلة لإعادة الاستخدام
- إمكانية الوصول: توافق WCAG 2.1 AA

### SEO
- Dynamic Metadata لكل صفحة
- Open Graph + Twitter Cards
- Canonical URLs
- Sitemap.xml + Robots.txt
- Structured Data (Schema.org)
- Breadcrumbs

### Analytics
- Google Analytics 4
- Google Search Console
- Microsoft Clarity

### الأمان (Security)
- Row Level Security (Supabase)
- Rate Limiting
- CAPTCHA (نماذج التسجيل والتواصل)
- Audit Logs (سجلات تدقيق للعمليات الحساسة)
- Security Headers (CSP, HSTS, X-Frame-Options...)
- الحماية من XSS وCSRF
- تشفير كلمات المرور وHTTPS إلزامي

### اللغات
- عربي (RTL) وإنجليزي (LTR) بالكامل، مع تذكر تفضيل المستخدم، وبنية قابلة لإضافة لغات مستقبلًا.

---

## 11. البنية التقنية المعتمدة (Tech Stack)

| الطبقة | التقنية | السبب |
|---|---|---|
| Framework | Next.js 14+ (App Router) + TypeScript | SSR/SSG لـ SEO، أداء عالٍ، Type Safety |
| التنسيق | Tailwind CSS + shadcn/ui | تصميم مخصص سريع، مكونات قابلة للوصول |
| قاعدة البيانات | Supabase (PostgreSQL + Auth + Storage) | جاهزة للتوسع، RLS مدمج |
| إدارة حالة الواجهة | Zustand | خفيف ومناسب لحالة الواجهة |
| إدارة حالة السيرفر | TanStack Query | Caching تلقائي للبيانات |
| التحقق من البيانات | Zod | Validation آمن ومتوافق مع TypeScript |
| الفورمات | React Hook Form | أداء عالٍ في الفورمات |
| i18n | next-intl | دعم رسمي للعربي/الإنجليزي وRTL/LTR |
| الحركة (Animation) | Framer Motion | حركات ناعمة متوافقة مع الهوية |
| جودة الكود | ESLint + Prettier + Husky + lint-staged | معايير كود موحدة |
| الاستضافة | Vercel | تكامل مباشر، أداء Edge عالمي |
| الدفع (Phase 2) | Paymob (أساسي) + Stripe (دولي) | تغطية السوق العربي والعالمي |
| ORM (عند الحاجة) | Prisma (مؤجل) | يُضاف فقط عند تعقّد الاستعلامات |
| Analytics | GA4 + GSC + Microsoft Clarity | قياس السلوك والأداء |

---

## 12. مقاييس النجاح (Success Metrics)

- سرعة تحميل الصفحة الرئيسية أقل من 2.5 ثانية
- معدل تحويل زوار → تسجيل حساب
- معدل تفاعل مع Exercise Library وVERTEX Academy
- توافق كامل مع WCAG وGoogle PageSpeed (90+)

---

## 13. الخطوات القادمة (بالترتيب، بعد الموافقة على هذه الوثيقة)

1. **Project Structure** — هيكل المجلدات
2. **Database Schema** — تصميم قاعدة البيانات (يدعم الأدوار، المتجر، الأكاديمية، مكتبة التمارين، حسابات المتدربين)
3. **User Flow** — رحلة المستخدم
4. **Sitemap** — خريطة الموقع
5. **Wireframes**
6. **Design System**

> لن تتم كتابة أي كود قبل الانتهاء من هذه المراحل والموافقة عليها بالكامل.

---

## ✅ يرجى المراجعة والموافقة على:
- [ ] نطاق المتجر (منتجات VERTEX فقط في المرحلة الأولى)
- [ ] Exercise Library وVERTEX Academy كأقسام مستقلة
- [ ] حساب المتدرب الموسّع
- [ ] نظام الأدوار (Admin / Coach / Client)
- [ ] خارطة الطريق (Phase 1–4)
- [ ] المتطلبات غير الوظيفية (SEO, Analytics, Security)
