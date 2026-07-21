export default function CartPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-extrabold text-[#022859]">
          Shopping Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="lg:col-span-2 space-y-6">

            <div className="rounded-3xl bg-white p-6 shadow">

              <div className="flex items-center gap-6">

                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-200">
                  Product
                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-bold text-[#022859]">
                    VERTEX Power Bag 20kg
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Training Equipment
                  </p>

                  <p className="mt-4 text-3xl font-bold text-[#022859]">
                    2200 EGP
                  </p>

                </div>

                <button className="rounded-xl border border-red-500 px-5 py-2 text-red-500 transition hover:bg-red-500 hover:text-white">
                  Remove
                </button>

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow h-fit">

            <h2 className="mb-8 text-3xl font-bold text-[#022859]">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>2200 EGP</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold text-[#022859]">
                <span>Total</span>
                <span>2200 EGP</span>
              </div>

            </div>

            <button className="mt-10 w-full rounded-2xl bg-[#F2EA79] py-4 text-xl font-bold text-[#022859] transition hover:scale-105">
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}