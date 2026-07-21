import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Blog | VERTEXworkout",
  description:
    "Fitness articles, training guides, nutrition tips, performance education, and professional content from VERTEXworkout.",
};

const categories = [
  {
    title: "Training",
    description:
      "Articles about strength training, functional fitness, conditioning, and workout strategies.",
    href: "/blog/training",
  },
  {
    title: "Nutrition",
    description:
      "Evidence-based nutrition guidance for performance, recovery, and healthy lifestyle.",
    href: "/blog/nutrition",
  },
  {
    title: "Performance",
    description:
      "Professional content about athletic development, speed, power, and sports performance.",
    href: "/blog/performance",
  },
  {
    title: "Recovery",
    description:
      "Learn about mobility, recovery methods, injury prevention, and sustainable training.",
    href: "/blog/recovery",
  },
  {
    title: "Coaching",
    description:
      "Educational resources for coaches, trainers, and fitness professionals.",
    href: "/blog/coaching",
  },
  {
    title: "VERTEX Academy",
    description:
      "Learning resources connected with fitness education and professional development.",
    href: "/blog/academy",
  },
];

export default function BlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="VERTEXworkout Blog"
          subtitle="Knowledge, education, and professional insights about fitness, performance, and healthy living."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#022859]">
                {category.title}
              </h2>

              <p className="mb-8 leading-8 text-slate-600">
                {category.description}
              </p>

              <Button href={category.href} size="md">
                Explore
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}