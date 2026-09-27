import Image from "next/image";
import Link from "next/link";
import { MONTH_LABEL, MONTHLY_PICKS } from "@/lib/data/recommendations";

export const metadata = {
  title: "Monthly Picks — Maverick Drills",
  description:
    "Three games worth your time this month, picked fresh by Maverick Drills.",
};

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
              <Link
                key={pick.rank}
                href={`/recommendations/${pick.slug}`}
                className="group grid gap-6 border-b border-border pb-10 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-8"
              >
                <div className="relative aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={pick.poster}
                    alt={`${pick.game} poster`}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red font-heading text-sm text-white">
                    {pick.rank}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl group-hover:text-red md:text-3xl">
                    {pick.game}
                  </h2>
                  <p className="mt-1 font-body text-sm text-foreground/50">
                    {pick.genre} · {pick.platforms}
                  </p>
                  <p className="mt-4 font-body text-base leading-relaxed text-foreground/80">
                    {pick.blurb}
                  </p>
                  <p className="mt-4 font-heading text-xs text-red">
                    READ FULL WRITE-UP →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
