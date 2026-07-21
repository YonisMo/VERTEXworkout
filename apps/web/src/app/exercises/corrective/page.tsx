import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Corrective Exercises | VERTEXworkout",
  description:
    "Professional corrective exercise library focused on movement quality, stability, mobility, and injury prevention.",
};

const exercises = [
  {
    title: "Core Stability Exercises",
    description:
      "Improve trunk control, stability, and movement efficiency for safer performance.",
  },
  {
    title: "Balance Training",
    description:
      "Develop body control, coordination, and joint stability through balance exercises.",
  },
  {
    title: "Activation Exercises",
    description:
      "Prepare muscles for movement and improve neuromuscular connection.",
  },
  {
    title: "Mobility Correction Drills",
    description:
      "Address movement limitations and improve functional range of motion.",
  },
  {
    title: "Posture Improvement Exercises",
    description:
      "Support better alignment and movement habits through targeted training.",
  },
  {
    title: "Joint Stability Exercises",
    description:
      "Strengthen supporting muscles around joints to improve control and resilience.",
  },
];

export default function CorrectiveExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Corrective Exercises"
          subtitle="Improve movement quality, stability, and physical readiness through targeted corrective training."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#022859]">
                {exercise.title}
              </h2>

              <p className="leading-8 text-slate-600">
                {exercise.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}