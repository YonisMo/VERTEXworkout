import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Services />
    </>
  );
}