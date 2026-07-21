import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Boxing Fitness Coach Program | VERTEXworkout Academy",
  description:
    "Professional boxing fitness education covering conditioning, technique, coaching methods, and performance training.",
};

const topics = [
  "Boxing Fitness Fundamentals",
  "Technique & Movement Principles",
  "Conditioning Program Design",
  "Speed, Agility & Reaction Training",
  "Pad Work & Coaching Methods",
  "Boxing Fitness Session Planning",
];

export default function BoxingFitnessProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Boxing Fitness Coach Program"
          subtitle="Learn how to create professional boxing fitness sessions combining technique, conditioning, and performance training."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Become a Boxing Fitness Coach
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            The VERTEXworkout Boxing Fitness Coach Program develops the skills
            needed to design effective boxing-based workouts focused on
            endurance, coordination, power, movement quality, and client
            performance.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-2xl bg-slate-50 p-5 font-semibold text-[#022859]"
              >
                {topic}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/contact" size="lg">
              Join Program
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}