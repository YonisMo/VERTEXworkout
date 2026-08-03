import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Exercises | VERTEXworkout",
  description:
    "Professional exercise library including functional training, strength, mobility, conditioning, and performance exercises",
};

const categories = [
  {
    title: "Strength Exercises",
    description:
      "Build muscular strength using structured resistance training methods and progressive exercises",
    href: "/exercises/strength",
  },
  {
    title: "Functional Exercises",
    description:
      "Improve movement quality, stability, coordination, and real-life performance",
    href: "/exercises/functional",
  },
  {
    title: "Mobility Exercises",
    description:
      "Develop flexibility, joint mobility, and better movement efficiency",
    href: "/exercises/mobility",
  },
  {
    title: "Conditioning Exercises",
    description:
      "Improve endurance, stamina, and cardiovascular performance through effective conditioning methods",
    href: "/exercises/conditioning",
  },
  {
    title: "Sports Performance Exercises",
    description:
      "Train speed, power, agility, reaction, and athletic performance abilities",
    href: "/exercises/performance",
  },
  {
    title: "Corrective Exercises",
    description:
      "Support movement improvement, stability, and injury prevention through targeted exercises",
    href: "/exercises/corrective",
  },
];

export default function ExercisesPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] py-24 font-tajawal" dir="ltr">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <SectionTitle
            title="Exercise Library"
            subtitle="A professional exercise database covering strength, mobility, conditioning, and athletic performance"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-[#E8D85A] bg-[#F2EA79] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="min-h-[52px] text-xl font-bold leading-6 text-[#022859] font-cairo">
                {category.title}
              </h2>

              <p className="mt-3 mb-6 flex-1 text-[16px] leading-8 text-[#022859]/85">
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