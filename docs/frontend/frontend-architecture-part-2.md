# Frontend Architecture & Design System Implementation — VERTEXworkout
**الجزء 2 من عدة أجزاء — Rendering Model, Forms, Auth, Performance**

---

## 22. Server Components

**Purpose:** جلب البيانات وعرض المحتوى مباشرة من السيرفر، بدون شحن JavaScript غير ضروري للعميل.
**Why:** كل ما لا يحتاج تفاعلية (عرض منتج، مقال، قائمة) يجب أن يبقى Server Component — يقلل حجم الـ Bundle المُرسَل للمتصفح ويحسّن SEO وTTFB.
**Best Practices:** الافتراضي لكل ملف في `app/` هو Server Component ما لم يُصرَّح خلاف ذلك؛ جلب البيانات مباشرة عبر `async/await` داخل المكوّن نفسه (لا حاجة لـ `useEffect`).
**Folder Location:** كل `page.tsx`, `layout.tsx` افتراضيًا، ومعظم مكونات العرض في `features/*/components/`.
**Example Structure:**
```tsx
// app/[locale]/(marketing)/store/product/[slug]/page.tsx
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug); // من packages/api مباشرة
  return <ProductDetail product={product} />;
}
```
**Dependencies:** لا شيء إضافي — سلوك أصيل في React Server Components.
**Notes:** يمكن استدعاء `packages/api` مباشرة (بدون TanStack Query) داخل Server Component لأن الطلب ينفَّذ مرة واحدة على السيرفر فقط.
**Common Mistakes:** محاولة استخدام `useState`/`useEffect` داخل Server Component — خطأ بناء فوري؛ يجب فصل الجزء التفاعلي إلى Client Component منفصل.

---

## 23. Client Components

**Purpose:** التفاعلية الفعلية (نماذج، أزرار بحالة، Modals، أي شيء يحتاج JavaScript في المتصفح).
**Best Practices:** توضع `"use client"` في **أضيق نطاق ممكن** — مكوّن الزر التفاعلي نفسه، وليس الصفحة بأكملها التي يحتويها.
**Folder Location:** أي ملف يحتاج تفاعلية داخل `features/*/components/` أو `packages/ui/src/components/`.
**Example Structure:**
```tsx
// features/store/components/add-to-cart-button.tsx
"use client";
export function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = useAddToCartMutation();
  return <Button onClick={() => addToCart.mutate(productId)}>أضف للسلة</Button>;
}
```
**Dependencies:** لا شيء إضافي.
**Notes:** "Server Component يستدعي Client Component بداخله" نمط سليم وشائع — العكس (Client يستدعي Server مباشرة) غير مسموح؛ التمرير يكون عبر `children` Prop.
**Common Mistakes:** وضع `"use client"` في `layout.tsx` الجذري بالكامل لأن Provider واحد بداخله يحتاجها — الحل الصحيح: عزل الـ Providers في ملف `providers.tsx` منفصل بـ `"use client"` الخاص به فقط (كما في القسم 6).

---

## 24. Server Actions

**Purpose:** تنفيذ عمليات تغيير بيانات (Mutations) مباشرة من الفورم بدون بناء API Route منفصل يدويًا.
**Best Practices:** كل Server Action يبدأ بـ `"use server"`، ويُعرَّف في ملف `actions.ts` منفصل داخل كل Feature (وليس Inline داخل المكوّن) لسهولة الاختبار وإعادة الاستخدام.
**Folder Location:** `apps/web/src/features/*/actions.ts`.
**Example Structure:**
```ts
// features/store/actions.ts
"use server";
export async function submitReviewAction(formData: FormData) {
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData)); // Zod
  if (!parsed.success) return { error: parsed.error.flatten() };
  await createReview(parsed.data); // packages/api
  revalidatePath('/store/product/[slug]');
  return { success: true };
}
```
**Dependencies:** `packages/validation` (Zod)، `packages/api`.
**Notes:** Server Actions هي الآلية المفضّلة لكل Mutation بسيطة مرتبطة بفورم (مراجعة منتج، تحديث ملف شخصي)؛ العمليات الأكثر تعقيدًا (الدفع، التكامل مع Webhooks خارجية) تبقى عبر Route Handlers في `app/api/`.
**Common Mistakes:** استدعاء Server Action مباشرة من Client Component بدون التحقق من صحة المدخلات بـ Zod أولاً — Server Actions قابلة للاستدعاء كـ Endpoint فعلي، فهي تحتاج نفس صرامة التحقق من أي API عام.

