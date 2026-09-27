export type PricingOption = {
  platform: string;
  price: string;
};

export type MonthlyPick = {
  rank: number;
  slug: string;
  game: string;
  genre: string;
  platforms: string;
  poster: string;
  blurb: string;
  summary: string;
  otherInfo1?: string;
  otherInfo2?: string;
  trailerId: string;
  pricing: PricingOption[];
};

// TODO: update every month — swap these for the real picks
export const MONTH_LABEL = "September 2026";

export const MONTHLY_PICKS: MonthlyPick[] = [
  {
    rank: 1,
    slug: "onimusha-way-of-the-sword",
    game: "Onimusha: Way of the Sword",
    genre: "Action-Adventure / Single Player / Sword / Gore",
    platforms: "PC, PS5, Xbox Series X|S",
    poster: "/images/games/onimusha-way-of-the-sword.png",
    blurb:
      "Onimusha: Way of the Sword is a 2026 dark fantasy action-adventure game developed by Capcom where a resurrected Miyamoto Musashi fights demonic invaders in Edo-period Kyoto.",
    summary:
      "Onimusha: Way of the Sword is a 2026 action-adventure game by Capcom that follows a resurrected Miyamoto Musashi fighting demons in Edo-era Kyoto",
    otherInfo1:
      "Story and Setting takes place in Edo-era Kyoto, where dark energy has summoned demonic creatures known as Genma. The story follows the legendary swordsman Miyamoto Musashi, whose rival duel with Sasaki Ganryu is cut short when Genma ambush and kill him. Resurrected by a mysterious white-haired man, Musashi is fitted with a magical Oni Gauntlet that keeps his fatal wounds from killing him. Despite despising the gauntlet's magic because he believes true power lies in human skill, Musashi must wield its power and team up with a spirit named Shizuka to fight the Genma hordes and seal the rifts threatening Japan.",
    otherInfo2:
      "Combat and Gameplay features intense, precise sword combat centered on tactical variety and split-second timing. Players shift between fast, agile one-handed strikes and slow, heavy two-handed slashes while managing stamina through well-timed blocks and parries. The franchise's signature Issen mechanic rewards players with massive damage or instant kills for countering right before an enemy strikes. Defeating demonic Genma allows Musashi to absorb their souls, which are spent to restore health or upgrade elemental weapons, blending gritty, realistic swordsmanship with supernatural powers.",
    trailerId: "pfMJY5qOVPg",
    pricing: [
      { platform: "PC", price: "[₹4,399]" },
      { platform: "PS5", price: "[₹4,399]" },
      { platform: "Xbox Series X|S", price: "[₹4,399]" },
    ],
  },
  {
    rank: 2,
    slug: "control-resonant",
    game: "Control Resonant",
    genre: "Hack and Slash / Action RPG / Story Rich / Lore-Rich / Sci-Fi",
    platforms: "PC, PS5, Xbox Series X|S",
    poster: "/images/games/control-resonant.png",
    blurb:
      "Control Resonant follows Dylan Faden as he awakens from a seven-year coma to fight a reality-warping Hiss invasion across a fractured Manhattan while searching for his missing sister, Jesse Faden.",
    summary:
      "[Write your full write-up here — your actual impressions after playing.]",
    trailerId: "PASTE_OFFICIAL_TRAILER_VIDEO_ID_HERE",
    pricing: [
      { platform: "PC (Steam)", price: "[$XX.XX]" },
      { platform: "PS5", price: "[$XX.XX]" },
      { platform: "Xbox Series X|S", price: "[$XX.XX]" },
    ],
  },
  {
    rank: 3,
    slug: "marvels-wolverine",
    game: "Marvel's Wolverine",
    genre: "Action-Adventure / Single Player / Superhero",
    platforms: "PlayStation 5 Exclusive",
    poster: "/images/games/marvels-wolverine.png",
    blurb:
      "Marvel's Wolverine is a 2026 action-adventure game developed by Insomniac Games where players control the iconic Marvel character in a story-driven campaign.",
    summary:
      "[Write your full write-up here — your actual impressions after playing.]",
    trailerId: "PASTE_OFFICIAL_TRAILER_VIDEO_ID_HERE",
    pricing: [{ platform: "PS5", price: "[$XX.XX]" }],
  },
];

export function getPickBySlug(slug: string) {
  return MONTHLY_PICKS.find((pick) => pick.slug === slug);
}
