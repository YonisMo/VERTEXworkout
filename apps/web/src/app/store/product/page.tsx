"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import { ProductService } from "@/services/product.service";
import { useCart } from "@/context/CartContext";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);

  const product = ProductService.getBySlug(slug);

  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white p-8 shadow-xl">
            <div className="relative aspect-square w-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full bg-[#F2EA79] px-5 py-2 font-bold text-[#022859]">
              {product.badge}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold text-[#022859]">
              {product.name}
            </h1>

            <p className="mt-8 text-lg leading-9 text-slate-600">
              {product.description}
            </p>

            <div className="mt-8 text-5xl font-extrabold text-[#022859]">
              {product.price} EGP
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button onClick={() => addToCart(product)}>
                Add To Cart
              </Button>

              <Button variant="outline">
                Buy Now
              </Button>
            </div>

            <div className="mt-14 rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-[#022859]">
                Product Features
              </h2>

              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-lg text-slate-700"
                  >
                    <span className="text-green-600">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}