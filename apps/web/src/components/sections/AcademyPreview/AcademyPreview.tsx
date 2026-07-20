import { GraduationCap, Award, Users } from "lucide-react";
import {
  Container,
  Section,
  SectionTitle,
} from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

const courses = [
  {
    icon: GraduationCap,
    title: "Coach Foundation",
    description:
      "Build a strong foundation in functional fitness coaching through the VERTEXworkout methodology.",
  },
  {
    icon: Users,
    title: "Coach Development",
    description:
      "Advance your coaching skills with practical programming, assessment, and client management.",
  },
  {
    icon: Award,
    title: "VERTEX Certification",
    description:
      "Earn the official VERTEXworkout Coach Certification and join our professional coaching network.",
  },
];

export default function AcademyPreview() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionTitle
          title="VERTEX Academy"
          subtitle="Professional education created by VERTEXworkout for future fitness coaches."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <div
                key={course.title}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon
                  size={42}
                  className="mb-6 text-[#022859]"
                />

                <h3 className="mb-4 text-2xl font-bold">
                  {course.title}
                </h3>

                <p className="mb-8 text-gray-600">
                  {course.description}
                </p>

                <Button className="w-full">
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}