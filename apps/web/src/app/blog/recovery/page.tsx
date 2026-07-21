import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Recovery Articles | VERTEXworkout Blog",
  description:
    "Recovery articles covering mobility, injury prevention, sleep, regeneration, and sustainable training practices.",
};

const articles = [
  {
    title: "Importance of Recovery",
    description:
      "Understand why recovery is essential for improving performance and maintaining long-term progress.",
  },
  {
    title: "Mobility for Better Movement",
    description:
      "Learn how mobility training supports flexibility, joint health, and movement quality.",
  },
  {
    title: "Sleep and Athletic Performance",
    description:
      "Discover the role of quality sleep in recovery, hormones, and physical performance.",
  },
  {
    title: "Injury Prevention Strategies",
    description:
      "Explore training habits that help reduce injury risk and improve resilience.",
  },
  {
    title: "Active Recovery Methods",
    description:
      "Learn effective low-intensity methods that support recovery between training sessions.",
  },
  {
    title: "Recovery Nutrition Basics",
    description:
      "Understand how nutrition supports muscle repair and adaptation after exercise.",
  },
];

export default function RecoveryBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Recovery"
          subtitle="Learn how to recover effectively, prevent injuries, and build sustainable performance."
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