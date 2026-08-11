"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

import products from "@/data/store/products";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const categories = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
];

export default function StoreProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        value.length === 0 ||
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        <header className="mb-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#0F766E]">
            VERTEXworkout Store
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#022859] sm:text-5xl">
            All Products
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
            Explore VERTEXworkout training equipment, performance gear,
            swimming equipment, and sports products.
          </p>
        </header>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
                <SlidersHorizontal size={18} />
              </div>

              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      active
                        ? "bg-[#022859] text-[#F2EA79]"
                        : "bg-slate-100 text-slate-600 hover:bg-[#F2EA79] hover:text-[#022859]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <h2 className="text-2xl font-bold text-[#022859]">
              No products found
            </h2>

            <p className="mt-3 text-slate-500">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-xl bg-[#022859] px-6 py-3 text-sm font-bold text-[#F2EA79] transition hover:opacity-90"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const productImage =
                product.images.length > 0
                  ? product.images[0]
                  : "/placeholder.jpg";

              const hasOldPrice =
                product.oldPrice !== undefined &&
                product.oldPrice > product.price;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <Link
                    href={`/store/${product.slug}`}
                    className="block"
                  >
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-[#F2EA79] px-3 py-1.5 text-xs font-extrabold text-[#022859]">
                        {product.badge}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-slate-400">
                      {product.category}
                    </p>

                    <Link href={`/store/${product.slug}`}>
                      <h2 className="mt-2 text-xl font-extrabold text-[#022859] transition hover:text-[#0F766E]">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {product.shortDescription}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-2xl font-extrabold text-[#022859]">
                          {product.price.toLocaleString("en-US")} EGP
                        </p>

                        {hasOldPrice && (
                          <p className="mt-1 text-sm font-medium text-slate-400 line-through">
                            {product.oldPrice!.toLocaleString("en-US")} EGP
                          </p>
                        )}
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          product.stock > 10
                            ? "bg-green-100 text-green-700"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 10
                          ? "In Stock"
                          : product.stock > 0
                            ? "Low Stock"
                            : "Out of Stock"}
                      </span>
                    </div>

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
              );
            })}
          </section>
        )}
      </Container>
    </main>
  );
}