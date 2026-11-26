import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

import { YouTubeIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@maverickdrillsog";

export default function LatestUploads() {
  const videos = ORIGINALS_VIDEOS.slice(0, 3);

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
      {/* Ambient red glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32 top-20
          h-[450px] w-[450px]
          rounded-full bg-red/[0.06]
          blur-[110px]
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
        {/* HEADER */}
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
                  leading-tight tracking-[-0.04em]
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
                  text-muted sm:text-base
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
                group inline-flex
                items-center gap-2
                border-b border-red pb-2

                font-heading text-xs
                uppercase tracking-wide
                text-foreground

                transition-colors
                hover:text-red
              "
            >
              <YouTubeIcon className="h-4 w-4 text-red" />
              VIEW CHANNEL
              <span
                aria-hidden="true"
                className="
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        {/* PREMIUM VIDEO GRID */}
        {videos.length > 0 ? (
          <div
            className="
    mt-12 grid gap-5

    md:grid-cols-2

    lg:grid-cols-4
    lg:grid-rows-none
    lg:auto-rows-[235px]

    2xl:auto-rows-[280px]

    min-[2000px]:auto-rows-[310px]
  "
          >
            {videos.map((video, index) => {
              const isFeatured = index === 0;

              return (
                <Reveal
                  key={video.id}
                  delay={index * 100}
                  className={`
    h-full min-h-0
    ${isFeatured ? "md:col-span-2 lg:row-span-2" : "lg:col-span-2"}
  `}
                >
                  <PremiumTiltCard maxTilt={isFeatured ? 3.5 : 5}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${video.title} on YouTube`}
                      className={`
                        group relative block
                        h-full min-h-[275px]
                        w-full overflow-hidden
                        clip-corner

                        border border-white/10
                        bg-surface

                        sm:min-h-[310px]

                        lg:min-h-0
                        lg:aspect-auto
                      `}
                    >
                      {/* ACTUAL YOUTUBE THUMBNAIL */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getYouTubeThumbnail(video.id)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="
                          absolute inset-0
                          h-full w-full
                          object-cover

                          transition-transform
                          duration-700
                          ease-out

                          group-hover:scale-[1.08]

                          motion-reduce:transition-none
                          motion-reduce:group-hover:scale-100
                        "
                      />

                      {/* CINEMATIC SHADING */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0

                          bg-gradient-to-t
                          from-black/95
                          via-black/35
                          to-black/10
                        "
                      />

                      {/* TOP BADGES */}
                      <div
                        className="
                          absolute inset-x-0
                          top-0 z-10
                          flex items-start
                          justify-between gap-3
                          p-4 sm:p-5
                        "
                      >
                        <span
                          className={`
                            px-3 py-2
                            font-heading
                            text-[10px]
                            uppercase tracking-wide
                            text-white

                            ${
                              isFeatured
                                ? "bg-red"
                                : "border border-white/20 bg-black/65 backdrop-blur-md"
                            }
                          `}
                        >
                          {isFeatured ? "LATEST DROP" : "MAVERICK ORIGINAL"}
                        </span>

                        <span
                          className="
                            border border-white/20
                            bg-black/65 px-2.5 py-1.5

                            font-body text-[10px]
                            uppercase tracking-wide
                            text-white/90
                            backdrop-blur-md
                          "
                        >
                          YOUTUBE
                        </span>
                      </div>

                      {/* GLOWING PLAY CONTROL */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0 z-10
                          flex items-center
                          justify-center
                        "
                      >
                        <div
                          className="
                            flex h-16 w-16
                            items-center justify-center
                            rounded-full

                            border border-white/20
                            bg-red text-white

                            shadow-[0_0_35px_rgba(229,9,36,0.28)]

                            transition-all duration-500

                            group-hover:scale-110
                            group-hover:shadow-[0_0_65px_rgba(229,9,36,0.48)]

                            motion-reduce:transition-none
                            motion-reduce:group-hover:scale-100
                          "
                        >
                          <YouTubeIcon className="h-7 w-7" />
                        </div>
                      </div>

                      {/* BOTTOM INFORMATION */}
                      <div
                        className="
                          absolute inset-x-0
                          bottom-0 z-10
                          p-5 sm:p-7
                        "
                      >
                        <p
                          className="
                            mb-3 flex
                            items-center gap-2

                            font-body
                            text-[10px]
                            uppercase tracking-[0.14em]
                            text-white/70
                          "
                        >
                          <span
                            className="
                              h-1.5 w-1.5
                              rounded-full bg-red
                            "
                          />
                          MAVERICK DRILLS
                        </p>

                        <h3
                          className={`
                            max-w-xl
                            font-heading
                            uppercase
                            leading-snug

                            text-white
                            [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]

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
                            mt-4 flex
                            items-center gap-2

                            font-heading
                            text-[10px]
                            uppercase tracking-wide
                            text-red
                          "
                        >
                          WATCH VIDEO
                          <span
                            aria-hidden="true"
                            className="
                              transition-transform
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          >
                            ↗
                          </span>
                        </div>
                      </div>

                      {/* CARD BORDER */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0 z-20

                          border border-white/10

                          transition-colors
                          group-hover:border-red/50
                        "
                      />
                    </a>
                  </PremiumTiltCard>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p
            className="
              mt-10 border border-border
              bg-surface p-10
              text-center text-muted
            "
          >
            New videos are coming soon.
          </p>
        )}

        {/* CHANNEL CTA */}
        <Reveal delay={300}>
          <div className="mt-12 flex justify-center">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                cinematic-button
                inline-flex min-h-12
                items-center gap-3
                clip-corner-sm

                border border-border
                bg-surface px-7 py-3.5

                font-heading text-xs
                uppercase text-foreground

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
