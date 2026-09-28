import { WEBSITE_EXCLUSIVES } from "@/lib/data/originals";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { LoadableVideo } from "@/components/ui/LoadableMedia";

export default function ExclusivesTeaser() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          index="02"
          title="WEBSITE EXCLUSIVES"
          href="/originals"
          linkLabel="Watch more"
        />
        <p className="mt-2 font-body text-sm text-foreground/60">
          Clips you won&apos;t find anywhere else.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:max-w-2xl">
          {WEBSITE_EXCLUSIVES.map((clip, index) => (
            <Reveal key={`${clip.src}-${index}`} delay={index * 100}>
              <LoadableVideo
                src={clip.src}
                controls
                playsInline
                preload="metadata"
                wrapperClassName="clip-corner bg-surface"
              />
              <h3 className="mt-3 font-heading text-sm">{clip.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
