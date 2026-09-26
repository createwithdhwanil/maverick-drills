import Link from "next/link";

// TODO: replace with real picks once the Recommendations page/data layer is built
const MONTHLY_PICKS = [
  {
    rank: 1,
    game: "Fractured Throne",
    blurb: "The comeback strategy game of the year — deep systems, no fluff.",
  },
  {
    rank: 2,
    game: "Lumen Fields",
    blurb: "Best co-op I've played this month, hands down.",
  },
  {
    rank: 3,
    game: "Ember Circuit",
    blurb: "A tight 6-hour campaign that respects your time.",
  },
];

export default function MonthlyPicksTeaser() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">
            THIS MONTH&apos;S PICKS
          </h2>
          <Link
            href="/recommendations"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            See full picks →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {MONTHLY_PICKS.map((pick) => (
            <div
              key={pick.rank}
              className="rounded-xl border border-border p-6"
            >
              <p className="font-display text-4xl text-red">
                {String(pick.rank).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-lg">{pick.game}</h3>
              <p className="mt-2 font-body text-sm text-foreground/70">
                {pick.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
