import { ORIGINALS_VIDEOS } from "@/lib/data/originals";

const BRAND_ITEMS = [
  "MAVERICK DRILLS",
  "GAMER. CREATOR.",
  "NEW UPLOADS WEEKLY",
  "SUBSCRIBE ON YOUTUBE",
];

export default function Marquee() {
  const items = [
    ...BRAND_ITEMS,
    ...ORIGINALS_VIDEOS.slice(0, 4).map((video) => video.title.toUpperCase()),
  ];
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-3">
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 whitespace-nowrap font-heading text-sm text-background"
          >
            {item}
            <span className="text-red">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
