import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";

const programs = [
  {
    title: "Personal Training",
    description:
      "One-to-one coaching tailored to your body, goals and lifestyle.",
    href: "/academy/programs/personal-trainer",
  },
  {
    title: "Functional Training",
    description:
      "Improve strength, balance, mobility and athletic performance.",
    href: "/academy/programs/functional-training",
  },
  {
    title: "Swimming Coach",
    description: "Professional swimming coaching for beginners and athletes.",
    href: "/academy/programs/swimming-coach",
  },
  {
    title: "Boxing Fitness",
    description:
      "High-intensity boxing workouts to build endurance and burn calories.",
    href: "/academy/programs/boxing-fitness",
  },
  {
    title: "Sports Performance",
    description: "Increase speed, agility, power and overall athletic ability.",
    href: "/academy/programs/sports-performance",
  },
  {
    title: "Corrective Exercise",
    description: "Restore movement quality, reduce pain and prevent injuries.",
    href: "/academy/programs/corrective-exercise",
  },
];

export default function ProgramsPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          badge="VERTEXWORKOUT"
          title="Training Programs"
          subtitle="Choose the program that matches your goals and start your journey today."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-[#022859]">
                {program.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {program.description}
              </p>

              <Link
                href={program.href}
                className="mt-8 inline-flex font-bold text-[#022859] hover:text-[#F2EA79]"
              >
                Explore Program →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
