import Link from "next/link";
import { YouTubeIcon, InstagramIcon } from "../ui/icons";

// TODO: swap these for your real channel/handle URLs
const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";
const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills";

const EXPLORE_LINKS = [
  { href: "/originals", label: "Originals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/recommendations", label: "Monthly Picks" },
];

const COMPANY_LINKS = [{ href: "/about", label: "About" }];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border pb-16 md:flex-row md:items-center">
          <h2 className="font-heading text-3xl leading-tight md:text-5xl">
            NEVER MISS
            <br />A DROP.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 clip-corner-sm bg-red px-6 py-3 font-heading text-sm text-white transition-colors hover:bg-red-deep"
            >
              <YouTubeIcon className="h-5 w-5" />
              SUBSCRIBE ON YOUTUBE
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 clip-corner-sm border border-border px-6 py-3 font-heading text-sm transition-colors hover:border-red hover:text-red"
            >
              <InstagramIcon className="h-5 w-5" />
              FOLLOW ON INSTAGRAM
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          <div>
            <h3 className="font-heading text-sm text-foreground/50">EXPLORE</h3>
            <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-red">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm text-foreground/50">COMPANY</h3>
            <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-red">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <h3 className="font-heading text-sm text-foreground/50">
              MAVERICK DRILLS
            </h3>
            <p className="mt-4 max-w-sm font-body text-sm text-foreground/70">
              Gaming content for gamers and casual audiences alike — originals,
              rankings, screenshots, and picks, straight from the channel.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-foreground/50">
            © {new Date().getFullYear()} Maverick Drills. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground/60 hover:text-red"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-foreground/60 hover:text-red"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
