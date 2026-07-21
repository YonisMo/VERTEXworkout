import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Coaching Articles | VERTEXworkout Blog",
  description:
    "Professional coaching articles covering trainer development, programming, communication, and fitness leadership.",
};

const articles = [
  {
    title: "Becoming a Better Coach",
    description:
      "Learn the essential skills, knowledge, and mindset required for professional coaching.",
  },
  {
    title: "Client Assessment Principles",
    description:
      "Understand how coaches evaluate clients and create suitable training strategies.",
  },
  {
    title: "Effective Program Design",
    description:
      "Discover how to build structured programs based on goals, abilities, and progress.",
  },
  {
    title: "Coaching Communication Skills",
    description:
      "Improve client relationships through better communication and guidance methods.",
  },
  {
    title: "Professional Trainer Development",
    description:
      "Explore continuous learning strategies for building a successful fitness career.",
  },
  {
    title: "Creating Better Training Experiences",
    description:
      "Learn how professional coaches deliver safe, effective, and motivating sessions.",
  },
];

export default function CoachingBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Coaching"
          subtitle="Professional education and resources for fitness coaches and trainers."
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