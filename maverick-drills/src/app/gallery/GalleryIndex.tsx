"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import type { GameGallery } from "@/lib/data/gallery";
import { LoadableImage } from "@/components/ui/LoadableMedia";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import Reveal from "@/components/ui/Reveal";

type Props = {
  games: GameGallery[];
};

export default function GalleryIndex({ games }: Props) {
  const reduceMotion = useReducedMotion();

  const totalShots = games.reduce(
    (total, game) => total + game.screenshots.length,
    0,
  );

  return (
    <main className="overflow-x-clip bg-background">
      {/* CINEMATIC INTRO */}
      <section
        className="
          relative isolate overflow-hidden
          border-b border-border/70
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_85%_30%,rgba(229,9,36,0.13),transparent_55%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 pb-20 pt-24
            sm:px-8 sm:pb-24 sm:pt-28
            lg:px-12 lg:py-32
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-red" />
              <span
                className="
                  font-heading text-[10px]
                  uppercase tracking-[0.14em] text-red
                  sm:text-xs
                "
              >
                THE MAVERICK VISUAL ARCHIVE
              </span>
            </div>

            <h1
              className="
                max-w-5xl font-display
                text-[clamp(3.5rem,9vw,9rem)]
                uppercase leading-[0.87]
                tracking-[-0.065em] text-white
              "
            >
              THE
              <span className="block text-red">GALLERY.</span>
            </h1>

            <p
              className="
                mt-8 max-w-2xl font-body
                text-sm leading-relaxed text-muted
                sm:text-base lg:text-lg
              "
            >
              Every frame tells a story. Explore our collection of game
              photography, unforgettable worlds, and moments worth capturing.
            </p>

            <div
              className="
                mt-10 flex flex-wrap items-center
                gap-x-8 gap-y-4
                border-t border-white/10 pt-6
              "
            >
              <div>
                <span className="font-display text-2xl text-white">
                  {String(games.length).padStart(2, "0")}
                </span>
                <p
                  className="
                    mt-1 font-body text-[10px]
                    uppercase tracking-widest text-muted
                  "
                >
                  Game collections
                </p>
              </div>

              <div>
                <span className="font-display text-2xl text-white">
                  {String(totalShots).padStart(2, "0")}
                </span>
                <p
                  className="
                    mt-1 font-body text-[10px]
                    uppercase tracking-widest text-muted
                  "
                >
                  Captured frames
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GAME COLLECTIONS */}
      <section aria-labelledby="gallery-collections">
        <div
          className="
            mx-auto max-w-7xl px-5 py-16
            sm:px-8 sm:py-20
            lg:px-12 lg:py-24
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <Reveal>
            <div
              className="
                mb-10 flex flex-wrap
                items-end justify-between gap-4
              "
            >
              <div>
                <p
                  className="
                    mb-3 font-heading text-[10px]
                    uppercase tracking-[0.15em] text-red
                  "
                >
                  01 / EXPLORE THE WORLDS
                </p>

                <h2
                  id="gallery-collections"
                  className="
                    font-display text-3xl
                    uppercase tracking-[-0.04em]
                    text-white sm:text-4xl
                  "
                >
                  GAME COLLECTIONS
                </h2>
              </div>

              <p className="font-body text-xs text-muted">
                SELECT A GAME TO EXPLORE ↗
              </p>
            </div>
          </Reveal>

          <div
            className="
              grid grid-cols-2 gap-x-3 gap-y-9
              sm:gap-x-5 sm:gap-y-12
              lg:grid-cols-4 lg:gap-6
            "
          >
            {games.map((game, index) => (
              <Reveal key={game.slug} delay={index * 80} className="min-w-0">
                <PremiumTiltCard maxTilt={4} glow>
                  <Link
                    href={`/gallery/${game.slug}`}
                    aria-label={`Explore ${game.title} gallery`}
                    className="
                      group block h-full
                      focus-visible:outline-offset-4
                    "
                  >
                    <div
                      className="
                        relative aspect-[3/4]
                        overflow-hidden clip-corner
                        border border-white/10
                        bg-surface
                      "
                    >
                      <LoadableImage
                        src={game.poster}
                        alt={`${game.title} game poster`}
                        fill
                        sizes="
                          (min-width: 2000px) 400px,
                          (min-width: 1024px) 25vw,
                          50vw
                        "
                        className="
                          object-cover
                          transition-transform duration-700
                          group-hover:scale-[1.07]
                          motion-reduce:transition-none
                          motion-reduce:group-hover:scale-100
                        "
                      />

                      <div
                        className="
                          pointer-events-none absolute inset-0
                          bg-gradient-to-t
                          from-black/95 via-black/10
                          to-transparent
                        "
                      />

                      <span
                        className="
                          absolute left-3 top-3 z-10
                          bg-red px-2.5 py-1.5
                          font-heading text-[9px]
                          uppercase text-white
                        "
                      >
                        COLLECTION {String(index + 1).padStart(2, "0")}
                      </span>

                      <div
                        className="
                          absolute inset-x-0 bottom-0 z-10
                          p-3 sm:p-5
                        "
                      >
                        <p
                          className="
                            mb-2 font-body text-[9px]
                            uppercase tracking-[0.15em]
                            text-white/70
                          "
                        >
                          MAVERICK DRILLS / ARCHIVE
                        </p>

                        <h3
                          className="
                            font-heading text-xs
                            uppercase leading-snug
                            text-white
                            sm:text-base
                          "
                        >
                          {game.title}
                        </h3>

                        <div
                          className="
                            mt-3 flex items-center
                            justify-between gap-2
                            border-t border-white/20 pt-3
                          "
                        >
                          <span
                            className="
                              font-body text-[10px]
                              uppercase text-white/70
                            "
                          >
                            {game.screenshots.length} FRAMES
                          </span>

                          <span
                            aria-hidden="true"
                            className="
                              text-red transition-transform
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          >
                            ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </PremiumTiltCard>
              </Reveal>
            ))}
          </div>

          {games.length === 0 && (
            <p className="py-16 text-center text-muted">
              New game collections are coming soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
