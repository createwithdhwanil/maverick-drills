export type Screenshot = {
  src: string;
  caption?: string;
};

export type GameGallery = {
  slug: string;
  title: string;
  poster: string;
  screenshots: Screenshot[];
};

export const GAME_GALLERIES: GameGallery[] = [
  {
    slug: "spiderman-miles-morales",
    title: "Spiderman: Miles Morales",
    poster: "/images/games/spiderman-miles-morales.jpg",
    screenshots: [
      { src: "/images/gallery/spiderman-miles-morales/img1.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img2.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img3.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img4.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img5.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img6.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img7.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img8.jpg" },
      { src: "/images/gallery/spiderman-miles-morales/img9.jpg" },
    ],
  },
];

export function getGameBySlug(slug: string) {
  return GAME_GALLERIES.find((game) => game.slug === slug);
}
