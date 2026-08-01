import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#F2EA79]/20 bg-[#022859] text-white">
      <Container className="py-16 font-tajawal">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* About */}
          <div>
            <h2 className="mb-5 font-cairo text-2xl font-black text-[#F2EA79]">
              VERTEXworkout
            </h2>

            <p className="max-w-xs leading-8 text-[#BFB8BA]">
              A professional functional fitness ecosystem combining education,
              coaching, premium equipment, and performance-driven training.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Platform
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <Link href="/" className="transition hover:text-[#F2EA79]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/store" className="transition hover:text-[#F2EA79]">
                  Store
                </Link>
              </li>

              <li>
                <Link href="/academy" className="transition hover:text-[#F2EA79]">
                  Academy
                </Link>
              </li>

              <li>
                <Link href="/programs" className="transition hover:text-[#F2EA79]">
                  Programs
                </Link>
              </li>

              <li>
                <Link href="/exercises" className="transition hover:text-[#F2EA79]">
                  Exercises
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Support
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <Link href="/contact" className="transition hover:text-[#F2EA79]">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/faq" className="transition hover:text-[#F2EA79]">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="transition hover:text-[#F2EA79]">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="transition hover:text-[#F2EA79]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Follow Us
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <a href="#" className="transition hover:text-[#F2EA79]">
                  Instagram
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-[#F2EA79]">
                  Facebook
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-[#F2EA79]">
                  YouTube
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-[#F2EA79]">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-[#A68986]">
          © {new Date().getFullYear()} VERTEXworkout. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}