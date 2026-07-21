export default function StoreHero() {
  return (
    <section className="bg-[#022859] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <h1 className="text-5xl font-extrabold">
          VERTEX Store
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-white/90">
          Professional Functional Training Equipment,
          Premium Apparel,
          Innovative Sports Accessories
          and Exclusive VERTEX Products.
        </p>

        <div className="mt-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-2xl border-0 bg-white p-5 text-lg text-slate-800 shadow-xl outline-none"
          />
        </div>

      </div>
    </section>
  );
}