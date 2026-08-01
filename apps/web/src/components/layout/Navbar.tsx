"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Academy", href: "/academy" },
  { name: "Exercises", href: "/exercises" },
  { name: "Programs", href: "/programs" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#022859]/10 bg-[#F2EA79]/95 backdrop-blur-xl shadow-sm">
      <Container className="flex h-24 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/logo/logo.png"
            alt="VERTEXworkout"
            width={320}
            height={90}
            priority
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 lg:flex">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-[15px] font-bold transition-all duration-300 ${
                  active
                    ? "bg-white/80 text-[#022859] shadow-sm"
                    : "text-[#022859] hover:bg-white/50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/auth/login">
            <Button
              size="sm"
              className="bg-transparent text-[#022859] hover:bg-white/50 font-bold shadow-none border-0"
            >
              Login
            </Button>
          </Link>

          <Link href="/auth/register">
            <Button
              size="sm"
              className="bg-transparent text-[#022859] hover:bg-white/50 font-bold shadow-none border-0"
            >
              Join Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2.5 transition hover:bg-[#022859]/10 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-7 w-7 text-[#022859]" />
          ) : (
            <Menu className="h-7 w-7 text-[#022859]" />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#022859]/10 bg-[#F2EA79] lg:hidden">
          <Container className="py-6">

            <nav className="flex flex-col gap-3">
              {navigation.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 font-bold transition ${
                      active
                        ? "bg-white/80 text-[#022859]"
                        : "text-[#022859] hover:bg-white/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-[#022859]/10 pt-6 flex flex-col gap-2">
              <Link href="/auth/login">
                <Button
                  className="justify-start bg-transparent text-[#022859] hover:bg-white/50 shadow-none border-0"
                >
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  className="justify-start bg-transparent text-[#022859] hover:bg-white/50 shadow-none border-0"
                >
                  Join Now
                </Button>
              </Link>
            </div>

          </Container>
        </div>
      )}
    </header>
  );
}