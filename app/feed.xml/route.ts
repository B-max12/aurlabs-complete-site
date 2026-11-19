import { readContent } from "@/lib/server";
import { cleanDisplayText, defaultContent } from "@/lib/content";

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string));

export async function GET() {
  let content = defaultContent;
  try {
    content = await readContent();
  } catch {
    /* fall back to seed content if storage is temporarily unreachable */
  }
  const siteUrl = "https://aurlabs.online";
  const entries = [
    ...content.journal.map((a) => ({ ...a, section: "journal" })),
    ...content.research.map((a) => ({ ...a, section: "research" })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const items = entries
    .map((item) => {
      const link = `${siteUrl}/${item.section}/${item.slug}`;
      return `<item>
  <title>${esc(cleanDisplayText(item.title))}</title>
  <link>${esc(link)}</link>
  <guid isPermaLink="true">${esc(link)}</guid>
  <pubDate>${new Date(item.date + "T12:00:00Z").toUTCString()}</pubDate>
  <category>${esc(item.tag)}</category>
  <description>${esc(cleanDisplayText(item.summary))}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(content.settings.name)}</title>
  <link>${siteUrl}</link>
  <description>${esc(cleanDisplayText(content.settings.heroDescription))}</description>
  <language>en</language>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
