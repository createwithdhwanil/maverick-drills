import { YouTubeIcon } from "@/components/ui/icons";
import Link from "next/link";
import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

export default function LatestUploads() {
  const featured = ORIGINALS_VIDEOS.slice(0, 3);

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
          {featured.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getYouTubeThumbnail(video.id)}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white">
                    <YouTubeIcon className="h-6 w-6" />
                  </div>
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
