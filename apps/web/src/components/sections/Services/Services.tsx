import {
  Dumbbell,
  Waves,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

const services = [
  {
    title: "Functional Training",
    description:
      "Professional functional fitness programs for all levels.",
    icon: Dumbbell,
  },
  {
    title: "Swimming Programs",
    description:
      "Structured swimming plans from beginner to advanced.",
    icon: Waves,
  },
  {
    title: "VERTEX Academy",
    description:
      "Courses and certifications for fitness professionals.",
    icon: GraduationCap,
  },
  {
    title: "Equipment Store",
    description:
      "Premium training equipment and VERTEX products.",
    icon: ShoppingBag,
  },
];

export default function Services() {
  return (
    <section
      style={{
        padding: "100px 20px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            color: "#022859",
            marginBottom: "16px",
          }}
        >
          Our Services
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto 60px",
            fontSize: "18px",
          }}
        >
          Everything you need to build strength, improve performance,
          and transform your fitness journey.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                style={{
                  padding: "35px",
                  borderRadius: "18px",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                  textAlign: "center",
                }}
              >
                <Icon
                  size={50}
                  color="#022859"
                  strokeWidth={2}
                />

                <h3
                  style={{
                    marginTop: "20px",
                    color: "#022859",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}