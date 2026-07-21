import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Corrective Exercise Program | VERTEXworkout Academy",
  description:
    "Professional corrective exercise education covering movement assessment, mobility, stability, and injury prevention principles.",
};

const topics = [
  "Movement Assessment Fundamentals",
  "Posture & Movement Analysis",
  "Mobility Training Methods",
  "Stability & Core Development",
  "Injury Prevention Principles",
  "Corrective Program Design",
];

export default function CorrectiveExerciseProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Corrective Exercise Program"
          subtitle="Develop the skills to analyze movement and design corrective training strategies."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Improve Movement Quality & Performance
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            The VERTEXworkout Corrective Exercise Program teaches coaches how
            to understand movement limitations, improve mobility and
            stability, and create safer training experiences for different
            populations.
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