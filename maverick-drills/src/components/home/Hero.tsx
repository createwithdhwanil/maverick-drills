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

type HeroCta = { label: string; href: string; external?: boolean };
type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  ctas: HeroCta[];
};

const AUTO_ADVANCE_MS = 6000;

export default function Hero({
  spotlightSlides,
}: {
  spotlightSlides: SpotlightSlide[];
}) {
  const latestVideo = ORIGINALS_VIDEOS[0];

  const slides: HeroSlide[] = useMemo(() => {
    const uploadSlide: HeroSlide = {
      id: "latest-upload",
      kicker: "GAMER. CREATOR. THIS IS THE DRILL.",
      title: "GAMING CONTENT THAT HITS DIFFERENT.",
      blurb:
        "Originals, exclusive screenshots, and the games worth your time — straight from the channel, no fluff.",
      image: getYouTubeThumbnail(latestVideo.id),
      ctas: [
        {
          label: "WATCH LATEST ON YOUTUBE",
          href: `https://www.youtube.com/watch?v=${latestVideo.id}`,
          external: true,
        },
        { label: "BROWSE ORIGINALS", href: "/originals" },
      ],
    };

    const mappedSpotlight: HeroSlide[] = spotlightSlides.map((slide) => ({
      id: slide.id,
      kicker: slide.kicker,
      title: slide.title,
      blurb: slide.blurb,
      image: slide.image,
      ctas: [
        {
          label: slide.ctaLabel,
          href: slide.ctaHref,
          external: slide.ctaHref.startsWith("http"),
        },
      ],
    }));

    return [uploadSlide, ...mappedSpotlight];
  }, [latestVideo.id, spotlightSlides]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length]);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`transition-opacity duration-700 ease-out ${
            index === active
              ? "relative opacity-100"
              : "pointer-events-none absolute inset-0 opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-40">
            <p className="font-heading text-sm text-red">{slide.kicker}</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg text-white/80">
              {slide.blurb}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {slide.ctas.map((cta, ctaIndex) =>
                cta.external ? (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 clip-corner-sm bg-red px-7 py-3 font-heading text-sm text-white transition-colors hover:bg-red-deep"
                  >
                    <YouTubeIcon className="h-5 w-5" />
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={
                      ctaIndex === 0
                        ? "flex items-center gap-2 clip-corner-sm bg-red px-7 py-3 font-heading text-sm text-white transition-colors hover:bg-red-deep"
                        : "flex items-center gap-2 clip-corner-sm border border-white/30 px-7 py-3 font-heading text-sm text-white transition-colors hover:border-red hover:text-red"
                    }
                  >
                    {cta.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 sm:flex"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 sm:flex"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 transition-all ${
              index === active
                ? "w-8 bg-red"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
