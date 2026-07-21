import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="max-w-2xl rounded-3xl bg-white p-12 shadow-xl text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="mt-8 text-5xl font-extrabold text-[#022859]">
          Order Confirmed
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Thank you for shopping with VERTEXworkout.
          Your order has been received successfully.
          Our team will contact you shortly to confirm shipping details.
        </p>

        <div className="mt-10 rounded-2xl bg-slate-50 p-6">

          <p className="text-gray-500">
            Order Number
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#022859]">
            #VX20260001
          </h2>

        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Link
            href="/store"
            className="rounded-2xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition hover:scale-105"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-2xl border-2 border-[#022859] px-8 py-4 font-bold text-[#022859] transition hover:bg-[#022859] hover:text-white"
          >
            Back Home
          </Link>

        </div>

      </div>

    </main>
  );
}