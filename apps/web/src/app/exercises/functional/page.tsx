import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Functional Exercises | VERTEXworkout",
  description:
    "Professional functional exercise library focused on movement quality, stability, coordination, and athletic performance.",
};

const exercises = [
  {
    title: "Squat Patterns",
    description:
      "Develop lower body coordination, stability, and functional movement strength.",
  },
  {
    title: "Lunge Variations",
    description:
      "Improve balance, single-leg strength, and movement control.",
  },
  {
    title: "Loaded Carries",
    description:
      "Build full-body strength, grip endurance, and functional stability.",
  },
  {
    title: "Sandbag Training",
    description:
      "Develop real-world strength using unstable resistance and dynamic movement.",
  },
  {
    title: "Kettlebell Movements",
    description:
      "Improve power, conditioning, and total-body athletic performance.",
  },
  {
    title: "Bodyweight Training",
    description:
      "Build strength, control, and mobility using natural movement patterns.",
  },
];

export default function FunctionalExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Functional Exercises"
          subtitle="Training movements designed to improve strength, mobility, coordination, and everyday performance."
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