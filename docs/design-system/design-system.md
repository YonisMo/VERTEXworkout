# Design System — VERTEXworkout
**المرحلة 6 من 18 — Design Tokens & Component Specifications**
**الإصدار:** 1.0 — جاهز للتحويل إلى Next.js + Tailwind CSS + shadcn/ui

---

## 1. الهوية البصرية (Brand Identity)

| العنصر | القيمة |
|---|---|
| الشعار | جاهز ومعتمد (مرفق من العميل) |
| الطابع | قوة + انضباط رياضي + فخامة بلا مبالغة + حداثة |
| المرجع البصري | Nike / Gymshark (قوة الهوية) + Nike Training Club / Peloton (تجربة المحتوى) |
| الألوان الأساسية | Dark Blue `#022859` + Gold `#F2EA79` |

---

## 2. نظام الألوان (Color System) — جاهز كـ Tailwind Tokens

### Primary — Dark Blue (الأساس: `#022859`)
| Token | Hex | الاستخدام |
|---|---|---|
| `primary-50` | `#F0F6FB` | خلفيات فاتحة جدًا، حالات Hover خفيفة |
| `primary-100` | `#D9E6F4` | خلفيات بطاقات مُميّزة |
| `primary-200` | `#B3CEE9` | حدود فاتحة |
| `primary-300` | `#7FACD8` | عناصر ثانوية |
| `primary-400` | `#4A89C4` | نصوص روابط على خلفية فاتحة |
| `primary-500` | `#1F6BB0` | حالات Interactive متوسطة |
| `primary-600` | `#145798` | Hover لأزرار Primary |
| `primary-700` | `#0B4380` | Active/Pressed |
| `primary-800` | `#063568` | نصوص على خلفيات فاتحة |
| `primary-900` | `#022859` | **اللون الأساسي للعلامة** (Header, أزرار Primary, نصوص رئيسية) |
| `primary-950` | `#011B3D` | خلفيات Dark Mode، أقسام غامقة جدًا |

### Accent — Gold (الأساس: `#F2EA79`)
| Token | Hex | الاستخدام |
|---|---|---|
| `accent-50` | `#FEFEF5` | خلفيات تمييز خفيفة جدًا |
| `accent-100` | `#FDFBE8` | Badges "جديد"/"مميز" |
| `accent-300` | `#F8F3B3` | حدود تمييز |
| `accent-500` | `#F2EA79` | **اللون المميز للعلامة** (أزرار CTA، تمييز رئيسي) |
| `accent-600` | `#E0D454` | Hover لأزرار Accent |
| `accent-700` | `#C4B93A` | Active/Pressed |
| `accent-900` | `#6B6318` | نصوص على خلفية ذهبية (تباين كافٍ) |

### Neutral — Gray (الأساس: `#EAEAEA`)
| Token | Hex | الاستخدام |
|---|---|---|
| `neutral-50` | `#FAFAFA` | خلفية الصفحة الأساسية (Light Mode) |
| `neutral-100` | `#F5F5F5` | خلفيات بطاقات، Skeleton |
| `neutral-200` | `#EAEAEA` | حدود، فواصل (Brand Light Gray) |
| `neutral-300` | `#D4D4D4` | حدود Inputs |
| `neutral-400` | `#A3A3A3` | نصوص placeholder |
| `neutral-500` | `#737373` | نصوص ثانوية |
| `neutral-600` | `#525252` | نصوص جسم عادية |
| `neutral-700` | `#404040` | عناوين فرعية |
| `neutral-800` | `#262626` | نصوص أساسية (Light Mode) |
| `neutral-900` | `#171717` | خلفية أساسية (Dark Mode) |
| `neutral-950` | `#0A0A0A` | أعمق خلفية Dark Mode |

### الألوان الدلالية (Semantic Colors)
| Token | Hex | الاستخدام |
|---|---|---|
| `success-500` | `#16A34A` | رسائل نجاح، حالة طلب مكتمل |
| `warning-500` | `#F59E0B` | تنبيهات، مخزون منخفض |
| `error-500` | `#DC2626` | أخطاء، حذف، فشل دفع |
| `info-500` | `#0EA5E9` | معلومات عامة، تلميحات |

**قاعدة التباين (Contrast):** كل نص أساسي يحقق نسبة تباين ≥ 4.5:1 مع خلفيته (WCAG AA) — تم التحقق من `primary-900` على أبيض (نسبة ~13:1 ✅) ومن `accent-900` على `accent-500` (نسبة ~5.2:1 ✅).

---

## 3. Typography

