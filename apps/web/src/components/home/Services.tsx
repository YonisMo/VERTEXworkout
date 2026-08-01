import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const services = [
  {
    icon: "🏋️",
    title: "Functional Training",
    description:
      "Science-based functional training programs designed to improve strength, mobility, endurance, balance, and real-world performance",
  },
  {
    icon: "🥊",
    title: "Boxing Fitness",
    description:
      "Dynamic boxing workouts that develop speed, coordination, cardiovascular fitness, fat loss, and total-body conditioning",
  },
  {
    icon: "🏊",
    title: "Swimming Programs",
    description:
      "Structured swimming programs for beginners, competitive athletes, fitness improvement, and rehabilitation",
  },
  {
    icon: "🎓",
    title: "Fitness Academy",
    description:
      "Professional educational courses, certifications, workshops, and practical resources for coaches and fitness professionals",
  },
  {
    icon: "🛍️",
    title: "VERTEX Store",
    description:
      "Premium functional fitness equipment and innovative training tools engineered for performance, durability, and versatility",
  },
  {
    icon: "💻",
    title: "Online Coaching",
    description:
      "Personalized online coaching with customized training plans, nutrition guidance, progress tracking, and continuous support",
  },
];

export default function OurServices() {
  return (
    <section className="bg-slate-50 py-24 border-b border-[#BFB8BA]/20 font-tajawal" dir="ltr">
      <Container>
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              badge="OUR SERVICES"
              title="Our Services"
              subtitle="Everything you need in one professional fitness ecosystem—from training and education to equipment and coaching"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col items-center text-center overflow-hidden rounded-3xl bg-[#022859] p-8 text-white border border-[#F2EA79]/30 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#F2EA79] hover:shadow-2xl"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110 border border-[#F2EA79]/40">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 font-cairo text-2xl font-bold text-[#F2EA79]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-[#BFB8BA] font-normal text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}