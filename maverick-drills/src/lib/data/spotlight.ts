export type SpotlightSlide = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

// TODO: swap every bracketed value below for real content.
// Drop a wide background image (1600x900 or similar) for each slide into
// public/images/spotlight/ using the exact filenames referenced here.
export const SPOTLIGHT_SLIDES: SpotlightSlide[] = [
  {
    id: "whats-hot",
    kicker: "WHAT'S HOT",
    title: "[Game or topic that's blowing up right now]",
    blurb:
      "[Why it's hot this week — a big patch, a viral clip, a tournament, whatever's driving it.]",
    image: "/images/spotlight/whats-hot.jpg",
    ctaLabel: "SEE WHY",
    ctaHref: "#",
  },
  {
    id: "trendy-news",
    kicker: "TRENDING NEWS",
    title: "[The gaming headline worth knowing about]",
    blurb: "[One or two sentences summarizing the story.]",
    image: "/images/spotlight/trendy-news.jpg",
    ctaLabel: "READ MORE",
    ctaHref: "#",
  },
  {
    id: "upcoming-game",
    kicker: "UPCOMING",
    title: "[Name of the big upcoming game]",
    blurb: "[Release window, and why it's worth the hype.]",
    image: "/images/spotlight/upcoming-game.jpg",
    ctaLabel: "LEARN MORE",
    ctaHref: "#",
  },
];
