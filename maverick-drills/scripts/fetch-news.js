import Parser from "rss-parser";

const FEEDS = {
  ign: "https://feeds.feedburner.com/ign/games-all",
  pcgamer: "https://www.pcgamer.com/rss/",
  eurogamer: "https://www.eurogamer.net/feed",
};

async function main() {
  const feedName = process.argv[2] || "ign";
  const feedUrl = FEEDS[feedName];
  if (!feedUrl) {
    console.log(
      `Unknown feed "${feedName}". Options: ${Object.keys(FEEDS).join(", ")}`,
    );
    return;
  }

  const parser = new Parser();
  const feed = await parser.parseURL(feedUrl);

  console.log(`\nLatest from ${feedName}:\n`);
  feed.items.slice(0, 8).forEach((item, index) => {
    console.log(`${index + 1}. ${item.title}`);
    console.log(`   ${item.link}\n`);
  });

  console.log(
    'Copy the headline + link you like into src/lib/data/spotlight.ts under the "trendy-news" slide.',
  );
}

main().catch((err) => {
  console.error("Failed to fetch news:", err.message);
});
