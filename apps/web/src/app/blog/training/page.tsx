import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Training Articles | VERTEXworkout Blog",
  description:
    "Training articles covering functional fitness, strength, conditioning, workout programming, and exercise strategies.",
};

const articles = [
  {
    title: "Functional Training Fundamentals",
    description:
      "Understand the principles of functional training and how to build effective movement-based workouts.",
  },
  {
    title: "How to Build a Balanced Training Program",
    description:
      "Learn the key elements needed to design structured programs for strength, fitness, and performance.",
  },
  {
    title: "Strength Training Principles",
    description:
      "Explore progressive overload, exercise selection, and methods for improving physical strength.",
  },
  {
    title: "HIIT vs Traditional Training",
    description:
      "Compare different training approaches and understand when each method is useful.",
  },
  {
    title: "Mobility and Performance",
    description:
      "Discover how mobility training supports movement quality and athletic performance.",
  },
  {
    title: "Training Consistency Strategies",
    description:
      "Practical methods to maintain progress and build sustainable fitness habits.",
  },
];

export default function TrainingBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Training"
          subtitle="Professional training knowledge, workout strategies, and fitness education."
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