export default function Statistics() {
  return (
    <section
      style={{
        background: "#F8F9FA",
        padding: "80px 20px",
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
        <Card number="5000+" title="Clients Trained" />
        <Card number="120+" title="Training Programs" />
        <Card number="25+" title="Professional Coaches" />
        <Card number="98%" title="Success Rate" />
      </div>
    </section>
  );
}

function Card({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "40px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          color: "#022859",
          fontSize: "48px",
          margin: 0,
        }}
      >
        {number}
      </h2>

      <p
        style={{
          marginTop: "15px",
          color: "#666",
          fontSize: "18px",
        }}
      >
        {title}
      </p>
    </div>
  );
}