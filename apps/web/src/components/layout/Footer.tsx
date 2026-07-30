import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#F2EA79]/20 bg-[#022859] text-white" dir="ltr">
      <Container className="py-16 font-tajawal">
        <div className="grid gap-12 text-left md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / About */}
          <div className="flex flex-col items-start">
            <h2 className="mb-5 font-cairo text-2xl font-bold text-[#F2EA79]">
              About Us
            </h2>

            <p className="max-w-xs text-base leading-relaxed text-[#BFB8BA]">
              A professional functional fitness platform combining training,
              education, equipment, and innovation under one ecosystem
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col items-start">
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Platform
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#F2EA79]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/store" className="transition-colors hover:text-[#F2EA79]">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/academy" className="transition-colors hover:text-[#F2EA79]">
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="transition-colors hover:text-[#F2EA79]">
                  Exercises
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-start">
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Support
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#F2EA79]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-[#F2EA79]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-[#F2EA79]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-[#F2EA79]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start">
            <h3 className="mb-5 font-cairo text-xl font-bold text-[#F2EA79]">
              Follow Us
            </h3>

            <ul className="space-y-3 text-[#BFB8BA]">
              <li>
                <a href="#" className="transition-colors hover:text-[#F2EA79]">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#F2EA79]">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#F2EA79]">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#F2EA79]">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[#BFB8BA]/20 pt-8 text-center text-sm font-medium text-[#A68986]">
          © {new Date().getFullYear()} VERTEX Workout. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}