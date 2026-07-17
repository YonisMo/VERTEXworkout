# Performance Strategy — VERTEXworkout
**المرحلة 11 من 18 — Enterprise Production-Ready Performance Design**
**الجزء 1 من 3: Architecture, Rendering, React/Server Components, Caching, CDN, Image/Font**

---

## 1. Performance Architecture — الفلسفة العامة

**المبدأ الأساسي:** الأداء **قرار معماري من اليوم الأول**، وليس "تحسينًا" يُضاف لاحقًا بعد اكتشاف بطء. كل قرار في المراحل السابقة (Server Components افتراضيًا، Monorepo بـ Turborepo Caching، RLS بدل فلترة على العميل) هو بالفعل قرار أداء بقدر ما هو قرار معماري.

**هرم الأولويات (من الأكثر تأثيرًا للأقل):**
```
1. ما يصل للمتصفح أصلاً (Server Components + Streaming) → أكبر تأثير
2. ما يُخزَّن مؤقتًا بدل إعادة الحساب (Caching على كل المستويات)
3. حجم/عدد الأصول المُحمَّلة (Images, Fonts, JS Bundles)
4. كفاءة الاستعلامات نفسها (Indexes, Query Optimization)
5. Micro-optimizations (React.memo, useMemo) → أقل تأثير، يُطبَّق عند الحاجة الفعلية المُثبَتة بالقياس فقط
```
**قاعدة ذهبية:** **لا تحسين أداء بدون قياس مسبق يثبت وجود مشكلة فعلية** — التحسين المبني على التخمين (Premature Optimization) يضيف تعقيدًا دون فائدة مؤكدة، ويُصعِّب الصيانة.

---

## 2. Rendering Strategy — متى نستخدم كل نمط عرض؟

| النمط | متى يُستخدم في VERTEXworkout | أمثلة صفحات |
|---|---|---|
| **Static Generation (SSG)** | محتوى لا يتغيّر إلا نادرًا | Privacy Policy, Terms, About |
| **Incremental Static Regeneration (ISR)** | محتوى يتغيّر بمعدل متوسط، القراءة أكثر بكثير من الكتابة | صفحات المنتجات (`revalidate: 3600`), المقالات (`revalidate: 86400`) |
| **Server-Side Rendering (SSR) عند كل طلب** | محتوى يعتمد على حالة المستخدم الحالية | لوحة تحكم المتدرب، السلة، صفحة الطلبات |
| **Client-Side Rendering (CSR) جزئي** | تفاعلية بحتة بعد التحميل الأولي | فلاتر تفاعلية، Modals، عدّاد السلة |
| **Streaming SSR** | صفحة بها أقسام سريعة وأخرى أبطأ | صفحة المنتج (تفاصيل سريعة + منتجات ذات صلة مُبثَّة لاحقًا) |

**القرار الافتراضي لأي صفحة جديدة:** تبدأ كـ **ISR** ما لم يكن هناك سبب واضح (بيانات شخصية → SSR، محتوى ثابت تمامًا → SSG).

---

## 3. Server Components Optimization

بناءً على الأساس المعماري (Frontend Architecture، القسم 22)، تحسينات أداء إضافية:

| التقنية | التفصيل |
|---|---|
| **تجميع الاستعلامات المتوازية** | عند الحاجة لعدة استعلامات مستقلة في نفس الصفحة، تُنفَّذ عبر `Promise.all()` (متوازية) وليس `await` متتاليًا (تسلسلي) — يقلل زمن الانتظار الكلي لأبطأ استعلام فقط، لا لمجموع كل الاستعلامات |
| **تفادي "Waterfall" غير الضروري** | إن كان استعلام B لا يعتمد فعليًا على نتيجة استعلام A، لا يُكتب `await A(); await B();` بل `Promise.all([A(), B()])` |
| **`React.cache()` لمنع التكرار داخل نفس الطلب** | لو استُدعيت نفس دالة الجلب (مثل `getCurrentUser()`) من عدة مكونات في نفس شجرة الصفحة، `React.cache()` يضمن تنفيذها **مرة واحدة فقط** لكل طلب، بدل استعلام مكرر لكل مكوّن يستدعيها |

```ts
// packages/api/src/auth/get-current-user.ts
import { cache } from 'react';
export const getCurrentUser = cache(async () => {
  const session = await getServerSession();
  return session ? await fetchUserProfile(session.userId) : null;
});
```

---

## 4. React Performance (الجزء التفاعلي - Client Components)

| التقنية | متى تُطبَّق |
|---|---|
| `React.memo()` | فقط لمكونات تُعاد رسمها بشكل متكرر بنفس الـ Props (مثال: عنصر في قائمة طويلة من المنتجات) — **ليس افتراضيًا لكل مكوّن** |
| Zustand Selectors الدقيقة | موضّح في Frontend Architecture (القسم 19) — يمنع إعادة رسم غير ضرورية عند تغيّر جزء واحد من الـ Store |
| `useMemo`/`useCallback` | فقط لحسابات مكلفة فعليًا (فرز/فلترة قائمة كبيرة على العميل) أو لمنع إعادة إنشاء دالة تُمرَّر كـ Prop لمكوّن مُغلَّف بـ `React.memo` |
| Virtualization للقوائم الطويلة جدًا | `@tanstack/react-virtual` لقوائم تتجاوز 100+ عنصر معروضة دفعة واحدة (نادر الحدوث في VERTEXworkout بفضل Pagination، لكن مُجهَّز لمكتبة التمارين إن نمت كثيرًا) |

