import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { readContent } from "@/lib/server";
import { defaultContent } from "@/lib/content";
import {
  SITE,
  generateProductJsonLd,
  generateFaqJsonLd,
  generateBreadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo";
import { ProductTemplate } from "@/app/product-templates";
import Site from "../site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const segments = slug || [];

  if (segments.length === 1) {
    let products = defaultContent.products;
    try {
      const content = await readContent();
      products = content.products;
    } catch {
      // Fallback to defaultContent when storage is unavailable
    }

    const product = products.find((p) => p.slug === segments[0] && p.published);
    if (product) {
      return {
        title: product.seoTitle || `${product.name} — ${product.tagline} | Aur Labs`,
        description: product.seoDescription || product.description.split("\n\n")[0],
        keywords: product.keyword || product.name,
        openGraph: {
          title: product.name,
          description: product.tagline,
          url: `${SITE}/${product.slug}`,
          images:
            product.screenshots.length > 0
              ? product.screenshots.map((s) => ({ url: s }))
              : [{ url: `${SITE}/assets/aur-sculpture.png` }],
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: product.name,
          description: product.tagline,
          images: product.screenshots,
        },
        alternates: {
          canonical: `${SITE}/${product.slug}`,
        },
      };
    }
  }

  const titles: Record<string, string> = {
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
  let title = titles[segments[0]] || "Good software. For everyone.";
  if (segments[1] && ["products", "journal", "research"].includes(segments[0])) {
    try {
      const d = await readContent();
      const item = d[segments[0] as "products" | "journal" | "research"].find((p) => p.slug === segments[1]);
      if (item) title = "name" in item ? item.name : item.title;
    } catch {}
  }
  return {
    title: title + " — Aur Labs",
    robots: segments[0] === "admin" ? { index: false, follow: false } : undefined,
    alternates: { canonical: "/" + segments.join("/") },
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
          <ProductTemplate product={product} />
        </>
      );
    }
  }

  const allowed = ["products", "about", "journal", "research", "join", "support", "contact", "privacy", "terms", "admin"];
  if (
    segments.length > 2 ||
    (segments[0] && !allowed.includes(segments[0])) ||
    (segments[1] && !["products", "journal", "research"].includes(segments[0]))
  ) {
    notFound();
  }
  if (segments[1] && ![...content.products, ...content.journal, ...content.research].some((p) => p.slug === segments[1])) {
    notFound();
  }
  if (segments[1] && !content[segments[0] as "products" | "journal" | "research"].some((p) => p.slug === segments[1])) {
    notFound();
  }
  return <Site content={content} path={"/" + segments.join("/")} storageError={storageError} />;
}
