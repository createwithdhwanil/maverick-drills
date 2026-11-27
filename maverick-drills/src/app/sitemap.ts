import type { MetadataRoute } from "next";

import { GAME_GALLERIES } from "@/lib/data/gallery";
import { MONTHLY_PICKS } from "@/lib/data/recommendations";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/originals"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/gallery"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/recommendations"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const galleryPages: MetadataRoute.Sitemap = GAME_GALLERIES.map((game) => ({
    url: absoluteUrl(`/gallery/${game.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const recommendationPages: MetadataRoute.Sitemap = MONTHLY_PICKS.map(
    (pick) => ({
      url: absoluteUrl(`/recommendations/${pick.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...galleryPages, ...recommendationPages];
}
