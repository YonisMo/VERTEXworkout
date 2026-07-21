export default function Navbar() {
  return (
    <header
      style={{
        background: "#022859",
        borderBottom: "2px solid #F2EA79",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        {/* Logo */}

        <h2
          style={{
            color: "#F2EA79",
            fontSize: "30px",
            fontWeight: 800,
            margin: 0,
            cursor: "pointer",
          }}
        >
          VERTEXworkout
        </h2>

        {/* Navigation */}

        <nav
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {[
            "Home",
            "Store",
            "Academy",
            "Exercises",
            "Programs",
            "Blog",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "16px",
                transition: ".3s",
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            style={{
              background: "transparent",
              color: "#F2EA79",
              border: "2px solid #F2EA79",
              padding: "10px 18px",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            style={{
              background: "#F2EA79",
              color: "#022859",
              border: "none",
              padding: "10px 18px",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
}