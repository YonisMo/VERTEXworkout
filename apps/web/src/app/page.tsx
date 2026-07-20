import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import Services from "@/components/sections/Services";
import Programs from "@/components/sections/Programs";
import StorePreview from "@/components/sections/StorePreview";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Statistics />

      <Services />

      <Programs />

      <StorePreview />
    </>
  );
}