| العنصر | القيمة |
|---|---|
| خط العربية | **Cairo** (Google Fonts) — أوزان 400/500/600/700/800، طابع رياضي هندسي حديث |
| خط الإنجليزية/الأرقام | **Inter** — وضوح ممتاز في الواجهات الرقمية |
| التحميل | عبر `next/font` (Self-hosted، بدون Layout Shift، أداء أفضل من CDN خارجي) |

### المقياس النصي (Type Scale)
| Token | الحجم | ارتفاع السطر | الوزن | الاستخدام |
|---|---|---|---|---|
| `text-display` | 3.5rem (56px) | 1.1 | 800 | عناوين Hero فقط |
| `text-h1` | 2.5rem (40px) | 1.2 | 700 | عنوان الصفحة الرئيسي |
| `text-h2` | 2rem (32px) | 1.25 | 700 | عناوين الأقسام |
| `text-h3` | 1.5rem (24px) | 1.3 | 600 | عناوين فرعية / أسماء البطاقات |
| `text-h4` | 1.25rem (20px) | 1.4 | 600 | عناوين صغيرة |
| `text-body-lg` | 1.125rem (18px) | 1.6 | 400 | مقدمات، نصوص تعريفية |
| `text-body` | 1rem (16px) | 1.6 | 400 | النص الأساسي (لا يقل أبدًا عن 16px لضمان القراءة على الموبايل) |
| `text-body-sm` | 0.875rem (14px) | 1.5 | 400 | نصوص ثانوية، Labels |
| `text-caption` | 0.75rem (12px) | 1.4 | 500 | Badges، Timestamps، حقوق النشر |

---

## 4. نظام المسافات (Spacing — 8pt Grid)

يعتمد على مقياس Tailwind الافتراضي (وحدة = 4px)، مع الالتزام بمضاعفات 8 كقاعدة أساسية والاستثناء فقط للتفاصيل الدقيقة:

| Token | القيمة | الاستخدام |
|---|---|---|
| `space-1` | 4px | فجوات دقيقة جدًا (بين أيقونة ونص ملاصق) |
| `space-2` | 8px | فجوة أساسية صغرى |
| `space-3` | 12px | Padding داخل Inputs/Badges |
| `space-4` | 16px | Padding بطاقات على Mobile |
| `space-6` | 24px | Padding بطاقات على Desktop، فجوات بين عناصر فورم |
| `space-8` | 32px | فجوات بين مكونات داخل قسم |
| `space-12` | 48px | فجوات بين أقسام فرعية |
| `space-16` | 64px | فجوات بين أقسام رئيسية (Mobile) |
| `space-24` | 96px | فجوات بين أقسام رئيسية (Desktop) — كما ورد في Wireframes |

---

## 5. Border Radius

| Token | القيمة | الاستخدام |
|---|---|---|
| `radius-sm` | 4px | Badges، Chips الصغيرة |
| `radius-md` | 8px | Inputs، أزرار صغيرة |
| `radius-lg` | 12px | Buttons، Cards |
| `radius-xl` | 16px | Cards كبيرة، Modals |
| `radius-2xl` | 24px | أقسام Hero، بطاقات مميزة |
| `radius-full` | 9999px | Avatars، Pills، Chips قابلة للحذف |

---

## 6. الظلال ومستويات الارتفاع (Shadows & Elevation)

| Token | القيمة (Box Shadow) | الاستخدام |
|---|---|---|
| `elevation-0` | none | عناصر مسطحة (Flat cards بحدود فقط) |
| `elevation-1` | `0 1px 2px rgba(2,40,89,0.05)` | بطاقات في حالة السكون |
| `elevation-2` | `0 4px 6px rgba(2,40,89,0.08)` | بطاقات عند Hover |
| `elevation-3` | `0 10px 15px rgba(2,40,89,0.10)` | Dropdowns، Popovers |
| `elevation-4` | `0 20px 25px rgba(2,40,89,0.15)` | Modals، Dialogs |
| `elevation-5` | `0 25px 50px rgba(2,40,89,0.20)` | Toasts (أعلى مستوى عائم) |

**ملاحظة:** الظل مبني على لون العلامة (`primary-900` بشفافية منخفضة) بدل الأسود الخام — يمنح إحساسًا أكثر انسجامًا مع الهوية بدل ظل رمادي عام.

---

## 7. الأيقونات (Icons)

- **المكتبة:** `lucide-react` (Stroke-based، خفيفة، متوافقة مع React/Next.js).
- **السماكة:** `1.5px` افتراضيًا، `2px` للحالات النشطة/المُبرزة.
- **الأحجام القياسية:** `16px` (داخل نص)، `20px` (أزرار)، `24px` (تنقل)، `32px` (بارزة/Empty States).
- **الاتجاه:** أيقونات الاتجاه (Arrow, Chevron) تُعكس أفقيًا تلقائيًا في وضع RTL عبر `transform: scaleX(-1)`.

