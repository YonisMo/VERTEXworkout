"use client";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();

  return (
    <div>
      {/* Badge */}

      <span className="inline-block rounded-full bg-[#F2EA79] px-5 py-2 font-bold text-[#022859]">
        {product.badge}
      </span>

      {/* Product Name */}

      <h1 className="mt-6 text-5xl font-extrabold text-[#022859]">
        {product.name}
      </h1>

      {/* Description */}

      <p className="mt-8 text-lg leading-9 text-slate-600">
        {product.description}
      </p>

      {/* Price */}

      <div className="mt-8 text-5xl font-extrabold text-[#022859]">
        {product.price} EGP
      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={() => addToCart(product)}>
          Add To Cart
        </Button>

        <Button variant="outline">
          Buy Now
        </Button>
      </div>

      {/* Features */}

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
  );
}