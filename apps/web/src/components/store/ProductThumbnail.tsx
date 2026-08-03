"use client";

import Image from "next/image";

interface ProductThumbnailProps {
  image: string;
  active: boolean;
  onClick: () => void;
}

export default function ProductThumbnail({
  image,
  active,
  onClick,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
        active
          ? "border-[#F2EA79] shadow-lg"
          : "border-transparent hover:border-[#F2EA79]/60"
      }`}
    >
      <Image
        src={image}
        alt="Product Thumbnail"
        width={90}
        height={90}
        className="h-[90px] w-[90px] object-cover"
      />
    </button>
  );
}