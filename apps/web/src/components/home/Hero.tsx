import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center bg-[#022859] text-white">
      <Container className="text-center">

        <span className="inline-block rounded-full border border-[#F2EA79] px-6 py-3 font-semibold text-[#F2EA79]">
          Functional Fitness • Academy • Store
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          Train Smarter.
          <br />
          Live Stronger.
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-slate-300">
          VERTEXworkout is your complete ecosystem for Functional Training,
          Fitness Education, Premium Equipment and Professional Coaching.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link href="/programs">
            <Button>
              Start Training
            </Button>
          </Link>

          <Link href="/programs">
            <Button variant="secondary">
              Explore Programs
            </Button>
          </Link>

        </div>

      </Container>
    </section>
  );
}