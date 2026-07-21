export default function Why() {
  const features = [
    {
      icon: "💪",
      title: "Functional Training",
      text: "Modern programs designed for real-life strength and athletic performance.",
    },
    {
      icon: "🎓",
      title: "Professional Academy",
      text: "Courses and educational content for coaches and athletes.",
    },
    {
      icon: "🛍",
      title: "Premium Equipment",
      text: "High-quality VERTEXworkout equipment engineered for durability.",
    },
  ];

  return (
    <section
      style={{
        background: "#f8fafc",
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
            color: "#022859",
            textAlign: "center",
            fontSize: "50px",
            fontWeight: 800,
            marginBottom: "20px",
          }}
        >
          Why Choose VERTEXworkout?
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "20px",
            marginBottom: "60px",
          }}
        >
          One ecosystem for training, education, innovation and performance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          {features.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#ffffff",
                padding: "40px",
                borderRadius: "24px",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  color: "#022859",
                  fontSize: "28px",
                  marginBottom: "15px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontSize: "18px",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}