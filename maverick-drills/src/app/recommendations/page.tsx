import type { Metadata } from "next";

import { MONTH_LABEL, MONTHLY_PICKS } from "@/lib/data/recommendations";

import MonthlyPicksExperience from "./MonthlyPicksExperience";

export const metadata: Metadata = {
  title: "Monthly Picks — Maverick Drills",
  description:
    "Discover the curated Maverick Drills monthly gaming rankings, exclusive recommendations, trailers, and game features.",
};

export default function RecommendationsPage() {
  return <MonthlyPicksExperience month={MONTH_LABEL} picks={MONTHLY_PICKS} />;
}
