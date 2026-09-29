import type { SpotlightSlide } from "@/lib/data/spotlight";

const RAWG_BASE = "https://api.rawg.io/api/games";

type RawgGame = {
  name: string;
  slug: string;
  background_image: string | null;
  released: string | null;
};

async function fetchRawg(params: Record<string, string>): Promise<RawgGame[]> {
  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) return [];

  const search = new URLSearchParams({
    key: apiKey,
    page_size: "5",
    ...params,
  });

  try {
    const res = await fetch(`${RAWG_BASE}?${search.toString()}`, {
      next: { revalidate: 21600 }, // 6 hours
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results ?? []) as RawgGame[];
  } catch {
    return [];
  }
}

function formatReleaseDate(dateStr: string | null): string {
  if (!dateStr) return "TBA";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export async function fetchUpcomingGameSlide(): Promise<SpotlightSlide | null> {
  const today = new Date();
  const future = new Date();
  future.setDate(future.getDate() + 180);
  const toISO = (d: Date) => d.toISOString().split("T")[0];

  const games = await fetchRawg({
    dates: `${toISO(today)},${toISO(future)}`,
    ordering: "-added",
    exclude_additions: "true",
  });

  const pick = games.find((g) => g.background_image);
  if (!pick) return null;

  return {
    id: "upcoming-game",
    kicker: "UPCOMING",
    title: pick.name.toUpperCase(),
    blurb: `Releasing ${formatReleaseDate(pick.released)} — one of the most anticipated games on the way.`,
    image: pick.background_image!,
    ctaLabel: "LEARN MORE",
    ctaHref: `https://rawg.io/games/${pick.slug}`,
  };
}

export async function fetchWhatsHotSlide(): Promise<SpotlightSlide | null> {
  const today = new Date();
  const past = new Date();
  past.setDate(past.getDate() - 60);
  const toISO = (d: Date) => d.toISOString().split("T")[0];

  const games = await fetchRawg({
    dates: `${toISO(past)},${toISO(today)}`,
    ordering: "-added",
  });

  const pick = games.find((g) => g.background_image);
  if (!pick) return null;

  return {
    id: "whats-hot",
    kicker: "WHAT'S HOT",
    title: pick.name.toUpperCase(),
    blurb:
      "Everyone's talking about it right now — currently one of the most-played games out there.",
    image: pick.background_image!,
    ctaLabel: "SEE WHY",
    ctaHref: `https://rawg.io/games/${pick.slug}`,
  };
}
