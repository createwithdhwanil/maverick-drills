import { notFound } from "next/navigation";
import Link from "next/link";
import { MONTHLY_PICKS, getPickBySlug } from "@/lib/data/recommendations";
import { LoadableImage, LoadableIframe } from "@/components/ui/LoadableMedia";

export function generateStaticParams() {
  return MONTHLY_PICKS.map((pick) => ({ slug: pick.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);
  if (!pick) return {};
  return {
    title: `${pick.game} — Maverick Drills`,
    description: pick.blurb,
  };
}

export default async function MonthlyPickPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);
  if (!pick) notFound();

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/recommendations"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            ← Back to Monthly Picks
          </Link>

          <div className="mt-6 grid gap-8 sm:grid-cols-[200px_1fr]">
            <div className="relative aspect-[2/3] w-full max-w-[200px] overflow-hidden rounded-xl bg-surface">
              <LoadableImage
                src={pick.poster}
                alt={`${pick.game} poster`}
                fill
                sizes="200px"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-red font-heading text-sm text-white">
                {pick.rank}
              </span>
            </div>
            <div>
              <p className="font-heading text-sm text-red">
                THIS MONTH&apos;S PICK
              </p>
              <h1 className="mt-2 font-display text-3xl leading-[1.1] md:text-5xl">
                {pick.game.toUpperCase()}
              </h1>
              <p className="mt-2 font-body text-sm text-foreground/50">
                {pick.genre} · {pick.platforms}
              </p>
              <div className="mx-auto max-w-3xl px-6 py-16">
                <h2 className="font-heading text-xl">SUMMARY</h2>
                <p className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-foreground/80">
                  {pick.summary}
                </p>
                <p className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-foreground/80">
                  {pick.otherInfo1}
                </p>
                <p className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-foreground/80">
                  {pick.otherInfo2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border"></section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-heading text-xl">OFFICIAL TRAILER</h2>
          <LoadableIframe
            src={`https://www.youtube.com/embed/${pick.trailerId}`}
            title={`${pick.game} — Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            wrapperClassName="mt-6 aspect-video rounded-xl bg-surface"
          />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-heading text-xl">PRICING</h2>
          <div className="mt-6 flex flex-col gap-3">
            {pick.pricing.map((p) => (
              <div
                key={p.platform}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <span className="font-body text-sm">{p.platform}</span>
                <span className="font-heading text-sm text-red">{p.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-body text-xs text-foreground/50">
            Prices shown are approximate and may vary by region or storefront.
          </p>
        </div>
      </section>
    </main>
  );
}
