import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Welcome() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 border-b border-[#BFB8BA]/20 font-tajawal" dir="ltr">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-[#F2EA79]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            badge="ABOUT VERTEXWORKOUT"
            title="Welcome to VERTEXworkout"
            subtitle="VERTEXworkout is A balanced comprehensive fitness routine that enhances physical fitness helps achieve a healthy weight and improves overall endurance"
          />
        </div>
      </Container>
    </section>
  );
}