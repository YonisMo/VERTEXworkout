export default function Statistics() {
  const stats = [
    {
      number: "1000+",
      title: "Members",
    },
    {
      number: "500+",
      title: "Training Programs",
    },
    {
      number: "150+",
      title: "Exercises",
    },
    {
      number: "24/7",
      title: "Online Support",
    },
  ];

  return (
    <section
      style={{
        background: "#022859",
        padding: "100px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "30px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,.05)",
              padding: "40px",
              borderRadius: "24px",
              border: "1px solid rgba(242,234,121,.2)",
            }}
          >
            <div
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#F2EA79",
              }}
            >
              {stat.number}
            </div>

            <div
              style={{
                marginTop: "15px",
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              {stat.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}