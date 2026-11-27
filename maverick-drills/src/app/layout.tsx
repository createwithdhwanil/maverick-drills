import type { Metadata } from "next";

import { Bungee, Archivo_Black, DM_Sans } from "next/font/google";

import "./globals.css";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BeatReactiveBackground from "@/components/layout/BeatReactiveBackground";

import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

import { WebsiteStructuredData } from "./StructuredData";

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
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: `${SITE_NAME} | Beyond the Game`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME} | Beyond the Game`,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Beyond the Game`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Beyond the Game`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
          antialiased
        `}
      >
        <WebsiteStructuredData />

        {/* Existing audio-reactive atmosphere */}
        <BeatReactiveBackground />

        {/* Existing cinematic grain overlay */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none fixed inset-0
            z-[60] opacity-[0.035]
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
