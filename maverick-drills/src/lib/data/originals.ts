export type OriginalVideo = {
  id: string;
  title: string;
};

// TODO: keep your most recent upload FIRST — Home's hero and "Latest
// Uploads" both treat the first entry as "the latest video."
export const ORIGINALS_VIDEOS: OriginalVideo[] = [
  {
    id: "UmRTKd_E1IU",
    title: "Batman Arkham Knight X In The End | Maverick Drills",
  },
  {
    id: "AMgimFwv2iA",
    title: "MARVEL'S SPIDERMAN REMASTERED X ENEMY | Maverick Drills",
  },
  {
    id: "_mi1IdfujTI",
    title: "NUKETOWN'84 Stunning gameplay(literally) | Maverick Drills",
  },
  {
    id: "ppw462LgdyA",
    title: "Batman vs Deathstroke | Batman arkham origins | Maverick Drills",
  },
];

export type ExclusiveClip = {
  src: string;
  title: string;
};

export const WEBSITE_EXCLUSIVES: ExclusiveClip[] = [
  { src: "/videos/exclusives/Video1.mp4", title: "Spiderman: Miles Morales" },
  { src: "/videos/exclusives/Video2.mp4", title: "Forza Horizon 4" },
];

export function getYouTubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
