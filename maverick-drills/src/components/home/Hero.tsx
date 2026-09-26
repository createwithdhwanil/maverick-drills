import Link from "next/link";
import { YouTubeIcon } from "../ui/icons";

// TODO: swap for your real channel URL
const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

export default function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="font-heading text-sm text-red">
          GAMER. CREATOR. THIS IS THE DRILL.
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          GAMING CONTENT THAT HITS DIFFERENT.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg text-foreground/70">
          Originals, exclusive screenshots, and the games worth your time —
          straight from the channel, no fluff.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-red px-7 py-3 font-heading text-sm text-white transition-colors hover:bg-red-deep"
          >
            <YouTubeIcon className="h-5 w-5" />
            WATCH LATEST ON YOUTUBE
          </a>
          <Link
            href="/originals"
            className="flex items-center gap-2 rounded-full border border-border px-7 py-3 font-heading text-sm transition-colors hover:border-red hover:text-red"
          >
            BROWSE ORIGINALS
          </Link>
        </div>
      </div>
    </section>
  );
}
