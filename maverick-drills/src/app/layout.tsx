import type { Metadata } from "next";

import { Bungee, Archivo_Black, DM_Sans } from "next/font/google";

import "./globals.css";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BeatReactiveBackground from "@/components/layout/BeatReactiveBackground";

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
  title: {
    default: "Maverick Drills | Beyond the Game",
    template: "%s | Maverick Drills",
  },
  description:
    "Discover cinematic gameplay, gaming originals, stunning screenshots and curated game recommendations from Maverick Drills.",
  applicationName: "Maverick Drills",
  openGraph: {
    type: "website",
    siteName: "Maverick Drills",
    title: "Maverick Drills | Beyond the Game",
    description:
      "Cinematic gameplay, gaming originals and curated game discoveries.",
  },
  twitter: {
    card: "summary",
    title: "Maverick Drills | Beyond the Game",
    description: "Go beyond the game with Maverick Drills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${bungee.variable}
          ${archivoBlack.variable}
          ${dmSans.variable}
          min-h-screen bg-background
          text-foreground antialiased
        `}
      >
        {/* One global audio-reactive atmosphere */}
        <BeatReactiveBackground />

        {/* Subtle cinematic film grain */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            fixed inset-0 z-[60]
            opacity-[0.035]
            mix-blend-overlay
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <Nav />

        {children}

        <Footer />
      </body>
    </html>
  );
}
