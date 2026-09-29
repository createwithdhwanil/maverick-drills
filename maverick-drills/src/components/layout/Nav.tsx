import Link from "next/link";
import { YouTubeIcon, InstagramIcon } from "../ui/icons";
import BrandMark from "../ui/BrandMark";
import MobileMenuToggle from "./MobileMenuToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/originals", label: "Originals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/recommendations", label: "Monthly Picks" },
  { href: "/about", label: "About" },
];
const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";
const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl tracking-tight"
        >
          <BrandMark className="h-8 w-8" />
          MAVERICK<span className="text-red">DRILLS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="text-foreground/70 transition-colors hover:text-red"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 clip-corner-sm bg-red px-5 py-2 font-heading text-xs text-white transition-colors hover:bg-red-deep"
          >
            <YouTubeIcon className="h-4 w-4" />
            SUBSCRIBE
          </a>
        </div>

        <MobileMenuToggle
          links={NAV_LINKS}
          youtubeUrl={YOUTUBE_URL}
          instagramUrl={INSTAGRAM_URL}
        />
      </div>
    </header>
  );
}
