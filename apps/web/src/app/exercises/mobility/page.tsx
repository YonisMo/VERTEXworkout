import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Mobility Exercises | VERTEXworkout",
  description:
    "Professional mobility exercise library focused on flexibility, joint health, movement quality, and performance.",
};

const exercises = [
  {
    title: "Dynamic Mobility Drills",
    description:
      "Prepare the body for movement by improving range of motion and joint readiness.",
  },
  {
    title: "Hip Mobility Exercises",
    description:
      "Improve hip movement, stability, and lower-body performance.",
  },
  {
    title: "Shoulder Mobility Exercises",
    description:
      "Develop shoulder flexibility, control, and upper-body movement efficiency.",
  },
  {
    title: "Spine Mobility Exercises",
    description:
      "Support healthy spinal movement and improve overall mobility.",
  },
  {
    title: "Active Stretching",
    description:
      "Enhance flexibility while maintaining strength and movement control.",
  },
  {
    title: "Recovery Mobility Flow",
    description:
      "Low-intensity movements designed to support recovery and reduce stiffness.",
  },
];

export default function MobilityExercisesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Mobility Exercises"
          subtitle="Improve flexibility, joint mobility, and movement quality for better performance."
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