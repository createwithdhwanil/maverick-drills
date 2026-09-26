import Image from "next/image";

export const metadata = {
  title: "Monthly Picks — Maverick Drills",
  description:
    "Three games worth your time this month, picked fresh by Maverick Drills.",
};

// TODO: update every month — swap these for the real picks
const MONTH_LABEL = "September 2026";

const MONTHLY_PICKS = [
  {
    rank: 1,
    game: "Fractured Throne",
    genre: "Strategy",
    platforms: "PC, PS5, Xbox Series X|S",
    poster: "/images/games/fractured-throne.jpg",
    blurb:
      "The comeback strategy game of the year — deep systems, no fluff. Every match feels different, and the faction design finally makes asymmetric multiplayer feel fair.",
  },
  {
    rank: 2,
    game: "Lumen Fields",
    genre: "Co-op / Action",
    platforms: "PC, PS5",
    poster: "/images/games/lumen-fields.jpg",
    blurb:
      "Best co-op I've played this month, hands down. A two-player campaign that actually respects both players' time and skill level.",
  },
  {
    rank: 3,
    game: "Ember Circuit",
    genre: "Racing",
    platforms: "PC, Switch",
    poster: "/images/games/ember-circuit.jpg",
    blurb:
      "A tight 6-hour campaign that respects your time. Arcade handling with just enough depth to keep tuning your car for another hour.",
  },
];

export default function RecommendationsPage() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <p className="font-heading text-sm text-red">
            {MONTH_LABEL.toUpperCase()}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">
            THIS MONTH&apos;S PICKS.
          </h1>
          <p className="mt-6 font-body text-lg text-foreground/70">
            Three games I&apos;ve actually put hours into this month — no
            sponsor list, just what&apos;s worth your time.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col gap-10">
            {MONTHLY_PICKS.map((pick) => (
              <article
                key={pick.rank}
                className="grid gap-6 border-b border-border pb-10 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-8"
              >
                <div className="relative aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={pick.poster}
                    alt={`${pick.game} poster`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red font-heading text-sm text-white">
                    {pick.rank}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl">
                    {pick.game}
                  </h2>
                  <p className="mt-1 font-body text-sm text-foreground/50">
                    {pick.genre} · {pick.platforms}
                  </p>
                  <p className="mt-4 font-body text-base leading-relaxed text-foreground/80">
                    {pick.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
