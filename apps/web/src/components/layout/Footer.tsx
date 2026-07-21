export default function Footer() {
  return (
    <footer
      style={{
        background: "#022859",
        color: "#ffffff",
        padding: "70px 40px 30px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "50px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#F2EA79",
              marginBottom: "20px",
            }}
          >
            VERTEXworkout
          </h2>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: 1.8,
            }}
          >
            Professional Functional Fitness Platform combining
            Training, Education, Equipment and Innovation.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#F2EA79" }}>Platform</h3>

          <p>Home</p>
          <p>Store</p>
          <p>Academy</p>
          <p>Exercises</p>
        </div>

        <div>
          <h3 style={{ color: "#F2EA79" }}>Support</h3>

          <p>Contact</p>
          <p>FAQ</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>

        <div>
          <h3 style={{ color: "#F2EA79" }}>Follow Us</h3>

          <p>Instagram</p>
          <p>Facebook</p>
          <p>YouTube</p>
          <p>TikTok</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "60px",
          borderTop: "1px solid rgba(255,255,255,.15)",
          paddingTop: "20px",
          textAlign: "center",
          color: "#d1d5db",
        }}
      >
        © 2026 VERTEXworkout. All rights reserved.
      </div>
    </footer>
  );
}