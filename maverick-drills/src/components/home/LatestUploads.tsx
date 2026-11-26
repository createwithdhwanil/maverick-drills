import { YouTubeIcon } from "@/components/ui/icons";

import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

import Reveal from "@/components/ui/Reveal";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@maverickdrillsog";

export default function LatestUploads() {
  const featured = ORIGINALS_VIDEOS.slice(0, 3);

  return (
    <section
      id="latest-uploads"
      aria-labelledby="latest-uploads-title"
      className="
        premium-atmosphere
        relative overflow-hidden
        bg-background
      "
    >
      {/* ATMOSPHERIC BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-24 top-12
          h-96 w-96 rounded-full
          bg-red/5 blur-3xl
        "
      />

      <div
        className="
          relative mx-auto w-full
          max-w-7xl

          px-5 py-20
          sm:px-8

          lg:px-12 lg:py-24

          2xl:max-w-[1536px]

          min-[2000px]:max-w-[1760px]
          min-[2000px]:px-16
        "
      >
        {/* SECTION HEADER */}
        <Reveal>
          <div
            className="
              flex flex-wrap items-end
              justify-between gap-6
            "
          >
            <div>
              <p
                className="
                  mb-3 font-heading
                  text-xs uppercase
                  tracking-[0.18em]
                  text-red
                "
              >
                MAVERICK DRILLS ORIGINALS
              </p>

              <h2
                id="latest-uploads-title"
                className="
                  font-display
                  text-3xl uppercase
                  leading-tight
                  tracking-[-0.04em]
                  text-foreground

                  sm:text-4xl
                  lg:text-5xl
                "
              >
                LATEST UPLOADS
              </h2>

              <p
                className="
                  mt-3 max-w-lg
                  font-body text-sm
                  leading-relaxed
                  text-muted
                  sm:text-base
                "
              >
                Fresh gameplay, epic moments, and original gaming content
                straight from Maverick Drills.
              </p>
            </div>

            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                premium-link group
                border-b border-red pb-2

                font-heading text-xs
                uppercase tracking-wide
                text-foreground
              "
            >
              <YouTubeIcon className="h-4 w-4 text-red" />
              VIEW CHANNEL
              <span
                aria-hidden="true"
                className="
                  transition-transform duration-200
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        {/* VIDEO CARDS */}
        {featured.length > 0 ? (
          <div
            className="
              mt-10 grid gap-5

              md:grid-cols-2

              lg:grid-cols-4
              lg:grid-rows-2
            "
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
                    className="
                      premium-card group
                      relative flex h-full
                      min-h-[240px] flex-col
                      overflow-hidden clip-corner

                      border border-white/10
                      bg-surface

                      sm:min-h-[300px]
                      lg:min-h-[220px]
                    "
                  >
                    {/* REAL YOUTUBE THUMBNAIL */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getYouTubeThumbnail(video.id)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="
                        premium-image
                        absolute inset-0
                        h-full w-full
                        object-cover
                      "
                    />

                    {/* CINEMATIC GRADIENT */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute inset-0

                        bg-gradient-to-t
                        from-black/95
                        via-black/35
                        to-black/10
                      "
                    />

                    {/* TOP BADGES */}
                    <div
                      className="
                        relative z-10
                        flex items-start
                        justify-between gap-2
                        p-4 sm:p-5
                      "
                    >
                      <span
                        className={`
                          inline-flex
                          px-3 py-1.5
                          font-heading
                          text-[10px] uppercase
                          tracking-wider text-white

                          ${
                            isFeatured
                              ? "bg-red"
                              : "border border-white/25 bg-black/60 backdrop-blur-md"
                          }
                        `}
                      >
                        {isFeatured ? "LATEST DROP" : "MAVERICK ORIGINAL"}
                      </span>

                      <span
                        className="
                          border border-white/25
                          bg-black/60
                          px-2.5 py-1.5

                          font-body text-[10px]
                          uppercase tracking-wider
                          text-white/90
                          backdrop-blur-md
                        "
                      >
                        YOUTUBE
                      </span>
                    </div>

                    {/* PLAY BUTTON */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute inset-0
                        flex items-center justify-center
                      "
                    >
                      <div
                        className="
                          flex h-14 w-14
                          items-center justify-center
                          rounded-full

                          bg-red text-white

                          shadow-[0_0_35px_rgba(229,9,36,0.28)]

                          transition-all duration-300

                          group-hover:scale-110
                          group-hover:shadow-[0_0_48px_rgba(229,9,36,0.45)]

                          sm:h-16 sm:w-16

                          motion-reduce:transition-none
                          motion-reduce:group-hover:scale-100
                        "
                      >
                        <YouTubeIcon className="h-7 w-7" />
                      </div>
                    </div>

                    {/* VIDEO INFORMATION */}
                    <div
                      className="
                        relative z-10 mt-auto
                        w-full p-5 sm:p-7
                      "
                    >
                      <div
                        className="
                          mb-3 flex items-center gap-2

                          font-body text-[10px]
                          uppercase tracking-[0.14em]
                          text-white/75
                        "
                      >
                        <span
                          className="
                            h-1.5 w-1.5
                            rounded-full bg-red
                          "
                        />
                        MAVERICK DRILLS
                      </div>

                      <h3
                        className={`
                          max-w-xl font-heading
                          uppercase leading-snug
                          text-white

                          transition-colors duration-300
                          group-hover:text-white

                          ${
                            isFeatured
                              ? "text-lg sm:text-2xl lg:text-3xl"
                              : "text-sm sm:text-lg"
                          }
                        `}
                      >
                        {video.title}
                      </h3>

                      <div
                        className="
                          mt-5 flex items-center gap-2

                          font-heading text-[11px]
                          uppercase tracking-wide
                          text-white/85
                        "
                      >
                        <span className="text-red">WATCH VIDEO</span>

                        <span
                          aria-hidden="true"
                          className="
                            text-red
                            transition-transform duration-200

                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                          "
                        >
                          ↗
                        </span>
                      </div>
                    </div>

                    {/* HOVER BORDER */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute inset-0
                        border border-white/10

                        transition-colors duration-300
                        group-hover:border-red/60
                      "
                    />
                  </a>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div
            className="
              mt-10 border border-border
              bg-surface p-10 text-center
            "
          >
            <p className="font-body text-muted">
              New Maverick Drills videos are coming soon.
            </p>
          </div>
        )}

        {/* BOTTOM ACTION */}
        <Reveal delay={300}>
          <div className="mt-10 flex justify-center">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                premium-glow
                inline-flex min-h-12
                items-center justify-center gap-3

                clip-corner-sm
                border border-border
                bg-surface

                px-7 py-3.5
                font-heading text-xs uppercase
                text-foreground

                transition-colors duration-300

                hover:border-red
                hover:bg-red
                hover:text-white
              "
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
