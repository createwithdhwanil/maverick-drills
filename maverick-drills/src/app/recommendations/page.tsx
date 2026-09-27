import Image from "next/image";

export const metadata = {
  title: "Monthly Picks — Maverick Drills",
  description:
    "Three games worth your time this month, picked fresh by Maverick Drills.",
};

// TODO: update every month — swap these for the real picks
const MONTH_LABEL = "September 2026";

const MONTHLY_PICKS = [
  {
    rank: 1,
    game: "Onimusha: Way of the Sword",
    genre: "Action-Adventure / Single Player / Sword / Gore",
    platforms: "PC, PS5, Xbox Series X|S",
    poster: "/images/games/onimusha-way-of-the-sword.png",
    blurb:
      "Onimusha: Way of the Sword is a 2026 dark fantasy action-adventure game developed by Capcom where a resurrected Miyamoto Musashi fights demonic invaders in Edo-period Kyoto.",
  },
  {
    rank: 2,
    game: "Control Resonant",
    genre: "Hack and Slash / Action RPG / Story Rich / Lore-Rich / Sci-Fi",
    platforms: "PC, PS5, Xbox Series X|S",
    poster: "/images/games/control-resonant.png",
    blurb:
      "Control Resonant follows Dylan Faden as he awakens from a seven-year coma to fight a reality-warping Hiss invasion across a fractured Manhattan while searching for his missing sister, Jesse Faden.",
  },
  {
    rank: 3,
    game: "Marvel's Wolverine",
    genre: "Action-Adventure / Single Player / Superhero",
    platforms: "PlayStation 5 Exclusive",
    poster: "/images/games/marvels-wolverine.png",
    blurb:
      "Marvel's Wolverine is a 2026 action-adventure game developed by Insomniac Games where players control the iconic Marvel character in a story-driven campaign.",
  },
];

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
              <article
                key={pick.rank}
                className="grid gap-6 border-b border-border pb-10 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-8"
              >
                <div className="relative aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={pick.poster}
                    alt={`${pick.game} poster`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red font-heading text-sm text-white">
                    {pick.rank}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl">
                    {pick.game}
                  </h2>
                  <p className="mt-1 font-body text-sm text-foreground/50">
                    {pick.genre} · {pick.platforms}
                  </p>
                  <p className="mt-4 font-body text-base leading-relaxed text-foreground/80">
                    {pick.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
