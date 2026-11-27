"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  YouTubeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

import type { SpotlightSlide } from "@/lib/data/spotlight";

type HeroCta = {
  label: string;
  href: string;
  external?: boolean;
  kind?: "primary" | "secondary";
};

type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  ctas: HeroCta[];
};

const AUTO_ADVANCE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  spotlightSlides,
}: {
  spotlightSlides: SpotlightSlide[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);

  const reduceMotion = useReducedMotion();
  const latestVideo = ORIGINALS_VIDEOS[0];

  const slides = useMemo<HeroSlide[]>(() => {
    const featured: HeroSlide[] = spotlightSlides.map((slide) => ({
      id: slide.id,
      kicker: slide.kicker || "FEATURED DROP",
      title: slide.title,
      blurb: slide.blurb,
      image: slide.image,
      ctas: [
        {
          label: slide.ctaLabel || "EXPLORE GAME",
          href: slide.ctaHref,
          external: /^https?:\/\//i.test(slide.ctaHref),
          kind: "primary",
        },
      ],
    }));

    if (!latestVideo) return featured;

    return [
      ...featured,
      {
        id: "latest-upload",
        kicker: "MAVERICK DRILLS / LATEST UPLOAD",
        title: "GAMING CONTENT THAT HITS DIFFERENT.",
        blurb:
          "Original gameplay, exclusive moments, and the games worth your time. Straight from Maverick Drills.",
        image: getYouTubeThumbnail(latestVideo.id),
        ctas: [
          {
            label: "WATCH LATEST",
            href: `https://www.youtube.com/watch?v=${latestVideo.id}`,
            external: true,
            kind: "primary",
          },
          {
            label: "EXPLORE ORIGINALS",
            href: "/originals",
            kind: "secondary",
          },
        ],
      },
    ];
  }, [spotlightSlides, latestVideo]);

  const total = slides.length;
  const safeActive = total > 0 ? active % total : 0;
  const current = slides[safeActive];

  // Parallax scroll motion.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  // Pause when the browser tab is hidden.
  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Pause autoplay when the Hero leaves the viewport.
  useEffect(() => {
    const element = heroRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Pause while hovering, focusing controls, or offscreen.
  useEffect(() => {
    if (paused || !pageVisible || !heroVisible || reduceMotion || total <= 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [paused, pageVisible, heroVisible, reduceMotion, total, safeActive]);

  function goTo(index: number) {
    if (total <= 0) return;

    setActive(((index % total) + total) % total);
  }

  if (!current) return null;

  const slideNumber = String(safeActive + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  const contentTransition = {
    duration: reduceMotion ? 0 : 0.65,
    ease: EASE,
  };

  return (
    <section
      ref={heroRef}
      aria-label="Featured games and videos"
      aria-roledescription="carousel"
      className="
        relative isolate overflow-hidden bg-background
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];

        if (touch) {
          touchStart.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const touch = event.changedTouches[0];

        touchStart.current = null;

        if (!start || !touch) return;

        const dx = start.x - touch.clientX;
        const dy = start.y - touch.clientY;

        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          goTo(safeActive + (dx > 0 ? 1 : -1));
        }
      }}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(safeActive + 1);
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(safeActive - 1);
        }
      }}
    >
      {/* OPTIMIZED CINEMATIC BACKGROUND */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -inset-y-16 inset-x-0
          z-0 overflow-hidden
        "
        style={{
          y: reduceMotion ? 0 : parallaxY,
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: reduceMotion ? 0 : 0.85,
              },
              scale: {
                duration: reduceMotion ? 0 : 2,
                ease: EASE,
              },
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src={current.image}
              alt=""
              fill
              priority={safeActive === 0}
              sizes="100vw"
              quality={75}
              className="object-cover"
              style={{
                objectPosition:
                  current.id === "latest-upload"
                    ? "center center"
                    : "65% center",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-background
            via-background/65
            to-transparent
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-background
            via-transparent
            to-background/15
          "
        />
      </motion.div>

      {/* ATMOSPHERIC RED LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0 z-[1]
          h-[70%] w-[50%]
          bg-[radial-gradient(ellipse_at_top_right,rgba(229,9,36,0.07),transparent_65%)]
        "
      />

      {/* MAIN HERO CONTENT */}
      <motion.div
        className="
          relative z-10
          mx-auto flex w-full
          min-h-[560px] max-w-7xl
          items-center

          px-5 pb-32 pt-20

          sm:min-h-[630px] sm:px-8
          lg:min-h-[700px] lg:px-12

          2xl:max-w-[1536px]
          min-[2000px]:max-w-[1760px]
          min-[2000px]:min-h-[760px]
          min-[2000px]:px-16
        "
        style={{
          y: reduceMotion ? 0 : contentY,
          opacity: reduceMotion ? 1 : scrollOpacity,
        }}
      >
        <div
          className="
            w-full max-w-[680px]
            2xl:max-w-[750px]
            min-[2000px]:max-w-[820px]
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="
                flex w-full flex-col items-start
              "
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={contentTransition}
            >
              {/* FEATURED BADGE */}
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: EASE,
                }}
                className="
                  mb-6 inline-flex max-w-full
                  items-center clip-corner-sm
                  bg-red/95 px-4 py-2

                  font-heading text-[10px]
                  uppercase tracking-[0.08em]
                  text-white

                  shadow-[0_0_25px_rgba(229,9,36,0.25)]
                  sm:text-xs
                "
              >
                {current.kicker}
              </motion.span>

              {/* TITLE */}
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: reduceMotion ? 0 : 0.18,
                  ease: EASE,
                }}
                className="
                  w-full max-w-[820px]
                  break-words
                  font-display font-black
                  uppercase text-white

                  text-[clamp(2.4rem,5vw,6.5rem)]
                  leading-[1.05]
                  tracking-[-0.05em]

                  sm:leading-[0.98]
                  [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]
                "
              >
                {current.title}
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : 0.3,
                  ease: EASE,
                }}
                className="
                  mt-6 max-w-[520px]
                  font-body text-sm
                  leading-relaxed text-white/85

                  sm:text-base lg:text-lg
                "
              >
                {current.blurb}
              </motion.p>

              {/* CTA BUTTONS */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : 0.42,
                  ease: EASE,
                }}
                className="
                  mt-9 flex w-full flex-wrap gap-3
                "
              >
                {current.ctas.map((cta) => {
                  const isPrimary = cta.kind !== "secondary";

                  const buttonClass = `
                    cinematic-button
                    inline-flex min-h-12
                    items-center justify-center
                    gap-2 clip-corner-sm

                    px-5 py-3 sm:px-7
                    font-heading text-[11px]
                    uppercase tracking-wide sm:text-xs

                    transition-all duration-300
                    hover:-translate-y-0.5

                    ${
                      isPrimary
                        ? "bg-red text-white hover:bg-red-deep hover:shadow-[0_0_30px_rgba(229,9,36,0.3)]"
                        : "border border-white/35 bg-black/30 text-white backdrop-blur-md hover:border-red hover:text-red"
                    }

                    motion-reduce:hover:translate-y-0
                  `;

                  const content = (
                    <>
                      {cta.external ? (
                        <YouTubeIcon className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4 shrink-0" />
                      )}

                      <span>{cta.label}</span>
                    </>
                  );

                  return cta.external ? (
                    <a
                      key={`${cta.href}-${cta.label}`}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={`${cta.href}-${cta.label}`}
                      href={cta.href}
                      className={buttonClass}
                    >
                      {content}
                    </Link>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CAROUSEL CONTROLS */}
      <div
        className="
          absolute inset-x-0 bottom-9 z-30
          sm:bottom-6
        "
      >
        <div
          className="
            mx-auto flex w-full max-w-7xl
            items-center justify-between
            gap-3 px-5

            sm:px-8 lg:px-12
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <div
            className="
              flex min-w-0 items-center
              gap-3 sm:gap-4
            "
          >
            <span
              className="
                shrink-0 font-body
                text-xs font-medium
                tracking-wider text-white
                sm:text-sm
              "
            >
              {slideNumber}
              <span className="text-white/50">
                {" / "}
                {totalNumber}
              </span>
            </span>

            {/* SLIDE INDICATORS */}
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => {
                const isActive = index === safeActive;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className="
                      flex h-8 items-center
                      justify-center
                    "
                  >
                    <motion.span
                      animate={{
                        width: isActive ? 36 : 20,
                        backgroundColor: isActive
                          ? "#e50924"
                          : "rgba(255,255,255,0.45)",
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease: EASE,
                      }}
                      className="
                        block h-1.5 rounded-full
                      "
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* PREVIOUS / NEXT */}
          {total > 1 && (
            <div
              className="
                flex shrink-0 items-center gap-3
              "
            >
              <motion.button
                type="button"
                onClick={() => goTo(safeActive - 1)}
                aria-label="Previous slide"
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full border border-white/40
                  bg-black/70 text-white
                  backdrop-blur-lg

                  transition-colors duration-200
                  hover:border-red hover:bg-red
                "
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => goTo(safeActive + 1)}
                aria-label="Next slide"
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full border border-white/40
                  bg-black/70 text-white
                  backdrop-blur-lg

                  transition-colors duration-200
                  hover:border-red hover:bg-red
                "
              >
                <ChevronRightIcon className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
