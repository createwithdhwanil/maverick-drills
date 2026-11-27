"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";

import { YouTubeIcon, InstagramIcon } from "../ui/icons";

import MobileMenuToggle from "./MobileMenuToggle";

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
      className="
        sticky top-0 z-50
        border-b border-border/70
        bg-background/95
        shadow-[0_8px_35px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex min-h-[68px]
          w-full max-w-7xl
          items-center justify-between
          gap-3 px-4

          sm:px-6
          lg:gap-4 lg:px-8

          xl:gap-6

          2xl:max-w-[1536px]
          2xl:px-12

          min-[2000px]:max-w-[1760px]
          min-[2000px]:px-16
        "
      >
        {/* BRAND */}
        <Link
          href="/"
          aria-label="Maverick Drills homepage"
          className="
            group flex shrink-0
            items-center gap-1
            font-display text-lg italic
            tracking-[-0.055em]

            transition-opacity duration-200
            hover:opacity-80

            sm:text-xl
          "
        >
          <span className="text-foreground">MAVERICK</span>
          <span className="text-red">DRILLS</span>
        </Link>

        {/* DESKTOP NAV: 1024px AND ABOVE */}
        <nav
          aria-label="Main navigation"
          className="
            hidden min-w-0
            items-center justify-center
            gap-3

            font-body text-xs font-medium

            lg:flex
            xl:gap-6 xl:text-sm
            2xl:gap-8
          "
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
                  group relative shrink-0
                  whitespace-nowrap py-2
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
                    absolute bottom-0 left-0
                    h-[2px] bg-red
                    transition-all duration-300

                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP SOCIAL BUTTONS */}
        <div
          className="
            hidden shrink-0
            items-center gap-2
            lg:flex
          "
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Maverick Drills on Instagram"
            className="
              cinematic-button
              flex h-9 w-9 shrink-0
              items-center justify-center
              clip-corner-sm

              bg-red text-white
              transition-colors duration-200

              hover:bg-red-deep

              2xl:h-10 2xl:w-10
            "
          >
            <InstagramIcon className="h-4 w-4" />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to Maverick Drills on YouTube"
            className="
              cinematic-button
              inline-flex h-9 shrink-0
              items-center justify-center gap-2

              clip-corner-sm bg-red
              px-3 text-white

              font-heading text-[10px]
              uppercase tracking-wide

              transition-colors duration-200
              hover:bg-red-deep

              2xl:h-10 2xl:px-4
            "
          >
            <YouTubeIcon className="h-3.5 w-3.5 shrink-0" />
            <span>SUBSCRIBE</span>
          </a>
        </div>

        {/* MOBILE + TABLET MENU */}
        <MobileMenuToggle
          links={NAV_LINKS}
          youtubeUrl={YOUTUBE_URL}
          instagramUrl={INSTAGRAM_URL}
        />
      </div>

      {/* RED SCROLL PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-0
          z-20 h-[2px] w-full
          origin-left bg-red
        "
        style={{ scaleX }}
      />
    </header>
  );
}