---

## 8. المكونات (Components)

### 8.1 Buttons
| Variant | الخلفية | النص | الاستخدام |
|---|---|---|---|
| `primary` | `primary-900` | أبيض | إجراءات هيكلية (متابعة، عرض التفاصيل) |
| `accent` (CTA) | `accent-500` | `primary-900` | إجراءات تحويلية عالية الأهمية (أضف للسلة، اشترك الآن) |
| `outline` | شفاف، حدود `primary-900` | `primary-900` | إجراءات ثانوية |
| `ghost` | شفاف تمامًا | `primary-900` | إجراءات منخفضة الأهمية داخل قوائم |
| `destructive` | `error-500` | أبيض | حذف، إلغاء اشتراك |

**الأحجام:** `sm` (32px)، `md` (40px)، `lg` (48px) — الحد الأدنى لارتفاع أي زر قابل للمس هو 44px على الموبايل (معيار إمكانية الوصول).
**الحالات:** `default`, `hover`, `active`, `focus-visible` (حلقة تركيز 2px بلون `accent-500`), `disabled` (شفافية 50%), `loading` (Spinner يستبدل النص).

### 8.2 Inputs
- الارتفاع: 44px (كل الأجهزة — لا فرق، لضمان سهولة اللمس دائمًا).
- الحدود: `1px neutral-300`، عند التركيز: `2px primary-500` + حلقة خفيفة.
- حالة الخطأ: حدود `error-500` + نص توضيحي أسفل الحقل بلون `error-500` وأيقونة تحذير.
- التسمية (Label) دائمًا أعلى الحقل (لا Placeholder-as-label — يضر بإمكانية الوصول وتجربة المستخدم).

### 8.3 Cards
- Padding: `24px` (Desktop) / `16px` (Mobile). Radius: `radius-lg`. Elevation: `1` سكون → `2` عند Hover (مع `transition: 200ms`).

### 8.4 Badges & Chips
- **Badge:** غير تفاعلي، `radius-full`, padding `4px 10px`, `text-caption`. Variants: `default` (neutral), `success`, `warning`, `error`, `accent` (لتمييز "جديد"/"مميز").
- **Chip:** تفاعلي (قابل للحذف)، نفس شكل Badge + أيقونة `X` — يُستخدم في عرض الفلاتر النشطة.

### 8.5 Alerts
حد جانبي ملوّن `4px` حسب النوع + أيقونة + عنوان + وصف + زر إغلاق اختياري. Variants تطابق الألوان الدلالية (info/success/warning/error).

### 8.6 Tables
- رأس الجدول: خلفية `neutral-50`، خط `600`. الصفوف: حد سفلي `1px neutral-200`، Hover بخلفية `neutral-50`.
- **Responsive:** تتحول لبطاقات مكدّسة عموديًا على Mobile (كل صف = بطاقة، كل عمود = Label:Value).

### 8.7 Modals / Dialogs
- العرض الأقصى: 480–640px. Radius: `xl`. Elevation: `4`. الخلفية: طبقة `primary-900` بشفافية 50% + Blur خفيف.
- **Mobile:** تتحول تلقائيًا لـ Bottom Sheet (شكل `shadcn Sheet`) بدل Modal مركزي — أسهل بالإبهام.
- **Focus Trap** إلزامي (لا يخرج التنقل بـ Tab خارج الـ Modal أثناء فتحه) — متطلب WCAG.

### 8.8 Toasts
- الموضع: أسفل-يمين (Desktop) / أسفل-وسط فوق Bottom Navigation (Mobile). Radius: `lg`. Elevation: `5`.
- مدة العرض التلقائي: 4–6 ثوانٍ. حد أقصى 3 Toasts متراكمة في نفس الوقت.

### 8.9 Navigation
موضّح بالتفصيل في وثيقة Wireframes — الرموز المستخدمة هنا: ارتفاع Header `72px` (Desktop) / `64px` (Mobile)، ارتفاع Bottom Nav `64px` + `safe-area-inset-bottom` (لدعم iOS).

### 8.10 Forms
- التحقق (Validation) يحدث عند مغادرة الحقل (`onBlur`)، وليس مع كل ضغطة مفتاح — يقلل الإحساس بالإزعاج.
- علامة `*` بلون `accent-700` بجانب الحقول الإلزامية.
- عند نجاح التحقق: أيقونة ✓ خضراء صغيرة داخل الحقل (تعزيز إيجابي فوري).

### 8.11 Charts
- المكتبة: `recharts`. الألوان: السلسلة الأساسية بـ `primary-700`، خط الهدف/المقارنة بـ `accent-500`. الشبكة (Grid lines) بلون `neutral-200` خفيف. Tooltip بتصميم بطاقة (`elevation-3`).

