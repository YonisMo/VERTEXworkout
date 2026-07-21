export default function ProductPage() {
  return (
    <main className="bg-slate-50 min-h-screen">

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Product Image */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

            <div className="flex h-[600px] items-center justify-center bg-slate-200">

              <span className="text-2xl font-bold text-slate-500">
                Product Image
              </span>

            </div>

          </div>

          {/* Product Info */}

          <div>

            <span className="rounded-full bg-[#F2EA79] px-4 py-2 font-semibold text-[#022859]">
              Featured Product
            </span>

            <h1 className="mt-6 text-5xl font-extrabold text-[#022859]">
              VERTEX Power Bag 20kg
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Professional Functional Training Power Bag built for
              strength, conditioning, athletic performance and
              high-intensity workouts.
            </p>

            <p className="mt-8 text-4xl font-extrabold text-[#022859]">
              2200 EGP
            </p>

            <div className="mt-10 flex gap-4">

              <button className="rounded-2xl bg-[#F2EA79] px-10 py-4 font-bold text-[#022859] transition hover:opacity-90">
                Add To Cart
              </button>

              <button className="rounded-2xl border-2 border-[#022859] px-10 py-4 font-bold text-[#022859] transition hover:bg-[#022859] hover:text-white">
                Buy Now
              </button>

            </div>

            <div className="mt-12 rounded-2xl bg-white p-8 shadow-md">

              <h2 className="mb-6 text-2xl font-bold text-[#022859]">
                Product Features
              </h2>

              <ul className="space-y-4 text-lg text-gray-600">

                <li>✔ Premium Heavy Duty Material</li>

                <li>✔ Reinforced Handles</li>

                <li>✔ Functional Training Design</li>

                <li>✔ Indoor & Outdoor Use</li>

                <li>✔ Designed by VERTEXworkout</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}