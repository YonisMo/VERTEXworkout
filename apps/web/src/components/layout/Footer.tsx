import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#022859] text-[#F2EA79]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 items-start">

          {/* About - Centered */}
          <div className="flex flex-col items-center justify-center text-center lg:col-span-1">
            <Image
              src="/images/logo/logo-footer.png"
              alt="VERTEXworkout"
              width={170}
              height={95}
              className="mb-5 h-auto w-auto"
              priority={false}
            />

            <p className="mt-3 w-full font-tajawal text-[20px] font-medium leading-7 text-[#F2EA79]">
              Train Smarter
              <span className="mx-3 text-[#F2EA79]">•</span>
              Live Stronger
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#F2EA79]">
              Platform
            </h3>

            <ul className="space-y-3 text-[#F2EA79]">
              <li>
                <Link
                  href="/"
                  className="transition duration-300 hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/store"
                  className="transition duration-300 hover:text-white"
                >
                  Store
                </Link>
              </li>

              <li>
                <Link
                  href="/academy"
                  className="transition duration-300 hover:text-white"
                >
                  Academy
                </Link>
              </li>

              <li>
                <Link
                  href="/programs"
                  className="transition duration-300 hover:text-white"
                >
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  href="/exercises"
                  className="transition duration-300 hover:text-white"
                >
                  Exercises
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#F2EA79]">
              Support
            </h3>

            <ul className="space-y-3 text-[#F2EA79]">
              <li>
                <Link
                  href="/contact"
                  className="transition duration-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="transition duration-300 hover:text-white"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition duration-300 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#F2EA79]">
              Follow Us
            </h3>

            <ul className="space-y-3 text-[#F2EA79]">
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-white"
                >
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-white"
                >
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-white"
                >
                  YouTube
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-white"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-6 border-t border-[#F2EA79]/20 pt-5 text-center text-[14px] text-[#F2EA79]">
          © {new Date().getFullYear()} VERTEXworkout. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}