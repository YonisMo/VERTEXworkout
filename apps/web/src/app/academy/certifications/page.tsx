import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Certifications | VERTEXworkout Academy",
  description:
    "Professional fitness certifications and development pathways from VERTEXworkout Academy.",
};

export default function CertificationsPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionTitle
          title="Professional Certifications"
          subtitle="Build your expertise through structured certification pathways designed for modern fitness professionals."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Personal Trainer Certification
            </h2>

            <p className="leading-8 text-slate-600">
              Develop the essential knowledge and practical skills required to
              coach clients safely and effectively.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Functional Training Certification
            </h2>

            <p className="leading-8 text-slate-600">
              Learn functional movement concepts, exercise selection, and
              program design for different performance goals.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#022859]">
              Sports Performance Certification
            </h2>

            <p className="leading-8 text-slate-600">
              Enhance your ability to train athletes through performance-based
              methods and advanced coaching principles.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}