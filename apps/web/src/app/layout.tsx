import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERTEX Workout",
  description: "Functional fitness equipment & fitness academy",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cairo.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-slate-50 font-tajawal text-[#022859] antialiased selection:bg-[#F2EA79] selection:text-[#022859]">
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}