---

## 25. Form Architecture

**Purpose:** نمط موحّد لكل نموذج في المشروع (تسجيل، دفع، تعديل ملف شخصي، مراجعة منتج).
**Best Practices:** كل فورم = **مخطط Zod** (مصدر الحقيقة الوحيد للشكل والتحقق) + **React Hook Form** (إدارة الحالة والأداء) + **Server Action أو Mutation** (التنفيذ الفعلي).
**Folder Location:** `features/*/validation/` (المخططات) + `features/*/components/*-form.tsx` (الواجهة).
**Example Structure:**
```
features/profile/
├── validation/profile-schema.ts     # Zod schema
└── components/profile-edit-form.tsx # RHF + zodResolver + shadcn Form
```
**Dependencies:** `react-hook-form`, `@hookform/resolvers/zod`, `zod`.
**Notes:** نفس مخطط Zod يُستخدم **مرتين**: مرة في `zodResolver` على العميل (تجربة مستخدم فورية)، ومرة أخرى داخل Server Action نفسه (لا نثق بتحقق العميل وحده أمنيًا).
**Common Mistakes:** كتابة قواعد تحقق مختلفة على العميل والسيرفر (تكرار يدوي بدل مشاركة نفس ملف Zod) — يسبب تعارضات وثغرات أمنية.

---

## 26. Validation باستخدام Zod

**Purpose:** مصدر حقيقة واحد للتحقق من البيانات عبر كل الطبقات (Form → Server Action → API → Database).
**Folder Location:** `packages/validation/src/{store,programs,auth,client}/`.
**Example Structure:**
```ts
// packages/validation/src/auth/register-schema.ts
export const registerSchema = z.object({
  fullName: z.string().min(3, 'الاسم قصير جدًا'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور 8 أحرف على الأقل'),
});
export type RegisterInput = z.infer<typeof registerSchema>;
```
**Dependencies:** `zod`.
**Notes:** رسائل الخطأ تُكتب مباشرة بالعربية داخل المخطط (`.min(3, 'رسالة بالعربي')`) — لاحقًا تُربط بمفاتيح next-intl عند تفعيل التبديل الكامل للرسائل حسب اللغة.
**Common Mistakes:** تعريف نفس المخطط في أكثر من مكان (تكرار بدل استيراد من `packages/validation` المركزي).

---

## 27. React Hook Form Structure

**Purpose:** أداء عالٍ (Uncontrolled Inputs) وإدارة حالة فورم نظيفة.
**Best Practices:** استخدام مكونات `Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` من shadcn/ui (مبنية فوق React Hook Form مباشرة) بدل إدارة يدوية للأخطاء.
**Folder Location:** داخل كل `*-form.tsx` component في `features/*/components/`.
**Example Structure:**
```tsx
const form = useForm<RegisterInput>({ resolver: zodResolver(registerSchema), mode: 'onBlur' });
```
**Dependencies:** `react-hook-form`.
**Notes:** `mode: 'onBlur'` يطابق قرار UX الموثّق في Design System (القسم 8.10) — التحقق عند مغادرة الحقل لا مع كل ضغطة مفتاح.
**Common Mistakes:** استخدام `mode: 'onChange'` الافتراضي في نماذج طويلة — يسبب إزعاجًا بصريًا (رسائل خطأ تظهر أثناء الكتابة قبل انتهاء المستخدم من الحقل).

---

## 28. Authentication Integration

