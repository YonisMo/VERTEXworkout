import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Performance Articles | VERTEXworkout Blog",
  description:
    "Performance articles covering athletic development, speed, power, conditioning, and advanced training concepts.",
};

const articles = [
  {
    title: "Building Athletic Performance",
    description:
      "Understand the foundations of developing speed, strength, power, and athletic ability.",
  },
  {
    title: "Speed Training Principles",
    description:
      "Learn how athletes improve acceleration, reaction speed, and movement efficiency.",
  },
  {
    title: "Power Development Methods",
    description:
      "Explore training strategies for improving explosive strength and athletic power.",
  },
  {
    title: "Agility and Coordination Training",
    description:
      "Discover methods to improve body control, balance, and rapid direction changes.",
  },
  {
    title: "Sports Conditioning Systems",
    description:
      "Learn how to develop conditioning programs for different athletic demands.",
  },
  {
    title: "Performance Testing Basics",
    description:
      "Understand simple methods for evaluating athletic progress and improvement.",
  },
];

export default function PerformanceBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Performance"
          subtitle="Advanced knowledge about athletic development, speed, power, and performance training."
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