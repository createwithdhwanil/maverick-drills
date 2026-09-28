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
      { platform: "PC", price: "₹4,399" },
      { platform: "PS5", price: "₹4,399" },
      { platform: "Xbox Series X|S", price: "₹4,399" },
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
      "Control Resonant follows Dylan Faden as he awakens from a seven-year coma to fight a reality-warping Hiss invasion across a fractured Manhattan while searching for his missing sister, Jesse Faden",
    otherInfo1:
      "The Setup and Awakening: Seven years after the events of the original game, the Oldest House's lockdown fails, allowing the reality-warping Hiss invasion to spill directly into the fractured streets of Manhattan. With Director Jesse Faden mysteriously missing, the Federal Bureau of Control (FBC) faces total collapse and resorts to a desperate measure. They release her brother, Dylan Faden, from his long confinement to fight back against the cosmic chaos, setting him on a dangerous path to reclaim his humanity and find his sister.",
    otherInfo2:
      "Dylan's Journey and Gameplay Context: Stepping out from the Oldest House into a fractured New York City, Dylan's journey reverses the perspective of the first game as he navigates an open, reality-warping Manhattan. Armed with a shape-shifting melee weapon called the Aberrant and his own formidable parautilitarian abilities, he fights to contain cosmic threats while resisting the lingering influence of the Hiss. Driven by a deep desire for redemption following his years of captivity, his primary motivation remains a desperate search to uncover the fate of his missing sister, Jesse.",
    trailerId: "SqvAvOAd1VA",
    pricing: [
      { platform: "PC (Steam)", price: "₹3,499" },
      { platform: "PS5", price: "₹3,599" },
      { platform: "Xbox Series X|S", price: "₹3,599" },
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
      "Marvel's Wolverine is a 2026 action-adventure video game developed by Insomniac Games that delivers a dark, standalone story about the iconic mutant hero.",
    otherInfo1:
      "Game Story and Setting: Marvel's Wolverine is set within Earth-1048, sharing a universe with Insomniac's Spider-Man games where mutants live hidden from society. The plot follows Logan three years after leaving Team X, as he reluctantly reunites with his former unit—including Sabretooth—to stop the industrialist Bolivar Trask and his Reavers militia from kidnapping and eradicating displaced mutants. Logan's global journey to stop this threat and rescue Nathaniel Essex takes him from Canada and Japan to the lawless island of Madripoor.",
    otherInfo2:
      "Combat and Gameplay features: Marvel's Wolverine features brutal, M-rated combat built around fast-paced, high-momentum gameplay that heavily utilizes Logan's iconic adamantium claws. Players can execute responsive dodges, parries, and devastating combos, all supported by a lore-accurate healing factor that dynamically repairs injuries and replaces traditional health packs. Additionally, recent updates from Insomniac Games allow players to customize or entirely toggle off navigational features like scent trails for a more tailored gameplay experience.",
    trailerId: "G62QQ42Ewwg",
    pricing: [{ platform: "PS5", price: "₹4,999" }],
  },
];

export function getPickBySlug(slug: string) {
  return MONTHLY_PICKS.find((pick) => pick.slug === slug);
}