**Purpose:** ربط Supabase Auth بـ Next.js App Router بشكل آمن عبر Server وClient معًا.
**Best Practices:** استخدام `@supabase/ssr` (الحزمة الرسمية المخصصة لـ App Router) مع عميلين منفصلين: `createServerClient` (للاستخدام في Server Components/Actions) و`createBrowserClient` (للاستخدام في Client Components).
**Folder Location:** `packages/lib/supabase/{server.ts, client.ts}`.
**Example Structure:**
```ts
// packages/lib/supabase/server.ts
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(url, anonKey, { cookies: { get: (n) => cookieStore.get(n)?.value } });
}
```
**Dependencies:** `@supabase/ssr`, `@supabase/supabase-js`.
**Notes:** الجلسة (Session) تُخزَّن في Cookies (وليس `localStorage`) — إلزامي لعمل SSR بشكل صحيح مع معرفة حالة تسجيل الدخول من أول طلب للسيرفر.
**Common Mistakes:** استخدام عميل Supabase واحد مشترك بين السيرفر والعميل — يسبب تسرّب جلسات بين المستخدمين في بيئة السيرفر متعددة الطلبات.

---

## 29. Authorization (RBAC)

**Purpose:** تطبيق نظام الأدوار المصمَّم في Database Schema فعليًا على مستوى الواجهة والسيرفر.
**Best Practices:** التحقق يتم على **3 مستويات متتالية (Defense in Depth)**: (1) Middleware يمنع الوصول للمسار كليًا، (2) Server Component/Action يتحقق مرة أخرى قبل تنفيذ أي عملية حساسة، (3) واجهة تُخفي الأزرار/الإجراءات غير المصرَّح بها (تجربة مستخدم فقط، وليست حماية أمنية فعلية).
**Folder Location:** `packages/auth/src/{permissions.ts, guards.ts}`.
**Example Structure:**
```ts
// packages/auth/src/guards.ts
export async function requireRole(allowedRoles: Role[]) {
  const session = await getServerSession();
  if (!session || !allowedRoles.some(r => session.roles.includes(r))) {
    redirect('/forbidden');
  }
  return session;
}
```
**Dependencies:** `packages/database` (لجلب أدوار المستخدم من `user_roles`).
**Notes:** **لا يُعتمد إطلاقًا على إخفاء زر في الواجهة كحماية وحيدة** — أي عملية حساسة (حذف منتج، تعديل طلب) يجب أن يتحقق منها Server Action مستقلًا حتى لو أُخفي الزر بصريًا عن غير المصرَّح لهم.
**Common Mistakes:** الاكتفاء بإخفاء زر "حذف" في الواجهة لغير الأدمن دون تحقق فعلي في Server Action المقابل — ثغرة أمنية مباشرة (يمكن استدعاء الـ Action عبر أدوات المطوّر رغم إخفاء الزر).

---

## 30. Middleware Flow

**Purpose:** نقطة تفتيش واحدة قبل الوصول لأي صفحة — تعالج i18n وAuth معًا.
**Folder Location:** `apps/web/src/middleware.ts`.
**Example Structure:**
```ts
export async function middleware(request: NextRequest) {
  const localeResponse = intlMiddleware(request);           // 1. تحديد اللغة (next-intl)
  const session = await getSessionFromCookies(request);      // 2. جلب الجلسة
  const path = request.nextUrl.pathname;

  if (path.includes('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (path.includes('/dashboard') && !session.roles.includes('client')) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }
  return localeResponse;
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
```
**Dependencies:** `next-intl` middleware، `@supabase/ssr`.
**Notes:** الـ Middleware يعمل على **Edge Runtime** — يجب أن يبقى خفيفًا جدًا (لا استعلامات قاعدة بيانات ثقيلة، فقط قراءة الجلسة من الـ Cookie).
**Common Mistakes:** تنفيذ استعلام كامل لقاعدة البيانات داخل Middleware للتحقق من كل صلاحية بدقة — يبطئ **كل** طلب يمر عبر الموقع؛ التحقق الدقيق للصلاحيات (RBAC التفصيلي) يُؤجَّل لمستوى Server Component/Action.

---

## 31. Error Boundaries

