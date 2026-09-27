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
  {
    slug: "horizon-forbidden-west",
    title: "Horizon: Forbidden West",
    poster: "/images/games/horizon-forbidden-west.jpg",
    screenshots: [
      { src: "/images/gallery/horizon-forbidden-west/img1.jpg" },
      { src: "/images/gallery/horizon-forbidden-west/img2.jpg" },
      { src: "/images/gallery/horizon-forbidden-west/img3.jpg" },
      { src: "/images/gallery/horizon-forbidden-west/img4.jpg" },
      { src: "/images/gallery/horizon-forbidden-west/img5.jpg" },
    ],
  },
  {
    slug: "marvels-avengers",
    title: "Marvel's Avengers",
    poster: "/images/games/marvels-avengers.png",
    screenshots: [
      { src: "/images/gallery/marvels-avengers/img1.jpg" },
      { src: "/images/gallery/marvels-avengers/img2.jpg" },
      { src: "/images/gallery/marvels-avengers/img3.jpg" },
      { src: "/images/gallery/marvels-avengers/img4.jpg" },
      { src: "/images/gallery/marvels-avengers/img5.jpg" },
      { src: "/images/gallery/marvels-avengers/img6.jpg" },
      { src: "/images/gallery/marvels-avengers/img7.jpg" },
      { src: "/images/gallery/marvels-avengers/img8.jpg" },
      { src: "/images/gallery/marvels-avengers/img9.jpg" },
    ],
  },
  {
    slug: "marvels-spider-man-2",
    title: "Marvel's Spider-Man 2",
    poster: "/images/games/marvels-spider-man-2.png",
    screenshots: [
      { src: "/images/gallery/marvels-spider-man-2/img1.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img2.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img3.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img4.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img5.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img6.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img7.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img8.jpg" },
      { src: "/images/gallery/marvels-spider-man-2/img9.jpg" },
    ],
  },
];

export function getGameBySlug(slug: string) {
  return GAME_GALLERIES.find((game) => game.slug === slug);
}
