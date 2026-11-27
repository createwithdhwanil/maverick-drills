import {
  absoluteUrl,
  getSiteUrl,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  YOUTUBE_URL,
} from "@/lib/seo/site";

type JsonLd = Record<string, unknown>;

type Breadcrumb = {
  name: string;
  path: string;
};

function JsonLdScript({ data }: { data: JsonLd }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function WebsiteStructuredData() {
  const organizationId = `${getSiteUrl()}/#organization`;
  const websiteId = `${getSiteUrl()}/#website`;

  const data: JsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: getSiteUrl(),
        description: SITE_DESCRIPTION,
        sameAs: [YOUTUBE_URL, INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: getSiteUrl(),
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };

  return <JsonLdScript data={data} />;
}

export function BreadcrumbStructuredData({ items }: { items: Breadcrumb[] }) {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <JsonLdScript data={data} />;
}
