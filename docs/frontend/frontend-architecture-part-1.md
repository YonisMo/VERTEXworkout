# Frontend Architecture & Design System Implementation — VERTEXworkout
**المرحلة 8 من 18 — المرجع الرسمي لفريق Frontend**
**الإصدار:** 1.0 — الجزء 1 من عدة أجزاء

---

## 1. Folder Structure النهائي (Root Level)

**Purpose:** توفير بنية جذر موحّدة يفهمها أي مطوّر جديد خلال دقائق.
**Why:** الفوضى في بنية الجذر أول سبب لتباطؤ Onboarding المطورين الجدد في أي مشروع Enterprise.
**Best Practices:** فصل `apps/` عن `packages/` بصرامة؛ كل ما هو "تطبيق قابل للنشر" في `apps/`، وكل ما هو "قابل لإعادة الاستخدام" في `packages/`.
**Folder Location:** جذر المستودع (`/`).
**Example Structure:**
```
vertexworkout/
├── apps/{web,admin,coach,mobile}
├── packages/{design-system,ui,api,database,auth,validation,lib,utils,i18n,types,constants,config}
├── docs/
├── scripts/
├── tests/
├── .env.example
├── .github/workflows/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```
**Dependencies:** pnpm ≥ 9، Node.js ≥ 20 LTS، Turborepo ≥ 2.
**Notes:** هذا الهيكل مُعتمد ومجمّد من Phase 1 — لا تعديل عليه هنا، فقط تفصيل تنفيذي إضافي.
**Common Mistakes:** وضع كود تطبيق داخل `packages/` (يجب أن تبقى الحزم بدون منطق صفحات)؛ استيراد مباشر بين تطبيقين في `apps/` (يجب أن يمر أي تشارك عبر `packages/`).

---

## 2. تنظيم Monorepo باستخدام Turborepo

