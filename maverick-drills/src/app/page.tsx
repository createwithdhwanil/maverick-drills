import Hero from "../components/home/Hero";
import LatestUploads from "../components/home/LatestUploads";
import ScreenshotsTeaser from "../components/home/ScreenshotsTeaser";
import MonthlyPicksTeaser from "../components/home/MonthlyPicksTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestUploads />
      <ScreenshotsTeaser />
      <MonthlyPicksTeaser />
    </main>
  );
}
