import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: "💪",
    title: "Functional Training",
    text: "Train for real-life performance with functional workouts that improve strength, mobility, endurance, balance, and athletic ability",
  },
  {
    icon: "🎓",
    title: "Professional Academy",
    text: "Learn from structured educational programs, certifications, and practical resources designed for coaches, trainers, and fitness enthusiasts",
  },
  {
    icon: "🛍️",
    title: "Premium Equipment",
    text: "Discover high-quality VERTEXworkout equipment developed for durability, versatility, and professional functional training environments",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    text: "Monitor your fitness journey with measurable performance indicators, personalized goals, and continuous improvement",
  },
  {
    icon: "🌍",
    title: "Complete Ecosystem",
    text: "Access training programs, educational content, professional equipment, and community support in one integrated platform",
  },
  {
    icon: "🚀",
    title: "Performance Driven",
    text: "Every program is built using modern training principles to maximize results while promoting long-term health and injury prevention",
  },
];

export default function Why() {
  return (
    <section className="bg-slate-50 py-24 border-b border-[#BFB8BA]/20 font-tajawal">
      <Container>
        <SectionTitle
          badge="WHY US"
          title="Why Choose VERTEXworkout"
          subtitle="A complete fitness ecosystem that combines training, education, equipment, and performance to help you become stronger every day"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <Card
              key={item.title}
              className="group flex flex-col items-center text-center h-full bg-white p-8 rounded-3xl border border-[#BFB8BA]/30 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#F2EA79]"
            >
              {/* Icon Wrapper */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#022859]/5 text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#022859] group-hover:text-white">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 font-cairo text-2xl font-bold text-[#022859]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="leading-relaxed text-[#A68986] font-medium">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}