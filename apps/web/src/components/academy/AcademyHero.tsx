import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AcademyHero() {
  return (
    <section className="bg-slate-50 py-20 text-center font-tajawal border-b border-[#BFB8BA]/20" dir="ltr">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          
          <span className="mb-4 inline-block rounded-full border border-[#022859]/20 bg-[#022859] px-4 py-1.5 text-xs font-bold text-[#F2EA79] shadow-md">
            VERTEXworkout Academy
          </span>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-[#022859] md:text-5xl font-cairo text-center">
            Learn. Develop. Become a Professional.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-600 md:text-lg text-center font-normal">
            A complete education platform designed for coaches, trainers, and
            athletes through professional courses, certifications, workshops,
            and practical fitness knowledge.
          </p>

          <div className="flex w-full justify-center">
            <Button
              href="/academy/courses"
              size="md"
              className="bg-[#022859] text-[#F2EA79] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-bold hover:bg-[#022859]/90"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}