export default function Services() {
  const services = [
    {
      icon: "🏋️",
      title: "Functional Training",
      description:
        "Modern functional workouts designed to improve strength, mobility and athletic performance.",
    },
    {
      icon: "🥊",
      title: "Boxing Fitness",
      description:
        "High intensity boxing workouts for endurance, fat loss and conditioning.",
    },
    {
      icon: "🏊",
      title: "Swimming Programs",
      description:
        "Professional swimming plans for beginners, athletes and rehabilitation.",
    },
    {
      icon: "🎓",
      title: "Fitness Academy",
      description:
        "Courses, certifications and educational content for coaches and trainers.",
    },
    {
      icon: "🛍️",
      title: "VERTEX Store",
      description:
        "Premium functional fitness equipment and innovative training products.",
    },
    {
      icon: "💻",
      title: "Online Coaching",
      description:
        "Personalized online coaching with continuous follow-up and progress tracking.",
    },
  ];

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "100px 40px",
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
            color: "#022859",
            fontSize: "50px",
            fontWeight: 800,
            marginBottom: "20px",
          }}
        >
          Our Services
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "20px",
            marginBottom: "60px",
          }}
        >
          Everything you need in one professional fitness ecosystem.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                background: "#022859",
                color: "#ffffff",
                padding: "35px",
                borderRadius: "24px",
                transition: ".3s",
                boxShadow: "0 12px 30px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  color: "#F2EA79",
                  marginBottom: "15px",
                  fontSize: "28px",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  lineHeight: 1.8,
                  color: "#f1f5f9",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}