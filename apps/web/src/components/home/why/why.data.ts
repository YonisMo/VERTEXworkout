import {
  Award,
  BookOpen,
  Dumbbell,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

export const whyItems = [
  {
    id: 1,
    number: "01",
    title: "Premium Equipment",
    subtitle: "Built for Performance. Designed to Last.",
    icon: ShoppingBag,
    description:
      "Every piece of VERTEXworkout equipment is engineered to withstand intensive daily use while delivering maximum comfort, safety, and performance.",

    buttonText: "Explore Equipment Store",
    buttonLink: "/store",

    features: [
      "Professional VERTEX Power Bags",
      "Resistance Bands & Mini Bands",
      "Agility Ladders & Speed Equipment",
      "Balance & Stability Tools",
      "Commercial Grade Quality",
      "Indoor & Outdoor Ready",
    ],
  },

  {
    id: 2,
    number: "02",
    title: "Elite Academy",
    subtitle: "Learn. Coach. Lead.",
    icon: BookOpen,
    description:
      "Professional education programs that combine science, coaching experience, and practical application for coaches and fitness professionals.",

    buttonText: "Explore Academy",
    buttonLink: "/academy",

    features: [
      "Functional Training",
      "Strength & Conditioning",
      "Sports Performance",
      "Corrective Exercise",
      "Swimming Coaching",
      "Professional Certifications",
    ],
  },

  {
    id: 3,
    number: "03",
    title: "Complete Ecosystem",
    subtitle: "Everything Connected Together.",
    icon: Award,
    description:
      "Training, education, equipment, community, and technology combined into one complete fitness ecosystem.",

    buttonText: "Join VERTEX",
    buttonLink: "/register",

    features: [
      "Training Programs",
      "Equipment Store",
      "Exercise Library",
      "Progress Tracking",
      "Community",
      "Future Mobile App",
    ],
  },
] as const;

export const whyHeader = {
  badge: "WHY VERTEXWORKOUT",

  title: "Why Choose VERTEXworkout",

  subtitle:
    "We combine professional education, elite functional training, premium equipment, and continuous innovation into one complete ecosystem.",

  stats: [
    {
      icon: Users,
      value: "1000+",
      label: "Athletes",
    },
    {
      icon: Dumbbell,
      value: "500+",
      label: "Programs",
    },
    {
      icon: ShieldCheck,
      value: "Professional",
      label: "Quality",
    },
  ],
} as const;