import Link from "next/link";

import { YouTubeIcon, InstagramIcon } from "../ui/icons";

const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills/";

const EXPLORE_LINKS = [
  { href: "/originals", label: "Originals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/recommendations", label: "Monthly Picks" },
];

const COMPANY_LINKS = [{ href: "/about", label: "About" }];

export default function Footer() {
  return (
    <footer
      aria-label="Maverick Drills footer"
      className="relative overflow-hidden
                 border-t border-border
                 bg-background"
    >
      {/* SUBTLE BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   -right-32 top-0 h-96 w-96
                   rounded-full bg-red/5 blur-3xl"
      />

      <div
        className="relative mx-auto max-w-7xl
                   px-5 sm:px-8 lg:px-12"
      >
        {/* SUBSCRIBE SECTION */}
        <div
          className="flex flex-col
                     items-start justify-between
                     gap-8 border-b border-border
                     py-16 lg:flex-row
                     lg:items-center lg:py-20"
        >
          <div className="max-w-xl">
            <p
              className="mb-4 font-heading
                         text-xs uppercase
                         tracking-[0.18em] text-red"
            >
              STAY IN THE GAME
            </p>

            <h2
              className="font-display text-4xl
                         uppercase leading-[1.05]
                         tracking-[-0.04em]
                         text-foreground
                         sm:text-5xl lg:text-6xl"
            >
              NEVER MISS
              <br />A <span className="text-red">DROP.</span>
            </h2>

            <p
              className="mt-5 max-w-md
                         font-body text-sm
                         leading-relaxed text-muted
                         sm:text-base"
            >
              Fresh gameplay, exclusive moments, and gaming discoveries straight
              from Maverick Drills.
            </p>
          </div>

          <div
            className="flex w-full flex-col
                       gap-3 sm:w-auto"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Maverick Drills on YouTube"
              className="group inline-flex min-h-12
                         items-center justify-center
                         gap-3 clip-corner-sm
                         bg-red px-7 py-3.5
                         font-heading text-xs
                         uppercase tracking-wide
                         text-white
                         transition-all duration-300
                         hover:bg-red-deep
                         hover:shadow-[0_0_25px_rgba(229,9,36,0.25)]
                         sm:text-sm"
            >
              <YouTubeIcon className="h-5 w-5" />
              SUBSCRIBE ON YOUTUBE
              <span
                aria-hidden="true"
                className="transition-transform
                           group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Maverick Drills on Instagram"
              className="group inline-flex min-h-12
                         items-center justify-center
                         gap-3 clip-corner-sm
                         border border-border
                         bg-surface px-7 py-3.5
                         font-heading text-xs
                         uppercase tracking-wide
                         text-foreground
                         transition-all duration-300
                         hover:border-red
                         hover:text-red
                         sm:text-sm"
            >
              <InstagramIcon className="h-5 w-5" />
              FOLLOW ON INSTAGRAM
              <span
                aria-hidden="true"
                className="transition-transform
                           group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div
          className="grid gap-12 py-14
                     md:grid-cols-2
                     lg:grid-cols-4 lg:gap-10
                     lg:py-20"
        >
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="Maverick Drills homepage"
              className="group inline-flex
                         items-center gap-2
                         font-display text-2xl
                         italic tracking-[-0.055em]
                         transition-opacity
                         hover:opacity-85
                         sm:text-3xl"
            >
              <span className="text-foreground">MAVERICK</span>

              <span className="text-red">DRILLS</span>
            </Link>

            <p
              className="mt-5 max-w-sm
                         font-body text-sm
                         leading-relaxed text-muted"
            >
              Gaming content for gamers and casual audiences alike. Originals,
              rankings, screenshots, and curated picks — straight from Maverick
              Drills.
            </p>

            <p
              className="mt-6 font-heading
                         text-xs uppercase
                         tracking-[0.15em] text-red"
            >
              LEVEL UP YOUR GAME.
            </p>
          </div>

          {/* EXPLORE LINKS */}
          <nav aria-label="Footer explore links">
            <h3
              className="font-heading text-xs
                         uppercase tracking-[0.14em]
                         text-red"
            >
              EXPLORE
            </h3>

            <ul
              className="mt-6 flex flex-col
                         gap-4 font-body text-sm"
            >
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70
                               transition-colors
                               duration-200
                               hover:text-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COMPANY AND SOCIAL LINKS */}
          <div className="flex flex-col gap-10">
            <nav aria-label="Footer company links">
              <h3
                className="font-heading text-xs
                           uppercase tracking-[0.14em]
                           text-red"
              >
                COMPANY
              </h3>

              <ul
                className="mt-6 flex flex-col
                           gap-4 font-body text-sm"
              >
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/70
                                 transition-colors
                                 duration-200
                                 hover:text-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3
                className="font-heading text-xs
                           uppercase tracking-[0.14em]
                           text-red"
              >
                CONNECT
              </h3>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Maverick Drills YouTube channel"
                  className="flex h-11 w-11
                             items-center justify-center
                             border border-border
                             bg-surface text-foreground/70
                             transition-all duration-300
                             hover:border-red
                             hover:bg-red
                             hover:text-white"
                >
                  <YouTubeIcon className="h-5 w-5" />
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Maverick Drills Instagram profile"
                  className="flex h-11 w-11
                             items-center justify-center
                             border border-border
                             bg-surface text-foreground/70
                             transition-all duration-300
                             hover:border-red
                             hover:bg-red
                             hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div
          className="flex flex-col gap-4
                     border-t border-border py-7
                     sm:flex-row sm:items-center
                     sm:justify-between"
        >
          <p
            className="font-body text-xs
                       text-muted"
          >
            © {new Date().getFullYear()} Maverick Drills. All rights reserved.
          </p>

          <p
            className="font-heading text-[10px]
                       uppercase tracking-[0.16em]
                       text-foreground/40"
          >
            GAMING. CREATIVITY. COMMUNITY.
          </p>
        </div>
      </div>
    </footer>
  );
}
