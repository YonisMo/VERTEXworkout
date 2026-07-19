export default function Hero() {
  return (
    <section className="bg-[#022859] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-70px)] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="mb-4 rounded-full border border-[#F2EA79] px-4 py-2 text-sm font-medium text-[#F2EA79]">
          Functional Fitness • Academy • Store
        </span>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
          Train Smarter.
          <br />
          Live Stronger.
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
          VERTEXworkout is your complete fitness ecosystem for functional
          training, education, professional coaching, and premium equipment.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition hover:scale-105">
            Start Training
          </button>

          <button className="rounded-xl border border-[#F2EA79] px-8 py-4 font-bold text-[#F2EA79] transition hover:bg-[#F2EA79] hover:text-[#022859]">
            Explore Programs
          </button>
        </div>

      </div>
    </section>
  );
}