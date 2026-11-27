import { ORIGINALS_VIDEOS, WEBSITE_EXCLUSIVES } from "@/lib/data/originals";

import { LoadableIframe, LoadableVideo } from "@/components/ui/LoadableMedia";

import { createPageMetadata } from "../metadata";

import { BreadcrumbStructuredData } from "../StructuredData";

export const metadata = createPageMetadata({
  title: "Gaming Originals",
  description:
    "Watch Maverick Drills gaming originals, cinematic gameplay videos, YouTube uploads and exclusive website clips.",
  path: "/originals",
});

export default function OriginalsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Originals", path: "/originals" },
        ]}
      />

      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
            <p className="font-heading text-sm text-red">
              FROM MAVERICK DRILLS
            </p>

            <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">
              ORIGINALS.
            </h1>

            <p className="mt-6 font-body text-lg text-foreground/70">
              Handpicked videos, straight from the channel and Website
              Exclusives — watch right here.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="pl-2 font-display text-4xl leading-[1.1]">
              From the Maverick Drills YouTube Channel
            </h2>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {ORIGINALS_VIDEOS.map((video, index) => (
                <div key={`${video.id}-${index}`}>
                  <LoadableIframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    wrapperClassName="aspect-video rounded-xl bg-surface"
                  />

                  <h3 className="mt-3 font-heading text-base">{video.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="pl-2 font-display text-4xl leading-[1.1]">
              Maverick Drills Website Exclusives
            </h2>

            <p className="mt-4 pl-2 font-body text-foreground/70">
              Clips you won&apos;t find anywhere else — uploaded straight to the
              site.
            </p>

            <div
              className="
                mt-8 grid grid-cols-1
                items-start gap-8
                sm:grid-cols-2 md:grid-cols-3
              "
            >
              {WEBSITE_EXCLUSIVES.map((clip, index) => (
                <div key={`${clip.src}-${index}`}>
                  <LoadableVideo
                    src={clip.src}
                    controls
                    playsInline
                    preload="metadata"
                    wrapperClassName="rounded-xl bg-surface"
                  />

                  <h3 className="mt-3 font-heading text-sm">{clip.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
