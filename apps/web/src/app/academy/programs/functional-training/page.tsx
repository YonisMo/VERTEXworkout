import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Functional Training Program | VERTEXworkout Academy",
  description:
    "Professional functional training education program covering movement, strength, mobility, conditioning, and performance development.",
};

const topics = [
  "Functional Movement Fundamentals",
  "Mobility & Stability Training",
  "Strength Development Methods",
  "Conditioning & Energy Systems",
  "Exercise Selection & Progressions",
  "Functional Program Design",
];

export default function FunctionalTrainingProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Functional Training Program"
          subtitle="Learn how to design effective functional training systems for athletes and fitness clients."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Master Functional Performance Training
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            This program focuses on understanding human movement and building
            professional training systems that improve strength, mobility,
            stability, conditioning, and athletic performance.
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