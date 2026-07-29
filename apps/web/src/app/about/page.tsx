import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About | VERTEXworkout",
  description:
    "Learn more about VERTEXworkout, our mission and our approach to functional fitness.",
};

const values = [
  {
    title: "Professional Coaching",
    text: "Evidence-based coaching focused on long-term results.",
  },
  {
    title: "Functional Training",
    text: "Movement that improves everyday life and athletic performance.",
  },
  {
    title: "Continuous Progress",
    text: "Track, measure and improve every step of your journey.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#022859] via-[#033B79] to-[#022859] py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-[#F2EA79] px-5 py-2 font-bold uppercase tracking-wider text-[#022859]">
              ABOUT US
            </span>

            <h1 className="mt-8 text-5xl font-black text-white md:text-7xl">
              VERTEXWORKOUT
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
              We help people become stronger, healthier and more confident
              through professional coaching, functional training and
              performance-based programs.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionTitle
            badge="OUR MISSION"
            title="Train With Purpose"
            subtitle="Every session is designed to improve movement, build strength and create sustainable progress."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold text-[#022859]">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-24">
        <Container>
          <div className="rounded-[32px] bg-gradient-to-r from-[#022859] to-[#033B79] px-10 py-20 text-center">
            <h2 className="text-5xl font-black text-[#F2EA79]">
              Ready To Join VERTEXWORKOUT?
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-200">
              Start your journey today and experience professional coaching
              designed around your goals.
            </p>

            <div className="mt-12 flex justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}