import { YouTubeIcon } from "@/components/ui/icons";
import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@maverickdrillsog";

export default function LatestUploads() {
  const featured = ORIGINALS_VIDEOS.slice(0, 3);

  return (
    <section
      id="latest-uploads"
      aria-labelledby="latest-uploads-title"
      className="relative overflow-hidden bg-background"
    >
      {/* SUBTLE BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   right-0 top-0 h-80 w-80
                   rounded-full bg-red/5 blur-3xl"
      />

      <div
        className="relative mx-auto max-w-7xl
                   px-5 py-20 sm:px-8
                   lg:px-12 lg:py-28"
      >
        {/* SECTION HEADER */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p
                className="mb-3 font-heading text-xs
                           tracking-[0.18em] text-red"
              >
                MAVERICK DRILLS ORIGINALS
              </p>

              <h2
                id="latest-uploads-title"
                className="font-display text-3xl
                           uppercase tracking-[-0.04em]
                           text-foreground
                           sm:text-4xl lg:text-5xl"
              >
                LATEST UPLOADS
              </h2>

              <p
                className="mt-3 max-w-lg
                           font-body text-sm
                           leading-relaxed text-muted
                           sm:text-base"
              >
                Fresh gameplay, epic moments, and original gaming content
                straight from Maverick Drills.
              </p>
            </div>

            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center
                         gap-2 border-b border-red
                         pb-2 font-heading text-xs
                         uppercase tracking-wide
                         text-foreground transition-colors
                         hover:text-red"
            >
              <YouTubeIcon className="h-4 w-4 text-red" />
              VIEW CHANNEL
              <span
                aria-hidden="true"
                className="transition-transform
                           group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        {/* VIDEO GRID */}
        <div
          className="mt-10 grid gap-5
                     md:grid-cols-2
                     lg:grid-cols-4 lg:grid-rows-2"
        >
          {featured.map((video, index) => {
            const isFeatured = index === 0;

            return (
              <Reveal
                key={video.id}
                delay={index * 100}
                className={
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                    : "lg:col-span-2"
                }
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title} on YouTube`}
                  className="group relative flex
                             h-full min-h-[240px]
                             overflow-hidden
                             bg-surface
                             clip-corner
                             sm:min-h-[300px]
                             lg:min-h-[220px]"
                >
                  {/* THUMBNAIL */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getYouTubeThumbnail(video.id)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0
                               h-full w-full object-cover
                               transition-transform
                               duration-700
                               group-hover:scale-105"
                  />

                  {/* GRADIENT OVERLAY */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0
                               bg-gradient-to-t
                               from-black/95
                               via-black/35
                               to-black/10
                               transition-colors
                               duration-300"
                  />

                  {/* TOP LABELS */}
                  <div
                    className="absolute inset-x-0
                               top-0 flex items-start
                               justify-between gap-2 p-5"
                  >
                    <span
                      className={`inline-flex items-center
                                  px-3 py-1.5
                                  font-heading text-[10px]
                                  uppercase tracking-wider
                                  ${
                                    isFeatured
                                      ? "bg-red text-white"
                                      : "border border-white/20 bg-black/50 text-white backdrop-blur"
                                  }`}
                    >
                      {isFeatured ? "LATEST DROP" : "MAVERICK ORIGINAL"}
                    </span>

                    <span
                      className="border border-white/20
                                 bg-black/50 px-2 py-1
                                 font-body text-[10px]
                                 uppercase tracking-wider
                                 text-white/90 backdrop-blur"
                    >
                      YOUTUBE
                    </span>
                  </div>

                  {/* PLAY BUTTON */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0
                               flex items-center
                               justify-center"
                  >
                    <div
                      className="flex h-14 w-14
                                 items-center justify-center
                                 rounded-full bg-red/95
                                 text-white shadow-[0_0_35px_rgba(229,9,36,0.25)]
                                 transition-all duration-300
                                 group-hover:scale-110
                                 group-hover:bg-red
                                 sm:h-16 sm:w-16"
                    >
                      <YouTubeIcon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* VIDEO INFORMATION */}
                  <div
                    className="relative z-10 mt-auto
                               w-full p-5 sm:p-7"
                  >
                    <div
                      className="mb-3 flex items-center gap-2
                                 font-body text-[11px]
                                 uppercase tracking-[0.12em]
                                 text-white/65"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red" />
                      MAVERICK DRILLS
                    </div>

                    <h3
                      className={`max-w-xl font-heading
                                  uppercase leading-snug
                                  text-white
                                  transition-colors
                                  group-hover:text-red
                                  ${
                                    isFeatured
                                      ? "text-xl sm:text-2xl lg:text-3xl"
                                      : "text-base sm:text-lg"
                                  }`}
                    >
                      {video.title}
                    </h3>

                    <div
                      className="mt-4 flex items-center gap-2
                                 font-heading text-[11px]
                                 uppercase tracking-wide
                                 text-white/80
                                 transition-colors
                                 group-hover:text-red"
                    >
                      WATCH VIDEO
                      <span
                        aria-hidden="true"
                        className="transition-transform
                                   group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* HOVER BORDER */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none
                               absolute inset-0
                               border border-white/10
                               transition-colors
                               group-hover:border-red/60"
                  />
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* BOTTOM LINK */}
        <Reveal delay={300}>
          <div
            className="mt-10 flex items-center
                       justify-center"
          >
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center
                         gap-3 clip-corner-sm
                         border border-border
                         bg-surface px-7 py-3.5
                         font-heading text-xs
                         uppercase text-foreground
                         transition-all duration-300
                         hover:border-red
                         hover:bg-red hover:text-white"
            >
              <YouTubeIcon className="h-5 w-5" />
              EXPLORE MORE VIDEOS
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
