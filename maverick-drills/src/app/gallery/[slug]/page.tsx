import { notFound } from "next/navigation";
import Link from "next/link";
import { GAME_GALLERIES, getGameBySlug } from "@/lib/data/gallery";
import ScreenshotLightbox from "@/components/gallery/ScreenshotLightbox";
import { LoadableImage } from "@/components/ui/LoadableMedia";

export function generateStaticParams() {
  return GAME_GALLERIES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.title} Screenshots — Maverick Drills`,
    description: `Exclusive photo mode screenshots from ${game.title}.`,
  };
}

export default async function GameGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/gallery"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            ← Back to Gallery
          </Link>
          <div className="mt-6 flex items-end gap-6">
            <div className="relative hidden aspect-[2/3] w-28 overflow-hidden rounded-lg bg-surface sm:block">
              <LoadableImage
                src={game.poster}
                alt={`${game.title} poster`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-heading text-sm text-red">SCREENSHOTS</p>
              <h1 className="mt-2 font-display text-3xl leading-[1.1] md:text-5xl">
                {game.title.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScreenshotLightbox
            gameTitle={game.title}
            screenshots={game.screenshots}
          />
        </div>
      </section>
    </main>
  );
}
