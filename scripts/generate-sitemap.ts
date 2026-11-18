import { writeFileSync } from "fs";
import { defaultContent } from "../lib/content.ts";

const BASE_URL = "https://aurlabs.online";

function generateSitemap(): string {
  const entries: { url: string; lastmod: string; changefreq: string; priority: number }[] = [];

  // Static pages
  entries.push(
    { url: "/", lastmod: new Date().toISOString(), changefreq: "daily", priority: 1.0 },
    { url: "/products", lastmod: new Date().toISOString(), changefreq: "daily", priority: 0.9 },
    { url: "/about", lastmod: new Date().toISOString(), changefreq: "monthly", priority: 0.7 },
    { url: "/journal", lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.7 },
    { url: "/research", lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.7 },
    { url: "/join", lastmod: new Date().toISOString(), changefreq: "monthly", priority: 0.6 },
    { url: "/support", lastmod: new Date().toISOString(), changefreq: "monthly", priority: 0.6 },
    { url: "/contact", lastmod: new Date().toISOString(), changefreq: "monthly", priority: 0.6 },
    { url: "/privacy", lastmod: new Date().toISOString(), changefreq: "yearly", priority: 0.3 },
    { url: "/terms", lastmod: new Date().toISOString(), changefreq: "yearly", priority: 0.3 }
  );

  // Product pages (root level - SEO optimized)
  defaultContent.products
    .filter((p) => p.published)
    .forEach((product) => {
      entries.push({
        url: `/${product.slug}`,
        lastmod: product.releases[0]?.date || new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.9,
      });
    });

  // Journal articles
  defaultContent.journal
    .filter((a) => a.published)
    .forEach((article) => {
      entries.push({
        url: `/journal/${article.slug}`,
        lastmod: article.date,
        changefreq: "monthly",
        priority: 0.6,
      });
    });

  // Research articles
  defaultContent.research
    .filter((a) => a.published)
    .forEach((article) => {
      entries.push({
        url: `/research/${article.slug}`,
        lastmod: article.date,
        changefreq: "monthly",
        priority: 0.6,
      });
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

const sitemap = generateSitemap();
writeFileSync("public/sitemap.xml", sitemap);
console.log("Sitemap generated:", sitemap.match(/<url>/g)?.length, "URLs");

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml
`;
writeFileSync("public/robots.txt", robots);
console.log("robots.txt generated");
