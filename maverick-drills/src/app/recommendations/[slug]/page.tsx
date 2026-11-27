import Link from "next/link";
import { notFound } from "next/navigation";

import {
  MONTH_LABEL,
  MONTHLY_PICKS,
  getPickBySlug,
} from "@/lib/data/recommendations";

import { LoadableImage, LoadableIframe } from "@/components/ui/LoadableMedia";
import Reveal from "@/components/ui/Reveal";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import { createPageMetadata } from "../../metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MONTHLY_PICKS.map((pick) => ({
    slug: pick.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) {
    return {
      title: "Game Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: pick.game,
    description: pick.blurb,
    path: `/recommendations/${pick.slug}`,
  });
}

export default async function MonthlyPickPage({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) notFound();

  const rank = String(pick.rank).padStart(2, "0");

  return (
    <main className="overflow-x-clip bg-background">
      {/* ============================
          CINEMATIC GAME INTRO
      ============================ */}
      <section
        className="
          relative isolate overflow-hidden
          border-b border-border
        "
      >
        {/* ATMOSPHERIC POSTER BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          <LoadableImage
            src={pick.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              opacity-25 blur-2xl
              scale-110
            "
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-background
              via-background/85
              to-background/45
            "
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-background
              via-transparent
              to-background/30
            "
          />
        </div>

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 pb-20 pt-16
            sm:px-8 sm:py-24
            lg:px-12 lg:py-28
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <Reveal>
            <Link
              href="/recommendations"
              className="
                inline-flex items-center gap-2
                font-heading text-[10px]
                uppercase tracking-wide
                text-red
                transition-colors hover:text-white
              "
            >
              ← BACK TO MONTHLY PICKS
            </Link>
          </Reveal>

          <div
            className="
              mt-10 grid items-center
              gap-10
              lg:grid-cols-[minmax(260px,0.65fr)_1fr]
              lg:gap-16
            "
          >
            {/* GAME ARTWORK */}
            <Reveal className="max-w-[460px]">
              <PremiumTiltCard maxTilt={3}>
                <div
                  className="
                    relative aspect-[4/5]
                    w-full overflow-hidden
                    clip-corner
                    border border-white/15
                    bg-surface
                    shadow-[0_25px_80px_rgba(0,0,0,0.4)]
                  "
                >
                  <LoadableImage
                    src={pick.poster}
                    alt={`${pick.game} poster`}
                    fill
                    priority
                    sizes="
                      (min-width: 1024px) 460px,
                      100vw
                    "
                    className="object-cover"
                  />

                  <div
                    className="
                      pointer-events-none absolute inset-0
                      bg-gradient-to-t
                      from-black/60
                      to-transparent
                    "
                  />

                  <span
                    className="
                      absolute left-5 top-5
                      bg-red px-4 py-2
                      font-display text-2xl
                      text-white
                    "
                  >
                    #{rank}
                  </span>

                  <span
                    className="
                      absolute bottom-5 left-5
                      border border-white/25
                      bg-black/60 px-3 py-2
                      font-heading text-[10px]
                      uppercase text-white
                      backdrop-blur
                    "
                  >
                    MAVERICK DRILLS PICK
                  </span>
                </div>
              </PremiumTiltCard>
            </Reveal>

            {/* EDITORIAL TITLE */}
            <Reveal delay={150}>
              <div>
                <p
                  className="
                    font-heading text-xs
                    uppercase tracking-[0.18em]
                    text-red
                  "
                >
                  {MONTH_LABEL.toUpperCase()}
                  {" / "}
                  RANK {rank}
                </p>

                <h1
                  className="
                    mt-5 max-w-4xl
                    font-display
                    text-[clamp(2.7rem,6vw,6rem)]
                    uppercase leading-[0.98]
                    tracking-[-0.05em]
                    text-white
                  "
                >
                  {pick.game}
                </h1>

                <div
                  className="
                    mt-7 flex flex-wrap
                    gap-2
                  "
                >
                  <span
                    className="
                      border border-white/15
                      bg-white/5 px-3 py-2
                      font-body text-[11px]
                      text-white/75
                    "
                  >
                    {pick.genre}
                  </span>

                  <span
                    className="
                      border border-white/15
                      bg-white/5 px-3 py-2
                      font-body text-[11px]
                      text-white/75
                    "
                  >
                    {pick.platforms}
                  </span>
                </div>

                <p
                  className="
                    mt-8 max-w-2xl
                    font-body text-base
                    leading-relaxed
                    text-white/75
                    sm:text-lg
                  "
                >
                  {pick.blurb}
                </p>

                <a
                  href="#official-trailer"
                  className="
                    cinematic-button
                    mt-9 inline-flex
                    min-h-12 items-center gap-3
                    clip-corner-sm bg-red
                    px-7 py-3
                    font-heading text-xs
                    uppercase text-white
                    hover:bg-red-deep
                  "
                >
                  WATCH OFFICIAL TRAILER
                  <span aria-hidden="true">↘</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================
          STORY AND GAMEPLAY
      ============================ */}
      <section
        className="
          border-b border-border
          bg-background
        "
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
            <p
              className="
                font-heading text-xs
                uppercase tracking-[0.18em]
                text-red
              "
            >
              01 / THE GAME
            </p>

            <h2
              className="
                mt-4 font-display
                text-3xl uppercase
                text-white sm:text-5xl
              "
            >
              BEYOND THE COVER.
            </h2>
          </Reveal>

          <div
            className="
              mt-12 grid gap-5
              lg:grid-cols-2
            "
          >
            <Reveal>
              <div
                className="
                  h-full border border-border
                  bg-surface p-6
                  sm:p-9
                "
              >
                <p
                  className="
                    font-heading text-[10px]
                    uppercase tracking-[0.16em]
                    text-red
                  "
                >
                  THE OVERVIEW
                </p>

                <h3
                  className="
                    mt-4 font-heading
                    text-xl uppercase
                    text-white
                  "
                >
                  WHAT IT&apos;S ABOUT
                </h3>

                <p
                  className="
                    mt-5 whitespace-pre-line
                    font-body text-sm
                    leading-8
                    text-white/70
                    sm:text-base
                  "
                >
                  {pick.summary}
                </p>

                {pick.otherInfo1 && (
                  <p
                    className="
                      mt-6 whitespace-pre-line
                      font-body text-sm
                      leading-8
                      text-white/70
                      sm:text-base
                    "
                  >
                    {pick.otherInfo1}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="
                  h-full border border-border
                  bg-surface p-6
                  sm:p-9
                "
              >
                <p
                  className="
                    font-heading text-[10px]
                    uppercase tracking-[0.16em]
                    text-red
                  "
                >
                  THE EXPERIENCE
                </p>

                <h3
                  className="
                    mt-4 font-heading
                    text-xl uppercase
                    text-white
                  "
                >
                  GAMEPLAY & DETAILS
                </h3>

                <p
                  className="
                    mt-5 whitespace-pre-line
                    font-body text-sm
                    leading-8
                    text-white/70
                    sm:text-base
                  "
                >
                  {pick.otherInfo2 ||
                    "Explore this game through our curated monthly recommendations."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================
          OFFICIAL TRAILER
      ============================ */}
      <section
        id="official-trailer"
        className="
          relative overflow-hidden
          border-b border-border
          bg-[#090A0D]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-32 top-10
            h-96 w-96 rounded-full
            bg-red/5 blur-3xl
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 py-20 sm:px-8
            lg:px-12 lg:py-28
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <Reveal>
            <p
              className="
                font-heading text-xs
                uppercase tracking-[0.18em]
                text-red
              "
            >
              02 / WATCH THE WORLD
            </p>

            <h2
              className="
                mt-4 font-display
                text-3xl uppercase
                text-white sm:text-5xl
              "
            >
              OFFICIAL TRAILER.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="
                mt-10 border border-red/30
                bg-surface p-1
                shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                sm:p-2
              "
            >
              <LoadableIframe
                src={`https://www.youtube.com/embed/${pick.trailerId}`}
                title={`${pick.game} — Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                wrapperClassName="aspect-video w-full bg-black"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================
          PRICING & PLATFORMS
      ============================ */}
      <section>
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
            <p
              className="
                font-heading text-xs
                uppercase tracking-[0.18em]
                text-red
              "
            >
              03 / AVAILABLE PLATFORMS
            </p>

            <h2
              className="
                mt-4 font-display
                text-3xl uppercase
                text-white sm:text-5xl
              "
            >
              PLATFORM & PRICING.
            </h2>
          </Reveal>

          <div
            className="
              mt-10 grid gap-3
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {pick.pricing.map((option, index) => (
              <Reveal key={`${option.platform}-${index}`} delay={index * 80}>
                <div
                  className="
                    group flex h-full
                    items-center justify-between
                    gap-4 border border-border
                    bg-surface px-5 py-6

                    transition-colors duration-300
                    hover:border-red/60
                  "
                >
                  <div>
                    <p
                      className="
                        font-body text-[10px]
                        uppercase tracking-[0.16em]
                        text-muted
                      "
                    >
                      PLATFORM
                    </p>

                    <p
                      className="
                        mt-2 font-heading
                        text-sm uppercase
                        text-white
                      "
                    >
                      {option.platform}
                    </p>
                  </div>

                  <p
                    className="
                      shrink-0 font-heading
                      text-sm text-red
                    "
                  >
                    {option.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p
            className="
              mt-5 font-body text-xs
              leading-relaxed text-muted
            "
          >
            Prices are approximate and may vary by region or storefront.
          </p>

          <Reveal>
            <div
              className="
                mt-16 border-t border-border
                pt-10 text-center
              "
            >
              <Link
                href="/recommendations"
                className="
                  cinematic-button
                  inline-flex min-h-12
                  items-center gap-3
                  clip-corner-sm
                  border border-red/70
                  bg-surface px-7 py-3

                  font-heading text-xs
                  uppercase text-white

                  transition-colors
                  hover:bg-red
                "
              >
                ← EXPLORE MORE MONTHLY PICKS
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
