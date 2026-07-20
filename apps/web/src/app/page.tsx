import { Navbar, Footer } from "@/components/layout";

import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import Services from "@/components/sections/Services";
import Programs from "@/components/sections/Programs";
import StorePreview from "@/components/sections/StorePreview";
import AcademyPreview from "@/components/sections/AcademyPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Statistics />
        <Services />
        <Programs />
        <StorePreview />
        <AcademyPreview />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}