import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Welcome() {
  return (
    <section className="bg-white py-24">
      <Container>

        <SectionTitle
          badge="ABOUT VERTEXWORKOUT"
          title="Welcome to VERTEXworkout"
          subtitle="VERTEXworkout is a complete Functional Fitness ecosystem that combines Professional Coaching, Education, Swimming Programs, Premium Equipment and Innovative Training Systems under one brand."
        />

      </Container>
    </section>
  );
}