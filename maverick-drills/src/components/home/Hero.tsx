import Link from "next/link";
import { YouTubeIcon } from "@/components/ui/icons";
import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

export default function Hero() {
  const latestVideo = ORIGINALS_VIDEOS[0];
  const latestVideoUrl = `https://www.youtube.com/watch?v=${latestVideo.id}`;

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getYouTubeThumbnail(latestVideo.id)})`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-40">
        <p className="font-heading text-sm text-red">
          GAMER. CREATOR. THIS IS THE DRILL.
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
          GAMING CONTENT THAT HITS DIFFERENT.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg text-white/80">
          Originals, exclusive screenshots, and the games worth your time —
          straight from the channel, no fluff.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={latestVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 clip-corner-sm bg-red px-7 py-3 font-heading text-sm text-white transition-colors hover:bg-red-deep"
          >
            <YouTubeIcon className="h-5 w-5" />
            WATCH LATEST ON YOUTUBE
          </a>
          <Link
            href="/originals"
            className="flex items-center gap-2 clip-corner-sm border border-white/30 px-7 py-3 font-heading text-sm text-white transition-colors hover:border-red hover:text-red"
          >
            BROWSE ORIGINALS
          </Link>
        </div>
      </div>
    </section>
  );
}
