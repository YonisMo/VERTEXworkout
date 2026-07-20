export default function Programs() {
  return (
    <section
      style={{
        padding: "100px 40px",
        background: "#022859",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            color: "#F2EA79",
            marginBottom: "20px",
          }}
        >
          Our Programs
        </h2>

        <p
          style={{
            fontSize: "20px",
            color: "#ddd",
            marginBottom: "60px",
          }}
        >
          Choose the training program that matches your goals.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          {[
            "Fat Loss",
            "Muscle Building",
            "Functional Fitness",
            "Swimming",
          ].map((program) => (
            <div
              key={program}
              style={{
                background: "#fff",
                color: "#022859",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              }}
            >
              <h3>{program}</h3>

              <p>
                Professional training program designed by VERTEXworkout coaches.
              </p>

              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  background: "#F2EA79",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}