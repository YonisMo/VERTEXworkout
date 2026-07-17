# Frontend Architecture & Design System Implementation — VERTEXworkout
**الجزء 3 — Accessibility, i18n, Tooling, Testing, CI/CD, Standards**

---

## 47. Accessibility Architecture

**Purpose:** تطبيق فعلي لمتطلبات WCAG 2.2 AA الموثّقة في Design System.
**Best Practices:** فحص تلقائي عبر `eslint-plugin-jsx-a11y` في كل Commit؛ اختبار يدوي بلوحة المفاتيح فقط (بدون فأرة) لكل صفحة قبل اعتمادها؛ استخدام `@radix-ui` (أساس shadcn/ui) الذي يوفر Focus Trap وARIA Attributes جاهزة تلقائيًا لكل Modal/Dropdown.
**Folder Location:** يُطبَّق عبر كل المكونات في `packages/ui`، ويُفرض عبر `.eslintrc` في `packages/config/eslint`.
**Dependencies:** `eslint-plugin-jsx-a11y`, `@radix-ui/*`.
**Notes:** رابط "تخطي إلى المحتوى" (`Skip to content`) يُضاف في `RootLayout` مرة واحدة يظهر فقط عند التركيز عليه بلوحة المفاتيح (`sr-only focus:not-sr-only`).
**Common Mistakes:** الاعتماد على الفحص الآلي فقط دون اختبار يدوي فعلي بلوحة المفاتيح وقارئ شاشة — الأدوات الآلية تكتشف ~30-40% فقط من مشاكل إمكانية الوصول الحقيقية.

---

## 48. Internationalization (next-intl)

**Purpose:** التنفيذ الفعلي لاستراتيجية اللغتين المعتمدة منذ الـ PRD.
**Best Practices:** فصل ملفات الترجمة حسب النطاق (وليس ملف واحد ضخم) لسهولة الصيانة؛ استخدام `useTranslations('namespace')` بدل مفاتيح مسطّحة عامة.
**Folder Location:** `apps/web/messages/{ar,en}/{common,store,academy,auth,dashboard}.json`.
**Example Structure:**
```json
// messages/ar/store.json
{ "addToCart": "أضف للسلة", "outOfStock": "غير متوفر حاليًا", "filters": { "title": "الفلاتر", "category": "التصنيف" } }
```
**Dependencies:** `next-intl`.
**Notes:** المحتوى الديناميكي (اسم منتج، وصف مقال) يأتي من جداول `_translations` في قاعدة البيانات (Database Schema)، **وليس** من ملفات `next-intl` — next-intl يُستخدم فقط لنصوص الواجهة الثابتة (أزرار، تسميات، رسائل).
**Common Mistakes:** الخلط بين نوعي الترجمة (محتوى ديناميكي من DB مقابل نصوص واجهة ثابتة من next-intl) — كل نوع له مصدره الصحيح ولا يجب مزجهما.

---

## 49. RTL Support

**Purpose:** انعكاس كامل وسليم للاتجاه دون كسر أي مكوّن.
**Best Practices:** استخدام خصائص Tailwind المنطقية (`ps-4` بدل `pl-4`, `ms-2` بدل `ml-2`, `text-start` بدل `text-left`) في كل مكان — تنعكس تلقائيًا حسب `dir` بدون أي كود شرطي إضافي.
**Folder Location:** يُطبَّق عبر كل ملفات المكونات؛ `dir={locale === 'ar' ? 'rtl' : 'ltr'}` يُحدَّد مرة واحدة في `RootLayout` على وسم `<html>`.
**Dependencies:** لا شيء إضافي — ميزة أصيلة في Tailwind CSS v3.3+ (Logical Properties).
**Notes:** الأيقونات الاتجاهية فقط (أسهم، Chevrons) تحتاج انعكاسًا يدويًا صريحًا (`rtl:scale-x-[-1]`) — الأيقونات غير الاتجاهية (بحث، سلة، قلب) **لا** تُعكس.
**Common Mistakes:** استخدام `pl-4`/`mr-2` (خصائص فيزيائية) بدل المنطقية — يبدو التصميم مقلوبًا وغير متناسق فور التبديل للعربية.

