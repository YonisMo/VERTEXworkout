import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Courses | VERTEXworkout Academy",
  description:
    "Professional fitness courses designed for coaches, trainers, and fitness enthusiasts.",
};

export default function CoursesPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Academy Courses"
          subtitle="Structured fitness education programs designed to develop knowledge, skills, and professional performance."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Fitness Fundamentals
            </h2>

            <p className="leading-8 text-slate-600">
              Build a strong foundation in exercise science, training
              principles, movement patterns, and coaching basics.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Functional Training Coach
            </h2>

            <p className="leading-8 text-slate-600">
              Learn how to design functional training programs that improve
              strength, mobility, conditioning, and athletic performance.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Performance Coaching
            </h2>

            <p className="leading-8 text-slate-600">
              Develop advanced coaching skills for athletes and performance
              focused training environments.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}