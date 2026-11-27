import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    qualities: [75],
  },
};

export default nextConfig;
