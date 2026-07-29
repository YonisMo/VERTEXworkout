import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-[#022859] py-20 text-white">
      {/* خلفية تدرج ناعمة لإعطاء عمق فاخر */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#022859] via-[#022859]/95 to-[#022859]/90 pointer-events-none" />
      
      {/* دوائر توهج خفيفة بالأصفر الكحلي */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#F2EA79]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#A68986]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Badge */}
        <span className="inline-block rounded-full border border-[#F2EA79]/40 bg-[#022859] px-6 py-2.5 font-tajawal text-sm font-bold text-[#F2EA79] shadow-lg backdrop-blur-md">
          Functional Fitness • Academy • Store
        </span>

        {/* Title */}
        <h1 className="mt-8 font-cairo text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          Train Smarter.
          <br />
          <span className="text-[#F2EA79]">Live Stronger.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-3xl font-tajawal text-lg font-medium leading-relaxed text-[#BFB8BA] sm:text-xl lg:text-2xl">
          VERTEXworkout is your complete ecosystem for Functional Training,
          Fitness Education, Premium Equipment and Professional Coaching.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-5 font-tajawal">
          <Link href="/programs">
            <Button variant="primary" size="lg">
              Start Training
            </Button>
          </Link>

          <Link href="/programs">
            <Button variant="secondary" size="lg">
              Explore Programs
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}