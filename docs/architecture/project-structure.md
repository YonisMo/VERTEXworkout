# Project Structure — VERTEXworkout
**المرحلة 1 من 18 — Software Architecture Documentation**
**الإصدار:** 2.0 (نهائي)

---

## 1. القرار المعماري: Monorepo (Turborepo + pnpm workspaces)

انظر التبرير الكامل والمقارنة مع البدائل في `docs/adr/ADRs.md` (السجل الموحّد لقرارات ADR).

### مبادئ معمارية مُتبعة عبر كل الهيكل
- **Clean Architecture:** فصل صارم بين طبقات العرض (UI)، المنطق (Domain/Use-Cases)، والبيانات (Data Access).
- **Feature-First Architecture:** كل ميزة وظيفية (Feature) تحتوي كل ملفاتها الخاصة بها في مكان واحد — بدل توزيعها حسب النوع التقني.
- **Domain-Driven Design (حيث يناسب):** تنظيم حسب النطاق (Store, Academy, Programs) وليس فقط حسب النوع التقني.
- **SOLID:** كل حزمة/ميزة لها مسؤولية واحدة واضحة.
- **Documentation as Code:** كل حزمة وتطبيق يحمل `README.md` يوضح مسؤوليته، وتعليقات توضيحية أعلى الملفات المعقدة.

---

## 2. الهيكل الكامل (Full Tree — النسخة النهائية)

```
vertexworkout/
├── apps/
│   ├── web/                          # Next.js 14 — الموقع الرئيسي (Phase 1)
│   ├── admin/                        # Admin Dashboard — Skeleton (Phase 3)
│   ├── coach/                        # Coach Dashboard — Skeleton (Phase 3)
│   └── mobile/                       # React Native — مستقبلي (Phase 4)
│
├── packages/
│   ├── design-system/                # Design Tokens فقط
│   ├── ui/                           # مكونات React المشتركة
│   ├── api/                          # طبقة الخدمات/Use-Cases
│   ├── database/                     # طبقة الوصول للبيانات (مفصّلة بالأسفل)
│   ├── auth/                         # المصادقة والصلاحيات (RBAC)
│   ├── validation/                   # Zod schemas
│   ├── lib/                          # خدمات خارجية + Logging/Monitoring
│   ├── utils/                        # دوال مساعدة نقية
│   ├── i18n/                         # ترجمات ar/en
│   ├── types/                        # DTOs عامة
│   ├── constants/                    # ثوابت مشتركة
│   └── config/                       # ESLint, Prettier, TS, Tailwind
│
├── docs/                              # ⭐ جديد — كل وثائق المشروع
│   ├── PRD.md
│   ├── architecture/
│   │   └── project-structure.md
│   ├── database/
│   │   └── schema.md
│   ├── api/
│   │   └── api-documentation.md
│   ├── deployment-guide.md
│   ├── coding-standards.md
│   ├── roadmap.md
│   └── adr/                          # Architecture Decision Records
│       ├── 0001-turborepo.md
│       ├── 0002-supabase.md
│       ├── 0003-nextjs.md
│       ├── 0004-zustand.md
│       └── 0005-tanstack-query.md
│
├── scripts/                           # ⭐ جديد — أتمتة العمليات
│   ├── setup.sh                      # تهيئة البيئة المحلية لأول مرة
│   ├── seed.ts                       # تعبئة بيانات تجريبية
│   ├── backup.sh                     # نسخ احتياطي لقاعدة البيانات
│   └── generate-types.sh             # توليد types من Supabase
│
├── tests/                             # ⭐ جديد — بنية اختبارات جاهزة
│   ├── unit/                          # اختبارات وحدات (Vitest)
│   ├── integration/                  # اختبارات تكامل
│   └── e2e/                           # اختبارات شاملة (Playwright)
│
├── .env.example                       # ⭐ جديد — قالب موثّق لكل المتغيرات
├── .env.local                         # (محلي، غير مرفوع لـ Git)
├── .env.development
├── .env.staging
├── .env.production
├── .github/
│   └── workflows/                    # CI/CD Pipelines
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 3. تفصيل `apps/web` (Phase 1)

```
apps/web/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── (marketing)/          # الرئيسية، من نحن، البرامج، الأكاديمية...
│   │       ├── (auth)/               # تسجيل الدخول/إنشاء حساب
│   │       ├── (client)/             # حساب المتدرب
│   │       └── layout.tsx
│   │
│   ├── features/                     # ⭐ Feature-First Architecture (انظر القسم 4)
│   │   ├── store/
│   │   ├── academy/
│   │   ├── exercise-library/
│   │   ├── programs/
│   │   └── profile/
│   │
│   ├── shared/                       # ⭐ جديد — خاص بـ web فقط، غير مشترك بين التطبيقات
│   │   ├── components/               # مكونات عامة لكن محلية للموقع (Header, Footer)
│   │   ├── hooks/                    # hooks خاصة بسياق الموقع فقط
│   │   └── layouts/
│   │
│   ├── store/                        # Zustand stores (سلة، لغة، ثيم)
│   ├── styles/
│   └── middleware.ts
│
├── public/
├── messages/
├── README.md                         # ⭐ يوضح مسؤولية هذا التطبيق تحديدًا
├── next.config.js
└── package.json
```

**الفرق بين `shared/` (داخل web) و `packages/ui` (على مستوى المشروع):**
| | `packages/ui` | `apps/web/src/shared/` |
|---|---|---|
| من يستخدمه | web + admin + coach + mobile | web فقط |
| مثال | `Button`, `Modal`, `Card` | `SiteHeader`, `SiteFooter` (تصميم خاص بالموقع العام فقط) |

---

## 4. Feature-First Architecture — البنية الموحّدة لكل Feature

كل ميزة وظيفية داخل `features/` تتبع **نفس الهيكل بالضبط** بدون استثناء:

```
features/store/
├── components/       # مكونات خاصة بهذه الميزة فقط
├── hooks/            # useCart, useProductFilter...
├── services/         # يستدعي packages/api
├── types/            # أنواع خاصة بهذا النطاق
├── validation/       # Zod schemas خاصة (مثل checkoutSchema)
├── constants/         # ثوابت خاصة (مثل CATEGORIES)
├── utils/             # دوال مساعدة خاصة بهذه الميزة
└── index.ts          # نقطة تصدير واحدة (Public API للـ Feature)
```

**الفائدة:** أي مطوّر جديد ينضم للفريق يفتح `features/store/` ويجد كل شيء يخص المتجر في مكان واحد، بدل البحث في 5 مجلدات متفرقة. هذا يقلل الاحتكاك المعرفي (Cognitive Load) ويُسهّل حذف/تعديل ميزة كاملة بأمان.

---

## 5. `packages/database` — تفصيل موسّع (نقطة 4 من طلبك)

```
database/
├── client/               # تهيئة عميل Supabase (Server + Client instances)
├── queries/              # استعلامات خام (SELECT محددة، بدون منطق أعمال)
├── repositories/         # طبقة تجريدية فوق queries (Repository Pattern)
│                         # مثال: ProductRepository.findById(), ProductRepository.list()
├── migrations/           # ملفات SQL migrations مرقّمة زمنيًا
├── generated-types/      # types مولّدة تلقائيًا (supabase gen types)
├── seed/                 # بيانات تجريبية لكل بيئة (dev/staging)
└── README.md
```

**الفرق بين `queries/` و`repositories/`:** الأولى تنفّذ SQL/Supabase calls مباشرة، والثانية تغلّفها بواجهة نظيفة تستخدمها `packages/api` — هذا يسمح بتغيير مصدر البيانات مستقبلاً (مثلاً الانتقال الجزئي لخدمة أخرى) دون كسر طبقة الأعمال.

---

## 6. إدارة البيئات (Environment Management)

| الملف | الاستخدام |
|---|---|
| `.env.example` | قالب موثّق يحتوي كل المتغيرات المطلوبة بدون قيم حقيقية — يُرفع على Git |
| `.env.local` | القيم الفعلية لبيئة المطوّر المحلية — **لا يُرفع على Git** |
| `.env.development` | بيئة التطوير المشتركة (Preview deployments) |
| `.env.staging` | بيئة الاختبار قبل الإنتاج |
| `.env.production` | بيئة الإنتاج الفعلية |

كل متغير في `.env.example` يُوثّق بتعليق يشرح الغرض منه، مثال:
```
# رابط مشروع Supabase
NEXT_PUBLIC_SUPABASE_URL=

