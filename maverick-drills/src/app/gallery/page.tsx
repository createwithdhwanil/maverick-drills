import { GAME_GALLERIES } from "@/lib/data/gallery";

import GalleryIndex from "./GalleryIndex";

import { createPageMetadata } from "../metadata";

import { BreadcrumbStructuredData } from "../StructuredData";

export const metadata = createPageMetadata({
  title: "Gaming Gallery",
  description:
    "Explore cinematic gaming screenshots, stunning game worlds and exclusive captures from the Maverick Drills visual archive.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <GalleryIndex games={GAME_GALLERIES} />
    </>
  );
}
