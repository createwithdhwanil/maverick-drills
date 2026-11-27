export const SITE_NAME = "Maverick Drills";

export const SITE_DESCRIPTION =
  "Discover cinematic gameplay, original gaming videos, exclusive screenshots, and curated game recommendations from Maverick Drills.";

export const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

export const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills/";

export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null);

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Set NEXT_PUBLIC_SITE_URL to your public website URL before deploying.",
      );
    }

    return "http://localhost:3000";
  }

  const url = new URL(configured);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Invalid NEXT_PUBLIC_SITE_URL protocol.");
  }

  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("Your production site URL must use HTTPS.");
  }

  return url.origin;
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
