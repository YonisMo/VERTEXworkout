export default function StorePreview() {
  const products = [
    {
      name: "VERTEX Power Bag 5kg",
      description: "Perfect for beginners and conditioning.",
    },
    {
      name: "VERTEX Power Bag 10kg",
      description: "Ideal for strength and endurance training.",
    },
    {
      name: "VERTEX Power Bag 15kg",
      description: "Designed for advanced functional workouts.",
    },
    {
      name: "VERTEX Power Bag 20kg",
      description: "Maximum challenge for elite athletes.",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 40px",
        background: "#F8F8F8",
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
            fontSize: "56px",
            color: "#022859",
            marginBottom: "20px",
          }}
        >
          Store
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "22px",
            color: "#555",
            marginBottom: "60px",
          }}
        >
          Premium VERTEXworkout equipment.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          {products.map((item) => (
            <div
              key={item.name}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "30px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  height: "180px",
                  background: "#EAEAEA",
                  borderRadius: "12px",
                  marginBottom: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                  fontSize: "20px",
                }}
              >
                Product Image
              </div>

              <h3
                style={{
                  color: "#022859",
                  marginBottom: "15px",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginBottom: "25px",
                }}
              >
                {item.description}
              </p>

              <button
                style={{
                  background: "#F2EA79",
                  color: "#022859",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}