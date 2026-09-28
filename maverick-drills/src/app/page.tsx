import Hero from "@/components/home/Hero";
import Marquee from "@/components/ui/Marquee";
import LatestUploads from "@/components/home/LatestUploads";
import ExclusivesTeaser from "@/components/home/ExclusivesTeaser";
import ScreenshotsTeaser from "@/components/home/ScreenshotsTeaser";
import MonthlyPicksTeaser from "@/components/home/MonthlyPicksTeaser";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <LatestUploads />
      <SectionDivider />
      <ExclusivesTeaser />
      <SectionDivider />
      <ScreenshotsTeaser />
      <SectionDivider />
      <MonthlyPicksTeaser />
    </main>
  );
}
