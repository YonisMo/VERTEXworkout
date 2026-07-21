import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Nutrition Articles | VERTEXworkout Blog",
  description:
    "Nutrition articles covering healthy eating, performance nutrition, recovery, hydration, and lifestyle strategies.",
};

const articles = [
  {
    title: "Nutrition Fundamentals",
    description:
      "Learn the basic principles of balanced nutrition for health, fitness, and performance.",
  },
  {
    title: "Pre & Post Workout Nutrition",
    description:
      "Understand how food timing can support training performance and recovery.",
  },
  {
    title: "Protein and Muscle Development",
    description:
      "Explore the role of protein intake in muscle growth, repair, and adaptation.",
  },
  {
    title: "Hydration for Performance",
    description:
      "Learn why hydration is essential for energy, focus, and physical performance.",
  },
  {
    title: "Fat Loss Nutrition Strategies",
    description:
      "Discover sustainable approaches for improving body composition and losing fat.",
  },
  {
    title: "Recovery Nutrition",
    description:
      "Understand how nutrition supports recovery after intense training sessions.",
  },
];

export default function NutritionBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Nutrition"
          subtitle="Evidence-based nutrition knowledge to support health, fitness, and athletic performance."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#022859]">
                {article.title}
              </h2>

              <p className="leading-8 text-slate-600">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}