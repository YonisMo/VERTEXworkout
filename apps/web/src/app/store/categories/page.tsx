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
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-4 text-center text-5xl font-black text-[#022859]">
          Product Categories
        </h1>

        <p className="mb-14 text-center text-lg text-gray-600">
          Explore all VERTEXworkout product categories.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (

            <Link
              key={category.name}
              href={category.href}
              className="rounded-3xl bg-white p-8 shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 text-6xl">
                {category.icon}
              </div>

              <h2 className="mb-4 text-2xl font-bold text-[#022859]">
                {category.name}
              </h2>

              <p className="leading-7 text-gray-600">
                {category.description}
              </p>

              <div className="mt-8 font-bold text-[#022859]">
                Browse Products →
              </div>

            </Link>

          ))}

        </div>

      </div>
    </main>
  );
}