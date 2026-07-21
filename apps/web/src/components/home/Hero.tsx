export default function Hero() {
  return (
    <section
      style={{
        background: "#022859",
        color: "#ffffff",
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#F2EA79",
            border: "1px solid #F2EA79",
            borderRadius: "999px",
            padding: "10px 24px",
            display: "inline-block",
            marginBottom: "30px",
            fontWeight: 600,
          }}
        >
          Functional Fitness • Academy • Store
        </span>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "30px",
          }}
        >
          Train Smarter.
          <br />
          Live Stronger.
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#dbe4f0",
            maxWidth: "850px",
            margin: "0 auto 50px",
            lineHeight: 1.8,
          }}
        >
          VERTEXworkout is your complete ecosystem for Functional Training,
          Fitness Education, Premium Equipment and Professional Coaching.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: "#F2EA79",
              color: "#022859",
              border: "none",
              padding: "18px 45px",
              borderRadius: "18px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Start Training
          </button>

          <button
            style={{
              background: "transparent",
              color: "#F2EA79",
              border: "2px solid #F2EA79",
              padding: "18px 45px",
              borderRadius: "18px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}