import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Personal Trainer Program | VERTEXworkout Academy",
  description:
    "A professional personal trainer education program covering exercise science, coaching skills, assessment, and practical training methods.",
};

const topics = [
  "Exercise Science Fundamentals",
  "Client Assessment & Goal Setting",
  "Training Program Design",
  "Strength & Conditioning Principles",
  "Coaching Communication Skills",
  "Injury Prevention Fundamentals",
];

export default function PersonalTrainerProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Personal Trainer Program"
          subtitle="Build the knowledge and practical skills required to become a professional fitness coach."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Become a Professional Coach
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            The VERTEXworkout Personal Trainer Program is designed to help
            aspiring coaches understand human movement, training principles,
            program design, and professional coaching practices.
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