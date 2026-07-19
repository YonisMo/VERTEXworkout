export default function Navbar() {
  return (
    <header
      style={{
        background: "#022859",
        color: "#F2EA79",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        borderBottom: "2px solid #F2EA79",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 800,
        }}
      >
        VERTEXworkout
      </h2>

      <nav
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        <a href="/" style={{ color: "#F2EA79", textDecoration: "none" }}>
          Home
        </a>

        <a href="#" style={{ color: "#F2EA79", textDecoration: "none" }}>
          Store
        </a>

        <a href="#" style={{ color: "#F2EA79", textDecoration: "none" }}>
          Academy
        </a>

        <a href="#" style={{ color: "#F2EA79", textDecoration: "none" }}>
          Exercises
        </a>
      </nav>
    </header>
  );
}