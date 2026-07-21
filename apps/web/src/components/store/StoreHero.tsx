import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function StoreHero() {
  return (
    <section className="bg-[#022859] text-white">
      <Container className="py-24">

        <span className="inline-block rounded-full border border-[#F2EA79] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#F2EA79]">
          Premium Equipment
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          VERTEX Store
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
          Professional Functional Training Equipment, Premium Apparel,
          Innovative Sports Accessories and Exclusive VERTEX Products.
        </p>

        <div className="mt-10 max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-2xl bg-white p-5 text-lg text-slate-800 shadow-xl outline-none ring-0 placeholder:text-slate-400"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button>
            Shop Now
          </Button>

          <Button variant="outline">
            Browse Categories
          </Button>
        </div>

      </Container>
    </section>
  );
}