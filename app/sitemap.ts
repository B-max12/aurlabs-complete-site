import type { MetadataRoute } from "next";
import { defaultContent } from "@/lib/content";
import { readContent } from "@/lib/server";
import { SITE } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/products", "/about", "/journal", "/research", "/join", "/support", "/contact", "/privacy", "/terms"];
  const items: MetadataRoute.Sitemap = pages.map((p) => ({ url: SITE + p, changeFrequency: "weekly", priority: p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.7 }));
  let d = defaultContent;
  try {
    d = await readContent();
  } catch { /* fallback to defaultContent when storage is unavailable */ }
  for (const p of d.products.filter((item) => item.published)) {
    items.push({ url: `${SITE}/${p.slug}`, changeFrequency: "weekly", priority: 0.9 });
  }
  for (const a of d.journal.filter((item) => item.published)) {
    items.push({ url: `${SITE}/journal/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly", priority: 0.6 });
  }
  for (const a of d.research.filter((item) => item.published)) {
    items.push({ url: `${SITE}/research/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly", priority: 0.6 });
  }
  return items;
}
