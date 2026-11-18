import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { readContent } from "@/lib/server";
import { defaultContent } from "@/lib/content";
import {
  SITE,
  clip,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateCollectionJsonLd,
  generateFaqJsonLd,
  generateProductJsonLd,
  jsonLdScript,
  organizationJsonLd,
} from "@/lib/seo";
import { ProductTemplate } from "@/app/product-templates";
import Site from "../site";

export const revalidate = 60;

type Props = { params: Promise<{ slug?: string[] }> };

const sectionTitles: Record<string, string> = {
  products: "The collection",
  about: "Our story",
  journal: "Inside the lab",
  research: "Research & explorations",
  join: "Build with us",
  support: "Support the mission",
  contact: "Start a conversation",
  privacy: "Privacy notice",
  terms: "Terms of use",
  admin: "Admin studio",
};

const sectionDescriptions: Record<string, string> = {
  products:
    "Free software, apps and command-line tools from Aur Labs, an independent non-profit lab. Browse what we are building and download released tools.",
  about:
    "Aur Labs is a small independent, non-profit team building useful free software. Read our story, values and how we work.",
  journal:
    "Notes from the lab: how Aur Labs designs and builds free software, and what we are learning along the way.",
  research:
    "Questions and explorations behind Aur Labs tools: the research directions that shape what we build next.",
  join:
    "Join Aur Labs as a volunteer. Bring your craft, curiosity or a problem worth solving to an independent non-profit software lab.",
  support:
    "Support Aur Labs and help keep useful software free. Learn how donations keep the lab moving forward.",
  contact:
    "Contact Aur Labs. Share a problem, a bug, a partnership idea or a question with our small team.",
  privacy: "How Aur Labs handles your information, in plain language.",
  terms: "The terms for using the Aur Labs website and software.",
  admin: "Admin studio",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const segments = slug || [];

  let content = defaultContent;
  try {
    content = await readContent();
  } catch {
    // Fallback to defaultContent when storage is unavailable
  }

  if (segments.length === 1) {
    const product = content.products.find((p) => p.slug === segments[0] && p.published);
    if (product) {
      const title = product.seoTitle || `${product.name} — ${product.tagline} | Aur Labs`;
      const description = product.seoDescription || product.description.split("\n\n")[0];
      const images =
        product.screenshots.length > 0
          ? product.screenshots.map((s) => ({ url: s.startsWith("/") ? SITE + s : s }))
          : [{ url: `${SITE}/assets/aur-sculpture.png` }];
      return {
        title,
        description,
        keywords: product.keyword || product.name,
        openGraph: {
          title: product.name,
          description: product.tagline,
          url: `${SITE}/${product.slug}`,
          siteName: "Aur Labs",
          images,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: product.name,
          description: product.tagline,
          images: images.map((i) => i.url),
        },
        alternates: {
          canonical: `${SITE}/${product.slug}`,
        },
      };
    }
  }

  const canonicalPath = segments.length ? "/" + segments.join("/") : "";
  const canonicalUrl = `${SITE}${canonicalPath || "/"}`;

  let title = (sectionTitles[segments[0]] || "Good software. For everyone.") + " — Aur Labs";
  let description =
    sectionDescriptions[segments[0]] ||
    "An independent, non-profit software lab building useful free tools for people everywhere. Explore our work, join the team, or share a problem worth solving.";
  let image: string | undefined;
  let type: "website" | "article" = "website";
  let publishedTime: string | undefined;
  let authors: string[] | undefined;

  if (segments[1] && ["journal", "research"].includes(segments[0])) {
    const article = content[segments[0] as "journal" | "research"].find(
      (a) => a.slug === segments[1]
    );
    if (article) {
      title = `${article.title} — Aur Labs`;
      description = clip(article.summary, 155);
      image = article.cover || undefined;
      type = "article";
      publishedTime = article.date;
      authors = article.author ? [article.author] : undefined;
    }
  } else if (segments[1] === undefined && segments[0] === "products") {
    title = "The collection — Aur Labs";
  }

  const ogImages = [
    { url: image ? (image.startsWith("/") ? SITE + image : image) : `${SITE}/assets/aur-sculpture.png` },
  ];

  return {
    title,
    description,
    robots: segments[0] === "admin" ? { index: false, follow: false } : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Aur Labs",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const segments = slug || [];

  if (segments[0] === "products" && segments.length === 2) {
    permanentRedirect(`/${segments[1]}`);
  }

  let content = defaultContent;
  let storageError = false;
  try {
    content = await readContent();
  } catch {
    storageError = true;
  }

  if (segments.length === 1) {
    const product = content.products.find((p) => p.slug === segments[0] && p.published);
    if (product) {
      const faqJsonLd = generateFaqJsonLd(product);
      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript(generateProductJsonLd(product))}
          />
          {faqJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
            />
          )}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript(generateBreadcrumbJsonLd(product))}
          />
          <ProductTemplate product={product} content={content} />
        </>
      );
    }
  }

  const allowed = [
    "products",
    "about",
    "journal",
    "research",
    "join",
    "support",
    "contact",
    "privacy",
    "terms",
    "admin",
  ];
  if (
    segments.length > 2 ||
    (segments[0] && !allowed.includes(segments[0])) ||
    (segments[1] && !["products", "journal", "research"].includes(segments[0]))
  ) {
    notFound();
  }
  if (
    segments[1] &&
    ![...content.products, ...content.journal, ...content.research].some(
      (p) => p.slug === segments[1]
    )
  ) {
    notFound();
  }
  if (
    segments[1] &&
    !content[segments[0] as "products" | "journal" | "research"].some(
      (p) => p.slug === segments[1]
    )
  ) {
    notFound();
  }

  let pageLd: unknown = null;
  if (segments.length === 0) {
    pageLd = organizationJsonLd();
  } else if (segments[0] === "products" && !segments[1]) {
    pageLd = generateCollectionJsonLd(
      "Aur Labs Products",
      "/products",
      content.products
        .filter((p) => p.published)
        .map((p) => ({
          name: p.name,
          url: `${SITE}/${p.slug}`,
          description: p.tagline,
        }))
    );
  } else if (segments[1] && (segments[0] === "journal" || segments[0] === "research")) {
    const article = content[segments[0]].find((a) => a.slug === segments[1]);
    if (article) {
      pageLd = generateArticleJsonLd(article, segments[0]);
    }
  }

  return (
    <>
      {pageLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(pageLd)} />
      )}
      <Site content={content} path={"/" + segments.join("/")} storageError={storageError} />
    </>
  );
}