---

## 50. Dark Mode Architecture (تنفيذي)

تفصيل تنفيذي كامل موثّق مسبقًا في القسم 7 (Theme System) والقسم 11 (CSS Variables) والقسم 12 من وثيقة Design System — لا تكرار هنا، فقط إشارة مرجعية للتكامل.

---

## 51. Environment Variables

**Purpose:** إدارة آمنة ومنظمة لكل مفاتيح API وإعدادات البيئة.
**Folder Location:** `.env.example` في الجذر (مُوثَّق بالكامل، بدون قيم حقيقية).
**Example Structure:**
```bash
# --- Supabase ---
NEXT_PUBLIC_SUPABASE_URL=              # رابط المشروع، آمن للعرض العام
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # مفتاح عام، آمن للمتصفح
SUPABASE_SERVICE_ROLE_KEY=             # خاص بالسيرفر فقط — لا يُكشف أبدًا

# --- i18n ---
NEXT_PUBLIC_DEFAULT_LOCALE=ar

# --- Analytics & Monitoring ---
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_CLARITY_ID=
SENTRY_DSN=

# --- Payments (Phase 2) ---
PAYMOB_API_KEY=
STRIPE_SECRET_KEY=

# --- Feature Flags ---
MAINTENANCE_MODE=false
```
**Dependencies:** `zod` (للتحقق من وجود كل المتغيرات المطلوبة عند بدء التشغيل عبر `env.ts`).
**Notes:** أي متغيّر بدون بادئة `NEXT_PUBLIC_` يبقى محصورًا في السيرفر فقط تلقائيًا — قاعدة Next.js أساسية للأمان.
**Common Mistakes:** إضافة `NEXT_PUBLIC_` لمفتاح حساس (مثل `SERVICE_ROLE_KEY`) عن طريق الخطأ — يُصدَّر المفتاح كاملاً داخل حزمة JavaScript العامة المرسلة للمتصفح.

---

## 52. Configuration Files (ملخص شامل)

| الملف | الموقع | الغرض |
|---|---|---|
| `next.config.js` | `apps/web/` | إعدادات الصور، i18n، Headers الأمنية |
| `tailwind.config.ts` | `apps/web/` (يمتد من `packages/config`) | التوكنز البصرية |
| `tsconfig.json` | كل حزمة/تطبيق (يمتد من `packages/config/typescript`) | إعدادات TypeScript الصارمة |
| `components.json` | `packages/ui/` | تهيئة shadcn/ui |
| `.eslintrc.js` | كل حزمة (يمتد من `packages/config/eslint`) | قواعد جودة الكود |
| `.prettierrc` | الجذر (مشترك للكل) | تنسيق الكود |

---

## 53. Linting (ESLint)

**Best Practices:** إعداد مركزي في `packages/config/eslint/` بامتدادين: `base.js` (لكل حزمة عامة) و`next.js` (لتطبيقات Next.js تحديدًا)؛ تفعيل `eslint-plugin-boundaries` لفرض قاعدة "Public API فقط" بين الـ Features (المذكورة في القسم 16).
**Dependencies:** `eslint`, `eslint-config-next`, `eslint-plugin-jsx-a11y`, `eslint-plugin-boundaries`, `@typescript-eslint/*`.
**Common Mistakes:** تعطيل قواعد مزعجة بـ `// eslint-disable` بدل حل المشكلة الجذرية — يتراكم "دين تقني" صامت.

---

## 54. Formatting (Prettier)

