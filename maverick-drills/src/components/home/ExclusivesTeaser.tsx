import Link from "next/link";
import { WEBSITE_EXCLUSIVES } from "@/lib/data/originals";

export default function ExclusivesTeaser() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">
            WEBSITE EXCLUSIVES
          </h2>
          <Link
            href="/originals"
            className="font-body text-sm text-foreground/60 hover:text-red"
          >
            Watch more →
          </Link>
        </div>
        <p className="mt-2 font-body text-sm text-foreground/60">
          Clips you won&apos;t find anywhere else.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:max-w-2xl">
          {WEBSITE_EXCLUSIVES.map((clip, index) => (
            <div key={`${clip.src}-${index}`}>
              <video
                src={clip.src}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-xl bg-surface"
              />
              <h3 className="mt-3 font-heading text-sm">{clip.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
