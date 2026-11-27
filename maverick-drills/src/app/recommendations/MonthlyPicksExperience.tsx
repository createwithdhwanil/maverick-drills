"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { MonthlyPick } from "@/lib/data/recommendations";

import { LoadableImage } from "@/components/ui/LoadableMedia";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import Reveal from "@/components/ui/Reveal";

type Props = {
  month: string;
  picks: MonthlyPick[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MonthlyPicksExperience({ month, picks }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const reduceMotion = useReducedMotion();

  const ordered = [...picks].sort((a, b) => a.rank - b.rank);

  return (
    <main className="overflow-x-clip bg-background">
      {/* ===========================
          CINEMATIC INTRO
      =========================== */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_85%_35%,rgba(229,9,36,0.16),transparent_55%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 pb-20 pt-24
            sm:px-8 sm:py-28
            lg:px-12 lg:py-32
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-red" />
              <p
                className="
                  font-heading text-[10px]
                  uppercase tracking-[0.16em]
                  text-red sm:text-xs
                "
              >
                THE MAVERICK SELECTION / {month}
              </p>
            </div>

            <h1
              className="
                max-w-6xl font-display
                text-[clamp(3.3rem,8.5vw,8.5rem)]
                uppercase leading-[0.87]
                tracking-[-0.065em]
                text-white
              "
            >
              THIS
              <span className="block">MONTH&apos;S</span>
              <span className="block text-red">PICKS.</span>
            </h1>

            <p
              className="
                mt-8 max-w-2xl font-body
                text-base leading-relaxed
                text-white/65 sm:text-lg
              "
            >
              Three games. Three distinct experiences. One curated selection
              from Maverick Drills. Discover what deserves your attention.
            </p>

            <div
              className="
                mt-12 flex flex-wrap
                items-center gap-x-10 gap-y-5
                border-t border-white/10 pt-7
              "
            >
              <div>
                <p className="font-display text-3xl text-white">
                  {String(picks.length).padStart(2, "0")}
                </p>
                <span
                  className="
                    font-body text-[10px]
                    uppercase tracking-widest
                    text-muted
                  "
                >
                  CURATED GAMES
                </span>
              </div>

              <div>
                <p className="font-display text-3xl text-red">01</p>
                <span
                  className="
                    font-body text-[10px]
                    uppercase tracking-widest
                    text-muted
                  "
                >
                  MYSTERY SELECTION
                </span>
              </div>

              <a
                href="#the-rankings"
                className="
                  cinematic-button
                  inline-flex min-h-11
                  items-center gap-3
                  clip-corner-sm
                  bg-red px-6 py-3
                  font-heading text-xs
                  uppercase text-white
                  transition-colors
                  hover:bg-red-deep
                "
              >
                EXPLORE RANKINGS
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="premium-divider" />
      </section>

      {/* ===========================
          RANKED PICKS
      =========================== */}
      <section
        id="the-rankings"
        aria-labelledby="ranking-heading"
        className="relative"
      >
        <div
          className="
            mx-auto max-w-7xl
            px-5 py-20 sm:px-8
            lg:px-12 lg:py-28
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <Reveal>
            <div className="mb-12">
              <p
                className="
                  font-heading text-xs uppercase
                  tracking-[0.18em] text-red
                "
              >
                01 / THE RANKINGS
              </p>

              <h2
                id="ranking-heading"
                className="
                  mt-4 font-display
                  text-3xl uppercase
                  tracking-[-0.04em]
                  text-white sm:text-5xl
                "
              >
                THE CHOSEN THREE
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {ordered.map((pick, index) => {
              const isMystery = pick.rank === 1;
              const locked = isMystery && !unlocked;
              const rank = String(pick.rank).padStart(2, "0");

              return (
                <Reveal key={pick.slug} delay={Math.min(index, 4) * 100}>
                  <article
                    className={`
                      group relative
                      overflow-hidden
                      border bg-surface

                      transition-colors duration-500

                      ${
                        isMystery
                          ? "border-red/60"
                          : "border-border hover:border-red/50"
                      }
                    `}
                  >
                    {/* Large background ranking */}
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute -right-5 top-0
                        select-none
                        font-display
                        text-[clamp(7rem,17vw,17rem)]
                        leading-none
                        text-white/[0.025]
                      "
                    >
                      {rank}
                    </span>

                    <div
                      className="
                        relative grid min-w-0
                        gap-0 lg:grid-cols-[minmax(300px,0.88fr)_1fr]
                      "
                    >
                      {/* GAME POSTER */}
                      <div
                        className="
                          min-w-0 p-3
                          sm:p-5 lg:p-6
                        "
                      >
                        <PremiumTiltCard maxTilt={3} glow={!locked}>
                          <div
                            className="
                              relative aspect-[4/3]
                              w-full overflow-hidden
                              bg-black
                              sm:aspect-[16/10]
                              lg:h-full
                              lg:min-h-[385px]
                              lg:aspect-auto
                            "
                          >
                            <LoadableImage
                              src={pick.poster}
                              alt={
                                locked
                                  ? "Mystery game artwork"
                                  : `${pick.game} artwork`
                              }
                              fill
                              sizes="
                                (min-width: 2000px) 750px,
                                (min-width: 1024px) 45vw,
                                100vw
                              "
                              className={`
                                object-cover
                                transition-[filter,transform]
                                duration-700

                                ${
                                  locked
                                    ? "scale-110 blur-2xl brightness-[0.35]"
                                    : "group-hover:scale-105"
                                }
                              `}
                            />

                            <div
                              className="
                                pointer-events-none absolute inset-0
                                bg-gradient-to-t
                                from-black/85
                                via-transparent
                                to-black/25
                              "
                            />

                            <span
                              className="
                                absolute left-4 top-4 z-10
                                bg-red px-4 py-2
                                font-display text-xl
                                text-white
                                shadow-[0_8px_28px_rgba(229,9,36,0.28)]
                              "
                            >
                              #{rank}
                            </span>

                            <AnimatePresence>
                              {locked && (
                                <motion.div
                                  key="locked"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{
                                    opacity: 0,
                                    scale: reduceMotion ? 1 : 1.08,
                                  }}
                                  transition={{
                                    duration: reduceMotion ? 0 : 0.45,
                                  }}
                                  className="
                                    absolute inset-0 z-10
                                    flex flex-col
                                    items-center justify-center
                                    p-5 text-center
                                  "
                                >
                                  <motion.div
                                    animate={
                                      reduceMotion
                                        ? undefined
                                        : {
                                            boxShadow: [
                                              "0 0 0 0 rgba(229,9,36,0)",
                                              "0 0 38px 8px rgba(229,9,36,0.16)",
                                              "0 0 0 0 rgba(229,9,36,0)",
                                            ],
                                          }
                                    }
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    className="
                                      flex h-20 w-20
                                      items-center justify-center
                                      rounded-full
                                      border border-red/50
                                      bg-black/70
                                      backdrop-blur-xl
                                    "
                                  >
                                    <svg
                                      width="30"
                                      height="30"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      aria-hidden="true"
                                    >
                                      <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="11"
                                        rx="2"
                                      />
                                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>
                                  </motion.div>

                                  <p
                                    className="
                                      mt-5 font-heading
                                      text-lg uppercase text-white
                                    "
                                  >
                                    CLASSIFIED PICK
                                  </p>

                                  <p
                                    className="
                                      mt-2 max-w-xs
                                      font-body text-xs
                                      leading-relaxed text-white/65
                                    "
                                  >
                                    Our top selection is waiting to be
                                    uncovered.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </PremiumTiltCard>
                      </div>

                      {/* EDITORIAL CONTENT */}
                      <div
                        className="
                          relative flex flex-col
                          justify-center
                          px-5 pb-8 pt-5
                          sm:px-8 sm:pb-10
                          lg:px-10 lg:py-12
                        "
                      >
                        <div
                          className="
                            flex items-center gap-3
                            font-body text-[10px]
                            uppercase tracking-[0.18em]
                            text-red
                          "
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red" />
                          MAVERICK DRILLS / RANK {rank}
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                          {locked ? (
                            <motion.div
                              key="mystery"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.4,
                              }}
                            >
                              <h3
                                className="
                                  mt-5 font-display
                                  text-[clamp(2rem,4.5vw,4.4rem)]
                                  uppercase leading-[0.98]
                                  tracking-[-0.05em] text-white
                                "
                              >
                                THE MYSTERY
                                <span className="block text-red">PICK.</span>
                              </h3>

                              <p
                                className="
                                  mt-5 max-w-lg
                                  font-body text-sm
                                  leading-relaxed text-muted
                                  sm:text-base
                                "
                              >
                                Every list needs a headline. This one comes with
                                a reveal. Unlock the number one pick to discover
                                our featured game.
                              </p>

                              <motion.button
                                type="button"
                                onClick={() => setUnlocked(true)}
                                whileHover={
                                  reduceMotion
                                    ? undefined
                                    : { y: -3, scale: 1.015 }
                                }
                                whileTap={
                                  reduceMotion ? undefined : { scale: 0.97 }
                                }
                                className="
                                  cinematic-button
                                  mt-8 inline-flex
                                  min-h-12 items-center
                                  justify-center gap-3
                                  clip-corner-sm
                                  bg-red px-7 py-3
                                  font-heading text-xs
                                  uppercase text-white
                                  hover:bg-red-deep
                                "
                              >
                                UNLOCK #01
                                <span aria-hidden="true">↗</span>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <motion.div
                              key={`revealed-${pick.slug}`}
                              initial={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 22 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.6,
                                ease: EASE,
                              }}
                            >
                              <p
                                className="
                                  mt-5 font-heading
                                  text-[10px] uppercase
                                  tracking-[0.15em] text-red
                                "
                              >
                                {isMystery
                                  ? "TOP PICK / DECLASSIFIED"
                                  : "EDITOR'S SELECTION"}
                              </p>

                              <h3
                                className="
                                  mt-3 max-w-3xl
                                  font-display
                                  text-[clamp(1.9rem,4vw,4rem)]
                                  uppercase leading-[1.02]
                                  tracking-[-0.045em]
                                  text-white
                                "
                              >
                                {pick.game}
                              </h3>

                              <p
                                className="
                                  mt-5 font-body text-xs
                                  leading-relaxed text-white/50
                                  sm:text-sm
                                "
                              >
                                {pick.genre}
                              </p>

                              <p
                                className="
                                  mt-2 font-body text-xs
                                  text-white/50
                                "
                              >
                                {pick.platforms}
                              </p>

                              <p
                                className="
                                  mt-6 max-w-xl
                                  font-body text-sm
                                  leading-relaxed text-white/75
                                  sm:text-base
                                "
                              >
                                {pick.blurb}
                              </p>

                              <Link
                                href={`/recommendations/${pick.slug}`}
                                className="
                                  cinematic-button
                                  mt-8 inline-flex
                                  min-h-12 items-center
                                  gap-3 clip-corner-sm
                                  border border-red
                                  bg-red px-7 py-3
                                  font-heading text-xs
                                  uppercase text-white
                                  transition-colors
                                  hover:bg-red-deep
                                "
                              >
                                EXPLORE GAME
                                <span aria-hidden="true">↗</span>
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* BOTTOM ACCENT */}
                    <div
                      aria-hidden="true"
                      className="
                        h-px w-full
                        bg-gradient-to-r
                        from-red/60
                        via-white/10
                        to-transparent
                      "
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>

          {ordered.length === 0 && (
            <div
              className="
                border border-border
                bg-surface p-10
                text-center text-muted
              "
            >
              New monthly picks are coming soon.
            </div>
          )}
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section
        className="
          border-t border-border
          bg-[#090A0D]
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-5 py-16 text-center
            sm:px-8 lg:px-12
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
          "
        >
          <Reveal>
            <p
              className="
                font-heading text-[10px]
                uppercase tracking-[0.2em]
                text-red
              "
            >
              THE MAVERICK STANDARD
            </p>

            <h2
              className="
                mt-4 font-display
                text-2xl uppercase
                text-white sm:text-4xl
              "
            >
              PLAY SOMETHING UNFORGETTABLE.
            </h2>

            <p
              className="
                mx-auto mt-4 max-w-xl
                font-body text-sm
                leading-relaxed text-muted
              "
            >
              Every selection is part of our ever-evolving gaming archive.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
