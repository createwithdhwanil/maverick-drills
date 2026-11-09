import Link from "next/link";

import { GAME_GALLERIES } from "@/lib/data/gallery";
import Reveal from "@/components/ui/Reveal";
import { LoadableImage } from "@/components/ui/LoadableMedia";

export default function ScreenshotsTeaser() {
  // Keep the original screenshot selection logic.
  const featured = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.slice(0, 2).map((shot) => ({ ...shot, game })),
  ).slice(0, 4);

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-title"
      className="relative overflow-hidden border-t
                 border-border/60 bg-background"
    >
      {/* SUBTLE RED BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   -right-24 top-16 h-80 w-80
                   rounded-full bg-red/5 blur-3xl"
      />

      <div
        className="relative mx-auto max-w-7xl
                   px-5 py-20 sm:px-8
                   lg:px-12 lg:py-28"
      >
        {/* SECTION HEADING */}
        <Reveal>
          <div
            className="flex flex-wrap items-end
                       justify-between gap-6"
          >
            <div>
              <p
                className="mb-3 font-heading text-xs
                           uppercase tracking-[0.18em]
                           text-red"
              >
                03 / CAPTURE THE MOMENT
              </p>

              <h2
                id="screenshots-title"
                className="font-display text-3xl
                           uppercase leading-tight
                           tracking-[-0.04em]
                           text-foreground
                           sm:text-4xl lg:text-5xl"
              >
                EXCLUSIVE SCREENSHOTS
              </h2>

              <p
                className="mt-3 max-w-xl
                           font-body text-sm
                           leading-relaxed text-muted
                           sm:text-base"
              >
                Every frame tells a story. Explore the worlds, details, and
                unforgettable moments captured in our favorite games.
              </p>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex items-center
                         gap-2 border-b border-red
                         pb-2 font-heading text-xs
                         uppercase tracking-wide
                         text-foreground
                         transition-colors duration-200
                         hover:text-red"
            >
              VIEW FULL GALLERY
              <span
                aria-hidden="true"
                className="text-red
                           transition-transform
                           group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>

        {/* SCREENSHOT GRID */}
        {featured.length > 0 ? (
          <div
            className="mt-10 grid grid-cols-2
                       gap-3 sm:gap-4
                       lg:grid-cols-4"
          >
            {featured.map((shot, index) => {
              const isFeatured = index === 0;

              return (
                <Reveal
                  key={`${shot.src}-${index}`}
                  delay={index * 100}
                  className={isFeatured ? "col-span-2 row-span-2" : ""}
                >
                  <Link
                    href={`/gallery/${shot.game.slug}`}
                    aria-label={`Explore ${shot.game.title} screenshots`}
                    className={`
                      group relative block
                      overflow-hidden bg-surface
                      clip-corner
                      ${isFeatured ? "aspect-square h-full" : "aspect-square"}
                    `}
                  >
                    {/* ACTUAL SCREENSHOT */}
                    <LoadableImage
                      src={shot.src}
                      alt={`${shot.game.title} screenshot`}
                      fill
                      sizes={
                        isFeatured
                          ? "(min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1024px) 25vw, 50vw"
                      }
                      className="object-cover
                                 transition-transform
                                 duration-700
                                 group-hover:scale-105"
                    />

                    {/* CINEMATIC GRADIENT */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0
                                 bg-gradient-to-t
                                 from-black/85
                                 via-black/15
                                 to-transparent
                                 transition-opacity
                                 duration-300"
                    />

                    {/* TOP LABEL */}
                    <div
                      className="absolute left-4
                                 top-4 z-10"
                    >
                      <span
                        className={`
                          inline-flex px-3 py-1.5
                          font-heading text-[10px]
                          uppercase tracking-wide
                          text-white
                          ${
                            isFeatured
                              ? "bg-red"
                              : "border border-white/20 bg-black/50 backdrop-blur"
                          }
                        `}
                      >
                        {isFeatured ? "FEATURED CAPTURE" : "GAME CAPTURE"}
                      </span>
                    </div>

                    {/* BOTTOM INFORMATION */}
                    <div
                      className="absolute inset-x-0
                                 bottom-0 z-10
                                 p-4 sm:p-5
                                 lg:p-6"
                    >
                      <p
                        className="mb-2 font-body
                                   text-[10px]
                                   uppercase
                                   tracking-[0.14em]
                                   text-white/65"
                      >
                        MAVERICK DRILLS GALLERY
                      </p>

                      <h3
                        className={`
                          font-heading uppercase
                          leading-tight text-white
                          transition-colors
                          duration-300
                          group-hover:text-red
                          ${
                            isFeatured
                              ? "text-lg sm:text-2xl"
                              : "text-xs sm:text-sm"
                          }
                        `}
                      >
                        {shot.game.title}
                      </h3>

                      <div
                        className="mt-3 flex items-center
                                   gap-2 font-heading
                                   text-[10px]
                                   uppercase tracking-wide
                                   text-white/80
                                   transition-colors
                                   group-hover:text-red"
                      >
                        VIEW SCREENSHOTS
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
                                 duration-300
                                 group-hover:border-red/60"
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div
            className="mt-10 border border-border
                       bg-surface p-10 text-center"
          >
            <p className="font-body text-muted">
              New gaming screenshots are coming soon.
            </p>
          </div>
        )}

        {/* BOTTOM CTA */}
        <Reveal delay={300}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
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
              EXPLORE ALL SCREENSHOTS
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
