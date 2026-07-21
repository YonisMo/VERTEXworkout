import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#022859] text-white">

      <Container className="py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>
            <h2 className="mb-5 text-3xl font-extrabold text-[#F2EA79]">
              VERTEXworkout
            </h2>

            <p className="leading-8 text-slate-300">
              Professional Functional Fitness Platform combining Training,
              Education, Equipment and Innovation.
            </p>
          </div>

          {/* Platform */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F2EA79]">
              Platform
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><a href="#">Home</a></li>
              <li><a href="#">Store</a></li>
              <li><a href="#">Academy</a></li>
              <li><a href="#">Exercises</a></li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F2EA79]">
              Support
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>

          {/* Social */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F2EA79]">
              Follow Us
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-white/20 pt-6 text-center text-slate-400">
          © 2026 VERTEXworkout. All rights reserved.
        </div>

      </Container>

    </footer>
  );
}