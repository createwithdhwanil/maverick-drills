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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
