import type { Product } from "./content";

export const SITE = "https://aurlabs.online";

/** Turns the FAQ box text into question and answer pairs. Pairs are separated by a blank line; the first line is the question. */
export function parseFaq(raw?: string): { q: string; a: string }[] {
  if (!raw) return [];
  return raw
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.trim().split("\n");
      const q = (lines[0] || "").replace(/^q\s*[:.)-]\s*/i, "").trim();
      const a = lines.slice(1).join(" ").replace(/^a\s*[:.)-]\s*/i, "").replace(/\s+/g, " ").trim();
      return { q, a };
    })
    .filter((x) => x.q && x.a)
    .slice(0, 8);
}

export function clip(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 25)).replace(/[,;:.\-–—\s]+$/, "") + "…";
}

export const productTitle = (p: Product) => p.seoTitle?.trim() || `${p.name} — ${p.tagline} | Aur Labs`;
export const productDescription = (p: Product) => p.seoDescription?.trim() || clip(p.description.split("\n\n")[0] || p.description, 155);

const latestRelease = (p: Product) => [...p.releases].sort((a, b) => b.date.localeCompare(a.date))[0];

export function productJsonLd(p: Product) {
  const url = `${SITE}/products/${p.slug}`;
  const release = latestRelease(p);
  const image = p.screenshots[0] ? (p.screenshots[0].startsWith("/") ? SITE + p.screenshots[0] : p.screenshots[0]) : undefined;
  const faq = parseFaq(p.faq);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      "@id": url + "#software",
      name: p.name,
      description: productDescription(p),
      url,
      applicationCategory: p.category === "cli" ? "DeveloperApplication" : "UtilitiesApplication",
      operatingSystem: p.platforms.join(", "),
      ...(image ? { image } : {}),
      ...(p.license ? { license: p.license } : {}),
      ...(p.status === "released" ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
      ...(release ? { softwareVersion: release.version, downloadUrl: release.url } : {}),
      ...(p.repository ? { codeRepository: p.repository } : {}),
      publisher: { "@type": "Organization", name: "Aur Labs", url: SITE },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Aur Labs", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Products", item: SITE + "/products" },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];
  if (faq.length) graph.push({ "@type": "FAQPage", mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) });
  return { "@context": "https://schema.org", "@graph": graph };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": SITE + "/#org", name: "Aur Labs", url: SITE, logo: SITE + "/favicon.svg", description: "An independent, non-profit software lab building useful free tools for people everywhere." },
    { "@type": "WebSite", "@id": SITE + "/#site", name: "Aur Labs", url: SITE, publisher: { "@id": SITE + "/#org" } },
  ],
});

export const jsonLdScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
