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

// TODO: replace with your real games/screenshots — add files under
// public/images/games/ (poster) and public/images/gallery/<slug>/ (shots)
export const GAME_GALLERIES: GameGallery[] = [
  {
    slug: "Spiderman: Miles Morales",
    title: "Spiderman: Miles Morales",
    poster: "/public/images/games/spiderman-miles-morales.jpg",
    screenshots: [
      {
        src: "/public/images/gallery/spiderman-miles-morales/img1.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img2.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img3.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img4.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img5.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img6.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img7.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img8.jpg",
      },
      {
        src: "/public/images/gallery/spiderman-miles-morales/img9.jpg",
      },
    ],
  },
];

export function getGameBySlug(slug: string) {
  return GAME_GALLERIES.find((game) => game.slug === slug);
}
