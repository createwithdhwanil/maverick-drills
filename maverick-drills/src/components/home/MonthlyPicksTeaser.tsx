import Link from "next/link";
import { MONTHLY_PICKS } from "@/lib/data/recommendations";
import { LockIcon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { LoadableImage } from "@/components/ui/LoadableMedia";

const UNLOCKED_RANKS = [2, 3];

export default function MonthlyPicksTeaser() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          index="04"
          title="THIS MONTH'S PICKS"
          href="/recommendations"
          linkLabel="See full picks"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {MONTHLY_PICKS.map((pick, index) => {
            const isLocked = !UNLOCKED_RANKS.includes(pick.rank);
            const href = isLocked
              ? "/recommendations"
              : `/recommendations/${pick.slug}`;

            return (
              <Reveal key={pick.rank} delay={index * 100}>
                <Link
                  href={href}
                  className="group flex gap-4 clip-corner border border-border p-4 transition-colors hover:border-red"
                >
                  <div className="relative aspect-[2/3] w-20 flex-shrink-0 overflow-hidden clip-corner-sm bg-surface">
                    <LoadableImage
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
