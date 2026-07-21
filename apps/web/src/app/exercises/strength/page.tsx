import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Strength Exercises | VERTEXworkout",
  description:
    "Professional strength exercise library covering resistance training, muscle development, and performance improvement.",
};

const exercises = [
  {
    title: "Squat Variations",
    description:
      "Develop lower body strength, stability, and movement control through progressive squat patterns.",
  },
  {
    title: "Deadlift Variations",
    description:
      "Build posterior chain strength and improve functional lifting performance.",
  },
  {
    title: "Push Exercises",
    description:
      "Strengthen upper body pushing muscles using structured resistance movements.",
  },
  {
    title: "Pull Exercises",
    description:
      "Improve back strength, posture, and upper body pulling performance.",
  },
  {
    title: "Core Strength Exercises",
    description:
      "Develop trunk stability, control, and force transfer for better performance.",
  },
  {
    title: "Power Strength Exercises",
    description:
      "Combine strength and speed to improve explosive athletic performance.",
  },
];

export default function StrengthExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Strength Exercises"
          subtitle="Build strength, stability, and performance through professional resistance training methods."
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

        <div className="mt-12 text-center">
          <Button href="/contact" size="lg">
            Get Training Support
          </Button>
        </div>
      </Container>
    </main>
  );
}