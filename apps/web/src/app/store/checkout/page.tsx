export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-extrabold text-[#022859]">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Billing Information */}

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
                placeholder="Shipping Address"
                rows={4}
                className="rounded-xl border p-4 md:col-span-2"
              />

            </div>

          </div>

          {/* Order Summary */}

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

            <button className="mt-10 w-full rounded-2xl bg-[#022859] py-4 text-xl font-bold text-white transition hover:opacity-90">
              Place Order
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}