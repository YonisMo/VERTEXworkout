import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Conditioning Exercises | VERTEXworkout",
  description:
    "Professional conditioning exercise library focused on endurance, stamina, cardiovascular fitness, and athletic performance.",
};

const exercises = [
  {
    title: "HIIT Training",
    description:
      "High-intensity intervals designed to improve cardiovascular capacity and conditioning performance.",
  },
  {
    title: "Circuit Training",
    description:
      "Combination of exercises performed continuously to develop endurance and full-body fitness.",
  },
  {
    title: "Running Conditioning",
    description:
      "Structured running methods to improve aerobic capacity and athletic stamina.",
  },
  {
    title: "Battle Rope Training",
    description:
      "Dynamic conditioning exercises that improve power output and cardiovascular endurance.",
  },
  {
    title: "Sled Training",
    description:
      "Resistance-based conditioning to develop strength endurance and athletic power.",
  },
  {
    title: "Metabolic Conditioning",
    description:
      "Training methods designed to improve work capacity and overall physical performance.",
  },
];

export default function ConditioningExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Conditioning Exercises"
          subtitle="Improve endurance, stamina, and performance through professional conditioning methods."
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