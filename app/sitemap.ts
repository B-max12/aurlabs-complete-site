import type { MetadataRoute } from "next";
import { readContent } from "@/lib/server";
import { SITE } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/products", "/about", "/journal", "/research", "/join", "/support", "/contact", "/privacy", "/terms"];
  const items: MetadataRoute.Sitemap = pages.map((p) => ({ url: SITE + p, changeFrequency: "weekly", priority: p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.7 }));
  try {
    const d = await readContent();
    for (const p of d.products) items.push({ url: `${SITE}/products/${p.slug}`, changeFrequency: "weekly", priority: 0.9 });
    for (const a of d.journal) items.push({ url: `${SITE}/journal/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly", priority: 0.6 });
    for (const a of d.research) items.push({ url: `${SITE}/research/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly", priority: 0.6 });
  } catch { /* the fixed pages above are still listed */ }
  return items;
}

