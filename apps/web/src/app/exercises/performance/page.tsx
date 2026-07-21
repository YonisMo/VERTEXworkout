import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Sports Performance Exercises | VERTEXworkout",
  description:
    "Professional sports performance exercise library focused on speed, power, agility, reaction, and athletic development.",
};

const exercises = [
  {
    title: "Speed Training Drills",
    description:
      "Develop acceleration, maximum speed, and movement efficiency for athletic performance.",
  },
  {
    title: "Agility Ladder Drills",
    description:
      "Improve footwork, coordination, balance, and rapid movement control.",
  },
  {
    title: "Plyometric Exercises",
    description:
      "Build explosive power and improve athletic movement capabilities.",
  },
  {
    title: "Reaction Training",
    description:
      "Enhance decision-making speed, coordination, and neuromuscular response.",
  },
  {
    title: "Explosive Power Exercises",
    description:
      "Develop force production and athletic power through dynamic movements.",
  },
  {
    title: "Athletic Conditioning Drills",
    description:
      "Improve sport-specific endurance and performance capacity.",
  },
];

export default function PerformanceExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Sports Performance Exercises"
          subtitle="Develop speed, power, agility, reaction, and athletic abilities through professional training methods."
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