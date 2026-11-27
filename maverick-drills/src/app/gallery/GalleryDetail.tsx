"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { createPortal } from "react-dom";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { GameGallery } from "@/lib/data/gallery";

import { LoadableImage } from "@/components/ui/LoadableMedia";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import Reveal from "@/components/ui/Reveal";

type Props = {
  game: GameGallery;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function GalleryDetail({ game }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const count = game.screenshots.length;
  const isOpen = selected !== null;

  const openViewer = useCallback((index: number) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelected(index);
  }, []);

  const closeViewer = useCallback(() => {
    setSelected(null);
  }, []);

  const goTo = useCallback(
    (direction: number) => {
      if (count < 2) return;

      setSelected((current) => {
        if (current === null) return null;

        return (current + direction + count) % count;
      });
    },
    [count],
  );

  // Lock background scrolling and manage keyboard navigation.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      }

      // Trap keyboard focus inside the viewer.
      if (event.key === "Tab") {
        const dialog = document.getElementById("maverick-gallery-viewer");

        const focusable = Array.from(
          dialog?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        );

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);

      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeViewer, goTo]);

  // Close the viewer if navigating away.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const currentShot = selected !== null ? game.screenshots[selected] : null;

  const viewer = (
    <motion.div
      id="maverick-gallery-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${game.title} screenshot viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
      }}
      className="
        fixed inset-0 z-[1000]
        flex flex-col
        overflow-hidden
        bg-[#050608] text-white
      "
    >
      {/* ATMOSPHERIC LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,9,36,0.08),transparent_65%)]
        "
      />

      {/* VIEWER HEADER */}
      <div
        className="
          relative z-20 flex min-h-16
          shrink-0 items-center
          justify-between gap-4
          border-b border-white/10
          px-4 sm:px-8
        "
      >
        <div className="min-w-0">
          <p
            className="
              font-body text-[9px]
              uppercase tracking-[0.15em]
              text-red sm:text-[10px]
            "
          >
            MAVERICK DRILLS / VISUAL ARCHIVE
          </p>

          <h2
            className="
              truncate font-heading
              text-xs uppercase sm:text-sm
            "
          >
            {game.title}
          </h2>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={closeViewer}
          aria-label="Close fullscreen viewer"
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full border border-white/20
            bg-white/5 text-xl
            transition-colors
            hover:border-red hover:bg-red
          "
        >
          ×
        </button>
      </div>

      {/* MAIN IMAGE STAGE */}
      <div
        className="
          relative z-10 flex min-h-0
          flex-1 items-center justify-center
          px-3 py-4 sm:px-16
        "
        onTouchStart={(event) => {
          touchStartRef.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          const end = event.changedTouches[0]?.clientX;

          touchStartRef.current = null;

          if (
            start === null ||
            end === undefined ||
            Math.abs(start - end) < 55
          ) {
            return;
          }

          goTo(start > end ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {currentShot && selected !== null && (
            <motion.div
              key={currentShot.src}
              initial={
                reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease,
              }}
              className="
                relative h-full w-full
                max-w-[1600px]
              "
            >
              <LoadableImage
                src={currentShot.src}
                alt={
                  currentShot.caption ||
                  `${game.title} screenshot ${selected + 1}`
                }
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PREVIOUS / NEXT */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous screenshot"
              className="
                absolute left-3 top-1/2 z-20
                flex h-11 w-11
                -translate-y-1/2
                items-center justify-center
                rounded-full border border-white/20
                bg-black/75 text-2xl
                backdrop-blur-md
                transition-colors
                hover:border-red hover:bg-red
                sm:left-5
              "
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next screenshot"
              className="
                absolute right-3 top-1/2 z-20
                flex h-11 w-11
                -translate-y-1/2
                items-center justify-center
                rounded-full border border-white/20
                bg-black/75 text-2xl
                backdrop-blur-md
                transition-colors
                hover:border-red hover:bg-red
                sm:right-5
              "
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* VIEWER FOOTER */}
      <div
        className="
          relative z-20 shrink-0
          border-t border-white/10
          bg-[#090A0D]
          px-4 pb-[max(16px,env(safe-area-inset-bottom))]
          pt-3 sm:px-8
        "
      >
        <div
          className="
            mx-auto flex max-w-[1600px]
            items-center justify-between gap-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                font-heading text-xs
                uppercase text-white sm:text-sm
              "
            >
              FRAME {String((selected ?? 0) + 1).padStart(2, "0")}
              <span className="text-white/40">
                {" / "}
                {String(count).padStart(2, "0")}
              </span>
            </p>

            {currentShot?.caption && (
              <p className="mt-1 truncate text-xs text-muted">
                {currentShot.caption}
              </p>
            )}
          </div>

          <p
            className="
              hidden font-body text-[10px]
              uppercase tracking-widest
              text-muted sm:block
            "
          >
            ← → NAVIGATE · ESC CLOSE
          </p>
        </div>

        {/* INTERACTIVE FILMSTRIP */}
        {count > 1 && (
          <div
            className="
              mx-auto mt-3 flex max-w-[1600px]
              gap-2 overflow-x-auto
              pb-1
              [scrollbar-width:thin]
            "
          >
            {game.screenshots.map((shot, index) => (
              <button
                key={`${shot.src}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`View screenshot ${index + 1}`}
                aria-current={selected === index ? "true" : undefined}
                className={`
                  relative h-12 w-20
                  shrink-0 overflow-hidden
                  border-2 transition-colors
                  sm:h-14 sm:w-24

                  ${
                    selected === index
                      ? "border-red"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }
                `}
              >
                <LoadableImage
                  src={shot.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      <main className="overflow-x-clip bg-background">
        {/* GAME HERO */}
        <section
          className="
            relative isolate overflow-hidden
            border-b border-border
          "
        >
          <div className="absolute inset-0">
            <LoadableImage
              src={game.poster}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-background
                via-background/80
                to-background/35
              "
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-background
                to-transparent
              "
            />
          </div>

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
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease,
              }}
            >
              <Link
                href="/gallery"
                className="
                  inline-flex items-center gap-2
                  font-heading text-[10px]
                  uppercase tracking-wide
                  text-red hover:text-white
                "
              >
                ← BACK TO GALLERY
              </Link>

              <p
                className="
                  mt-10 font-heading text-xs
                  uppercase tracking-widest
                  text-red
                "
              >
                MAVERICK DRILLS / GAME COLLECTION
              </p>

              <h1
                className="
                  mt-4 max-w-5xl
                  font-display
                  text-[clamp(2.5rem,6vw,6rem)]
                  uppercase leading-[0.95]
                  tracking-[-0.05em]
                  text-white
                "
              >
                {game.title}
              </h1>

              <p
                className="
                  mt-6 max-w-xl
                  font-body text-sm
                  leading-relaxed text-white/75
                  sm:text-base
                "
              >
                A cinematic collection of {game.screenshots.length} captured
                moments. Explore every frame in fullscreen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SCREENSHOT GRID */}
        <section
          aria-label={`${game.title} screenshots`}
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
                    mb-3 font-heading text-xs
                    uppercase text-red
                  "
                >
                  02 / CAPTURED FRAMES
                </p>

                <h2
                  className="
                    font-display text-3xl
                    uppercase text-white
                    sm:text-4xl
                  "
                >
                  EXPLORE THE MOMENTS
                </h2>
              </div>

              <span
                className="
                  font-body text-xs
                  uppercase tracking-wider text-muted
                "
              >
                TAP ANY FRAME TO EXPAND
              </span>
            </div>
          </Reveal>

          <div
            className="
              grid grid-cols-2 gap-3
              sm:gap-4
              lg:grid-cols-3 lg:gap-5
            "
          >
            {game.screenshots.map((shot, index) => (
              <Reveal
                key={`${shot.src}-${index}`}
                delay={Math.min(index, 5) * 60}
                className="min-w-0"
              >
                <PremiumTiltCard maxTilt={3} glow>
                  <button
                    type="button"
                    onClick={() => openViewer(index)}
                    aria-label={`Open screenshot ${index + 1} of ${game.title}`}
                    className="
                      group relative block w-full
                      aspect-[4/3] overflow-hidden
                      clip-corner bg-surface
                      text-left
                    "
                  >
                    <LoadableImage
                      src={shot.src}
                      alt={
                        shot.caption || `${game.title} screenshot ${index + 1}`
                      }
                      fill
                      sizes="
                        (min-width: 1024px) 33vw,
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
                        from-black/75
                        via-transparent
                        to-transparent
                      "
                    />

                    <span
                      className="
                        absolute left-3 top-3
                        bg-black/60 px-2.5 py-1.5
                        font-heading text-[9px]
                        uppercase text-white
                        backdrop-blur-md
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        flex items-center justify-between
                        gap-2 p-3 sm:p-5
                      "
                    >
                      <span
                        className="
                          font-heading text-[10px]
                          uppercase text-white
                          sm:text-xs
                        "
                      >
                        VIEW FRAME
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          text-lg text-red
                          transition-transform
                          group-hover:scale-125
                        "
                      >
                        ⤢
                      </span>
                    </div>
                  </button>
                </PremiumTiltCard>
              </Reveal>
            ))}
          </div>

          {count === 0 && (
            <p className="py-14 text-center text-muted">
              No screenshots are available yet.
            </p>
          )}
        </section>
      </main>

      {/* PORTAL TO AVOID HEADER STACKING ISSUES */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>{isOpen && viewer}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}
