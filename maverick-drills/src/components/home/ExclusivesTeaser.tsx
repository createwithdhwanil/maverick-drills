import Link from "next/link";

import { WEBSITE_EXCLUSIVES } from "@/lib/data/originals";

import Reveal from "@/components/ui/Reveal";

import { LoadableVideo } from "@/components/ui/LoadableMedia";

export default function ExclusivesTeaser() {
  const clips = WEBSITE_EXCLUSIVES;

  return (
    <section
      id="website-exclusives"
      aria-labelledby="exclusives-title"
      className="
        relative isolate
        overflow-hidden
        border-t border-border/60
        bg-background
      "
    >
      {/* AMBIENT LIGHTING */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-32 top-16
          h-[420px] w-[420px]
          rounded-full
          bg-red/[0.06]
          blur-[110px]
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-7xl

          px-5 py-20
          sm:px-8
          lg:px-12 lg:py-24

          2xl:max-w-[1536px]

          min-[2000px]:max-w-[1760px]
          min-[2000px]:px-16
        "
      >
        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <Reveal>
          <div
            className="
              flex flex-wrap
              items-end justify-between
              gap-6
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  mb-3 font-heading
                  text-xs uppercase
                  tracking-[0.18em]
                  text-red
                "
              >
                02 / ONLY ON MAVERICK DRILLS
              </p>

              <h2
                id="exclusives-title"
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
                WEBSITE EXCLUSIVES
              </h2>

              <p
                className="
                  mt-4 max-w-xl
                  font-body text-sm
                  leading-relaxed
                  text-muted

                  sm:text-base
                "
              >
                Original clips, unforgettable moments, and exclusive gameplay
                you won&apos;t find anywhere else.
              </p>
            </div>

            <Link
              href="/originals"
              className="
                group inline-flex
                items-center gap-2

                border-b border-red
                pb-2

                font-heading text-xs
                uppercase tracking-wide
                text-foreground

                transition-colors duration-200
                hover:text-red
              "
            >
              EXPLORE ORIGINALS
              <span
                aria-hidden="true"
                className="
                  text-red
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>

        {/* =====================================
            EXCLUSIVE VIDEO GRID
        ===================================== */}

        {clips.length > 0 ? (
          <div
            className="
              mt-12 grid
              grid-cols-1 items-stretch
              gap-5

              md:grid-cols-2

              lg:gap-6
            "
          >
            {clips.map((clip, index) => {
              const isFeatured = index === 0;

              return (
                <Reveal
                  key={`${clip.src}-${index}`}
                  delay={Math.min(index, 4) * 100}
                  className="h-full min-w-0"
                >
                  <article
                    className="
                      group relative flex
                      h-full min-w-0
                      flex-col overflow-hidden

                      border border-white/10
                      bg-surface

                      transition-[border-color,box-shadow]
                      duration-300

                      hover:border-red/50

                      hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)]
                    "
                  >
                    {/* VIDEO STAGE */}
                    <div
                      className="
                        relative overflow-hidden
                        border-b border-border/60
                        bg-[#08090C]
                      "
                    >
                      {/* The player retains native controls. */}
                      <LoadableVideo
                        src={clip.src}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={clip.title}
                        wrapperClassName="
                          aspect-video w-full
                          bg-[#08090C]
                        "
                        className="
                          h-full w-full
                          object-contain
                        "
                      />

                      {/* Editorial badge */}
                      <div
                        className="
                          pointer-events-none
                          absolute left-3 top-3
                          z-20

                          sm:left-4 sm:top-4
                        "
                      >
                        <span
                          className={`
                            inline-flex
                            border border-white/15
                            px-3 py-1.5

                            font-heading
                            text-[9px] uppercase
                            tracking-wider text-white

                            shadow-[0_8px_24px_rgba(0,0,0,0.25)]

                            sm:text-[10px]

                            ${
                              isFeatured
                                ? "bg-red"
                                : "bg-black/75 backdrop-blur-md"
                            }
                          `}
                        >
                          {isFeatured
                            ? "FEATURED EXCLUSIVE"
                            : `EXCLUSIVE ${String(index + 1).padStart(2, "0")}`}
                        </span>
                      </div>
                    </div>

                    {/* VIDEO INFORMATION */}
                    <div
                      className="
                        flex flex-1
                        flex-col p-5

                        sm:p-6
                        2xl:p-7
                      "
                    >
                      <div
                        className="
                          mb-4 flex
                          items-center gap-2

                          font-body text-[10px]
                          uppercase
                          tracking-[0.16em]
                          text-muted
                        "
                      >
                        <span
                          className="
                            h-1.5 w-1.5
                            rounded-full bg-red
                          "
                        />
                        MAVERICK DRILLS ORIGINAL
                      </div>

                      <h3
                        className="
                          max-w-xl
                          font-heading
                          text-base uppercase
                          leading-snug
                          text-foreground

                          sm:text-xl
                          lg:text-2xl
                        "
                      >
                        {clip.title}
                      </h3>

                      <p
                        className="
                          mt-3 font-body
                          text-xs leading-relaxed
                          text-muted
                        "
                      >
                        Exclusive gameplay clip. Watch directly on Maverick
                        Drills.
                      </p>

                      {/* BOTTOM DETAILS */}
                      <div
                        className="
                          mt-auto flex
                          items-center
                          justify-between gap-3

                          border-t border-white/10
                          pt-4

                          font-body text-[10px]
                          uppercase tracking-widest
                        "
                      >
                        <span className="text-white/50">WEBSITE EXCLUSIVE</span>

                        <span className="text-red">PLAY ABOVE ↑</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div
            className="
              mt-10 border border-border
              bg-surface p-10
              text-center
            "
          >
            <p className="font-body text-muted">
              New exclusive clips are coming soon.
            </p>
          </div>
        )}

        {/* =====================================
            BOTTOM NAVIGATION
        ===================================== */}

        <Reveal delay={250}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/originals"
              className="
                cinematic-button
                inline-flex min-h-12
                items-center
                justify-center gap-3

                clip-corner-sm
                border border-border
                bg-surface px-7 py-3.5

                font-heading
                text-xs uppercase
                text-foreground

                transition-colors duration-300

                hover:border-red
                hover:bg-red
                hover:text-white
              "
            >
              EXPLORE ALL ORIGINALS
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
