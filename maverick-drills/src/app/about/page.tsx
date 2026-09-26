import Link from "next/link";

export const metadata = {
  title: "About — Maverick Drills",
  description:
    "The story behind Maverick Drills — gaming content, originals, and picks for gamers and casual audiences alike.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Brand story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">
            MAVERICK DRILLS.
          </h1>
          <p className="mt-8 font-body text-lg leading-relaxed text-foreground/80">
            When precision fuses with creativity, practice stops being
            repetition and becomes revelation. Gameplay is no longer just
            movement on a screen — it transforms into rhythm, tension, and
            controlled emotion unfolding frame by frame In the art of gaming,
            mastery isn’t defined solely by skill or victory, but by the power
            to capture a fleeting moment and elevate it into something
            unforgettable — something that resonates long after the game is over
          </p>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground/80">
            Every practice session refines instinct, every drill sharpens
            control, and every movement carries the potential to become
            something cinematic.
          </p>
        </div>
      </section>

      {/* What you'll find here */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-heading text-2xl md:text-3xl">
            WHAT YOU&apos;LL FIND HERE
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/originals"
              className="group rounded-xl border border-border p-6 transition-colors hover:border-red"
            >
              <h3 className="font-heading text-lg group-hover:text-red">
                Originals
              </h3>
              <p className="mt-2 font-body text-sm text-foreground/70">
                Every series and episode from the channel, organized and easy to
                catch up on.
              </p>
            </Link>
            <Link
              href="/gallery"
              className="group rounded-xl border border-border p-6 transition-colors hover:border-red"
            >
              <h3 className="font-heading text-lg group-hover:text-red">
                Gallery
              </h3>
              <p className="mt-2 font-body text-sm text-foreground/70">
                Exclusive screenshots you won&apos;t find anywhere else.
              </p>
            </Link>
            <Link
              href="/recommendations"
              className="group rounded-xl border border-border p-6 transition-colors hover:border-red"
            >
              <h3 className="font-heading text-lg group-hover:text-red">
                Monthly Picks
              </h3>
              <p className="mt-2 font-body text-sm text-foreground/70">
                Three games worth your time, picked fresh every month.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact — mailto only, no form since there's no backend yet */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="font-heading text-2xl md:text-3xl">
            YOUR THOUGHTS, QUESTIONS, OR FEEDBACK
          </h2>
          <p className="mt-4 font-body text-foreground/70">
            Send it my way — I read everything.
          </p>
          <a className="mt-6 inline-block rounded-full bg-red px-7 py-3 font-heading text-md text-white transition-colors hover:bg-red-deep">
            EMAIL ME @ dcgaming181@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
