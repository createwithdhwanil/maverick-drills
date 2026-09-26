import Link from "next/link";
import { YouTubeIcon } from "../ui/icons";

// TODO: replace with real video data once the data layer is built
const LATEST_VIDEOS = [
  {
    title: "I Played the Most BROKEN Build in Iron Echelon",
  },
  {
    title: "This New Update Changes EVERYTHING",
  },
  {
    title: "Ranking Every Weapon in the Game (Tier List)",
  },
];

// TODO: swap for your real channel URL
const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

export default function LatestUploads() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">LATEST UPLOADS</h2>
          <Link
            href="/originals"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LATEST_VIDEOS.map((video) => (
            <a
              key={video.title}
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-surface">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-110">
                  <YouTubeIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-3 font-heading text-sm leading-snug group-hover:text-red">
                {video.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
