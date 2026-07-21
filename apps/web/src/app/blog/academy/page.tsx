import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Academy Articles | VERTEXworkout Blog",
  description:
    "Educational articles about fitness certifications, coaching knowledge, exercise science, and professional development.",
};

const articles = [
  {
    title: "Fitness Education Pathways",
    description:
      "Explore the different learning paths available for coaches and fitness professionals.",
  },
  {
    title: "Exercise Science Fundamentals",
    description:
      "Learn the basic scientific principles behind training, movement, and performance.",
  },
  {
    title: "Building a Coaching Career",
    description:
      "Discover strategies for developing knowledge, skills, and professionalism as a coach.",
  },
  {
    title: "Understanding Training Systems",
    description:
      "Learn how professional training systems are structured and applied.",
  },
  {
    title: "Continuous Learning for Coaches",
    description:
      "Understand why ongoing education is essential in the fitness industry.",
  },
  {
    title: "From Trainer to Professional Coach",
    description:
      "Explore the skills and mindset needed to progress in the coaching field.",
  },
];

export default function AcademyBlogPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="VERTEX Academy"
          subtitle="Educational resources for coaches, trainers, and fitness professionals."
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