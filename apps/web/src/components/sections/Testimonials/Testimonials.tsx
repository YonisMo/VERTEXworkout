import { Star } from "lucide-react";
import {
  Container,
  Section,
  SectionTitle,
} from "@/components/ui/layout";

const testimonials = [
  {
    name: "Ahmed Hassan",
    result: "Lost 12 kg",
    text: "VERTEXworkout completely changed my lifestyle. The coaching and support were outstanding.",
  },
  {
    name: "Mona Ali",
    result: "Improved Strength",
    text: "The functional training programs helped me become stronger and more confident.",
  },
  {
    name: "Youssef Mohamed",
    result: "Athletic Performance",
    text: "Professional coaching with measurable results. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionTitle
          title="Success Stories"
          subtitle="What our members say about VERTEXworkout."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="mb-6 text-gray-600">
                "{item.text}"
              </p>

              <h3 className="text-xl font-bold">
                {item.name}
              </h3>

              <p className="text-[#022859] font-semibold">
                {item.result}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}