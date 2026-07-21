import Link from "next/link";
import products from "@/data/store/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-12 text-5xl font-extrabold text-[#022859]">
          Featured Products
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="overflow-hidden rounded-3xl bg-slate-50 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="h-64 overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />

              </div>

              <div className="p-6">

                <span className="rounded-full bg-[#F2EA79] px-3 py-1 text-sm font-semibold text-[#022859]">
                  {product.badge}
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#022859]">
                  {product.name}
                </h3>

                <p className="mt-2 text-gray-500">
                  {product.category}
                </p>

                <p className="mt-4 text-2xl font-bold text-[#022859]">
                  {product.price} EGP
                </p>

                <Link
                  href={`/store/${product.slug}`}
                  className="mt-6 block w-full rounded-xl bg-[#F2EA79] py-3 text-center font-bold text-[#022859] transition hover:opacity-90"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}