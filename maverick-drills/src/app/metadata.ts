import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/seo/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      images: [
        {
          url: image,
          alt: `${title} — ${SITE_NAME}`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