**Purpose:** التقاط الأخطاء غير المتوقعة بدون تعطيل الصفحة بالكامل.
**Best Practices:** `error.tsx` في كل مستوى مجلد مهم (وليس فقط الجذر) — خطأ في قسم "منتجات ذات صلة" لا يجب أن يُسقط صفحة المنتج بالكامل.
**Folder Location:** `error.tsx` بجانب كل `page.tsx` حسب الحاجة.
**Example Structure:**
```tsx
"use client"; // إلزامي لـ error.tsx دائمًا
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { logErrorToSentry(error); }, [error]);
  return <ErrorState onRetry={reset} />;
}
```
**Dependencies:** `packages/lib/sentry.ts`.
**Notes:** `error.tsx` هو الملف الوحيد في App Router الذي **يجب** أن يكون Client Component حتى لو بدا للوهلة الأولى معالجًا للسيرفر.
**Common Mistakes:** الاعتماد على `error.tsx` جذر واحد لكل الموقع — تجربة مستخدم سيئة (كل خطأ صغير يُسقط الصفحة كاملة بدل القسم المتأثر فقط).

---

## 32. Loading UI

**Purpose:** عرض Skeleton فوري أثناء جلب بيانات أي صفحة، تلقائيًا عبر Next.js.
**Folder Location:** `loading.tsx` بجانب كل `page.tsx` يجلب بيانات.
**Example Structure:**
```tsx
// app/[locale]/(marketing)/store/loading.tsx
export default function Loading() { return <ProductGridSkeleton count={9} />; }
```
**Dependencies:** مكوّن `*-skeleton.tsx` من `packages/ui`.
**Notes:** `loading.tsx` يُفعِّل Suspense تلقائيًا خلف الكواليس لكل الصفحة — لا حاجة لكتابة `<Suspense>` يدويًا على مستوى الصفحة كاملة.
**Common Mistakes:** استخدام Spinner عام واحد بدل Skeleton يحاكي شكل المحتوى الفعلي — يخالف معيار Wireframes المعتمد صراحة.

---

## 33. Suspense Strategy

**Purpose:** تحميل تدريجي (Streaming) لأجزاء الصفحة المختلفة بسرعات مختلفة، بدل انتظار كل البيانات معًا.
**Best Practices:** تُستخدم `<Suspense>` يدويًا **داخل** الصفحة لعزل أقسام بطيئة (مثل "منتجات ذات صلة" التي قد تجلب بيانات إضافية) عن المحتوى الأساسي السريع.
**Example Structure:**
```tsx
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug); // سريع، يُنتظر
  return (
    <>
      <ProductDetail product={product} />
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts productId={product.id} /> {/* بطيء، يُبَث لاحقًا */}
      </Suspense>
    </>
  );
}
```
**Dependencies:** React 18+ (مدمج).
**Notes:** هذا النمط ("Streaming SSR") يجعل المستخدم يرى المحتوى الأساسي فورًا حتى لو تأخر قسم ثانوي — تحسين حقيقي لـ **First Contentful Paint**.
**Common Mistakes:** وضع كل استعلامات الصفحة في `Promise.all` واحد قبل الرسم — يجبر المستخدم على انتظار أبطأ استعلام حتى لو كان لقسم غير أساسي.

---

## 34. Lazy Loading

**Purpose:** تأجيل تحميل مكونات ثقيلة غير ضرورية عند الرسم الأول.
**Best Practices:** أي مكوّن كبير يظهر فقط بعد تفاعل (Modal، Tab غير نشط، محرر نصوص غني) يُحمَّل عبر `next/dynamic`.
**Example Structure:**
```tsx
const ProductReviewsTab = dynamic(() => import('./product-reviews-tab'), { loading: () => <ReviewsSkeleton /> });
```
**Dependencies:** `next/dynamic` (مدمج).
**Notes:** يُطبَّق تحديدًا على: Modals، مكتبات الرسوم البيانية (Charts) في لوحة التحكم، محرر أي محتوى غني، خرائط (لو أُضيفت مستقبلًا).
**Common Mistakes:** استخدام Lazy Loading لمكوّن صغير خفيف أصلاً — يضيف تعقيدًا وطلب شبكة إضافي بلا فائدة حقيقية.

---

## 35. Dynamic Imports

