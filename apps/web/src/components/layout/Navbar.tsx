import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const links = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Academy", href: "/academy" },
  { name: "Exercises", href: "/exercises" },
  { name: "Programs", href: "/programs" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#022859]/10 bg-white/90 backdrop-blur-md shadow-sm">
      <Container className="flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-cairo text-2xl font-black tracking-wider text-[#022859] transition hover:opacity-90 sm:text-3xl"
        >
          VERTEX<span className="text-[#022859]/70">workout</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 lg:flex font-tajawal">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-bold text-[#022859] transition-colors duration-200 hover:text-[#A68986]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 font-tajawal">
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button variant="primary" size="sm">
              Join Now
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}