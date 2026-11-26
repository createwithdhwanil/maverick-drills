"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { YouTubeIcon, InstagramIcon } from "../ui/icons";
import MobileMenuToggle from "./MobileMenuToggle";
import { motion, useScroll, useSpring } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/originals", label: "Originals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/recommendations", label: "Monthly Picks" },
  { href: "/about", label: "About" },
];

const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills/";

export default function Nav() {
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/70
                 bg-background/95 shadow-[0_8px_35px_rgba(0,0,0,0.25)]
                 backdrop-blur-xl"
    >
      <div
        className="
    mx-auto flex min-h-17 w-full
    max-w-7xl items-center
    justify-between gap-4
    px-5 sm:px-8 lg:px-12
    2xl:max-w-[1536px]
    min-[2000px]:max-w-[1760px]
    min-[2000px]:px-16
  "
      >
        {/* BRAND WORDMARK */}
        <Link
          href="/"
          aria-label="Maverick Drills homepage"
          className="group flex shrink-0 items-center gap-1.5
                     font-display text-lg italic
                     tracking-[-0.055em] transition-opacity
                     duration-200 hover:opacity-85 sm:text-xl"
        >
          <span className="text-foreground">MAVERICK</span>
          <span className="text-red">DRILLS</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6
                     font-body text-sm font-medium
                     lg:gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative whitespace-nowrap py-2
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-red"
                      : "text-foreground/70 hover:text-foreground"
                  }
                `}
              >
                {link.label}

                <span
                  aria-hidden="true"
                  className={`
                    absolute bottom-0 left-0 h-0.5
                    bg-red transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* SOCIAL ACTIONS */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Maverick Drills on Instagram"
            className="cinematic-button clip-corner-sm bg-red px-6 py-3 text-white"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to Maverick Drills on YouTube"
            className="cinematic-button clip-corner-sm bg-red px-6 py-3 text-white"
          >
            <YouTubeIcon className="h-4 w-4" />
            <span>SUBSCRIBE</span>
          </a>
        </div>

        {/* EXISTING MOBILE MENU */}
        <MobileMenuToggle
          links={NAV_LINKS}
          youtubeUrl={YOUTUBE_URL}
          instagramUrl={INSTAGRAM_URL}
        />
      </div>

      {/* CINEMATIC SCROLL PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="
    pointer-events-none absolute
    bottom-0 left-0 right-0
    z-20 h-[2px]
    origin-left bg-red
  "
        style={{ scaleX }}
      />
    </header>
  );
}
