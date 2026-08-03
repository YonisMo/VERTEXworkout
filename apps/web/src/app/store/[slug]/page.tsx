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
    <main className="min-h-screen bg-slate-50 py-20">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Product Gallery */}

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Information */}

          <ProductInfo product={product} />
        </div>
      </Container>
    </main>
  );
}