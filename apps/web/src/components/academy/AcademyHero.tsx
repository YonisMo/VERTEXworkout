import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AcademyHero() {
  return (
    <section className="bg-[#022859] py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-block rounded-full bg-[#F2EA79] px-5 py-2 text-sm font-bold text-[#022859]">
            VERTEXworkout Academy
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Learn. Develop. Become a Professional.
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            A complete education platform designed for coaches, trainers, and
            athletes through professional courses, certifications, workshops,
            and practical fitness knowledge.
          </p>

          <Button
            href="/academy/courses"
            size="lg"
            className="bg-[#F2EA79] text-[#022859] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Explore Courses
          </Button>
        </div>
      </Container>
    </section>
  );
}