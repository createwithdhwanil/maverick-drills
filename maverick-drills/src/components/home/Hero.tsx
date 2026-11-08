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

    // Prioritize the cinematic game spotlights.
    return [...featuredGames, uploadSlide];
  }, [latestVideo.id, spotlightSlides]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  const current = slides[active] ?? slides[0];
  const total = slides.length;

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
    setActive((index + total) % total);
  };

  if (!current) return null;

  const number = String(active + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  return (
    <section
      aria-label="Featured games and videos"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden
                 bg-background"
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
        if (endX === undefined) return;

        const difference = touchStartX.current - endX;
        touchStartX.current = null;

        if (Math.abs(difference) > 60) {
          goTo(active + (difference > 0 ? 1 : -1));
        }
      }}
    >
      {/* CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div
          key={current.id}
          role="img"
          aria-label={`${current.title} artwork`}
          className="absolute inset-0
                     bg-cover bg-center
                     motion-safe:animate-[hero-reveal_900ms_ease-out_both]"
          style={{
            backgroundImage: `url("${current.image}")`,
          }}
        />

        <div
          className="absolute inset-0
                     bg-gradient-to-r
                     from-background via-background/80
                     to-transparent"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0
                     bg-gradient-to-t
                     from-background via-transparent
                     to-background/20"
          aria-hidden="true"
        />
      </div>

      {/* MAIN HERO CONTENT */}
      <div
        className="relative mx-auto flex
                   min-h-[560px] max-w-7xl
                   items-center px-5
                   pb-28 pt-20
                   sm:min-h-[630px] sm:px-8
                   lg:min-h-[700px] lg:px-12"
      >
        <div
          key={current.id}
          className="max-w-[650px]
                     motion-safe:animate-[hero-content_650ms_ease-out_both]"
        >
          {/* FEATURED BADGE */}
          <div className="mb-6 inline-flex items-center gap-3">
            <span
              className="clip-corner-sm
                         bg-red/90 px-4 py-2
                         font-heading text-[11px]
                         uppercase tracking-wide
                         text-white shadow-[0_0_25px_rgba(229,9,36,0.22)]"
            >
              {current.kicker}
            </span>
          </div>

          {/* GAME TITLE */}
          <h1
            className="max-w-[650px]
                       font-display text-[clamp(2.7rem,6vw,5.8rem)]
                       uppercase leading-[0.98]
                       tracking-[-0.045em]
                       text-white
                       [text-shadow:0_4px_30px_rgba(0,0,0,0.4)]"
          >
            {current.title}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="mt-6 max-w-[490px]
                       font-body text-base
                       leading-relaxed text-white/80
                       sm:text-lg"
          >
            {current.blurb}
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-3">
            {current.ctas.map((cta) => {
              const isPrimary = cta.kind !== "secondary";

              const buttonClass = `
                inline-flex min-h-12 items-center
                justify-center gap-2
                clip-corner-sm px-6 py-3
                font-heading text-xs
                uppercase tracking-wide
                transition-all duration-300
                sm:text-sm
                ${
                  isPrimary
                    ? "bg-red text-white hover:bg-red-deep hover:shadow-[0_0_28px_rgba(229,9,36,0.25)]"
                    : "border border-white/35 bg-black/25 text-white backdrop-blur-md hover:border-red hover:text-red"
                }
              `;

              const content = (
                <>
                  {cta.external && <YouTubeIcon className="h-4 w-4 shrink-0" />}
                  <span>{cta.label}</span>
                  {!cta.external && (
                    <ChevronRightIcon className="h-4 w-4 shrink-0" />
                  )}
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

      {/* BOTTOM CONTROLS */}
      <div
        className="absolute inset-x-0 bottom-7
                   z-10 mx-auto flex
                   max-w-7xl items-center
                   justify-between gap-4
                   px-5 sm:px-8 lg:px-12"
      >
        {/* SLIDE COUNTER */}
        <div className="flex items-center gap-4">
          <span
            className="font-body text-sm
                       font-medium tracking-wider
                       text-white"
          >
            {number}
            <span className="text-white/45">
              {" / "}
              {totalNumber}
            </span>
          </span>

          {/* PROGRESS INDICATORS */}
          <div className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                aria-current={index === active ? "true" : undefined}
                className={`
                  h-1.5 rounded-full
                  transition-all duration-300
                  ${
                    index === active
                      ? "w-9 bg-red"
                      : "w-6 bg-white/35 hover:bg-white/70"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* CAROUSEL ARROWS */}
        {total > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10
                         items-center justify-center
                         rounded-full border
                         border-white/30
                         bg-black/30 text-white
                         backdrop-blur-md
                         transition-colors
                         hover:border-red
                         hover:bg-red"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10
                         items-center justify-center
                         rounded-full border
                         border-white/30
                         bg-black/30 text-white
                         backdrop-blur-md
                         transition-colors
                         hover:border-red
                         hover:bg-red"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
