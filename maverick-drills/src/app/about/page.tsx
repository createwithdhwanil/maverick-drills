import AboutExperience from "./AboutExperience";

import { GAME_GALLERIES } from "@/lib/data/gallery";

import { ORIGINALS_VIDEOS, getYouTubeThumbnail } from "@/lib/data/originals";

import { createPageMetadata } from "../metadata";

import { BreadcrumbStructuredData } from "../StructuredData";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Discover Maverick Drills, a gaming brand built around creativity, precision, cinematic gameplay and unforgettable gaming moments.",
  path: "/about",
});

export default function AboutPage() {
  const images = GAME_GALLERIES.flatMap((game) =>
    game.screenshots.map((shot) => shot.src),
  ).slice(0, 3);

  const video = ORIGINALS_VIDEOS[0];

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

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
    </>
  );
}
