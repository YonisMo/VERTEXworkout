export default function CTA() {
  return (
    <section
      style={{
        background: "#F2EA79",
        padding: "100px 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            color: "#022859",
            fontSize: "54px",
            fontWeight: 800,
            marginBottom: "20px",
          }}
        >
          Ready to Transform Yourself?
        </h2>

        <p
          style={{
            color: "#022859",
            fontSize: "22px",
            lineHeight: 1.8,
            marginBottom: "40px",
          }}
        >
          Join VERTEXworkout today and start your journey toward strength,
          performance and a healthier lifestyle.
        </p>

        <button
          style={{
            background: "#022859",
            color: "#F2EA79",
            border: "none",
            padding: "18px 48px",
            borderRadius: "18px",
            fontSize: "20px",
            fontWeight: 700,
            cursor: "pointer",
            transition: ".3s",
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}