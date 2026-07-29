import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Why from "@/components/home/Why";
import Services from "@/components/home/Services";
import Programs from "@/components/sections/Programs/Programs";
import AcademyPreview from "@/components/sections/AcademyPreview/AcademyPreview";
import StorePreview from "@/components/sections/StorePreview/StorePreview";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-tajawal text-[#022859] selection:bg-[#F2EA79] selection:text-[#022859]">
      <Hero />
      <Welcome />
      <Why />
      <Services />
      <Programs />
      <AcademyPreview />
      <StorePreview />
      <Statistics />
      <Testimonials />
      <CTA />
    </main>
  );
}