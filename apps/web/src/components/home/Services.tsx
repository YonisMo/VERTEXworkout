import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const services = [
  {
    icon: "🏋️",
    title: "Functional Training",
    description:
      "Science-based functional training programs designed to improve strength, mobility, endurance, balance, and real-world performance.",
  },
  {
    icon: "🥊",
    title: "Boxing Fitness",
    description:
      "Dynamic boxing workouts that develop speed, coordination, cardiovascular fitness, fat loss, and total-body conditioning.",
  },
  {
    icon: "🏊",
    title: "Swimming Programs",
    description:
      "Structured swimming programs for beginners, competitive athletes, fitness improvement, and rehabilitation.",
  },
  {
    icon: "🎓",
    title: "Fitness Academy",
    description:
      "Professional educational courses, certifications, workshops, and practical resources for coaches and fitness professionals.",
  },
  {
    icon: "🛍️",
    title: "VERTEX Store",
    description:
      "Premium functional fitness equipment and innovative training tools engineered for performance, durability, and versatility.",
  },
  {
    icon: "💻",
    title: "Online Coaching",
    description:
      "Personalized online coaching with customized training plans, nutrition guidance, progress tracking, and continuous support.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionTitle
          title="Our Services"
          subtitle="Everything you need in one professional fitness ecosystem—from training and education to equipment and coaching."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group h-full bg-[#022859] text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-[#F2EA79]">
                {service.title}
              </h3>

              <p className="leading-8 text-slate-200">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}