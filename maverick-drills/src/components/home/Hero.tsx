"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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

export default function Hero({
  spotlightSlides,
}: {
  spotlightSlides: SpotlightSlide[];
}) {
  const latestVideo = ORIGINALS_VIDEOS[0];

  const slides = useMemo<HeroSlide[]>(() => {
    const featuredGames: HeroSlide[] = spotlightSlides.map((slide) => ({
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

    if (!latestVideo) {
      return featuredGames;
    }

    const uploadSlide: HeroSlide = {
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
    };

    // Game spotlights appear first.
    return [...featuredGames, uploadSlide];
  }, [latestVideo, spotlightSlides]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  const total = slides.length;
  const safeActive = total > 0 ? active % total : 0;
  const current = slides[safeActive];

  // Automatic carousel playback
  useEffect(() => {
    if (paused || total <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goTo = (index: number) => {
    if (total <= 0) return;

    setActive(((index % total) + total) % total);
  };

  if (!current) return null;

  const number = String(safeActive + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  return (
    <section
      aria-label="Featured games and videos"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;

        const endX = event.changedTouches[0]?.clientX;

        if (endX === undefined) {
          touchStartX.current = null;
          return;
        }

        const difference = touchStartX.current - endX;
        touchStartX.current = null;

        if (Math.abs(difference) > 60) {
          goTo(safeActive + (difference > 0 ? 1 : -1));
        }
      }}
    >
      {/* =====================================
          CINEMATIC BACKGROUND
      ===================================== */}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          key={current.id}
          className="
            absolute inset-0
            bg-cover bg-center
            motion-safe:animate-[hero-reveal_900ms_ease-out_both]
          "
          style={{
            backgroundImage: `url("${current.image}")`,
          }}
        />

        {/* Horizontal gradient for readability */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-background
            via-background/75
            to-transparent
          "
        />

        {/* Bottom gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-background
            via-background/10
            to-background/10
          "
        />
      </div>

      {/* =====================================
          MAIN HERO CONTENT
      ===================================== */}

      <div
        className="
          relative mx-auto
          flex w-full items-center
          min-h-[560px]
          max-w-7xl

          px-5 pb-28 pt-20

          sm:min-h-[630px]
          sm:px-8

          lg:min-h-[700px]
          lg:px-12

          2xl:max-w-[1536px]

          min-[2000px]:max-w-[1760px]
          min-[2000px]:min-h-[760px]
          min-[2000px]:px-16
        "
      >
        {/* IMPORTANT:
            Keep all text stacked vertically.
            Do not add min-height or container
            padding classes to this inner div.
        */}

        <div
          key={current.id}
          className="
            flex w-full flex-col items-start
            max-w-[650px]

            2xl:max-w-[720px]

            min-[2000px]:max-w-[800px]

            motion-safe:animate-[hero-content_650ms_ease-out_both]
          "
        >
          {/* FEATURED LABEL */}

          <span
            className="
              mb-6 inline-flex
              max-w-full items-center
              clip-corner-sm

              bg-red/95
              px-4 py-2

              font-heading text-[10px]
              uppercase tracking-[0.08em]
              text-white

              shadow-[0_0_25px_rgba(229,9,36,0.2)]

              sm:text-xs
            "
          >
            {current.kicker}
          </span>

          {/* GAME TITLE */}

          <h1
            className="
              w-full max-w-[800px]

              font-display
              text-[clamp(2.5rem,5vw,6rem)]
              uppercase

              leading-[0.98]
              tracking-[-0.045em]

              text-white

              [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]

              break-words
            "
          >
            {current.title}
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-6 max-w-[520px]

              font-body
              text-sm leading-relaxed
              text-white/80

              sm:text-base
              lg:text-lg
            "
          >
            {current.blurb}
          </p>

          {/* CALL TO ACTION BUTTONS */}

          <div className="mt-9 flex w-full flex-wrap gap-3">
            {current.ctas.map((cta) => {
              const isPrimary = cta.kind !== "secondary";

              const buttonClass = `
                inline-flex min-h-12
                items-center justify-center
                gap-2

                clip-corner-sm
                px-5 py-3
                sm:px-7

                font-heading
                text-[11px]
                uppercase tracking-wide
                sm:text-xs

                transition-all duration-300

                ${
                  isPrimary
                    ? "bg-red text-white hover:bg-red-deep hover:shadow-[0_0_28px_rgba(229,9,36,0.25)]"
                    : "border border-white/35 bg-black/30 text-white backdrop-blur-md hover:border-red hover:text-red"
                }
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
          </div>
        </div>
      </div>

      {/* =====================================
          BOTTOM CAROUSEL CONTROLS
      ===================================== */}

      <div
        className="
          absolute inset-x-0 bottom-6 z-10
          mx-auto flex w-full
          max-w-7xl

          items-center justify-between
          gap-3

          px-5 sm:px-8 lg:px-12

          2xl:max-w-[1536px]

          min-[2000px]:max-w-[1760px]
          min-[2000px]:px-16
        "
      >
        {/* SLIDE COUNTER */}

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            className="
              shrink-0 font-body
              text-xs font-medium
              tracking-wider text-white
              sm:text-sm
            "
          >
            {number}

            <span className="text-white/45">
              {" / "}
              {totalNumber}
            </span>
          </span>

          {/* SLIDE INDICATORS */}

          <div className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                aria-current={index === safeActive ? "true" : undefined}
                className={`
                  h-2 rounded-full
                  transition-all duration-300

                  ${
                    index === safeActive
                      ? "w-8 bg-red"
                      : "w-5 bg-white/35 hover:bg-white/70"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* PREVIOUS / NEXT CONTROLS */}

        {total > 1 && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(safeActive - 1)}
              aria-label="Previous slide"
              className="
                flex h-10 w-10
                items-center justify-center

                rounded-full
                border border-white/30
                bg-black/40 text-white

                backdrop-blur-md
                transition-all duration-200

                hover:border-red
                hover:bg-red

                sm:h-11 sm:w-11
              "
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => goTo(safeActive + 1)}
              aria-label="Next slide"
              className="
                flex h-10 w-10
                items-center justify-center

                rounded-full
                border border-white/30
                bg-black/40 text-white

                backdrop-blur-md
                transition-all duration-200

                hover:border-red
                hover:bg-red

                sm:h-11 sm:w-11
              "
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
