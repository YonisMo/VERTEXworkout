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
    <header className="sticky top-0 z-50 border-b-2 border-[#F2EA79] bg-[#022859]">
      <Container className="flex h-[72px] items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-extrabold text-[#F2EA79] transition hover:opacity-90"
        >
          VERTEXworkout
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-semibold text-white transition hover:text-[#F2EA79]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="secondary">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Join Now
            </Button>
          </Link>
        </div>

      </Container>
    </header>
  );
}