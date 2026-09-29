import Hero from "@/components/home/Hero";
import Marquee from "@/components/ui/Marquee";
import LatestUploads from "@/components/home/LatestUploads";
import ExclusivesTeaser from "@/components/home/ExclusivesTeaser";
import ScreenshotsTeaser from "@/components/home/ScreenshotsTeaser";
import MonthlyPicksTeaser from "@/components/home/MonthlyPicksTeaser";
import SectionDivider from "@/components/ui/SectionDivider";
import { SPOTLIGHT_SLIDES, type SpotlightSlide } from "@/lib/data/spotlight";
import { fetchUpcomingGameSlide, fetchWhatsHotSlide } from "@/lib/live/rawg";

export const revalidate = 21600; // refresh live Hero data every 6 hours

export default async function Home() {
  const staticWhatsHot = SPOTLIGHT_SLIDES.find((s) => s.id === "whats-hot")!;
  const staticUpcoming = SPOTLIGHT_SLIDES.find(
    (s) => s.id === "upcoming-game",
  )!;

  const [liveWhatsHot, liveUpcoming] = await Promise.all([
    fetchWhatsHotSlide(),
    fetchUpcomingGameSlide(),
  ]);

  const spotlightSlides: SpotlightSlide[] = [
    liveWhatsHot ?? staticWhatsHot,
    liveUpcoming ?? staticUpcoming,
  ];

  return (
    <main>
      <Hero spotlightSlides={spotlightSlides} />
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