**Purpose:** بناء واختبار ذكي يعتمد فقط على الحزم المتأثرة بالتغيير.
**Why:** بدون Turborepo، أي تعديل بسيط في `packages/utils` يجبر إعادة بناء كل التطبيقات بالكامل — إهدار وقت CI/CD كبير مع نمو المشروع.
**Best Practices:** تعريف `pipeline` واضح في `turbo.json` لكل مهمة (`build`, `dev`, `lint`, `test`) مع تحديد `dependsOn` الصحيح؛ تفعيل **Remote Caching** عبر Vercel لمشاركة الـ Cache بين أعضاء الفريق و CI.
**Folder Location:** `turbo.json` في الجذر.
**Example Structure:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^lint"] },
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] },
    "type-check": { "dependsOn": ["^build"] }
  }
}
```
**Dependencies:** `turbo` (devDependency في الجذر فقط، ليس داخل كل حزمة).
**Notes:** `^build` يعني "ابنِ تبعيات هذه الحزمة أولاً" — أساس عمل Turborepo بالكامل.
**Common Mistakes:** نسيان تحديد `outputs` (يمنع الـ Caching من العمل بكفاءة)؛ تشغيل `dev` بـ Cache مفعّل (يجب أن يكون `cache: false` دائمًا للتطوير الحي).

---

## 3. بنية Next.js App Router

**Purpose:** الاستفادة الكاملة من React Server Components وSSR/SSG لكل صفحة حسب طبيعتها.
**Why:** App Router (بعكس Pages Router القديم) يسمح بمزج Server وClient Components بحرية، مع Streaming وSuspense مدمجين.
**Best Practices:** كل `page.tsx` يبقى Server Component بشكل افتراضي؛ التفاعلية (`onClick`, `useState`) تُعزل داخل مكونات فرعية بـ `"use client"` فقط عند الحاجة الفعلية — وليس على مستوى الصفحة كاملة.
**Folder Location:** `apps/web/src/app/`.
**Example Structure:**
```
app/
├── [locale]/
│   ├── layout.tsx          # Root layout للغة
│   ├── page.tsx             # الرئيسية (Server Component)
│   ├── loading.tsx
│   ├── error.tsx
│   └── (marketing)/...
├── api/                      # Route Handlers (Webhooks، إلخ)
├── globals.css
└── favicon.ico
```
**Dependencies:** `next@14+`.
**Notes:** أي `page.tsx` يحتاج تفاعلية كاملة (نموذج معقد) يُقسَّم: القشرة الخارجية Server Component (تجلب البيانات)، والجزء التفاعلي Client Component منفصل يُستدعى بداخلها.
**Common Mistakes:** وضع `"use client"` أعلى `page.tsx` بالكامل "لتجنب التفكير في الفصل" — يُفقد كل ميزة SSR وSEO للصفحة.

---

## 4. تنظيم Route Groups

**Purpose:** تطبيق Layouts مختلفة (Header/Sidebar مختلف) لمجموعات صفحات دون التأثير على الرابط النهائي.
**Why:** موضّح في Sitemap (المرحلة 4) — نحتاج `(marketing)`, `(auth)`, `(client)`, `(checkout)` بحاويات منفصلة.
**Best Practices:** لا يتجاوز أي Route Group مستوى تداخل واحد إضافي؛ تسمية المجموعة تعكس **الغرض** لا **نوع المستخدم** حرفيًا (لتفادي الالتباس مع RBAC الفعلي الذي يُطبَّق عبر Middleware لا عبر بنية المجلدات).
**Folder Location:** `apps/web/src/app/[locale]/(group-name)/`.
**Example Structure:** (مطابق تمامًا لِما ورد في وثيقة Sitemap، القسم 9).
**Dependencies:** لا شيء إضافي — ميزة أصيلة في Next.js App Router.
**Notes:** الأقواس `()` لا تظهر في الرابط النهائي إطلاقًا.
**Common Mistakes:** الاعتماد على Route Groups وحدها للحماية (RBAC) — هي تنظيم بصري فقط، الحماية الفعلية تكون عبر `middleware.ts`.

---

## 5. Layouts

**Purpose:** تعريف الهيكل المشترك (Header/Footer/Sidebar) الذي لا يُعاد تحميله بين تنقلات الصفحات داخل نفس المجموعة.
**Why:** `layout.tsx` في Next.js لا يُعاد رسمه (Re-render) عند تغيّر الصفحة الفرعية — تحسين أداء حقيقي (مثال: Header لا يُحمَّل من جديد عند الانتقال بين صفحات المتجر).
**Best Practices:** Layout متداخل بمستويات: `RootLayout` (اللغة + الخط + Providers) → `MarketingLayout` (Header/Footer عام) → لا حاجة لـ Layout إضافي داخل كل صفحة فرعية إلا عند الضرورة (لوحة التحكم فقط).
**Folder Location:** `layout.tsx` في كل مستوى مجلد يحتاج هيكلًا مشتركًا.
**Example Structure:**
```
app/[locale]/
├── layout.tsx              # Root: <html>, Fonts, Providers, Theme
├── (marketing)/layout.tsx  # Header + Footer العام
└── (client)/dashboard/layout.tsx  # Sidebar + Header لوحة التحكم
```
**Dependencies:** لا شيء إضافي.
**Notes:** `RootLayout` هو المكان الوحيد المسموح فيه بوضع `<html lang={locale} dir={dir}>` — التحكم بالاتجاه (RTL/LTR) يبدأ من هنا حصريًا.
**Common Mistakes:** تكرار استيراد الخطوط أو Providers في أكثر من Layout (يجب أن تكون في `RootLayout` فقط).

---

## 6. Providers

**Purpose:** توفير السياقات العامة (Theme, Query Client, Auth Session, Toast) لكل شجرة المكونات.
**Why:** تجميع كل الـ Providers في مكوّن واحد (`AppProviders`) يبقي `layout.tsx` نظيفًا ويسهّل الاختبار.
**Best Practices:** ترتيب الـ Providers مهم — الأعمّ (Theme) في الخارج، الأكثر تخصصًا (Toast) في الداخل؛ كل Provider يحتاج تفاعلية هو حتمًا `"use client"`.
**Folder Location:** `apps/web/src/app/[locale]/providers.tsx`.
**Example Structure:**
```tsx
// providers.tsx ("use client")
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProviderWrapper>
        <AuthSessionProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AuthSessionProvider>
      </QueryClientProviderWrapper>
    </ThemeProvider>
  );
}
```
**Dependencies:** `next-themes`, `@tanstack/react-query`, Supabase Auth Helpers.
**Notes:** `QueryClient` يُنشأ داخل `useState(() => new QueryClient())` لضمان عدم مشاركته بين طلبات مستخدمين مختلفين على السيرفر (خطأ أمني شائع).
**Common Mistakes:** إنشاء `QueryClient` كمتغيّر عام خارج المكوّن — يسبب تسرّب بيانات بين المستخدمين في SSR.

---

## 7. Theme System

**Purpose:** التبديل السلس بين Light/Dark Mode مع الحفاظ على تفضيل المستخدم.
**Why:** موضّح في Design System (القسم 12) — التوكنز جاهزة، هنا التنفيذ الفعلي.
**Best Practices:** استخدام `next-themes` مع `attribute="class"`؛ منع "Flash of Wrong Theme" عبر Script مضمّن يُنفَّذ قبل الرسم الأول.
**Folder Location:** `packages/lib/theme.ts` + `apps/web/src/app/[locale]/providers.tsx`.
**Dependencies:** `next-themes`.
**Notes:** الفئة `dark` تُضاف على `<html>` — كل متغيرات CSS المعرّفة في Design System تتفعّل تلقائيًا.
**Common Mistakes:** حفظ تفضيل الثيم في State عادي بدل `localStorage` عبر `next-themes` — يُفقد التفضيل بين الجلسات.

---

## 8. الخطوط (Fonts)

**Purpose:** تحميل Cairo وInter بأداء أمثل بدون Layout Shift.
**Why:** موضّح في Design System (القسم 3).
**Best Practices:** استخدام `next/font/google` حصريًا (Self-hosted تلقائيًا، بدون طلب شبكي خارجي وقت التشغيل).
**Folder Location:** `apps/web/src/app/[locale]/fonts.ts`.
**Example Structure:**
```ts
import { Cairo, Inter } from 'next/font/google';
export const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' });
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
```
**Dependencies:** `next/font` (مدمج في Next.js).
**Notes:** `display: 'swap'` يمنع النص الشفاف أثناء تحميل الخط (FOIT).
**Common Mistakes:** استيراد الخط عبر وسم `<link>` تقليدي في `<head>` — يفقد كل مزايا التحسين التلقائي لـ Next.js.

---

## 9. Global Styles

**Purpose:** نقطة واحدة لتعريف متغيرات CSS الأساسية وإعادة تعيين الأنماط الافتراضية للمتصفح.
**Why:** يجب أن يبقى ملف واحد فقط — أي تكرار لتعريفات عامة في ملفات أخرى يسبب تعارضات يصعب تتبعها.
**Best Practices:** استيراد `tailwindcss` الأساسي فقط، مع تعريف كل متغيرات `--background`, `--primary`... هنا حصريًا (مطابقة لجدول Dark Mode في Design System).
**Folder Location:** `apps/web/src/app/globals.css`.
**Dependencies:** `tailwindcss`.
**Notes:** لا تُكتب أي قاعدة CSS مخصصة لمكوّن واحد هنا — فقط متغيرات ووراثة عامة (Base Layer).
**Common Mistakes:** كتابة أنماط خاصة بصفحة معينة داخل `globals.css` بدل Tailwind Utility Classes مباشرة في المكوّن.

---

## 10. Tailwind Configuration

**Purpose:** ربط كل Design Tokens المعتمدة (المرحلة 6) بنظام Tailwind فعليًا.
**Why:** بدون هذا الربط، الـ Design System يبقى وثيقة نظرية بلا تطبيق.
**Best Practices:** التوسّع (`extend`) وليس الاستبدال الكامل لثيم Tailwind الافتراضي (نحافظ على القيم المفيدة مثل `screens`)؛ `content` يغطي `apps/web` و`packages/ui` معًا.
**Folder Location:** `packages/config/tailwind/index.ts` (يُستهلك عبر `apps/web/tailwind.config.ts`).
**Example Structure:**
```ts
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { primary: {...}, accent: {...}, neutral: {...} },
      fontFamily: { cairo: ['var(--font-cairo)'], inter: ['var(--font-inter)'] },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px' },
      boxShadow: { 1: '...', 2: '...', 3: '...', 4: '...', 5: '...' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```
**Dependencies:** `tailwindcss`, `tailwindcss-animate`.
**Notes:** ملف Tailwind Config مشترك في `packages/config` يضمن اتساق الألوان بين `apps/web` و`apps/admin` و`apps/coach` مستقبلًا.
**Common Mistakes:** تكرار تعريف الألوان يدويًا في كل تطبيق بدل استيراد `packages/config/tailwind` مركزيًا.

---

## 11. CSS Variables

**Purpose:** الجسر بين Design Tokens وTailwind وshadcn/ui، مع دعم تبديل الثيم لحظيًا.
**Why:** shadcn/ui يعتمد بالكامل على متغيرات CSS دلالية (`--primary`, `--background`...) بدل قيم Hex مباشرة.
**Folder Location:** `apps/web/src/app/globals.css` (داخل `@layer base`).
**Example Structure:**
```css
@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 222 47% 6%;
    --primary: 209 96% 18%;
    --accent: 60 78% 73%;
    --radius: 0.75rem;
  }
  .dark {
    --background: 209 60% 12%;
    --foreground: 0 0% 98%;
    --primary: 209 60% 45%;
  }
}
```
**Dependencies:** لا شيء — CSS Native Custom Properties.
**Notes:** القيم بصيغة `H S% L%` (بدون `hsl()`) — هذا متطلب shadcn/ui لدمجها داخل `hsl(var(--primary))` في Tailwind.
**Common Mistakes:** كتابة القيم كـ Hex مباشرة في المتغيرات — يكسر تكامل shadcn/ui بالكامل.

---

## 12. shadcn/ui Integration

**Purpose:** الحصول على مكونات UI عالية الجودة، متاحة للتعديل الكامل (الكود يُنسخ داخل المشروع، وليس Dependency خارجية مغلقة).
**Why:** بعكس مكتبات UI التقليدية، shadcn/ui لا يُثبَّت كـ `npm package` — بل يُنسخ الكود مباشرة داخل `packages/ui`، مما يمنح تحكمًا كاملاً 100% في كل تفاصيل المكوّن.
**Best Practices:** كل مكوّن يُضاف عبر `npx shadcn add [component]` مباشرة داخل `packages/ui/src/components`، ثم يُخصَّص فورًا بألوان VERTEX.
**Folder Location:** `packages/ui/src/components/ui/` (المكونات الخام)، `packages/ui/src/components/` (مكونات VERTEX المركّبة فوقها).
**Dependencies:** `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` (حسب كل مكوّن).
**Notes:** `components.json` (ملف تهيئة shadcn) يُضبط ليشير لمسار `packages/ui` بدل المسار الافتراضي.
**Common Mistakes:** تعديل مكونات shadcn الخام مباشرة بدل تركيب طبقة VERTEX فوقها — يصعّب تحديث المكوّن لاحقًا من المصدر الرسمي.

---

## 13. Component Architecture

**Purpose:** تصنيف كل مكوّن في المشروع ضمن مستوى واضح من المسؤولية.
**Why:** بدون تصنيف واضح، كل المكونات تتكدّس في مجلد واحد ضخم يصعب التنقل فيه بعد أشهر قليلة.
**Best Practices:** 3 مستويات: **Primitives** (من shadcn، عامة تمامًا) → **Composite** (تجميع Primitives لحالة استخدام VERTEX، مثل `ProductCard`) → **Feature Components** (خاصة بميزة واحدة فقط، داخل `features/`).
**Folder Location:** `packages/ui/src/components/` (Primitives + Composite)، `apps/web/src/features/*/components/` (Feature Components).
**Dependencies:** لا شيء إضافي — تنظيم منطقي فقط.
**Notes:** أي مكوّن يُستخدم في أكثر من Feature واحدة يُرفَّع فورًا إلى `packages/ui` — قاعدة "Rule of Three" (لو استُخدم 3 مرات، يصبح مشتركًا).
**Common Mistakes:** وضع مكوّن خاص بميزة واحدة في `packages/ui` "احتياطًا للمستقبل" — يزيد التعقيد بلا داعٍ (YAGNI).

---

## 14. Atomic Design Strategy

**Purpose:** منهجية تسمية وتنظيم داخلية إضافية فوق الثلاث مستويات أعلاه.
**Why:** يساعد فريق كبير على التحدث بلغة موحدة عند مناقشة حجم/مسؤولية أي مكوّن.
**Best Practices:** تطبيق مبسّط (وليس Atomic Design الكلاسيكي الصارم بـ5 مستويات — أثقل من اللازم لمشروع بهذا الحجم):
| المستوى | يقابل | مثال |
|---|---|---|
| Atoms | Primitives (shadcn) | `Button`, `Input`, `Badge` |
| Molecules | Composite بسيطة | `SearchBar` (Input + Button + Icon) |
| Organisms | Composite معقّدة/Feature | `ProductCard`, `ExerciseFilterPanel` |
| Templates | Layouts | `DashboardLayout`, `MarketingLayout` |
| Pages | `page.tsx` | تجميع كل ما سبق + جلب البيانات |
**Folder Location:** لا مجلدات فعلية بأسماء Atoms/Molecules — هذا تصنيف مفاهيمي فقط يوجّه القرار "أين أضع هذا المكوّن".
**Dependencies:** لا شيء.
**Notes:** لا نُنشئ مجلدات حرفية `atoms/molecules/organisms` — الخبرة العملية أثبتت أنها تُنتج بنية مصطنعة أثقل من فائدتها الفعلية.
**Common Mistakes:** الجدل الطويل حول "هل هذا Atom أم Molecule؟" — القرار العملي (Rule of Three + مكان الاستخدام) أهم من التصنيف النظري الدقيق.

---

## 15. Shared Components (`packages/ui`)

**Purpose:** مكتبة مكونات موحّدة تستهلكها كل التطبيقات (web, admin, coach, مستقبلاً mobile).
**Best Practices:** كل مكوّن يُصدَّر عبر `index.ts` مركزي (Barrel Export)؛ كل مكوّن مستقل تمامًا (لا يستورد من `apps/`).
**Folder Location:** `packages/ui/src/`.
**Example Structure:**
```
packages/ui/src/
├── components/
│   ├── ui/              # shadcn primitives (button.tsx, input.tsx...)
│   ├── product-card.tsx
│   ├── exercise-card.tsx
│   ├── rating-stars.tsx
│   ├── empty-state.tsx
│   ├── skeleton-grid.tsx
│   └── index.ts
├── hooks/               # hooks مشتركة على مستوى UI فقط (useMediaQuery...)
└── index.ts
```
**Dependencies:** React, Tailwind (عبر peerDependency)، lucide-react.
**Notes:** `EmptyState` مكوّن واحد قابل لإعادة الاستخدام بـ Props (`icon`, `title`, `description`, `action`) يغطي كل حالات Empty States الموثّقة في Wireframes.
**Common Mistakes:** استيراد بيانات (Supabase calls) داخل `packages/ui` — يجب أن تبقى الحزمة "غبية" بصريًا فقط (Props in, JSX out).

---

## 16. Feature-based Structure (`apps/web/src/features`)

**Purpose:** التنظيم الداخلي لكل ميزة كما اعتُمد في Wireframes/Project Structure.
**Best Practices:** كل Feature تُصدِّر Public API واحد فقط عبر `index.ts` — لا استيراد مباشر من ملف داخلي لميزة أخرى (`features/store/components/X` من خارج `features/store` ممنوع).
**Folder Location:** `apps/web/src/features/{store,academy,exercise-library,programs,profile}/`.
**Example Structure:** (مطابق لِما اعتُمد في Project Structure، القسم 4).
**Dependencies:** يستهلك `packages/ui`, `packages/api`, `packages/validation`.
**Notes:** فرض هذه القاعدة (Public API فقط) يتم عبر ESLint Rule مخصصة (`import/no-internal-modules` أو `eslint-plugin-boundaries`) — تفصيل في قسم Linting لاحقًا.
**Common Mistakes:** استيراد Hook داخلي من `features/store/hooks/useCart` مباشرة من `features/checkout` بدل المرور عبر `features/store/index.ts`.

---

## 17. Custom Hooks

**Purpose:** استخلاص منطق قابل لإعادة الاستخدام من المكونات.
**Best Practices:** كل Hook يبدأ بـ `use`، ملف واحد لكل Hook، اختبار منفصل لكل Hook منطقي معقّد.
**Folder Location:** `apps/web/src/features/*/hooks/` (خاصة بميزة) أو `packages/ui/src/hooks/` (عامة، مثل `useMediaQuery`, `useDebounce`).
**Example Structure:**
```
features/store/hooks/
├── useCart.ts
├── useProductFilters.ts
└── useWishlist.ts
```
**Dependencies:** React، وربما `packages/api` لو الـ Hook يجلب بيانات.
**Notes:** Hooks المتعلقة بجلب بيانات تُبنى فوق TanStack Query (لا `useEffect` + `fetch` يدوي).
**Common Mistakes:** Hook واحد يقوم بأكثر من مسؤولية (جلب بيانات + منطق فورم + Side effects) — يجب تقسيمه.

---

## 18. Context Providers (محلية للميزة)

**Purpose:** مشاركة حالة محلية بين مكونات ميزة واحدة بدون Prop Drilling، دون اللجوء لـ Zustand العام لكل شيء.
**Best Practices:** يُستخدم **فقط** عند حالة محدودة النطاق داخل شجرة مكونات صغيرة (مثال: `CheckoutStepsContext` داخل ميزة Checkout فقط)؛ أي حالة تحتاج مشاركة عبر التطبيق بالكامل → Zustand.
**Folder Location:** `apps/web/src/features/checkout/context/`.
**Dependencies:** React (`createContext`, `useContext`).
**Notes:** القاعدة الفاصلة: **Context = حالة UI محلية النطاق. Zustand = حالة عامة على مستوى التطبيق.**
**Common Mistakes:** استخدام Context لحالة تتغير بشكل متكرر (مثل قيمة Input أثناء الكتابة) — يسبب Re-render لكل الشجرة؛ الحل: State محلي بسيط بدل Context في هذه الحالة.

---

## 19. Zustand Stores

**Purpose:** إدارة حالة الواجهة العامة (سلة التسوق، اللغة، إعدادات الثيم، حالة القائمة الجانبية).
**Best Practices:** Store واحد لكل نطاق منطقي (وليس Store عملاق واحد للتطبيق بالكامل)؛ استخدام `persist` middleware فقط للحالة التي يجب أن تبقى بين الجلسات (السلة)، وليس لكل شيء.
**Folder Location:** `apps/web/src/store/`.
**Example Structure:**
```
store/
├── cart-store.ts        # persist: نعم (localStorage)
├── ui-store.ts          # حالة القائمة الجانبية، المودالات المفتوحة — persist: لا
└── locale-store.ts      # persist: نعم
```
**Dependencies:** `zustand`, `zustand/middleware` (لـ `persist`).
**Notes:** كل Store يُصدَّر مع Selector Hooks جاهزة (`useCartItems()`, `useCartTotal()`) لتفادي إعادة الرسم غير الضرورية عند تغيّر جزء واحد فقط من الـ Store.
**Common Mistakes:** استدعاء `useCartStore()` كاملاً داخل مكوّن يحتاج فقط `total` — يعيد رسم المكوّن عند أي تغيير في أي حقل بالـ Store، حتى غير المستخدَم.

---

## 20. TanStack Query Architecture

**Purpose:** إدارة كل حالة قادمة من السيرفر (منتجات، برامج، طلبات...) بـ Caching وInvalidation ذكي.
**Best Practices:** `queryKey` منظّم هرميًا (`['products', 'list', filters]`, `['products', 'detail', id]`) لتسهيل الإبطال الجزئي (Invalidation) الدقيق؛ كل Feature تملك ملف `queries.ts` و`mutations.ts` منفصلين.
**Folder Location:** `apps/web/src/features/*/services/`.
**Example Structure:**
```
features/store/services/
├── queries.ts    # useProductsQuery, useProductDetailQuery
├── mutations.ts  # useAddToCartMutation, useCreateReviewMutation
└── query-keys.ts # مصدر واحد لكل queryKey (تفادي التكرار/الأخطاء الإملائية)
```
**Dependencies:** `@tanstack/react-query`.
**Notes:** كل Mutation ناجحة تستدعي `queryClient.invalidateQueries` بمفتاح دقيق (وليس إبطال كل الـ Cache بالكامل).
**Common Mistakes:** استدعاء API مباشرة داخل مكوّن بـ `useEffect` بدل TanStack Query — يفقد كل مزايا الـ Caching والـ Retry التلقائي وحالات Loading/Error الموحّدة.

---

## 21. طبقة الـ API (`packages/api`)

**Purpose:** طبقة Use-Cases الوسيطة بين الواجهة و`packages/database` (موضّحة معماريًا في Project Structure، القسم 5).
**Best Practices:** كل دالة هنا **نقية بالمدخلات/المخرجات** (Typed Input → Typed Output)، لا تحتوي JSX ولا React Hooks إطلاقًا — تُستهلك من `services/queries.ts` عبر TanStack Query.
**Folder Location:** `packages/api/src/{store,programs,academy,client}/`.
**Example Structure:**
```ts
// packages/api/src/store/getProducts.ts
export async function getProducts(filters: ProductFilters): Promise<Product[]> {
  return productRepository.list(filters); // من packages/database
}
```
**Dependencies:** `packages/database`, `packages/validation` (للتحقق من المدخلات قبل التنفيذ).
**Notes:** هذه الطبقة قابلة للاستدعاء من `apps/web` (عبر TanStack Query) **و**من `apps/admin`/`apps/coach` **و**من Server Actions مباشرة — نفس المنطق، استهلاك مختلف.
**Common Mistakes:** استدعاء Supabase مباشرة من مكوّن في `apps/web` بدل المرور عبر `packages/api` — يكسر مبدأ Clean Architecture ويصعّب تتبع منطق الأعمال لاحقًا.

---

*(تكملة الوثيقة في الجزء التالي مباشرة: Server/Client Components، Server Actions، Forms، Auth/RBAC، Middleware، Performance، SEO، i18n، Tooling، Testing، CI/CD، Standards، وشجرة المشروع الكاملة.)*
