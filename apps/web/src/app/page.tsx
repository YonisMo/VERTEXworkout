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
    <>
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
    </>
  );
}
