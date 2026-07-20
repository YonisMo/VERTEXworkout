import { Container, Section } from "@/components/ui/layout";

export default function CTA() {
  return (
    <Section className="bg-[#022859] text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="mb-6 text-5xl font-bold">
            Ready to Start Your VERTEX Journey?
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Join VERTEXworkout today and unlock professional coaching,
            functional training, premium equipment, and continuous support.
          </p>

          <div className="flex flex-col justify-center gap-5 sm:flex-row">

            <button className="rounded-xl bg-[#F2EA79] px-8 py-4 font-bold text-[#022859] transition hover:scale-105">
              Start Training
            </button>

            <button className="rounded-xl border-2 border-[#F2EA79] px-8 py-4 font-bold text-[#F2EA79] transition hover:bg-[#F2EA79] hover:text-[#022859]">
              Contact Us
            </button>

          </div>

        </div>
      </Container>
    </Section>
  );
}