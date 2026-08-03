"use client";

import { useState } from "react";
import Image from "next/image";
import ProductThumbnail from "./ProductThumbnail";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-100">
        <span className="text-slate-500">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <Image
          src={images[selectedImage]}
          alt={productName}
          width={700}
          height={700}
          priority
          className="aspect-square w-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <ProductThumbnail
              key={index}
              image={image}
              active={selectedImage === index}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}