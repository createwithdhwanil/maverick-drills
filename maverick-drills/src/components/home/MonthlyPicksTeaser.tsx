import Image from "next/image";
import Link from "next/link";
import { MONTHLY_PICKS } from "@/lib/data/recommendations";
import { LockIcon } from "@/components/ui/icons";

// TODO: ranks listed here show fully on the homepage teaser; every other
// rank shows blurred with a lock icon.
const UNLOCKED_RANKS = [2, 3];

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
          {MONTHLY_PICKS.map((pick) => {
            const isLocked = !UNLOCKED_RANKS.includes(pick.rank);
            const href = isLocked
              ? "/recommendations"
              : `/recommendations/${pick.slug}`;

            return (
              <Link
                key={pick.rank}
                href={href}
                className="group flex gap-4 rounded-xl border border-border p-4 transition-colors hover:border-red"
              >
                <div className="relative aspect-[2/3] w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={pick.poster}
                    alt={isLocked ? "Locked pick" : `${pick.game} poster`}
                    fill
                    sizes="80px"
                    className={`object-cover ${isLocked ? "scale-110 blur-md" : ""}`}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <LockIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display text-lg text-red">
                    {String(pick.rank).padStart(2, "0")}
                  </p>
                  {isLocked ? (
                    <>
                      <h3 className="font-heading text-base">Locked Pick</h3>
                      <p className="mt-1 font-body text-xs text-foreground/60">
                        See the full list to reveal this one.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-heading text-base group-hover:text-red">
                        {pick.game}
                      </h3>
                      <p className="mt-1 font-body text-xs text-foreground/60 line-clamp-2">
                        {pick.blurb}
                      </p>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