---

## 9. الحركة والانتقالات (Motion & Animation)

| Token | المدة | الاستخدام |
|---|---|---|
| `motion-fast` | 150ms | تفاعلات دقيقة (ضغط زر، Hover) |
| `motion-base` | 250ms | فتح Dropdown، تبديل Tab |
| `motion-slow` | 400ms | دخول Modal، انتقال صفحة |

- **Easing:** `ease-out` للعناصر الداخلة، `ease-in` للخارجة، `spring` (Framer Motion) للتفاعلات الاحتفالية (فتح إنجاز جديد).
- **إمكانية الوصول:** كل الحركات تحترم `prefers-reduced-motion` — تُعطَّل الحركات غير الجوهرية تلقائيًا لمن يفعّل هذا الخيار في نظامه.

---

## 10. إمكانية الوصول (WCAG 2.2 AA)

| المتطلب | التطبيق |
|---|---|
| التباين اللوني | ≥ 4.5:1 للنص العادي، ≥ 3:1 للنص الكبير/عناصر الواجهة |
| حجم منطقة اللمس | ≥ 44×44px لكل عنصر تفاعلي على الموبايل |
| التركيز المرئي (Focus Visible) | حلقة تركيز 2px واضحة على كل عنصر تفاعلي — لا يُزال `outline` أبدًا بدون بديل |
| النص البديل للصور | إلزامي لكل صورة عبر حقل `alt_text` في جدول `media` |
| HTML الدلالي | استخدام `header`, `nav`, `main`, `footer`, `button` الصحيحة بدل `div` للكل |
| قابلية التنقل بلوحة المفاتيح | ترتيب Tab منطقي + رابط "تخطي إلى المحتوى" في بداية كل صفحة |
| إعلانات الأخطاء | رسائل الفورم تُعلن عبر `aria-live="polite"` لقارئات الشاشة |

---

## 11. نقاط الفصل المتجاوبة (Responsive Breakpoints)

متوافقة تمامًا مع Tailwind الافتراضي ومع تعريف Wireframes:
| Token | القيمة |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## 12. الوضع الداكن (Dark Mode — Future Ready)

يُبنى الآن عبر **CSS Variables** (نمط shadcn/ui القياسي: `--background`, `--foreground`, `--primary`, `--accent`...) في `globals.css`، مع `darkMode: 'class'` في Tailwind — التبديل يتم بإضافة/إزالة class `dark` على `<html>` (عبر `next-themes`).

| Token دلالي | Light Mode | Dark Mode |
|---|---|---|
| `--background` | `neutral-50` | `primary-950` |
| `--foreground` | `neutral-900` | `neutral-50` |
| `--primary` | `primary-900` | `primary-400` (أفتح لضمان تباين كافٍ على خلفية غامقة) |
| `--accent` | `accent-500` | `accent-500` (يبقى ثابتًا — يعمل جيدًا على الخلفيتين) |
| `--card` | أبيض | `primary-900` |
| `--border` | `neutral-200` | `neutral-800` |

**ملاحظة:** التفعيل الفعلي للـ Dark Mode ميزة لاحقة، لكن كل Token مصمم منذ الآن بحيث تفعيله لاحقًا = فقط إضافة `ThemeProvider` بدون أي إعادة هيكلة للألوان.

---

## 13. جاهزية التحويل التقني

- **Tailwind:** كل الـ Tokens أعلاه تُضاف مباشرة إلى `tailwind.config.ts` ضمن `theme.extend.colors/spacing/borderRadius/boxShadow`.
- **shadcn/ui:** الألوان الدلالية (`--primary`, `--accent`, `--destructive`...) تُطابق مباشرة نظام متغيرات shadcn الافتراضي — لا حاجة لإعادة تسمية أو تحويل.
- **Component Variants:** تُبنى لاحقًا (في مرحلة Development) عبر `class-variance-authority (CVA)` — النمط القياسي المستخدم من shadcn/ui لتعريف Variants (كما في جدول Buttons أعلاه).

---

## ✅ يرجى المراجعة والموافقة على:
- [ ] نظام الألوان الكامل (Primary, Accent, Neutral, Semantic)
- [ ] Typography (Cairo + Inter، المقياس النصي)
- [ ] Spacing (8pt Grid)، Border Radius، Shadows/Elevation
- [ ] مواصفات كل مكوّن (Buttons → Charts)
- [ ] Motion & Animation
- [ ] معايير Accessibility (WCAG 2.2 AA)
- [ ] Dark Mode Tokens (جاهزة للمستقبل)

بعد الموافقة، ننتقل مباشرة إلى **المرحلة 7: UI Kit كامل**.
