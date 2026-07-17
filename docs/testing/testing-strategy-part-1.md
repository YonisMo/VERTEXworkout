# Testing Strategy — VERTEXworkout
**المرحلة 13 من 18 — Enterprise Testing Architecture**
**الجزء 1 من 2: Philosophy, Test Pyramid, Unit/Integration/E2E Strategy, Component/Visual Testing**

---

## 1. فلسفة الاختبار العامة

**المبدأ الأساسي:** الاختبارات تُبنى **لحماية سلوك المستخدم النهائي**، وليس لتحقيق نسبة تغطية (Coverage %) عالية شكليًا. اختبار يتحقق من تفاصيل تنفيذ داخلية (Implementation Details) بدل السلوك الفعلي يُعتبَر اختبارًا هشًا يُعاد كتابته باستمرار مع كل Refactor بلا فائدة حقيقية.

**السؤال الذي يوجّه كل اختبار جديد:** *"لو تعطّل هذا السلوك تحديدًا، هل سيلاحظ المستخدم أو يخسر العمل شيئًا حقيقيًا؟"* — إن كانت الإجابة نعم، يستحق اختبارًا. إن كانت الإجابة "فقط تفصيل داخلي لا يؤثر على المخرجات"، لا يستحق اختبارًا مخصصًا.

---

## 2. هرم الاختبارات (Test Pyramid) المُعتمَد

```
                    ▲
                   /E2E\              ~10% — رحلات حرجة فقط (Playwright)
                  /------\
                 /Integr. \          ~30% — Route Handlers, Server Actions, RLS
                /----------\
               / Unit Tests \        ~60% — packages/api, validation, hooks, utils
              /--------------\
```

| المستوى | العدد النسبي | السرعة | ماذا يُختبَر |
|---|---|---|---|
| **Unit** | الأكثر عددًا | ميلي ثوانٍ لكل اختبار | دوال معزولة تمامًا (Zod schemas, `packages/api` functions, custom hooks, utils) |
| **Integration** | متوسط | ثوانٍ قليلة | Route Handlers فعليًا (طلب → استجابة)، RLS Policies، تكامل عدة وحدات معًا |
| **E2E** | الأقل عددًا، الأكثر قيمة لكل اختبار | ثوانٍ إلى دقائق | رحلات مستخدم كاملة عبر متصفح حقيقي (تسجيل → شراء → دفع) |

**لماذا ليس هرمًا مقلوبًا (E2E أكثر)؟** اختبارات E2E بطيئة، هشة أمام تغييرات UI طفيفة، ومكلفة صيانةً — تُحجَز فقط للمسارات التي **يجب** أن تعمل دائمًا (Business-Critical)، بينما منطق الأعمال التفصيلي يُختبَر بشكل أسرع وأكثر استقرارًا على مستوى Unit/Integration.

---

## 3. Unit Testing Strategy (Vitest)

**ما يُختبَر إلزاميًا:**
| الفئة | مثال | نسبة تغطية مستهدَفة |
|---|---|---|
| `packages/api/**` (منطق الأعمال) | `getProducts()`, `createOrder()`, `calculateCartTotal()` | 90%+ |
| `packages/validation/**` (Zod schemas) | كل حالة صحيحة **وكل حالة خاطئة متوقَّعة** لكل مخطط | 100% (المخططات صغيرة ومحدَّدة، لا عذر لتغطية جزئية) |
| `packages/utils/**` | `formatCurrency`, `slugify`, `formatDate` | 100% (دوال نقية بسيطة، سهلة الاختبار الكامل) |
| Custom Hooks (`features/*/hooks`) | `useCart`, `useProductFilters` | 80%+ (عبر `@testing-library/react-hooks` أو `renderHook`) |

**مبدأ AAA (Arrange-Act-Assert)** إلزامي في بنية كل اختبار — تنظيم واضح يسهّل القراءة والصيانة:
```ts
describe('calculateCartTotal', () => {
  it('يحسب المجموع بشكل صحيح مع خصم كود ترويجي', () => {
    // Arrange
    const items = [{ unitPrice: 100, quantity: 2 }, { unitPrice: 50, quantity: 1 }];
    const discountPct = 10;
    // Act
    const total = calculateCartTotal(items, discountPct);
    // Assert
    expect(total).toBe(225); // (250 * 0.9)
  });

  it('يرمي خطأ عند تمرير كمية سالبة', () => {
    expect(() => calculateCartTotal([{ unitPrice: 100, quantity: -1 }])).toThrow('QUANTITY_INVALID');
  });
});
```
**قاعدة صارمة:** كل دالة في `packages/api` تحتوي **على الأقل اختبارًا واحدًا للمسار السعيد (Happy Path) واختبارًا واحدًا لكل حالة فشل متوقَّعة** (بيانات غير صحيحة، مورد غير موجود، صلاحية مرفوضة) — لا اختبار للمسار السعيد فقط.

---

## 4. Integration Testing Strategy

**ما يُختبَر:** تكامل عدة وحدات فعليًا معًا، بدون الحاجة لمتصفح حقيقي:

