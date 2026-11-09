import { ORIGINALS_VIDEOS } from "@/lib/data/originals";

const BRAND_ITEMS = [
  "MAVERICK DRILLS",
  "GALLERY",
  "ORIGINALS",
  "SUBSCRIBE ON YOUTUBE",
];

export default function Marquee() {
  const items = [
    ...BRAND_ITEMS,
    ...ORIGINALS_VIDEOS.slice(0, 4).map((video) => video.title.toUpperCase()),
  ];

  // Duplicate the content for seamless scrolling.
  const track = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y
             border-border bg-surface py-4"
    >
      {/* LEFT EDGE GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   inset-y-0 left-0 z-10
                   w-12 bg-gradient-to-r
                   from-surface to-transparent
                   sm:w-24"
      />

      {/* RIGHT EDGE GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
                   inset-y-0 right-0 z-10
                   w-12 bg-gradient-to-l
                   from-surface to-transparent
                   sm:w-24"
      />

      {/* SCROLLING CONTENT */}
      <div
        className="flex w-max animate-marquee
           items-center gap-10
           motion-reduce:animate-none
           hover:[animation-play-state:paused]"
      >
        {track.map((item, index) => (
          <div
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex shrink-0 items-center
                       gap-10 whitespace-nowrap"
          >
            <span
              className="font-heading text-xs
                         uppercase tracking-[0.12em]
                         text-foreground/70
                         transition-colors duration-300
                         hover:text-white
                         sm:text-sm"
            >
              {item}
            </span>

            {/* RED DIAMOND SEPARATOR */}
            <span
              aria-hidden="true"
              className="text-xs text-red
                         drop-shadow-[0_0_8px_rgba(229,9,36,0.35)]"
            >
              ◆
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
