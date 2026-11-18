"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, CheckCircle2, Download, Globe, Package, Search } from "lucide-react";
import { defaultContent, type Product } from "@/lib/content";
import { parseFaq, productDescription, productTitle } from "@/lib/seo";

type DownloadRow = {
  product_slug: string;
  version: string;
  platform: string;
  count: number;
  last_at: number;
};

type FilterMode = "all" | "published" | "drafts" | "needs-work";

function auditProduct(product: Product) {
  const title = productTitle(product);
  const desc = productDescription(product);
  const kw = (product.keyword || "").trim().toLowerCase();
  const faqCount = parseFaq(product.faq).length;

  const checks: { ok: boolean; label: string }[] = [
    { ok: title.length >= 30 && title.length <= 65, label: "Title 30–65 chars" },
    { ok: desc.length >= 70 && desc.length <= 160, label: "Description 70–160 chars" },
    { ok: Boolean(kw), label: "Target keyword" },
    {
      ok: Boolean(kw) && title.toLowerCase().includes(kw) && desc.toLowerCase().includes(kw),
      label: "Keyword in title & desc",
    },
    { ok: faqCount >= 2, label: "2+ FAQ pairs" },
    { ok: product.screenshots.length > 0, label: "Screenshot" },
  ];

  const passed = checks.filter((c) => c.ok).length;
  const score = Math.round((passed / checks.length) * 100);
  const missing = checks.filter((c) => !c.ok).map((c) => c.label);

  return { score, missing, faqCount };
}

/** Real SEO health & download analytics dashboard for the admin studio. */
export default function SEODashboard({
  products = defaultContent.products,
  token = "",
  onEditProduct,
}: {
  products?: Product[];
  token?: string;
  onEditProduct?: (product: Product) => void;
}) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [downloadsBySlug, setDownloadsBySlug] = useState<Record<string, number>>({});
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    let active = true;
    fetch("/api/admin/downloads", { headers: { "x-aur-unlock": token } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { rows?: DownloadRow[]; total?: number }) => {
        if (!active) return;
        const map: Record<string, number> = {};
        for (const row of d.rows || []) {
          map[row.product_slug] = (map[row.product_slug] || 0) + Number(row.count || 0);
        }
        setDownloadsBySlug(map);
        setTotalDownloads(Number(d.total || 0));
      })
      .catch(() => {
        if (active) setTotalDownloads(0);
      });
    return () => {
      active = false;
    };
  }, [token]);

  const audited = useMemo(
    () =>
      products.map((product) => ({
        product,
        downloads: downloadsBySlug[product.slug] || 0,
        ...auditProduct(product),
      })),
    [products, downloadsBySlug]
  );

  const overview = useMemo(() => {
    const publishedCount = audited.filter((x) => x.product.published).length;
    const avgScore = audited.length
      ? Math.round(audited.reduce((sum, x) => sum + x.score, 0) / audited.length)
      : 0;
    const richReadyCount = audited.filter((x) => x.product.published).length;
    const faqReadyCount = audited.filter((x) => x.product.published && x.faqCount >= 1).length;
    return { publishedCount, avgScore, richReadyCount, faqReadyCount };
  }, [audited]);

  const visibleRows = useMemo(() => {
    return audited.filter((row) => {
      if (filter === "published") return row.product.published;
      if (filter === "drafts") return !row.product.published;
      if (filter === "needs-work") return row.score < 80;
      return true;
    });
  }, [audited, filter]);

  return (
    <div className="seo-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>SEO Health &amp; Downloads</h1>
          <p>Live metadata checks, JSON-LD readiness, and counted downloads across your catalogue</p>
        </div>
        <div className="timeframe-selector" role="group" aria-label="Filter products by SEO status">
          {(
            [
              ["all", "All products"],
              ["published", "Published"],
              ["drafts", "Drafts"],
              ["needs-work", "Needs attention"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={filter === key ? "active" : ""}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Package size={22} />
          <div>
            <span className="stat-value">
              {overview.publishedCount} / {products.length}
            </span>
            <span className="stat-label">Published Products</span>
            <span className="stat-sub">Live at /slug</span>
          </div>
        </div>
        <div className="stat-card">
          <Search size={22} />
          <div>
            <span className="stat-value">{overview.avgScore}%</span>
            <span className="stat-label">Avg. SEO Health</span>
            <span className="stat-sub">Title, meta, keyword, FAQ &amp; image</span>
          </div>
        </div>
        <div className="stat-card">
          <Download size={22} />
          <div>
            <span className="stat-value">
              {totalDownloads === null ? "—" : totalDownloads.toLocaleString()}
            </span>
            <span className="stat-label">Tracked Downloads</span>
            <span className="stat-sub">Via /api/download</span>
          </div>
        </div>
        <div className="stat-card">
          <Globe size={22} />
          <div>
            <span className="stat-value">{overview.richReadyCount}</span>
            <span className="stat-label">JSON-LD Active</span>
            <span className="stat-sub">{overview.faqReadyCount} with FAQPage schema</span>
          </div>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Product SEO Audit</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Downloads</th>
                <th>SEO Score</th>
                <th>Target Keyword</th>
                <th>Missing Items</th>
                {onEditProduct && <th />}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(({ product, downloads, score, missing }) => (
                <tr key={product.id}>
                  <td>
                    <a
                      href={`/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="seo-product-link"
                    >
                      {product.name}
                      <ArrowUpRight size={14} />
                    </a>
                    <span className="seo-slug">/{product.slug}</span>
                  </td>
                  <td>
                    <span className={`admin-badge ${product.published ? "published" : ""}`}>
                      {product.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{downloads.toLocaleString()}</td>
                  <td>
                    <span
                      className={`position ${
                        score >= 80 ? "good" : score >= 50 ? "okay" : "bad"
                      }`}
                    >
                      {score}%
                    </span>
                  </td>
                  <td className="keyword">{product.keyword?.trim() || "—"}</td>
                  <td>
                    {missing.length === 0 ? (
                      <span className="seo-all-ok">
                        <CheckCircle2 size={14} style={{ display: "inline", marginRight: 4 }} />
                        All checks passing
                      </span>
                    ) : (
                      <div className="seo-missing-list">
                        {missing.map((item) => (
                          <span key={item} className="seo-missing-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  {onEditProduct && (
                    <td>
                      <button
                        type="button"
                        className="button light small-button"
                        onClick={() => onEditProduct(product)}
                      >
                        Optimize
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={onEditProduct ? 7 : 6} className="muted">
                    No products match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
