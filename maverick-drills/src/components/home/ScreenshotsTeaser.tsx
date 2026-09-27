import Image from "next/image";
import Link from "next/link";
import { GAME_GALLERIES } from "@/lib/data/gallery";

export default function ScreenshotsTeaser() {
  const featured = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.slice(0, 2).map((shot) => ({ ...shot, game })),
  ).slice(0, 4);

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
          {featured.map((shot, index) => (
            <Link
              key={`${shot.src}-${index}`}
              href={`/gallery/${shot.game.slug}`}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
            >
              <Image
                src={shot.src}
                alt={`${shot.game.title} screenshot`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3">
                <p className="font-heading text-xs text-white">
                  {shot.game.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
