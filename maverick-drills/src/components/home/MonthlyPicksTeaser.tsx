import Link from "next/link";

import { MONTHLY_PICKS } from "@/lib/data/recommendations";
import { LockIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import { LoadableImage } from "@/components/ui/LoadableMedia";

const UNLOCKED_RANKS = [2, 3];

export default function MonthlyPicksTeaser() {
  return (
    <section
      id="monthly-picks"
      aria-labelledby="monthly-picks-title"
      className="relative overflow-hidden border-t
                 border-border/60 bg-background"
    >
      {/* SUBTLE BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   -left-20 top-20 h-80 w-80
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
                04 / CURATED BY MAVERICK DRILLS
              </p>

              <h2
                id="monthly-picks-title"
                className="font-display text-3xl
                           uppercase leading-tight
                           tracking-[-0.04em]
                           text-foreground
                           sm:text-4xl lg:text-5xl"
              >
                THIS MONTH&apos;S PICKS
              </h2>

              <p
                className="mt-3 max-w-xl
                           font-body text-sm
                           leading-relaxed text-muted
                           sm:text-base"
              >
                Handpicked gaming experiences. Discover the titles we believe
                deserve your attention.
              </p>
            </div>

            <Link
              href="/recommendations"
              className="group inline-flex items-center
                         gap-2 border-b border-red
                         pb-2 font-heading text-xs
                         uppercase tracking-wide
                         text-foreground
                         transition-colors duration-200
                         hover:text-red"
            >
              SEE FULL PICKS
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

        {/* GAME PICKS GRID */}
        {MONTHLY_PICKS.length > 0 ? (
          <div
            className="mt-10 grid gap-5
                       sm:grid-cols-2
                       lg:grid-cols-3"
          >
            {MONTHLY_PICKS.map((pick, index) => {
              const isLocked = !UNLOCKED_RANKS.includes(pick.rank);

              const href = isLocked
                ? "/recommendations"
                : `/recommendations/${pick.slug}`;

              const rank = String(pick.rank).padStart(2, "0");

              return (
                <Reveal key={pick.rank} delay={Math.min(index, 5) * 100}>
                  <Link
                    href={href}
                    aria-label={
                      isLocked
                        ? `Locked pick number ${pick.rank}. View full recommendations.`
                        : `Explore ${pick.game}`
                    }
                    className="group flex h-full
                               flex-col overflow-hidden
                               border border-border/70
                               bg-surface
                               transition-all duration-300
                               hover:border-red/60
                               hover:bg-surface-hover"
                  >
                    {/* GAME POSTER */}
                    <div
                      className="relative aspect-[3/4]
                                 w-full overflow-hidden
                                 bg-black"
                    >
                      <LoadableImage
                        src={pick.poster}
                        alt={
                          isLocked
                            ? "Mystery game poster"
                            : `${pick.game} poster`
                        }
                        fill
                        sizes="(min-width: 1024px) 33vw,
                               (min-width: 640px) 50vw,
                               100vw"
                        className={`
                          object-cover transition-transform
                          duration-700
                          ${
                            isLocked
                              ? "scale-110 blur-xl brightness-50"
                              : "group-hover:scale-105"
                          }
                        `}
                      />

                      {/* IMAGE GRADIENT */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0
                                   bg-gradient-to-t
                                   from-black/90
                                   via-black/20
                                   to-transparent"
                      />

                      {/* RANK BADGE */}
                      <div
                        className="absolute left-4
                                   top-4 z-10"
                      >
                        <span
                          className="inline-flex
                                     bg-red px-3 py-2
                                     font-display text-lg
                                     text-white
                                     shadow-[0_5px_20px_rgba(229,9,36,0.25)]"
                        >
                          #{rank}
                        </span>
                      </div>

                      {/* LOCKED OVERLAY */}
                      {isLocked && (
                        <div
                          className="absolute inset-0
                                     z-10 flex flex-col
                                     items-center justify-center
                                     gap-4 p-5 text-center"
                        >
                          <div
                            className="flex h-16 w-16
                                       items-center justify-center
                                       rounded-full border
                                       border-white/20
                                       bg-black/60
                                       text-white backdrop-blur-lg"
                          >
                            <LockIcon className="h-7 w-7" />
                          </div>

                          <p
                            className="font-heading text-sm
                                       uppercase tracking-wider
                                       text-white"
                          >
                            MYSTERY PICK
                          </p>

                          <p
                            className="max-w-[200px]
                                       font-body text-xs
                                       leading-relaxed
                                       text-white/70"
                          >
                            Discover the full list to reveal this game.
                          </p>
                        </div>
                      )}

                      {/* BOTTOM IMAGE LABEL */}
                      {!isLocked && (
                        <div
                          className="absolute bottom-5
                                     left-5 z-10"
                        >
                          <span
                            className="border border-white/30
                                       bg-black/45 px-3 py-1.5
                                       font-heading text-[10px]
                                       uppercase tracking-wider
                                       text-white backdrop-blur"
                          >
                            MAVERICK PICK
                          </span>
                        </div>
                      )}
                    </div>

                    {/* GAME INFORMATION */}
                    <div className="flex flex-1 flex-col p-6">
                      <div
                        className="mb-3 flex items-center
                                   gap-2 font-body text-[10px]
                                   uppercase tracking-[0.15em]
                                   text-red"
                      >
                        <span
                          className="h-1.5 w-1.5
                                     rounded-full bg-red"
                        />

                        {isLocked
                          ? "LOCKED RECOMMENDATION"
                          : "RECOMMENDED GAME"}
                      </div>

                      <h3
                        className="font-heading text-lg
                                   uppercase leading-snug
                                   text-foreground
                                   transition-colors duration-300
                                   group-hover:text-red"
                      >
                        {isLocked ? "LOCKED PICK" : pick.game}
                      </h3>

                      <p
                        className="mt-3 line-clamp-3
                                   font-body text-sm
                                   leading-relaxed text-muted"
                      >
                        {isLocked
                          ? "A mystery game awaits. Explore our complete monthly picks to uncover the selection."
                          : pick.blurb}
                      </p>

                      {/* CARD ACTION */}
                      <div
                        className="mt-auto flex items-center
                                   gap-2 pt-6
                                   font-heading text-[11px]
                                   uppercase tracking-wide
                                   text-foreground/80
                                   transition-colors
                                   group-hover:text-red"
                      >
                        {isLocked ? "REVEAL ON FULL LIST" : "EXPLORE GAME"}

                        <span
                          aria-hidden="true"
                          className="transition-transform
                                     group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </div>
                    </div>
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
              New monthly picks are coming soon.
            </p>
          </div>
        )}

        {/* BOTTOM BUTTON */}
        <Reveal delay={300}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/recommendations"
              className="inline-flex items-center
                         gap-3 clip-corner-sm
                         border border-border
                         bg-surface px-7 py-3.5
                         font-heading text-xs
                         uppercase text-foreground
                         transition-all duration-300
                         hover:border-red
                         hover:bg-red
                         hover:text-white"
            >
              VIEW ALL MONTHLY PICKS
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
