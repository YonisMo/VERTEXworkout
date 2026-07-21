import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "VERTEXworkout",
  description: "Professional Functional Fitness Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}