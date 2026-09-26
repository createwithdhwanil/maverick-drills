"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CloseIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

type Screenshot = { src: string; caption?: string };

export default function ScreenshotLightbox({
  gameTitle,
  screenshots,
}: {
  gameTitle: string;
  screenshots: Screenshot[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + screenshots.length) % screenshots.length,
    );
  const showNext = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length));

  const active = openIndex !== null ? screenshots[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {screenshots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-video overflow-hidden rounded-lg bg-surface"
          >
            <Image
              src={shot.src}
              alt={shot.caption ?? `${gameTitle} screenshot ${index + 1}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-white/70">
              {(openIndex ?? 0) + 1} / {screenshots.length}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={active.src}
                download
                className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-heading text-xs text-white transition-colors hover:border-red hover:text-red"
              >
                <DownloadIcon className="h-4 w-4" />
                DOWNLOAD
              </a>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-white"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="relative mt-4 flex flex-1 items-center justify-center">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous screenshot"
              className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <div className="relative h-full w-full max-w-4xl">
              <Image
                src={active.src}
                alt={
                  active.caption ??
                  `${gameTitle} screenshot ${(openIndex ?? 0) + 1}`
                }
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next screenshot"
              className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
