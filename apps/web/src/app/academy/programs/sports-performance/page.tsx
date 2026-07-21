import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Sports Performance Program | VERTEXworkout Academy",
  description:
    "Advanced sports performance education covering strength, power, speed, conditioning, and athlete development.",
};

const topics = [
  "Athlete Performance Fundamentals",
  "Strength & Power Development",
  "Speed & Agility Training",
  "Sports Conditioning Systems",
  "Performance Testing Methods",
  "Athlete Program Design",
];

export default function SportsPerformanceProgramPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Sports Performance Program"
          subtitle="Advanced education for developing athletes through structured performance training systems."
        />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-[#022859]">
            Develop High Performance Athletes
          </h2>

          <p className="mb-10 leading-8 text-slate-600">
            The VERTEXworkout Sports Performance Program helps coaches
            understand athletic development, performance principles, and how
            to create structured training plans for different sports and
            performance goals.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-2xl bg-slate-50 p-5 font-semibold text-[#022859]"
              >
                {topic}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/contact" size="lg">
              Join Program
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}