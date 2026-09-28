import { YouTubeIcon } from "@/components/ui/icons";
import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function LatestUploads() {
  const featured = ORIGINALS_VIDEOS.slice(0, 3);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading index="01" title="LATEST UPLOADS" href="/originals" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((video, index) => {
            const isFeatured = index === 0;
            return (
              <Reveal
                key={video.id}
                delay={index * 100}
                className={
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col"
                >
                  <div
                    className={`relative overflow-hidden clip-corner bg-surface ${
                      isFeatured ? "h-full min-h-[220px]" : "aspect-video"
                    }`}
                  >
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
                  <h3
                    className={`mt-3 font-heading leading-snug group-hover:text-red ${
                      isFeatured ? "text-lg" : "text-sm"
                    }`}
                  >
                    {video.title}
                  </h3>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