**Purpose:** نفس مبدأ Lazy Loading لكن يشمل أيضًا مكتبات JavaScript ثقيلة (وليس فقط مكونات React).
**Best Practices:** أي مكتبة تُستخدم في صفحة واحدة فقط ولا تُستخدم على نطاق واسع (مثال: مكتبة تصدير PDF لفاتورة الطلب) تُستورد ديناميكيًا عند الحاجة الفعلية (عند ضغط زر "تحميل الفاتورة" مثلًا)، وليس في حزمة الصفحة الأساسية.
**Example Structure:**
```tsx
const handleExportPDF = async () => {
  const { generateInvoicePDF } = await import('@/lib/pdf-export');
  generateInvoicePDF(order);
};
```
**Dependencies:** حسب المكتبة المستوردة ديناميكيًا.
**Notes:** الفرق عن القسم 34: هذا يشمل أي `import()` ديناميكي بشكل عام (مكونات أو مكتبات)، بينما 34 خاص تحديدًا بمكونات React عبر `next/dynamic`.
**Common Mistakes:** استيراد مكتبات ثقيلة (Chart libraries، PDF generators) بشكل ثابت أعلى الملف حتى لو استُخدمت في حالة نادرة — يُضخِّم حزمة JavaScript الأساسية لكل الزوار.

---

## 36. Image Optimization

**Purpose:** أداء تحميل صور ممتاز عبر كل صفحات المنصة (منتجات، تمارين، مقالات).
**Best Practices:** استخدام `next/image` حصريًا (لا وسم `<img>` خام إطلاقًا)؛ تحديد `sizes` بدقة حسب التخطيط المتجاوب؛ `priority` فقط لصورة Hero الأولى الظاهرة بدون تمرير (Above the Fold).
**Example Structure:**
```tsx
<Image src={product.coverUrl} alt={product.altText} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
```
**Dependencies:** `next/image` (مدمج)، Supabase Storage كمصدر (`images.remotePatterns` في `next.config.js`).
**Notes:** كل صورة تأتي من `media.alt_text` (المصمَّم في Database Schema) — لا صورة بدون نص بديل، إلزامي لإمكانية الوصول (WCAG).
**Common Mistakes:** استخدام `<img>` تقليدي "لتوفير الوقت" — يُفقد كل مزايا الضغط التلقائي، الـ Lazy Loading المدمج، ومنع Layout Shift.

---

## 37. Font Optimization

موضّح بالتفصيل في القسم 8 أعلاه (تحميل عبر `next/font`، Self-hosted، `display: swap`).

---

## 38. SEO Structure

**Purpose:** بنية شاملة تضمن ظهور كل صفحة بشكل صحيح في نتائج البحث.
**Best Practices:** كل `page.tsx` يُصدِّر دالة `generateMetadata` (Async) تجلب بيانات الترجمة الصحيحة حسب اللغة والمحتوى الفعلي للصفحة.
**Folder Location:** داخل كل `page.tsx` مباشرة، أو `metadata.ts` منفصل للصفحات الثابتة.
**Dependencies:** Next.js Metadata API (مدمج).
**Notes:** تفاصيل تنفيذية إضافية في الأقسام 39-43 التالية.
**Common Mistakes:** الاعتماد على `<title>` ثابت واحد لكل الصفحات الديناميكية (منتج، مقال) — يضيع فرصة ظهور كل صفحة بكلماتها المفتاحية الخاصة.

---

## 39. Metadata Architecture

**Example Structure:**
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug, params.locale);
  return {
    title: `${product.name} | VERTEXworkout`,
    description: product.shortDescription,
    alternates: { canonical: `/${params.locale}/store/product/${params.slug}`, languages: { ar: `/ar/store/product/${params.slug}`, en: `/en/store/product/${params.slug}` } },
    openGraph: { images: [product.coverUrl] },
  };
}
```
**Common Mistakes:** نسيان `alternates.languages` (hreflang) — يسبب Google باعتبار النسختين العربية والإنجليزية محتوى مكرر بدل نسختين لغويتين لنفس الصفحة.

---

## 40. Sitemap Strategy

**Folder Location:** `apps/web/src/app/sitemap.ts` (ميزة أصيلة في Next.js — تُولِّد `/sitemap.xml` تلقائيًا).
**Example Structure:**
```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProductSlugs();
  const staticPages = ['', '/about', '/store', '/programs', '/academy'];
  return [
    ...staticPages.flatMap(p => [{ url: `https://vertexworkout.com/ar${p}` }, { url: `https://vertexworkout.com/en${p}` }]),
    ...products.flatMap(p => [{ url: `https://vertexworkout.com/ar/store/product/${p.slug}`, lastModified: p.updatedAt }]),
  ];
}
```
**Common Mistakes:** توليد Sitemap ثابت يدويًا مرة واحدة عند الإطلاق ونسيان تحديثه — يجب أن يكون ديناميكيًا 100% مبنيًا من قاعدة البيانات مباشرة كما في المثال.

---

## 41. robots.txt

**Folder Location:** `apps/web/src/app/robots.ts` (يُولِّد الملف ديناميكيًا).
**Example Structure:**
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/checkout', '/cart', '/api'] },
    sitemap: 'https://vertexworkout.com/sitemap.xml',
  };
}
```

