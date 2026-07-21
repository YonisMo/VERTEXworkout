"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { ProductService } from "@/services/product.service";
import { useCart } from "@/context/CartContext";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const { addToCart } = useCart();

  const { slug } = use(params);

  const product = ProductService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full rounded-2xl object-cover"
            />
          </div>

          <div>
            <span className="inline-block rounded-full bg-[#F2EA79] px-5 py-2 font-semibold text-[#022859]">
              {product.badge}
            </span>

            <h1 className="mt-6 text-5xl font-black text-[#022859]">
              {product.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mt-8 text-5xl font-black text-[#022859]">
              {product.price} EGP
            </div>

            <div className="mt-10 flex gap-5">
              <button
                onClick={() => addToCart(product)}
                className="rounded-xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition duration-300 hover:scale-105"
              >
                Add To Cart
              </button>

              <button className="rounded-xl border-2 border-[#022859] px-8 py-4 font-bold text-[#022859] transition duration-300 hover:bg-[#022859] hover:text-white">
                Buy Now
              </button>
            </div>

            <div className="mt-12 rounded-2xl bg-white p-8 shadow">
              <h2 className="mb-5 text-2xl font-bold text-[#022859]">
                Product Features
              </h2>

              <ul className="space-y-4 text-lg text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>✅ {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}