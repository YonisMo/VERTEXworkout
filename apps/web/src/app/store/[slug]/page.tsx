"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import Container from "@/components/ui/Container";
import ProductGallery from "@/components/store/ProductGallery";
import ProductInfo from "@/components/store/ProductInfo";
import { ProductService } from "@/services/product.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);

  const product = ProductService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-slate-50 py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          <ProductInfo product={product} />
        </div>
      </Container>
    </main>
  );
}