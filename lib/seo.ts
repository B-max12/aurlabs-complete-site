import type { Product, Article } from "./content";

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
  const url = `${SITE}/${p.slug}`;
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
    { "@type": "Organization", "@id": SITE + "/#org", name: "Aur Labs", url: SITE, logo: SITE + "/favicon.svg", description: "An independent, non-profit software lab building useful free tools for people everywhere.", email: "aur@aurlabs.online", contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "aur@aurlabs.online", availableLanguage: "English" } },
    { "@type": "WebSite", "@id": SITE + "/#site", name: "Aur Labs", url: SITE, publisher: { "@id": SITE + "/#org" } },
  ],
});

export const jsonLdScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

export function generateProductJsonLd(product: Product) {
  const baseUrl = SITE;
  const release = latestRelease(product);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    alternateName: product.tagline,
    description: productDescription(product),
    url: `${baseUrl}/products/${product.slug}`,
    applicationCategory:
      product.category === "app"
        ? "MobileApplication"
        : product.category === "cli"
          ? "DeveloperApplication"
          : "DesktopApplication",
    operatingSystem: product.platforms.join(", "),
    ...(product.status === "released"
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: "Free software",
          },
          isAccessibleForFree: true,
        }
      : {}),
    author: {
      "@type": "Organization",
      name: "Aur Labs",
      url: baseUrl,
      logo: `${baseUrl}/assets/aur-sculpture.png`,
    },
    ...(product.license ? { license: product.license } : {}),
    ...(product.screenshots.length > 0
      ? { screenshot: product.screenshots.map((s) => (s.startsWith("http") ? s : `${baseUrl}${s}`)) }
      : {}),
    ...(release
      ? {
          softwareVersion: release.version,
          datePublished: release.date,
          downloadUrl: release.url,
        }
      : {}),
    ...(product.repository ? { codeRepository: product.repository } : {}),
    featureList: product.features.join(", "),
    keywords: product.keyword || product.name,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Aur Labs",
      url: baseUrl,
    },
  };
}

export function generateFaqJsonLd(product: Product) {
  const faqs = parseFaq(product.faq);
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE}/products/${product.slug}`,
      },
    ],
  };
}

export function generateHowToJsonLd(product: Product) {
  const steps = (product.howToSteps || []).map((s) => s.trim()).filter(Boolean);
  if (steps.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${product.name}`,
    description: productDescription(product),
    step: steps.map((text, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text,
    })),
  };
}

export function generateArticleJsonLd(article: Article, section: "journal" | "research") {
  const url = `${SITE}/${section}/${article.slug}`;
  const sectionName = section === "research" ? "Research" : "Journal";
  const image = article.cover
    ? article.cover.startsWith("/")
      ? SITE + article.cover
      : article.cover
    : `${SITE}/assets/aur-sculpture.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: clip(article.summary, 155),
        datePublished: article.date,
        author: { "@type": "Person", name: article.author || "Aur Labs" },
        publisher: {
          "@type": "Organization",
          name: "Aur Labs",
          url: SITE,
          logo: `${SITE}/assets/aur-sculpture.png`,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: sectionName, item: `${SITE}/${section}` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export function generateCollectionJsonLd(
  title: string,
  path: string,
  items: { name: string; url: string; description?: string }[]
) {
  const pageUrl = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: title,
        url: pageUrl,
        isPartOf: { "@type": "WebSite", name: "Aur Labs", url: SITE },
      },
      {
        "@type": "ItemList",
        itemListElement: items.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          url: item.url,
          ...(item.description ? { description: item.description } : {}),
        })),
      },
    ],
  };
}
