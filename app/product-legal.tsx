import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { defaultContent, type Product } from "@/lib/content";
import { readContent } from "@/lib/server";
import { SITE, clip } from "@/lib/seo";

export type LegalKind = "privacy" | "terms" | "support";

const LEGAL_META: Record<
  LegalKind,
  { field: "privacyPolicy" | "termsOfUse" | "supportText"; label: string; fallbackPath: string }
> = {
  privacy: { field: "privacyPolicy", label: "Privacy Policy", fallbackPath: "/privacy" },
  terms: { field: "termsOfUse", label: "Terms of Use", fallbackPath: "/terms" },
  support: { field: "supportText", label: "Support", fallbackPath: "/support" },
};

async function findPublishedProduct(slug: string): Promise<Product | undefined> {
  let content = defaultContent;
  try {
    content = await readContent();
  } catch {
    // Fallback to defaultContent when storage is unavailable
  }
  return content.products.find((p) => p.slug === slug && p.published);
}

export async function generateProductLegalMetadata(
  productSlug: string,
  kind: LegalKind
): Promise<Metadata> {
  const product = await findPublishedProduct(productSlug);
  const meta = LEGAL_META[kind];
  if (!product) {
    return {
      title: `${meta.label} — Aur Labs`,
      robots: { index: false, follow: false },
    };
  }
  const rawText = (product[meta.field] || "").trim();
  const firstParagraph = rawText
    .split(/\n\n+/)
    .map((b) => b.replace(/^##\s+/, "").trim())
    .find(Boolean);
  const description = firstParagraph
    ? clip(firstParagraph, 155)
    : `${meta.label} for ${product.name} by Aur Labs.`;

  return {
    title: `${product.name} — ${meta.label} | Aur Labs`,
    description,
    alternates: {
      canonical: `${SITE}/${product.slug}/${kind}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

function formatLegalDate(iso?: string): string {
  if (!iso) return "";
  const parsed = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function renderLegalBlocks(raw: string) {
  return raw
    .trim()
    .split(/\n\s*\n/)
    .map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      const lines = trimmed.split("\n");
      const first = lines[0]?.trim() || "";
      if (first.startsWith("## ")) {
        const heading = first.slice(3).trim();
        const rest = lines.slice(1).join("\n").trim();
        return (
          <section key={index}>
            <h2>{heading}</h2>
            {rest ? <p>{rest}</p> : null}
          </section>
        );
      }
      return <p key={index}>{trimmed}</p>;
    });
}

export async function ProductLegalPage({
  productSlug,
  kind,
}: {
  productSlug: string;
  kind: LegalKind;
}) {
  const product = await findPublishedProduct(productSlug);
  if (!product) notFound();

  const meta = LEGAL_META[kind];
  const body = (product[meta.field] || "").trim();
  if (!body) {
    redirect(meta.fallbackPath);
  }

  const logo = product.screenshots?.[0];
  const updated = formatLegalDate(product.legalUpdatedAt);

  return (
    <div className="public-site min-h-screen">
      <main className="reading-page legal" style={{ paddingTop: 48 }}>
        <div style={{ marginBottom: 28 }}>
          <Link
            href={`/products/${product.slug}`}
            className="text-link"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <ArrowLeft size={15} /> Back to {product.name}
          </Link>
        </div>

        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 18,
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt={`${product.name} logo`}
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                objectFit: "cover",
                border: "1px solid var(--line)",
              }}
            />
          ) : null}
          <div>
            <span className="eyebrow">{meta.label}</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "6px 0 4px" }}>
              {product.name}
            </h1>
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>
              by Aur Labs{updated ? ` · Last updated ${updated}` : ""}
            </p>
          </div>
        </header>

        <div className="prose">{renderLegalBlocks(body)}</div>

        <footer
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
          }}
        >
          <Link href={`/products/${product.slug}`} className="text-link">
            <ArrowLeft size={14} /> Return to {product.name}
          </Link>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy">Site Privacy</Link>
            <Link href="/terms">Site Terms</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