**Best Practices:** `.prettierrc` واحد في الجذر يُطبَّق على كل المستودع؛ `prettier-plugin-tailwindcss` لترتيب كلاسات Tailwind تلقائيًا بترتيب منطقي موحّد (Layout → Spacing → Typography → Color).
**Example Structure:**
```json
{ "semi": true, "singleQuote": true, "trailingComma": "all", "printWidth": 100, "plugins": ["prettier-plugin-tailwindcss"] }
```

---

## 55. Husky

**Purpose:** فرض جودة الكود **قبل** الوصول لمستودع Git، لا بعده.
**Folder Location:** `.husky/pre-commit`, `.husky/commit-msg`.
**Example Structure:**
```bash
# .husky/pre-commit
pnpm lint-staged
```
**Dependencies:** `husky`, `lint-staged`.
**Notes:** `lint-staged` يُشغِّل ESLint وPrettier فقط على الملفات المُعدَّلة (Staged) — سريع، لا يفحص المشروع بالكامل في كل Commit.

---

## 56. Commitlint

**Purpose:** فرض تنسيق موحّد لرسائل الـ Commits (Conventional Commits) — يُسهِّل توليد Changelog تلقائيًا لاحقًا.
**Folder Location:** `commitlint.config.js` في الجذر، مُفعَّل عبر `.husky/commit-msg`.
**Example Structure:**
```js
module.exports = { extends: ['@commitlint/config-conventional'] };
// أمثلة صحيحة: "feat(store): add wishlist button" | "fix(auth): resolve token refresh bug"
```
**Common Mistakes:** رسائل Commit غامضة مثل `"fix"` أو `"تحديثات"` بدون نطاق (Scope) أو وصف واضح — يصعّب تتبع تاريخ المشروع لاحقًا.

---

## 57. Testing Structure

**Purpose:** هرم اختبارات متوازن: Unit (كثيرة وسريعة) → Integration (متوسطة) → E2E (قليلة، تغطي المسارات الحرجة فقط).
**Folder Location:** `tests/unit/`, `tests/integration/`, `tests/e2e/` على مستوى الجذر + اختبارات محلية بجانب كل حزمة (`packages/*/src/**/*.test.ts`).
**Notes:** اختبارات Unit للـ Hooks ومنطق `packages/api`/`packages/validation` تعيش بجانب الكود مباشرة (Co-located)؛ اختبارات E2E الشاملة (رحلة كاملة: تصفح → شراء → دفع) تعيش في `tests/e2e/` المركزي.

---

## 58. Playwright (E2E)

**Best Practices:** تغطية المسارات الحرجة فقط (Critical Paths): تسجيل/دخول، شراء كامل، اشتراك ببرنامج، تبديل اللغة والتحقق من RTL. تشغيل على 3 متصفحات (Chromium, Firefox, WebKit) وعرضين (Desktop, Mobile Viewport).
**Folder Location:** `tests/e2e/{auth,checkout,program-enrollment}.spec.ts`.
**Example Structure:**
```ts
test('يكمل المستخدم عملية شراء كاملة', async ({ page }) => {
  await page.goto('/ar/store');
  await page.click('[data-testid="product-card"]:first-child');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout-button"]');
  await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
});
```
**Dependencies:** `@playwright/test`.
**Notes:** استخدام `data-testid` مخصصة (وليس Selectors هشة معتمدة على النص أو الـ CSS classes) — تبقى الاختبارات ثابتة حتى لو تغيّر التصميم أو النص.

---

## 59. Vitest (Unit & Integration)

