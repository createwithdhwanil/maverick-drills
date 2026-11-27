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

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryDetail({ game }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const reduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const touchStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

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

      setSelected((index) => {
        if (index === null) return null;

        return (index + direction + count) % count;
      });
    },
    [count],
  );

  // Lock scrolling and manage keyboard focus.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        closeRef.current?.focus();
        return;
      }

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeViewer, goTo]);

  // Restore focus only after closing the viewer.
  useEffect(() => {
    if (isOpen) return;

    const previous = previousFocusRef.current;

    if (previous?.isConnected) {
      previous.focus({
        preventScroll: true,
      });
    }

    previousFocusRef.current = null;
  }, [isOpen]);

  const currentShot = selected === null ? null : game.screenshots[selected];

  const viewer = (
    <motion.div
      ref={dialogRef}
      id="maverick-gallery-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${game.title} screenshot viewer`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.2,
      }}
      className="
        fixed inset-0 z-[1000]
        flex flex-col overflow-hidden
        bg-[#050608] text-white
      "
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(229,9,36,0.07),transparent_65%)]
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
              uppercase tracking-widest
              text-red
            "
          >
            MAVERICK DRILLS / VISUAL ARCHIVE
          </p>

          <h2
            className="
              truncate font-heading
              text-xs uppercase text-white
              sm:text-sm
            "
          >
            {game.title}
          </h2>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={closeViewer}
          aria-label="Close screenshot viewer"
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            border border-white/20
            bg-white/5 text-xl
            transition-colors
            hover:border-red hover:bg-red
          "
        >
          ×
        </button>
      </div>

      {/* MAIN SCREENSHOT */}
      <div
        className="
          relative z-10 flex
          min-h-0 flex-1
          items-center justify-center
          px-3 py-4 sm:px-16
        "
        onTouchStart={(event) => {
          const touch = event.touches[0];

          if (!touch) return;

          touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          const end = event.changedTouches[0];

          touchStartRef.current = null;

          if (!start || !end) return;

          const dx = start.x - end.clientX;
          const dy = start.y - end.clientY;

          // Ignore vertical scrolling gestures.
          if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy)) {
            return;
          }

          goTo(dx > 0 ? 1 : -1);
        }}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {currentShot && selected !== null && (
            <motion.div
              key={`${selected}-${currentShot.src}`}
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      scale: 0.975,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 1.015,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: EASE,
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
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={() => goTo(-1)}
              className="
                absolute left-3 top-1/2
                z-20 flex h-11 w-11
                -translate-y-1/2
                items-center justify-center
                rounded-full

                border border-white/20
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
              aria-label="Next screenshot"
              onClick={() => goTo(1)}
              className="
                absolute right-3 top-1/2
                z-20 flex h-11 w-11
                -translate-y-1/2
                items-center justify-center
                rounded-full

                border border-white/20
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

      {/* FOOTER / FILMSTRIP */}
      <div
        className="
          relative z-20 shrink-0
          border-t border-white/10
          bg-[#090A0D]
          px-4 pt-3
          pb-[max(16px,env(safe-area-inset-bottom))]
          sm:px-8
        "
      >
        <div
          className="
            mx-auto flex max-w-[1600px]
            items-center justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                font-heading text-xs
                uppercase text-white
              "
            >
              FRAME {String((selected ?? 0) + 1).padStart(2, "0")}
              <span className="text-white/45">
                {" / "}
                {String(count).padStart(2, "0")}
              </span>
            </p>

            {currentShot?.caption && (
              <p
                className="
                  mt-1 truncate font-body
                  text-xs text-muted
                "
              >
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

        {count > 1 && (
          <div
            className="
              mx-auto mt-3 flex
              max-w-[1600px]
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
                aria-current={index === selected ? "true" : undefined}
                className={`
                  relative h-12 w-20
                  shrink-0 overflow-hidden
                  border-2
                  transition-opacity duration-200

                  sm:h-14 sm:w-24

                  ${
                    index === selected
                      ? "border-red opacity-100"
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
      {/* GAME INTRO */}
      <main className="overflow-x-clip bg-background">
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
              relative mx-auto
              max-w-7xl
              px-5 pb-20 pt-24
              sm:px-8 sm:py-28
              lg:px-12 lg:py-32
              2xl:max-w-[1536px]
              min-[2000px]:max-w-[1760px]
              min-[2000px]:px-16
            "
          >
            <Reveal>
              <Link
                href="/gallery"
                className="
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
                  leading-relaxed
                  text-white/75
                  sm:text-base
                "
              >
                A cinematic collection of {count} captured moments. Explore
                every frame in fullscreen.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SCREENSHOT GRID */}
        <section
          aria-label={`${game.title} screenshots`}
          className="
            mx-auto max-w-7xl
            px-5 py-16
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
                items-end justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    mb-3 font-heading
                    text-xs uppercase
                    text-red
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
                  uppercase tracking-wider
                  text-muted
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
                <PremiumTiltCard maxTilt={3}>
                  <button
                    type="button"
                    onClick={() => openViewer(index)}
                    aria-label={`Open screenshot ${index + 1} of ${game.title}`}
                    className="
                      group relative block
                      aspect-[4/3] w-full
                      overflow-hidden
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
                        group-hover:scale-105
                        motion-reduce:transition-none
                        motion-reduce:group-hover:scale-100
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute inset-0
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
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        flex items-center
                        justify-between gap-2
                        p-3 sm:p-5
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

                      <span aria-hidden="true" className="text-xl text-red">
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

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>{isOpen && viewer}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}
