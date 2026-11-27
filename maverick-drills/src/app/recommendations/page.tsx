import { MONTH_LABEL, MONTHLY_PICKS } from "@/lib/data/recommendations";

import MonthlyPicksExperience from "./MonthlyPicksExperience";

import { createPageMetadata } from "../metadata";

import { BreadcrumbStructuredData } from "../StructuredData";

export const metadata = createPageMetadata({
  title: "Monthly Gaming Picks",
  description:
    "Discover Maverick Drills' curated monthly game rankings, gameplay recommendations, trailers and featured game selections.",
  path: "/recommendations",
});

export default function RecommendationsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          {
            name: "Monthly Picks",
            path: "/recommendations",
          },
        ]}
      />

      <MonthlyPicksExperience month={MONTH_LABEL} picks={MONTHLY_PICKS} />
    </>
  );
}
