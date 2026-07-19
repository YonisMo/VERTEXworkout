export default function Hero() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 70px)",
        background: "#022859",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            color: "#F2EA79",
            fontSize: "72px",
            fontWeight: 900,
            marginBottom: "20px",
          }}
        >
          Welcome to VERTEXworkout
        </h1>

        <p
          style={{
            color: "#ffffff",
            fontSize: "22px",
          }}
        >
          Functional Training • Academy • Store • Exercise Library
        </p>
      </div>
    </section>
  );
}