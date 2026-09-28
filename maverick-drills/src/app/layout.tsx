import type { Metadata } from "next";
import { Bungee, Archivo_Black, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Maverick Drills",
  description: "Gaming content, rankings, and originals from Maverick Drills.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bungee.variable} ${archivoBlack.variable} ${dmSans.variable} antialiased`}
      >
        <div
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