---

## 42. Open Graph

مُدمج داخل `generateMetadata` لكل صفحة (القسم 39) — صورة، عنوان، ووصف مخصص لكل مشاركة على وسائل التواصل، مع أبعاد صورة موصى بها `1200×630px` لكل صور الغلاف في `media`.

---

## 43. Structured Data (Schema.org)

**Best Practices:** حقن JSON-LD مباشرة داخل الصفحة عبر `<script type="application/ld+json">` لكل نوع محتوى: `Product` (المتجر)، `Article` (المدونة/الأكاديمية)، `BreadcrumbList` (كل الصفحات الداخلية)، `Organization` (الصفحة الرئيسية).
**Example Structure:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Product', name: product.name, offers: { '@type': 'Offer', price: product.price, priceCurrency: 'EGP' }
})}} />
```
**Common Mistakes:** نسيان تحديث Structured Data عند تعديل السعر/المخزون — يجب أن تُبنى من نفس بيانات الصفحة الحية، لا قيم مكتوبة يدويًا منفصلة.

---

## 44. Performance Optimization

ملخص تجميعي لكل ما سبق (Server Components، Image/Font Optimization، Lazy Loading، Streaming) + قاعدة إضافية: **مراقبة Core Web Vitals عبر Vercel Analytics + Sentry Performance** بشكل مستمر بعد الإطلاق، وليس فقط وقت التطوير.

---

## 45. Caching Strategy

**Best Practices:** 3 مستويات: (1) **Next.js Data Cache** — `fetch` مع `revalidate` مناسب لكل نوع بيانات (المنتجات: `revalidate: 3600`، الأسعار الحساسة: `revalidate: 60`)، (2) **TanStack Query Cache** على العميل (`staleTime` حسب نوع البيانات)، (3) **CDN Cache** عبر Vercel Edge Network للصفحات الثابتة تمامًا (Privacy Policy، About).
**Notes:** `revalidatePath()` يُستدعى فورًا بعد أي Mutation (إضافة منتج جديد من الأدمن مثلًا) لإبطال الكاش يدويًا بدل انتظار انتهاء الصلاحية.
**Common Mistakes:** استخدام `revalidate` طويل جدًا (أو `force-cache` دائم) لبيانات تتغير بشكل متكرر مثل المخزون — يعرض للمستخدم "متوفر" لمنتج نفد فعليًا.

---

## 46. Edge Runtime Strategy

**Best Practices:** `middleware.ts` يعمل على Edge Runtime إلزاميًا (قيد Next.js)؛ صفحات ثابتة بالكامل (Privacy Policy، Terms) يمكن تشغيلها على Edge (`export const runtime = 'edge'`) لأقل زمن استجابة عالميًا؛ الصفحات التي تحتاج عمليات Node.js كاملة (رفع ملفات، معالجة صور معقدة) تبقى على **Node.js Runtime** الافتراضي.
**Common Mistakes:** فرض Edge Runtime على كل الصفحات "لأنه أسرع" — بعض حزم Node.js (مثل معالجة PDF أو مكتبات معينة) لا تعمل على Edge إطلاقًا، ويجب اختيار الـ Runtime حسب حاجة كل صفحة فعليًا.

---

*(تكملة الوثيقة في الجزء الثالث: Accessibility، next-intl/RTL، Dark Mode التنفيذي، Environment Variables، أدوات الجودة (Lint/Format/Husky)، Testing (Vitest/Playwright/Storybook)، CI/CD، Coding Standards، وشجرة المشروع الكاملة النهائية.)*
