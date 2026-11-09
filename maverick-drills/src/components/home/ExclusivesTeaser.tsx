import Link from "next/link";

import { WEBSITE_EXCLUSIVES } from "@/lib/data/originals";
import Reveal from "@/components/ui/Reveal";
import { LoadableVideo } from "@/components/ui/LoadableMedia";

export default function ExclusivesTeaser() {
  return (
    <section
      id="website-exclusives"
      aria-labelledby="exclusives-title"
      className="relative overflow-hidden
                 border-t border-border/60
                 bg-background"
    >
      {/* BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   -left-24 top-20 h-80 w-80
                   rounded-full bg-red/5 blur-3xl"
      />

      <div
        className="relative mx-auto max-w-7xl
                   px-5 py-20 sm:px-8
                   lg:px-12 lg:py-28"
      >
        {/* SECTION HEADING */}
        <Reveal>
          <div
            className="flex flex-wrap items-end
                       justify-between gap-6"
          >
            <div>
              <p
                className="mb-3 font-heading text-xs
                           uppercase tracking-[0.18em]
                           text-red"
              >
                02 / ONLY ON MAVERICK DRILLS
              </p>

              <h2
                id="exclusives-title"
                className="font-display text-3xl
                           uppercase leading-tight
                           tracking-[-0.04em]
                           text-foreground
                           sm:text-4xl lg:text-5xl"
              >
                WEBSITE EXCLUSIVES
              </h2>

              <p
                className="mt-3 font-body text-sm
                           leading-relaxed text-muted
                           sm:text-base"
              >
                Original clips, unforgettable moments, and exclusive gameplay
                you won&apos;t find anywhere else.
              </p>
            </div>

            <Link
              href="/originals"
              className="group inline-flex items-center
                         gap-2 border-b border-red
                         pb-2 font-heading text-xs
                         uppercase tracking-wide
                         text-foreground
                         transition-colors duration-200
                         hover:text-red"
            >
              EXPLORE ORIGINALS
              <span
                aria-hidden="true"
                className="text-red
                           transition-transform
                           group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>

        {/* EXCLUSIVE VIDEO GRID */}
        {WEBSITE_EXCLUSIVES.length > 0 ? (
          <div
            className="mt-10 grid items-start gap-5
                       md:grid-cols-2
                       lg:grid-cols-4"
          >
            {WEBSITE_EXCLUSIVES.map((clip, index) => {
              const isFeatured = index === 0;

              return (
                <Reveal
                  key={`${clip.src}-${index}`}
                  delay={Math.min(index, 4) * 100}
                  className={
                    isFeatured
                      ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                      : "lg:col-span-2"
                  }
                >
                  <article
                    className="group h-full overflow-hidden
                               border border-border/70
                               bg-surface
                               transition-colors duration-300
                               hover:border-red/50"
                  >
                    {/* VIDEO PLAYER */}
                    <div className="relative bg-black">
                      <div
                        className="absolute left-4 top-4
                                   z-10 pointer-events-none
                                   bg-red px-3 py-1.5
                                   font-heading text-[10px]
                                   uppercase tracking-wider
                                   text-white"
                      >
                        {isFeatured
                          ? "FEATURED EXCLUSIVE"
                          : `EXCLUSIVE ${String(index + 1).padStart(2, "0")}`}
                      </div>

                      <LoadableVideo
                        src={clip.src}
                        controls
                        playsInline
                        preload="metadata"
                        wrapperClassName="aspect-video w-full overflow-hidden bg-black [&_video]:h-full [&_video]:w-full [&_video]:object-contain"
                      />
                    </div>

                    {/* VIDEO DETAILS */}
                    <div
                      className={`border-t border-border/60
                                  ${isFeatured ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}
                    >
                      <div
                        className="mb-3 flex items-center
                                   gap-2 font-body
                                   text-[10px] uppercase
                                   tracking-[0.16em]
                                   text-muted"
                      >
                        <span
                          className="h-1.5 w-1.5
                                     rounded-full bg-red"
                        />
                        MAVERICK DRILLS ORIGINAL
                      </div>

                      <h3
                        className={`font-heading uppercase
                                    leading-snug text-foreground
                                    transition-colors duration-300
                                    group-hover:text-red
                                    ${
                                      isFeatured
                                        ? "text-lg sm:text-2xl"
                                        : "text-sm sm:text-base"
                                    }`}
                      >
                        {clip.title}
                      </h3>

                      <p
                        className="mt-3 font-body
                                   text-xs text-muted"
                      >
                        Exclusive gameplay clip
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div
            className="mt-10 border border-border
                       bg-surface p-10 text-center"
          >
            <p className="font-body text-muted">
              New exclusive clips are coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
