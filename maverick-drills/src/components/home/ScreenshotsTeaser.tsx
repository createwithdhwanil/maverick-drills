import Link from "next/link";

import { GAME_GALLERIES } from "@/lib/data/gallery";
import Reveal from "@/components/ui/Reveal";
import { LoadableImage } from "@/components/ui/LoadableMedia";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

export default function ScreenshotsTeaser() {
  const featured = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.slice(0, 2).map((shot) => ({
      ...shot,
      game,
    })),
  ).slice(0, 4);

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-title"
      className="
        premium-atmosphere
        relative overflow-hidden
        border-t border-border/60
        bg-background
      "
    >
      {/* AMBIENT BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32
          top-20 h-[450px] w-[450px]
          rounded-full bg-red/[0.05]
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
        {/* SECTION HEADER */}
        <Reveal>
          <div
            className="
              flex flex-wrap
              items-end justify-between
              gap-6
            "
          >
            <div>
              <p
                className="
                  mb-3 font-heading
                  text-xs uppercase
                  tracking-[0.18em] text-red
                "
              >
                03 / CAPTURE THE MOMENT
              </p>

              <h2
                id="screenshots-title"
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
                EXCLUSIVE SCREENSHOTS
              </h2>

              <p
                className="
                  mt-3 max-w-xl
                  font-body text-sm
                  leading-relaxed
                  text-muted sm:text-base
                "
              >
                Every frame tells a story. Explore breathtaking worlds,
                unforgettable moments, and our favorite game captures.
              </p>
            </div>

            <Link
              href="/gallery"
              className="
                group inline-flex items-center
                gap-2 border-b border-red
                pb-2

                font-heading text-xs
                uppercase tracking-wide
                text-foreground

                transition-colors
                hover:text-red
              "
            >
              VIEW FULL GALLERY
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

        {/* INTERACTIVE SCREENSHOT GRID */}
        {featured.length > 0 ? (
          <div
            className="
              mt-12 grid
              grid-cols-2 gap-3

              sm:gap-4

              lg:grid-cols-4
              lg:auto-rows-[240px]

              2xl:auto-rows-[300px]

              min-[2000px]:auto-rows-[340px]
            "
          >
            {featured.map((shot, index) => {
              const isFeatured = index === 0;
              const isWide = index === 3;

              return (
                <Reveal
                  key={`${shot.src}-${index}`}
                  delay={index * 90}
                  className={`
                    min-h-0
                    ${
                      isFeatured
                        ? "col-span-2 lg:row-span-2"
                        : isWide
                          ? "col-span-2"
                          : ""
                    }
                  `}
                >
                  <PremiumTiltCard maxTilt={isFeatured ? 3 : 5}>
                    <Link
                      href={`/gallery/${shot.game.slug}`}
                      aria-label={`Explore ${shot.game.title} screenshots`}
                      className={`
                        group relative
                        block w-full
                        overflow-hidden

                        clip-corner bg-surface
                        border border-white/10

                        lg:h-full lg:aspect-auto

                        ${
                          isFeatured
                            ? "aspect-[16/10]"
                            : isWide
                              ? "aspect-[16/9]"
                              : "aspect-square"
                        }
                      `}
                    >
                      {/* REAL GAME SCREENSHOT */}
                      <LoadableImage
                        src={shot.src}
                        alt={`${shot.game.title} screenshot`}
                        fill
                        sizes={
                          isFeatured
                            ? "(min-width: 2000px) 800px, (min-width: 1024px) 50vw, 100vw"
                            : isWide
                              ? "(min-width: 1024px) 50vw, 100vw"
                              : "(min-width: 1024px) 25vw, 50vw"
                        }
                        className="
                          object-cover

                          transition-transform
                          duration-700 ease-out

                          group-hover:scale-[1.08]

                          motion-reduce:transition-none
                          motion-reduce:group-hover:scale-100
                        "
                      />

                      {/* DARK CINEMATIC GRADIENT */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0

                          bg-gradient-to-t
                          from-black/90
                          via-black/15
                          to-transparent
                        "
                      />

                      {/* TOP BADGE */}
                      <div
                        className="
                          absolute left-3 top-3 z-10
                          sm:left-4 sm:top-4
                        "
                      >
                        <span
                          className={`
                            inline-flex
                            px-2.5 py-1.5

                            font-heading
                            text-[9px] uppercase
                            tracking-wide text-white

                            sm:px-3 sm:text-[10px]

                            ${
                              isFeatured
                                ? "bg-red"
                                : "border border-white/20 bg-black/60 backdrop-blur-md"
                            }
                          `}
                        >
                          {isFeatured ? "FEATURED CAPTURE" : "GAME CAPTURE"}
                        </span>
                      </div>

                      {/* GAME TITLE AND ACTION */}
                      <div
                        className="
                          absolute inset-x-0
                          bottom-0 z-10
                          p-3 sm:p-5 lg:p-6
                        "
                      >
                        <p
                          className="
                            mb-2 font-body
                            text-[9px] uppercase
                            tracking-[0.14em]
                            text-white/65

                            sm:text-[10px]
                          "
                        >
                          MAVERICK DRILLS GALLERY
                        </p>

                        <h3
                          className={`
                            font-heading
                            uppercase leading-tight
                            text-white

                            transition-colors duration-300
                            group-hover:text-red

                            ${
                              isFeatured
                                ? "text-base sm:text-2xl"
                                : "text-xs sm:text-sm lg:text-base"
                            }
                          `}
                        >
                          {shot.game.title}
                        </h3>

                        <div
                          className="
                            mt-3 inline-flex
                            items-center gap-2

                            font-heading text-[10px]
                            uppercase tracking-wide
                            text-white/85

                            transition-colors
                            group-hover:text-red
                          "
                        >
                          VIEW SCREENSHOTS
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

                      {/* HOVER BORDER */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0 z-20

                          border border-white/10

                          transition-colors duration-300
                          group-hover:border-red/60
                        "
                      />
                    </Link>
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
            New screenshots are coming soon.
          </p>
        )}

        {/* FULL GALLERY CTA */}
        <Reveal delay={300}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/gallery"
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
              EXPLORE ALL SCREENSHOTS
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
