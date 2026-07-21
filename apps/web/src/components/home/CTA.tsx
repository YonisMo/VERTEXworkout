import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="bg-[#F2EA79] py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-[#022859] md:text-5xl lg:text-6xl">
            Ready to Transform Yourself?
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-[#022859]/90 md:text-xl">
            Join VERTEXworkout today and become part of a complete fitness
            ecosystem built to help you improve your strength, performance,
            health, and long-term athletic potential.
          </p>

          <Button
            href="/programs"
            size="lg"
            className="bg-[#022859] text-[#F2EA79] transition-all duration-300 hover:-translate-y-1 hover:bg-[#011d40] hover:shadow-xl"
          >
            Get Started
          </Button>
        </div>
      </Container>
    </section>
  );
}