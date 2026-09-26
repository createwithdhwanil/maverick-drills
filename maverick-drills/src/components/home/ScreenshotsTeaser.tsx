import Link from "next/link";

// TODO: replace with real screenshots once the Gallery/data layer is built
const FEATURED_SCREENSHOTS = [
  { game: "Iron Echelon", caption: "Final boss arena reveal" },
  { game: "Neon Drift", caption: "Night city chase sequence" },
  { game: "Void Runners", caption: "Zero-g combat" },
  { game: "Grimhollow", caption: "The Hollow Marsh biome" },
];

export default function ScreenshotsTeaser() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">
            EXCLUSIVE SCREENSHOTS
          </h2>
          <Link
            href="/gallery"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            View gallery →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {FEATURED_SCREENSHOTS.map((shot) => (
            <div
              key={shot.game}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
            >
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <p className="font-heading text-xs text-red">{shot.game}</p>
                <p className="font-body text-xs text-foreground/70">
                  {shot.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
