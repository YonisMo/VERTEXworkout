import Link from "next/link";

const categories = [
  {
    name: "Training Equipment",
    icon: "🏋️",
    description: "Power Bags, Resistance Equipment & Functional Training Gear",
    href: "/store",
  },
  {
    name: "Apparel",
    icon: "👕",
    description: "Performance T-Shirts, Shorts, Caps & Sportswear",
    href: "/store",
  },
  {
    name: "Bags",
    icon: "🎒",
    description: "Backpacks, Gym Bags & Storage Solutions",
    href: "/store",
  },
  {
    name: "Protection",
    icon: "🛡️",
    description: "Wrist Wraps, Belts & Protective Accessories",
    href: "/store",
  },
  {
    name: "Swimming",
    icon: "🏊",
    description: "Swimming Vests & Water Training Equipment",
    href: "/store",
  },
  {
    name: "Future Innovations",
    icon: "🚀",
    description: "Water Wheel, Resistance Parachute, Weight Shield & More",
    href: "/store",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 font-tajawal" dir="ltr">
      <div className="mx-auto max-w-7xl px-6">
        {/* رأس القسم مع توسيط دقيق */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#F2EA79] px-4 py-1.5 text-xs font-bold text-[#022859] shadow-sm mb-4">
            CATEGORIES
          </span>
          <h1 className="mb-4 font-cairo text-4xl lg:text-5xl font-black text-[#022859]">
            Product Categories
          </h1>
          <p className="mb-14 text-base lg:text-lg text-slate-600 max-w-xl mx-auto">
            Explore all VERTEXworkout product categories designed for maximum performance.
          </p>
        </div>

        {/* شبكة الأقسام مع توسيط محتويات كل بطاقة */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200"
            >
              {/* أيقونة دائرية أنيقة ومبتكرة */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-4xl shadow-inner transition group-hover:scale-110">
                {category.icon}
              </div>

              {/* العنوان */}
              <h2 className="mb-3 font-cairo text-xl font-bold text-[#022859] transition group-hover:text-blue-600">
                {category.name}
              </h2>

              {/* التفاصيل والوصف */}
              <p className="mb-6 text-sm leading-relaxed text-slate-500">
                {category.description}
              </p>

              {/* زر التصفح مع تأثير بصري */}
              <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-[#022859] group-hover:underline">
                Browse Products <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}