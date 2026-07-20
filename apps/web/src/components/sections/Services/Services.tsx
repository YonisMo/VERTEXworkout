import {
  Container,
  Section,
  SectionTitle,
} from "@/components/ui/layout";

import {
  Dumbbell,
  HeartPulse,
  Target,
  Trophy,
} from "lucide-react";

const services = [
  {
    icon: Dumbbell,
    title: "Functional Training",
    description:
      "Build real-world strength, mobility and athletic performance.",
  },
  {
    icon: HeartPulse,
    title: "Fat Loss",
    description:
      "Personalized programs to burn fat while maintaining muscle.",
  },
  {
    icon: Target,
    title: "Personal Coaching",
    description:
      "One-on-one coaching tailored to your goals.",
  },
  {
    icon: Trophy,
    title: "Athletic Performance",
    description:
      "Improve speed, power, agility and endurance.",
  },
];

export default function Services() {
  return (
    <Section className="bg-white">
      <Container>

        <SectionTitle
          title="Our Services"
          subtitle="Professional coaching designed to transform your fitness journey."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon
                  size={42}
                  className="mb-6 text-[#022859]"
                />

                <h3 className="mb-3 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}

        </div>

      </Container>
    </Section>
  );
}