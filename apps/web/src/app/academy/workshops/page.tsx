import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Workshops | VERTEXworkout Academy",
  description:
    "Practical fitness workshops designed to improve coaching skills, training knowledge, and professional development.",
};

export default function WorkshopsPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Professional Workshops"
          subtitle="Hands-on learning experiences focused on practical skills, modern training methods, and professional growth."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Functional Training Workshop
            </h2>

            <p className="leading-8 text-slate-600">
              Practical sessions covering movement patterns, exercise
              progression, equipment usage, and functional program design.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Coaching Skills Workshop
            </h2>

            <p className="leading-8 text-slate-600">
              Improve communication, coaching techniques, client assessment,
              and professional training delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Performance Workshop
            </h2>

            <p className="leading-8 text-slate-600">
              Explore advanced training concepts for strength, conditioning,
              athletic performance, and injury prevention.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}