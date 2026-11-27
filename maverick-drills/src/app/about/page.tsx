import type { Metadata } from "next";

import AboutExperience from "./AboutExperience";

import { GAME_GALLERIES } from "@/lib/data/gallery";

import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

export const metadata: Metadata = {
  title: "About Maverick Drills",
  description:
    "Discover Maverick Drills, a gaming brand built around creativity, cinematic gameplay, original videos, and unforgettable gaming moments.",
};

export default function AboutPage() {
  const images = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.map((shot) => shot.src),
  ).slice(0, 3);

  const video = ORIGINALS_VIDEOS[0];

  return (
    <AboutExperience
      images={images}
      video={
        video
          ? {
              title: video.title,
              url: `https://www.youtube.com/watch?v=${video.id}`,
              thumbnail: getYouTubeThumbnail(video.id),
            }
          : null
      }
    />
  );
}
