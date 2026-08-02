"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
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
            Add some products before checkout.
          </p>

          <Link
            href="/store"
            className="mt-8 inline-block rounded-2xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition hover:scale-105"
          >
            Back To Store
          </Link>
        </div>
      </main>
    );
  }

  function placeOrder() {
    clearCart();
    router.push("/store/success");
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-extrabold text-[#022859]">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Billing */}

          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-8 text-3xl font-bold text-[#022859]">
              Billing Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <input
                type="text"
                placeholder="First Name"
                className="rounded-xl border p-4"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="rounded-xl border p-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="rounded-xl border p-4 md:col-span-2"
              />

              <input
                type="tel"
                placeholder="Phone"
                className="rounded-xl border p-4 md:col-span-2"
              />

              <input
                type="text"
                placeholder="City"
                className="rounded-xl border p-4"
              />

              <input
                type="text"
                placeholder="Country"
                className="rounded-xl border p-4"
              />

              <textarea
                rows={4}
                placeholder="Shipping Address"
                className="rounded-xl border p-4 md:col-span-2"
              />

            </div>

          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-8 text-3xl font-bold text-[#022859]">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    {item.price * item.quantity} EGP
                  </span>
                </div>
              ))}

              <hr />

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

            <button
              onClick={placeOrder}
              className="mt-10 w-full rounded-2xl bg-[#022859] py-4 text-xl font-bold text-white transition hover:opacity-90"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}