**Best Practices:** اختبار كل Hook منطقي معقّد، كل دالة في `packages/api`، وكل مخطط Zod (حالات صحيحة وخاطئة). React Testing Library للمكونات (اختبار السلوك من منظور المستخدم، لا تفاصيل التنفيذ الداخلية).
**Example Structure:**
```ts
// packages/api/src/store/getProducts.test.ts
describe('getProducts', () => {
  it('يُرجع منتجات مفلترة حسب التصنيف', async () => {
    const result = await getProducts({ category: 'resistance-bands' });
    expect(result.every(p => p.category === 'resistance-bands')).toBe(true);
  });
});
```
**Dependencies:** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`.

---

## 60. Storybook Architecture

**Purpose:** توثيق بصري تفاعلي لكل مكوّن في `packages/ui`، مستقل عن التطبيق الفعلي — مرجع حي للـ Design System.
**Folder Location:** `packages/ui/.storybook/`, `packages/ui/src/components/**/*.stories.tsx`.
**Example Structure:**
```tsx
// button.stories.tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="accent">CTA</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
```
**Dependencies:** `storybook`, `@storybook/react-vite`, `@storybook/addon-a11y` (فحص إمكانية الوصول مباشرة داخل Storybook).
**Notes:** يُنشر Storybook كموقع مستقل (عبر Chromatic أو Vercel) — مرجع دائم لفريقي التصميم والتطوير معًا، ويُستخدم أيضًا كـ Visual Regression Testing لاحقًا.

---

## 61. CI/CD Ready Structure

**Folder Location:** `.github/workflows/{ci.yml, deploy-preview.yml}`.
**Example Structure:**
```yaml
# .github/workflows/ci.yml
on: [pull_request]
jobs:
  quality:
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo lint type-check test build  # Turborepo يبني فقط المتأثر
```
**Dependencies:** GitHub Actions، Turborepo Remote Caching (لتسريع CI بشكل كبير).
**Common Mistakes:** تشغيل `build`/`test` لكل الحزم في كل Pull Request بدل الاعتماد على ذكاء Turborepo لتحديد المتأثر فقط — يبطئ CI بشكل غير ضروري مع نمو المشروع.

---

## 62. Deployment Strategy

**Best Practices:** كل تطبيق (`web`, `admin`, `coach`) يُنشر كمشروع Vercel منفصل مرتبط بنفس المستودع (Monorepo Support أصيل في Vercel)؛ **Preview Deployments** تلقائية لكل Pull Request؛ بيئات منفصلة تمامًا (`development` → `staging` → `production`) بمتغيرات بيئة مستقلة لكل منها (متوافق مع استراتيجية `.env.*` في Project Structure).
**Notes:** الانتقال من `staging` إلى `production` يتم عبر Promotion يدوي بعد مراجعة، وليس نشرًا تلقائيًا مباشرًا لكل Merge على `main`.

---

## 63. Coding Standards

- **مبدأ واحد لكل ملف:** ملف واحد = مسؤولية واحدة (Component واحد، أو Hook واحد، أو مجموعة دوال مترابطة صغيرة).
- **لا "Magic Numbers/Strings":** كل قيمة ثابتة متكررة (حالات الطلب، الأدوار) تأتي من `packages/constants`.
- **تعليقات JSDoc** لكل دالة عامة (Exported) في `packages/*` توضّح الغرض والمدخلات/المخرجات.
- **لا منطق أعمال داخل مكونات JSX مباشرة** — يُستخلص لـ Hook أو دالة في `packages/api`.

## 64. Naming Conventions

| النوع | الاصطلاح | مثال |
|---|---|---|
| مكونات React | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase + بادئة `use` | `useCartStore.ts` |
| دوال عادية | camelCase | `formatCurrency.ts` |
| أنواع/واجهات TypeScript | PascalCase | `interface ProductVariant` |
| ثوابت | UPPER_SNAKE_CASE | `MAX_CART_ITEMS` |
| ملفات غير مكوّنات | kebab-case | `product-card.tsx`, `format-currency.ts` |

## 65. Import Rules

**ترتيب الاستيراد إلزامي (يُفرض عبر `eslint-plugin-import`):**
```ts
// 1. مكتبات خارجية
import { useState } from 'react';
// 2. حزم داخلية من packages/
import { Button } from '@vertex/ui';
// 3. استيراد نسبي داخل نفس Feature
import { useCart } from '../hooks/use-cart';
// 4. أنواع (Types) في النهاية دائمًا
import type { Product } from '@vertex/types';
```
**Common Mistakes:** استيراد دائري (Circular Imports) بين حزمتين — يُكتشف عبر `eslint-plugin-import/no-cycle` في CI.

## 66. Folder Naming Rules

kebab-case دائمًا لكل المجلدات (`exercise-library` وليس `ExerciseLibrary` أو `exercise_library`) — اتساق كامل مع بنية الروابط (Sitemap) لتفادي أي التباس.

## 67. File Naming Rules

- المكونات: `PascalCase.tsx` **أو** `kebab-case.tsx` (القرار: **kebab-case لكل شيء بما فيها المكونات** — مثال: `product-card.tsx` يُصدِّر `ProductCard` — اتساق أعلى مع بقية أنواع الملفات، ويتفادى مشاكل أنظمة ملفات حساسة لحالة الأحرف).
- الاختبارات: `[filename].test.ts` بجانب الملف الأصلي مباشرة.
- الأنواع: `[domain].types.ts` عند الحاجة لملف أنواع منفصل.

## 68. TypeScript Guidelines

- **`strict: true`** إلزامي في `tsconfig.json` المركزي — بدون استثناء لأي حزمة.
- **ممنوع `any`** — يُفرض عبر ESLint (`@typescript-eslint/no-explicit-any: error`)؛ البديل عند عدم اليقين: `unknown` + تضييق النوع (Type Narrowing).
- **أنواع مُستنتَجة من Zod** (`z.infer<>`) هي مصدر الحقيقة لأي نوع مرتبط بفورم أو API — لا تُكتب يدويًا بشكل منفصل ومكرر.
- **Generated Types من Supabase** (`packages/database/generated-types`) هي مصدر الحقيقة لأي نوع مرتبط مباشرة بجدول قاعدة بيانات.

## 69. Security Best Practices

- **لا يُثَق بأي مدخل من العميل** — كل Server Action/API Route يُعيد التحقق بـ Zod حتى لو تحقق العميل مسبقًا.
- **Row Level Security مفعّلة على كل جدول** في Supabase (لا استثناء) — طبقة حماية حتى لو تجاوز مهاجم طبقة التطبيق.
- **Security Headers** في `next.config.js`: `Content-Security-Policy`, `X-Frame-Options: DENY`, `Strict-Transport-Security`.
- **Rate Limiting** على كل Server Action حساس (تسجيل دخول، إنشاء حساب، إرسال فورم تواصل) عبر Middleware أو خدمة مخصصة (مثل Upstash Ratelimit).
- **لا Secrets في الكود المصدري إطلاقًا** — كل شيء عبر `.env` والمتغيرات المُدارة في Vercel.

## 70. Complete Development Workflow

1. إنشاء Branch من `develop` بتسمية `feature/[feature-name]` أو `fix/[bug-name]`.
2. التطوير محليًا مع `pnpm dev` (يُشغِّل كل التطبيقات المطلوبة عبر Turborepo بالتوازي).
3. `pnpm lint && pnpm type-check && pnpm test` محليًا قبل أي Commit (يُفرض تلقائيًا عبر Husky أيضًا).
4. Commit برسالة Conventional Commits (يُفرض عبر Commitlint).
5. Push + فتح Pull Request → تشغيل CI تلقائيًا (Lint, Type-check, Test, Build, Preview Deployment).
6. مراجعة الكود (Code Review) من عضو آخر بالفريق إلزامية قبل الدمج.
7. الدمج في `develop` → نشر تلقائي على بيئة `staging`.
8. اختبار القبول (QA) على `staging` → Promotion يدوي إلى `production` عند الجاهزية.

---

*(الجزء الرابع والأخير: شجرة المشروع الكاملة النهائية بكل الملفات، وقائمة الموافقة الشاملة.)*
