import Link from "next/link";
import { GAME_GALLERIES } from "@/lib/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { LoadableImage } from "@/components/ui/LoadableMedia";

export default function ScreenshotsTeaser() {
  const featured = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.slice(0, 2).map((shot) => ({ ...shot, game })),
  ).slice(0, 4);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          index="03"
          title="EXCLUSIVE SCREENSHOTS"
          href="/gallery"
          linkLabel="View gallery"
        />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((shot, index) => {
            const isFeatured = index === 0;
            return (
              <Reveal
                key={`${shot.src}-${index}`}
                delay={index * 100}
                className={isFeatured ? "md:col-span-2 md:row-span-2" : ""}
              >
                <Link
                  href={`/gallery/${shot.game.slug}`}
                  className={`group relative block overflow-hidden clip-corner bg-surface ${
                    isFeatured
                      ? "aspect-square md:h-full md:aspect-auto"
                      : "aspect-square"
                  }`}
                >
                  <LoadableImage
                    src={shot.src}
                    alt={`${shot.game.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3">
                    <p
                      className={`font-heading text-white ${isFeatured ? "text-sm" : "text-xs"}`}
                    >
                      {shot.game.title}
                    </p>
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
