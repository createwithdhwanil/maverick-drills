import type { Metadata } from "next";

import AboutExperience from "./AboutExperience";
import { GAME_GALLERIES } from "@/lib/data/gallery";
import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

export const metadata: Metadata = {
  title: "About Maverick Drills",
  description:
    "Discover Maverick Drills — a gaming brand where creativity, precision, and cinematic gameplay come together.",
};

export default function AboutPage() {
  const featuredImages = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.map((shot) => shot.src),
  ).slice(0, 3);

  const featuredVideo = ORIGINALS_VIDEOS[0];

  return (
    <AboutExperience
      images={featuredImages}
      video={
        featuredVideo
          ? {
              title: featuredVideo.title,
              url: `https://www.youtube.com/watch?v=${featuredVideo.id}`,
              thumbnail: getYouTubeThumbnail(featuredVideo.id),
            }
          : null
      }
    />
  );
}
