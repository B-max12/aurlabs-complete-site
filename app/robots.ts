import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/api/media/"], disallow: ["/admin", "/api/", "/*/privacy", "/*/terms", "/*/support"] }],
    sitemap: SITE + "/sitemap.xml",
    host: SITE,
  };
}