| النوع | الأداة | مثال |
|---|---|---|
| **Route Handlers** | Vitest + `node-mocks-http` أو استدعاء مباشر للدالة المُصدَّرة | إرسال طلب HTTP وهمي لـ `GET /api/v1/products`، والتحقق من الاستجابة كاملة (Status + Body + Headers) |
| **RLS Policies** | Vitest + Supabase Test Client بحسابين مختلفين | التحقق الفعلي أن Client A لا يرى طلبات Client B (موضّح مسبقًا في Security Architecture، القسم 33) |
| **Server Actions** | استدعاء الدالة مباشرة بـ FormData وهمية | `submitReviewAction` يُختبَر بإدخال بيانات كاملة، ثم بيانات ناقصة، والتحقق من نتيجة كل حالة |
| **تكامل packages/api مع packages/database** | قاعدة بيانات اختبار حقيقية (Supabase Local/Docker) وليس Mock كامل | يضمن أن الاستعلامات الفعلية تعمل، وليس فقط أن المنطق "يبدو" صحيحًا نظريًا |

**بيئة الاختبار:** **Supabase CLI المحلي** (`supabase start`) يُشغَّل ضمن CI لتوفير قاعدة بيانات Postgres حقيقية معزولة لكل تشغيل اختبارات — أدق بكثير من Mocking كامل لطبقة قاعدة البيانات، ويكتشف مشاكل RLS وConstraints فعليًا.

---

## 5. E2E Testing Strategy (Playwright) — المسارات الحرجة المُعتمَدة

بناءً على Frontend Architecture (القسم 58)، القائمة الكاملة للمسارات التي **يجب** أن تبقى خضراء دائمًا (Non-negotiable):

| # | المسار | لماذا حرج |
|---|---|---|
| 1 | تسجيل حساب جديد → تأكيد → تسجيل دخول | أساس كل تفاعل آخر بالمنصة |
| 2 | تصفح متجر → إضافة للسلة → دفع → تأكيد طلب | مسار الإيراد المباشر |
| 3 | اشتراك في برنامج تدريبي (مجاني ومدفوع) | نواة القيمة الأساسية للمنصة |
| 4 | البحث الموحّد وعرض نتائج من كل الأنواع | ميزة اكتشاف رئيسية |
| 5 | تبديل اللغة عربي/إنجليزي والتحقق من RTL/LTR الصحيح | حرج لكل الجمهور العربي المستهدف |
| 6 | تعديل الملف الشخصي وحفظه بنجاح | أساسي لتجربة الحساب |
| 7 | استعادة كلمة مرور منسية بالكامل | مسار إنقاذ حرج، إحباط كبير لو فشل |
| 8 | RBAC: محاولة وصول Client لمسار Admin → تأكيد الرفض (403) | حرج أمنيًا، ليس فقط وظيفيًا |

**بيئات التشغيل:** كل مسار يُختبَر على **Chromium + WebKit** (يغطي Safari على iOS، شائع جدًا في المنطقة العربية) بعرضي **Desktop وMobile Viewport** معًا — 4 تركيبات لكل مسار حرج.

**Data-testid Convention:**
```tsx
<Button data-testid="add-to-cart-button">أضف للسلة</Button>
```
كل عنصر تفاعلي يُختبَر بـ E2E يحمل `data-testid` ثابتًا **لا يتغيّر مع تعديلات التصميم** — يفصل الاختبارات عن تفاصيل CSS/النص المعروض، فتبقى مستقرة حتى بعد تغييرات بصرية كبيرة.

---

## 6. Component Testing & Visual Regression Testing

| النوع | الأداة | الغرض |
|---|---|---|
| **Component Testing (سلوكي)** | `@testing-library/react` + Vitest | التحقق من سلوك مكوّن معزول (مثال: `ProductCard` يُظهر Badge "نفدت الكمية" عند `inStock: false`) — وليس فحص شكل الـ HTML الناتج حرفيًا |
| **Visual Regression Testing** | **Chromatic** (متكامل مباشرة مع Storybook، موضّح في Frontend Architecture القسم 60) | التقاط لقطة شاشة لكل Story، ومقارنتها تلقائيًا بالنسخة المعتمدة مسبقًا عند أي Pull Request — أي تغيير بصري غير مقصود (كسر تصميم عرضي) يُكتشَف **قبل الدمج**، وليس بعد وصوله للإنتاج |
| **آلية الموافقة** | تغيير بصري مقصود (تحديث تصميم فعلي) → مراجع بشري يوافق صراحة على "اللقطة الجديدة" في Chromatic كخط أساس جديد؛ تغيير غير مقصود → يُرفض الـ PR تلقائيًا حتى يُصحَّح |

**لماذا Visual Regression عبر Storybook تحديدًا (وليس صفحات كاملة)؟** أسرع (لا حاجة لتحميل تطبيق كامل)، وأدق (يعزل كل مكوّن بمعزل عن تغيّرات بيانات غير متعلقة بالتصميم نفسه).

---

*(الجزء 2 التالي: Accessibility Testing، API/Security/Performance Testing (مرجع + تكامل)، Test Data Management، Mocking Strategy، CI Test Orchestration، Coverage Targets، Flaky Test Management، Test Environments، Manual QA وBug Triage، Release Testing Checklist.)*
