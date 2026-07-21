import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Why from "@/components/home/Why";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Why />
      <Services />
      <Statistics />
      <CTA />
    </>
  );
}