# مفتاح Supabase العام (Anon Key) — آمن للعرض في المتصفح
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# مفتاح Supabase الخاص (Service Role) — للسيرفر فقط، لا يُكشف أبدًا
SUPABASE_SERVICE_ROLE_KEY=
```
التوثيق الكامل لكل المتغيرات في `docs/deployment/deployment-strategy.md`.

---

## 7. Logging & Monitoring (من البداية، حتى لو غير مفعّل)

داخل `packages/lib/`:
```
lib/
├── supabase-client.ts
├── logger.ts             # Structured Logging (مثل pino) — تنسيق JSON موحّد للسجلات
├── sentry.ts              # تهيئة Sentry (تُفعّل بـ Environment Variable لاحقًا)
└── analytics.ts           # غلاف موحّد لـ Vercel Analytics + GA4 + Clarity
```

**المبدأ:** الكود الخاص بالتكامل مكتوب وجاهز من اليوم الأول، لكن التفعيل الفعلي (مفاتيح API) يتم عبر متغيرات البيئة عند الحاجة — بدون أي تعديل على الكود لاحقًا.

---

## 8. توثيق المشروع (Documentation Standard)

- كل `package` و`app` يحتوي `README.md` مختصر (3-5 فقرات): الغرض، كيفية الاستخدام، التبعيات الرئيسية.
- كل ملف معقّد يبدأ بتعليق JSDoc يوضح الغرض والمدخلات/المخرجات.
- كل قرار معماري مهم يُوثّق كـ ADR في `docs/adr/` (انظر الوثيقة المرفقة).

---

## ✅ يرجى المراجعة والموافقة على:
- [ ] إضافة `docs/`, `scripts/`, `tests/` على مستوى الجذر
- [ ] التفصيل الموسّع لـ `packages/database`
- [ ] استراتيجية إدارة البيئات (.env.*)
- [ ] تجهيز Logging/Monitoring من البداية
- [ ] `shared/` داخل `apps/web`
- [ ] Feature-First Architecture الموحّد لكل Feature
- [ ] معيار التوثيق (README + JSDoc + ADRs)

بعد الموافقة، ننتقل مباشرة إلى **المرحلة 2: Database Schema**.
