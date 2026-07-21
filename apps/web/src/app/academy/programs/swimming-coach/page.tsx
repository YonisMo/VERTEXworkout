import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Swimming Coach Program | VERTEXworkout Academy",
  description:
    "Professional swimming coach education covering technique, programming, athlete development, and coaching methods.",
};

const topics = [
  "Swimming Technique Analysis",
  "Training Program Design",
  "Beginner to Advanced Progressions",
  "Endurance & Performance Development",
  "Swimming Coaching Methodology",
  "Athlete Assessment & Improvement",
];

export default function SwimmingCoachProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Swimming Coach Program"
          subtitle="Develop professional swimming coaching skills through structured education and practical methods."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Build Professional Swimming Coaching Skills
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            The VERTEXworkout Swimming Coach Program is designed to help
            coaches understand swimming technique, training principles,
            programming methods, and athlete development from beginner to
            advanced levels.
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