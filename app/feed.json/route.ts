import { readContent } from "@/lib/server";
import { cleanDisplayText, defaultContent } from "@/lib/content";

export const revalidate = 3600;

export async function GET() {
  let content = defaultContent;
  try {
    content = await readContent();
  } catch {
    /* fall back to seed content if storage is temporarily unreachable */
  }
  const siteUrl = "https://aurlabs.online";
  const articleItems = [
    ...content.journal.map((a) => ({ ...a, section: "journal" })),
    ...content.research.map((a) => ({ ...a, section: "research" })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => ({
      id: `${siteUrl}/${item.section}/${item.slug}`,
      url: `${siteUrl}/${item.section}/${item.slug}`,
      title: cleanDisplayText(item.title),
      summary: cleanDisplayText(item.summary),
      content_text: cleanDisplayText(item.body),
      date_published: new Date(item.date + "T12:00:00Z").toISOString(),
      tags: [item.tag],
      authors: [{ name: item.author }],
    }));

  const productItems = content.products
    .filter((p) => p.status === "released")
    .map((p) => ({
      id: `${siteUrl}/${p.slug}`,
      url: `${siteUrl}/${p.slug}`,
      title: `${p.name} (${p.platforms.join(", ")})`,
      summary: cleanDisplayText(p.tagline),
      content_text: cleanDisplayText(p.description),
      tags: [p.category, ...p.platforms],
    }));

  const payload = {
    version: "https://jsonfeed.org/version/1.1",
    title: content.settings.name,
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: cleanDisplayText(content.settings.heroDescription),
    language: "en",
    items: [...articleItems, ...productItems],
  };

  return Response.json(payload, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
