import AcademyHero from "@/components/academy/AcademyHero";
import AcademyCard from "@/components/academy/AcademyCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Academy | VERTEXworkout",
  description:
    "Professional fitness education, certifications, workshops, and learning resources from VERTEXworkout.",
};

const academyPaths = [
  {
    title: "Courses",
    description:
      "Structured educational programs covering fitness fundamentals, coaching skills, and professional development.",
    href: "/academy/courses",
  },
  {
    title: "Certifications",
    description:
      "Professional certification pathways designed to build expertise and credibility in the fitness industry.",
    href: "/academy/certifications",
  },
  {
    title: "Workshops",
    description:
      "Practical workshops focused on modern training methods, coaching techniques, and performance development.",
    href: "/academy/workshops",
  },
];

export default function AcademyPage() {
  return (
    <main>
      <AcademyHero />

      <section className="py-24">
        <Container>
          <SectionTitle
            title="VERTEXworkout Academy"
            subtitle="A professional learning platform for coaches, trainers, athletes, and fitness enthusiasts."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {academyPaths.map((item) => (
              <AcademyCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}