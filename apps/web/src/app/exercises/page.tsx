import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Exercises | VERTEXworkout",
  description:
    "Professional exercise library including functional training, strength, mobility, conditioning, and performance exercises.",
};

const categories = [
  {
    title: "Strength Exercises",
    description:
      "Build muscular strength using structured resistance training methods and progressive exercises.",
    href: "/exercises/strength",
  },
  {
    title: "Functional Exercises",
    description:
      "Improve movement quality, stability, coordination, and real-life performance.",
    href: "/exercises/functional",
  },
  {
    title: "Mobility Exercises",
    description:
      "Develop flexibility, joint mobility, and better movement efficiency.",
    href: "/exercises/mobility",
  },
  {
    title: "Conditioning Exercises",
    description:
      "Improve endurance, stamina, and cardiovascular performance through effective conditioning methods.",
    href: "/exercises/conditioning",
  },
  {
    title: "Sports Performance Exercises",
    description:
      "Train speed, power, agility, reaction, and athletic performance abilities.",
    href: "/exercises/performance",
  },
  {
    title: "Corrective Exercises",
    description:
      "Support movement improvement, stability, and injury prevention through targeted exercises.",
    href: "/exercises/corrective",
  },
];

export default function ExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Exercise Library"
          subtitle="A professional exercise database covering strength, mobility, conditioning, and athletic performance."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#022859]">
                {category.title}
              </h2>

              <p className="mb-8 leading-8 text-slate-600">
                {category.description}
              </p>

              <Button href={category.href} size="md">
                Explore
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}