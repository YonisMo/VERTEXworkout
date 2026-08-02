"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#022859]">
            Your Cart is Empty
          </h1>

          <p className="mt-5 text-slate-600">
            Start shopping to add products.
          </p>

          <Link
            href="/store"
            className="mt-8 inline-block rounded-2xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition hover:scale-105"
          >
            Go To Store
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-extrabold text-[#022859]">
          Shopping Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Cart Items */}

          <div className="space-y-6 lg:col-span-2">

            {cart.map((item) => (

              <div
                key={item.id}
                className="rounded-3xl bg-white p-6 shadow"
              >
                <div className="flex flex-col gap-6 md:flex-row">

                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-slate-100">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-[#022859]">
                      {item.name}
                    </h2>

                    <p className="mt-3 text-3xl font-bold text-[#022859]">
                      {item.price * item.quantity} EGP
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.price} EGP × {item.quantity}
                    </p>

                    <div className="mt-6 flex items-center gap-3">

                      <button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-xl border px-4 py-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        -
                      </button>

                      <span className="w-8 text-center text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-xl border px-4 py-2 transition hover:bg-slate-100"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-fit rounded-xl border border-red-500 px-5 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>

                </div>
              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-8 text-3xl font-bold text-[#022859]">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-3xl font-bold text-[#022859]">
                <span>Total</span>
                <span>{totalPrice} EGP</span>
              </div>

            </div>

            <Link
              href="/store/checkout"
              className="mt-8 block rounded-2xl bg-[#F2EA79] py-4 text-center text-xl font-bold text-[#022859] transition hover:scale-105"
            >
              Proceed To Checkout
            </Link>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-2xl border border-red-500 py-4 font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              Clear Cart
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}