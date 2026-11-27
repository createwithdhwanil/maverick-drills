import type { Metadata } from "next";

import { GAME_GALLERIES } from "@/lib/data/gallery";
import GalleryIndex from "../gallery/GalleryIndex";

export const metadata: Metadata = {
  title: "Gallery | Maverick Drills",
  description:
    "Explore cinematic gaming screenshots, stunning game worlds, and exclusive captures from Maverick Drills.",
};

export default function GalleryPage() {
  return <GalleryIndex games={GAME_GALLERIES} />;
}
