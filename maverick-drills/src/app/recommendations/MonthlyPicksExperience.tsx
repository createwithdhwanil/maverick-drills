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

const CONTAINER = `
  mx-auto w-full max-w-7xl
  px-4 sm:px-8 lg:px-12
  2xl:max-w-[1536px]
  min-[2000px]:max-w-[1760px]
  min-[2000px]:px-16
`;

export default function MonthlyPicksExperience({ month, picks }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const reduceMotion = useReducedMotion();

  const ordered = [...picks].sort((a, b) => a.rank - b.rank);

  return (
    <main className="min-w-0 overflow-x-clip bg-background">
      {/* ==========================================
          01 / CINEMATIC INTRO
      ========================================== */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(ellipse_at_85%_35%,rgba(229,9,36,0.15),transparent_60%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        <div className={`${CONTAINER} relative py-20 sm:py-28 lg:py-32`}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[2px] w-8 shrink-0 bg-red sm:w-10" />

              <p
                className="
                  font-heading text-[10px]
                  uppercase tracking-[0.12em]
                  text-red sm:text-xs
                "
              >
                THE MAVERICK SELECTION / {month}
              </p>
            </div>

            <h1
              className="
                max-w-6xl
                font-display
                text-[clamp(2.7rem,8vw,8.5rem)]
                uppercase leading-[0.95]
                tracking-[-0.055em]
                text-white
              "
            >
              THIS
              <span className="block">MONTH&apos;S</span>
              <span className="block text-red">PICKS.</span>
            </h1>

            <p
              className="
                mt-8 max-w-2xl
                font-body text-sm
                leading-relaxed text-white/65
                sm:text-lg
              "
            >
              Three games. Three distinct experiences. One curated selection
              from Maverick Drills. Discover what deserves your attention.
            </p>

            <div
              className="
                mt-10 flex flex-wrap
                items-center gap-x-10 gap-y-6
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
                    uppercase tracking-wider text-muted
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
                    uppercase tracking-wider text-muted
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
                  items-center justify-center gap-3
                  clip-corner-sm bg-red
                  px-6 py-3
                  font-heading text-[11px]
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

      {/* ==========================================
          02 / THE RANKINGS
      ========================================== */}
      <section
        id="the-rankings"
        aria-labelledby="ranking-heading"
        className="relative scroll-mt-24"
      >
        <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
          <Reveal>
            <div className="mb-10 sm:mb-12">
              <p
                className="
                  font-heading text-[10px]
                  uppercase tracking-[0.18em]
                  text-red sm:text-xs
                "
              >
                01 / THE RANKINGS
              </p>

              <h2
                id="ranking-heading"
                className="
                  mt-4 font-display
                  text-[clamp(1.7rem,5vw,3rem)]
                  uppercase leading-tight
                  tracking-[-0.04em]
                  text-white
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
                <Reveal
                  key={pick.slug}
                  delay={Math.min(index, 4) * 100}
                  className="min-w-0"
                >
                  <article
                    className={`
                      group relative min-w-0
                      overflow-hidden
                      border bg-surface

                      transition-colors duration-300

                      ${
                        isMystery
                          ? "border-red/60"
                          : "border-border hover:border-red/50"
                      }
                    `}
                  >
                    {/* Background editorial rank */}
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute -right-2 top-0
                        select-none
                        font-display
                        text-[clamp(6rem,17vw,17rem)]
                        leading-none
                        text-white/[0.025]
                      "
                    >
                      {rank}
                    </span>

                    {/* MOBILE STACKED / DESKTOP SPLIT */}
                    <div
                      className="
                        relative grid min-w-0
                        grid-cols-1
                        lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]
                      "
                    >
                      {/* ===========================
                          POSTER
                      =========================== */}
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
                              w-full min-w-0
                              overflow-hidden
                              bg-black

                              sm:aspect-[16/10]

                              lg:aspect-auto
                              lg:h-full
                              lg:min-h-[390px]
                            "
                          >
                            <LoadableImage
                              src={pick.poster}
                              alt={
                                locked
                                  ? "Hidden mystery game artwork"
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
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/85
                                via-transparent
                                to-black/25
                              "
                            />

                            {/* RANK BADGE */}
                            <span
                              className="
                                absolute left-4 top-4
                                z-10 bg-red
                                px-4 py-2
                                font-display text-lg
                                text-white

                                shadow-[0_8px_28px_rgba(229,9,36,0.28)]
                                sm:text-xl
                              "
                            >
                              #{rank}
                            </span>

                            {/* MYSTERY OVERLAY */}
                            <AnimatePresence initial={false}>
                              {locked && (
                                <motion.div
                                  key="locked"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{
                                    opacity: 0,
                                    scale: reduceMotion ? 1 : 1.05,
                                  }}
                                  transition={{
                                    duration: reduceMotion ? 0 : 0.4,
                                  }}
                                  className="
                                    absolute inset-0 z-10
                                    flex flex-col
                                    items-center justify-center
                                    p-4 text-center
                                    sm:p-6
                                  "
                                >
                                  {/* Only the lock icon is circular */}
                                  <motion.div
                                    initial={
                                      reduceMotion
                                        ? false
                                        : {
                                            opacity: 0,
                                            scale: 0.85,
                                          }
                                    }
                                    animate={{
                                      opacity: 1,
                                      scale: 1,
                                    }}
                                    transition={{
                                      duration: reduceMotion ? 0 : 0.5,
                                      ease: EASE,
                                    }}
                                    className="
                                      flex h-16 w-16
                                      shrink-0
                                      items-center justify-center
                                      rounded-full
                                      border border-red/50
                                      bg-black/75
                                      text-white

                                      shadow-[0_0_34px_rgba(229,9,36,0.2)]
                                      sm:h-20 sm:w-20
                                    "
                                  >
                                    <svg
                                      width="28"
                                      height="28"
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
                                      mt-4 font-heading
                                      text-sm uppercase
                                      text-white
                                      sm:mt-5 sm:text-lg
                                    "
                                  >
                                    CLASSIFIED PICK
                                  </p>

                                  <p
                                    className="
                                      mt-2 max-w-xs
                                      font-body text-xs
                                      leading-relaxed
                                      text-white/65
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

                      {/* ===========================
                          EDITORIAL CONTENT
                      =========================== */}
                      <div
                        className="
                          relative flex min-w-0
                          flex-col justify-center

                          px-5 pb-9 pt-4

                          sm:px-8 sm:pb-10 sm:pt-5

                          lg:px-10 lg:py-12
                        "
                      >
                        <div
                          className="
                            flex min-w-0
                            items-center gap-3
                            font-body text-[10px]
                            uppercase tracking-[0.14em]
                            text-red
                          "
                        >
                          <span
                            className="
                              h-1.5 w-1.5
                              shrink-0 rounded-full
                              bg-red
                            "
                          />
                          <span>MAVERICK DRILLS / RANK {rank}</span>
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                          {locked ? (
                            <motion.div
                              key="mystery-content"
                              initial={
                                reduceMotion ? false : { opacity: 0, y: 15 }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: reduceMotion ? 0 : -12,
                              }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.45,
                                ease: EASE,
                              }}
                              className="
                                flex w-full min-w-0
                                flex-col items-start
                              "
                            >
                              <p
                                className="
                                  mt-5 font-heading
                                  text-[10px]
                                  uppercase tracking-[0.16em]
                                  text-red
                                "
                              >
                                TOP PICK / CLASSIFIED
                              </p>

                              <h3
                                className="
                                  mt-3 w-full
                                  font-display
                                  text-[clamp(2rem,4.5vw,4.4rem)]
                                  uppercase leading-[1.02]
                                  tracking-[-0.05em]
                                  text-white
                                "
                              >
                                THE MYSTERY
                                <span className="block text-red">PICK.</span>
                              </h3>

                              <p
                                className="
                                  mt-5 max-w-lg
                                  font-body text-sm
                                  leading-relaxed
                                  text-muted
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
                                    : {
                                        y: -3,
                                        scale: 1.015,
                                      }
                                }
                                whileTap={
                                  reduceMotion ? undefined : { scale: 0.97 }
                                }
                                className="
                                  cinematic-button
                                  mt-7 inline-flex
                                  min-h-12
                                  items-center justify-center
                                  gap-3

                                  clip-corner-sm
                                  bg-red px-6 py-3

                                  font-heading text-xs
                                  uppercase text-white
                                  transition-colors

                                  hover:bg-red-deep
                                  sm:px-7
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
                                  ? false
                                  : {
                                      opacity: 0,
                                      y: 20,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.55,
                                ease: EASE,
                              }}
                              className="
                                flex w-full min-w-0
                                flex-col items-start
                              "
                            >
                              <p
                                className="
                                  mt-5 font-heading
                                  text-[10px] uppercase
                                  tracking-[0.15em]
                                  text-red
                                "
                              >
                                {isMystery
                                  ? "TOP PICK / DECLASSIFIED"
                                  : "EDITOR'S SELECTION"}
                              </p>

                              <h3
                                className="
                                  mt-3 w-full
                                  break-words
                                  font-display

                                  text-[clamp(1.8rem,4vw,4rem)]
                                  uppercase leading-[1.04]
                                  tracking-[-0.045em]
                                  text-white
                                "
                              >
                                {pick.game}
                              </h3>

                              <p
                                className="
                                  mt-5 font-body
                                  text-xs leading-relaxed
                                  text-white/50
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
                                  leading-relaxed
                                  text-white/75
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
                                  justify-center gap-3

                                  clip-corner-sm
                                  border border-red
                                  bg-red px-6 py-3

                                  font-heading text-xs
                                  uppercase text-white

                                  transition-colors
                                  hover:bg-red-deep
                                  sm:px-7
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

      {/* ==========================================
          03 / CLOSING SECTION
      ========================================== */}
      <section
        className="
          border-t border-border
          bg-[#090A0D]
        "
      >
        <div
          className={`
            ${CONTAINER}
            py-16 text-center
          `}
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
                leading-tight text-white
                sm:text-4xl
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
