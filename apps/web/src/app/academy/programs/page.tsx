import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AcademyCard from "@/components/academy/AcademyCard";

export const metadata = {
  title: "Programs | VERTEXworkout Academy",
  description:
    "Professional fitness programs designed for coaches, athletes, and fitness enthusiasts through VERTEXworkout Academy.",
};

const programs = [
  {
    title: "Personal Trainer Program",
    description:
      "A complete educational pathway covering exercise science, training principles, client assessment, coaching skills, and professional practice.",
    href: "/academy/programs/personal-trainer",
  },
  {
    title: "Functional Training Program",
    description:
      "Learn how to create effective functional training systems focused on strength, mobility, stability, conditioning, and athletic performance.",
    href: "/academy/programs/functional-training",
  },
  {
    title: "Sports Performance Program",
    description:
      "Advanced performance education covering strength development, speed, power, conditioning, and athlete preparation.",
    href: "/academy/programs/sports-performance",
  },
  {
    title: "Swimming Coach Program",
    description:
      "A structured pathway for developing swimming coaching skills, programming methods, technique analysis, and athlete development.",
    href: "/academy/programs/swimming-coach",
  },
  {
    title: "Boxing Fitness Coach Program",
    description:
      "Learn how to design boxing fitness sessions combining conditioning, technique, coordination, and performance training.",
    href: "/academy/programs/boxing-fitness",
  },
  {
    title: "Corrective Exercise Program",
    description:
      "Understand movement assessment, mobility training, stability exercises, and injury prevention principles.",
    href: "/academy/programs/corrective-exercise",
  },
];

export default function ProgramsPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Academy Programs"
          subtitle="Professional learning pathways designed to develop coaches, athletes, and fitness professionals."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <AcademyCard
              key={program.title}
              title={program.title}
              description={program.description}
              href={program.href}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}