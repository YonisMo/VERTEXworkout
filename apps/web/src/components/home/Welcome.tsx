import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"

export default function Welcome() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 border-b border-[#BFB8BA]/20 font-tajawal">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-[#F2EA79]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        <SectionTitle
          badge="ABOUT VERTEXWORKOUT"
          title="Welcome to VERTEXworkout"
          subtitle="VERTEXworkout is a complete Functional Fitness ecosystem that combines Professional Coaching, Education, Swimming Programs, Premium Equipment and Innovative Training Systems under one brand"
        />
      </Container>
    </section>
  )
}