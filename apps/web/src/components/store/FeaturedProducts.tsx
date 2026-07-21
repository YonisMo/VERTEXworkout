import Link from "next/link";

import products from "@/data/store/products";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          badge="Featured"
          title="Featured Products"
          subtitle="Discover our most popular functional fitness equipment and premium VERTEX products."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl bg-slate-50 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="h-64 overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              <div className="p-6">

                <span className="inline-block rounded-full bg-[#F2EA79] px-3 py-1 text-sm font-semibold text-[#022859]">
                  {product.badge}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-[#022859]">
                  {product.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  {product.category}
                </p>

                <p className="mt-5 text-3xl font-extrabold text-[#022859]">
                  {product.price} EGP
                </p>

                <Link
                  href={`/store/${product.slug}`}
                  className="mt-6 block"
                >
                  <Button className="w-full">
                    View Product
                  </Button>
                </Link>

              </div>

            </article>

          ))}

        </div>

      </Container>

    </section>
  );
}