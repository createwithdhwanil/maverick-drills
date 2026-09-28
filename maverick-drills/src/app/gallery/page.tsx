import Link from "next/link";
import { GAME_GALLERIES } from "@/lib/data/gallery";
import { LoadableImage } from "@/components/ui/LoadableMedia";

export const metadata = {
  title: "Gallery — Maverick Drills",
  description: "Exclusive screenshots from photo mode, game by game.",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <p className="font-heading text-sm text-red">EXCLUSIVE SCREENSHOTS</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">
            GALLERY.
          </h1>
          <p className="mt-6 font-body text-lg text-foreground/70">
            Photo mode shots from every game I&apos;ve covered. Pick a game to
            view the full set.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {GAME_GALLERIES.map((game) => (
              <Link
                key={game.slug}
                href={`/gallery/${game.slug}`}
                className="group"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface">
                  <LoadableImage
                    src={game.poster}
                    alt={`${game.title} poster`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                </div>
                <h2 className="mt-3 font-heading text-sm group-hover:text-red">
                  {game.title}
                </h2>
                <p className="font-body text-xs text-foreground/50">
                  {game.screenshots.length} screenshot
                  {game.screenshots.length === 1 ? "" : "s"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
