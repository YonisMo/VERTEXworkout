import {
  ArrowRight,
  BookOpen,
  Dumbbell,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

export const heroData = {
  badge: "Functional Training • Academy • Equipment",

  title: {
    line1: "Train Smarter.",
    line2: "Perform Better.",
    highlight: "Become Stronger.",
  },

  description:
    "VERTEXworkout is a complete functional fitness ecosystem combining elite coaching, professional education, premium equipment, and performance-driven training programs.",

  buttons: [
    {
      label: "Start Your Journey",
      href: "/programs",
      variant: "primary",
      icon: ArrowRight,
    },
    {
      label: "Explore Academy",
      href: "/academy",
      variant: "secondary",
      icon: BookOpen,
    },
  ],

  stats: [
    {
      value: "1000+",
      label: "Active Members",
      icon: Users,
    },
    {
      value: "500+",
      label: "Training Programs",
      icon: Dumbbell,
    },
    {
      value: "150+",
      label: "Exercises",
      icon: ShieldCheck,
    },
    {
      value: "Premium",
      label: "Equipment",
      icon: ShoppingBag,
    },
  ],

  trust: [
    "Functional Training",
    "Fitness Academy",
    "Premium Equipment",
    "Professional Coaching",
  ],
} as const;