**Common Mistake يُتجنَّب:** تغليف كل مكوّن بـ `React.memo` "احتياطيًا" — يضيف تكلفة مقارنة (Comparison Overhead) في كل رسم دون فائدة حقيقية لمكونات بسيطة أو نادرة التغيير.

---

## 5. Caching Strategy (تعميق شامل فوق API Design)

**4 مستويات كاش متكاملة:**

```
[متصفح المستخدم] → Browser Cache (Static Assets: JS/CSS/Fonts بـ immutable cache-control)
        │
[Vercel Edge Network] → CDN Cache (صفحات ISR، صور محسَّنة)
        │
[Next.js Data Cache] → fetch() مع revalidate محدَّد لكل نوع بيانات
        │
[TanStack Query] → Client-side cache (staleTime/gcTime لكل استعلام)
```

| نوع البيانات | مستوى الكاش | المدة |
|---|---|---|
| ملفات JS/CSS مبنية (Hashed filenames) | Browser + CDN | `immutable` (سنة كاملة — الاسم يتغيّر عند أي تعديل فعلي) |
| صور محسَّنة عبر `next/image` | CDN | 60 يومًا |
| صفحات منتجات/برامج (ISR) | CDN + Data Cache | 1 ساعة (`revalidate: 3600`) |
| بيانات شخصية (سلة، طلبات) | لا كاش مشترك (`private, no-store`) | فورية دائمًا |
| نتائج بحث | Data Cache قصير | 60 ثانية |

**إبطال الكاش الفوري (On-Demand Revalidation):** أي تعديل من الأدمن (سعر منتج، محتوى مقال) يستدعي `revalidatePath()` أو `revalidateTag()` **فورًا** بعد الحفظ — لا ننتظر انتهاء الـ `revalidate` الزمني الطبيعي لتغييرات يدوية معروفة التوقيت.

```ts
// بعد تحديث منتج من apps/admin (أو Server Action)
revalidateTag(`product-${productId}`);
revalidatePath(`/[locale]/store/product/${slug}`, 'page');
```

---

## 6. CDN Strategy

- **Vercel Edge Network** كـ CDN أساسي — توزيع جغرافي تلقائي لكل الأصول الثابتة والصفحات المُخزَّنة مؤقتًا، أقرب نقطة للمستخدم دائمًا.
- **Supabase Storage عبر CDN مدمج** لكل الصور والفيديوهات (بدل تقديمها مباشرة من قاعدة البيانات/Bucket بدون تسريع).
- **استراتيجية إقليمية:** بما أن الجمهور المستهدف أساسًا في مصر/المنطقة العربية، يُفعَّل **Vercel Edge Config** لتوجيه الطلبات لأقرب Edge Node إقليميًا (أوروبا/الشرق الأوسط) لتقليل زمن الاستجابة الجغرافي (Latency).

---

## 7. Image Optimization (تعميق فوق Frontend Architecture القسم 36)

| التقنية الإضافية | التفصيل |
|---|---|
| **صيغة AVIF كخيار أول، WebP كبديل** | `next/image` يختار تلقائيًا أفضل صيغة يدعمها متصفح الزائر (AVIF أخف حتى من WebP بنسبة إضافية) |
| **Responsive `srcset` تلقائي** | يُولِّد Next.js تلقائيًا أحجامًا متعددة حسب `sizes` المحدَّدة (موضّحة في Wireframes/Frontend Architecture) — لا تحميل صورة 2000px لهاتف بعرض 400px |
| **Blur Placeholder من قيم فعلية** | `blurDataURL` يُولَّد وقت رفع الصورة (`packages/storage/image.ts`) ويُخزَّن في سجل `media` — وليس Placeholder عام رمادي لكل الصور |
| **حد أقصى لأبعاد الصورة الأصلية المُخزَّنة** | 2000px (موضّح في Security/Storage) — يمنع تحميل صور ضخمة غير ضرورية حتى في أعلى جودة متاحة |

---

## 8. Font Optimization (تعميق)

فوق الأساس (`next/font`, `display: swap` من Frontend Architecture القسم 8):
- **Subsetting:** تحميل فقط المجموعات الفرعية المطلوبة فعليًا (`arabic`, `latin`) من Cairo/Inter، وليس كل حروف اللغات المدعومة عالميًا في الخط — يقلل حجم ملف الخط بشكل كبير.
- **Preload للخط الأساسي فقط:** الخط المستخدم في العنوان الرئيسي (Hero) يحصل على `<link rel="preload">` صريح، أما الأوزان الثانوية (300, 800 النادرة الاستخدام) تُحمَّل عند الحاجة الفعلية فقط دون Preload.

---

*(الجزء 2 التالي: Code Splitting، Bundle Optimization، Database/Query Performance، API Performance، Search Performance، Edge Runtime، Background Jobs.)*
