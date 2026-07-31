import {
  ArrowRight,
  Award,
  BookOpen,
  Dumbbell,
  ShoppingBag,
} from "lucide-react";

import Container from "@/components/ui/Container";

import HeroContent from "./HeroContent";
import HeroScroll from "./HeroScroll";
import HeroStats from "./HeroStats";
import HeroTrust from "./HeroTrust";

const heroData = {
  badge: "FUNCTIONAL FITNESS • ACADEMY • STORE",

  title: {
    line1: "Train Smarter.",
    line2: "Perform Better.",
    highlight: "Live Stronger.",
  },

  description:
    "VERTEXworkout combines world-class education, functional training, premium equipment, and professional coaching into one complete ecosystem built for athletes, coaches, and fitness enthusiasts.",

  buttons: [
    {
      label: "Start Training",
      href: "/programs",
      variant: "primary" as const,
      icon: ArrowRight,
    },
    {
      label: "Visit Store",
      href: "/store",
      variant: "secondary" as const,
      icon: ShoppingBag,
    },
  ],

  stats: [
    {
      value: "500+",
      label: "Training Programs",
      icon: Dumbbell,
    },
    {
      value: "150+",
      label: "Professional Courses",
      icon: BookOpen,
    },
    {
      value: "1000+",
      label: "Athletes",
      icon: Award,
    },
    {
      value: "Premium",
      label: "Equipment",
      icon: ShoppingBag,
    },
  ],

  trust: [
    "Functional Training",
    "Performance",
    "Education",
    "Recovery",
    "Coaching",
    "Equipment",
  ],
} as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#022859] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#022859] via-[#04336d] to-[#011d42]" />

      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#F2EA79]/10 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid min-h-screen items-center gap-16 py-24 lg:grid-cols-[1.2fr_0.8fr]">

          <HeroContent data={heroData} />

          <div className="space-y-8">
            <HeroStats stats={heroData.stats} />

            <HeroTrust items={heroData.trust} />
          </div>

        </div>
      </Container>

      <HeroScroll />
    </section>
  );
}