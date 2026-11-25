"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Monitor,
  Plus,
  Share2,
  Shield,
  Smartphone,
  Terminal,
  X,
} from "lucide-react";
import {
  defaultContent,
  statusLabel,
  categoryLabel,
  cleanDisplayText,
  type Product,
  type Release,
  type SiteContent,
} from "@/lib/content";
import { parseFaq } from "@/lib/seo";
import { ProductVisual } from "./visuals";
import { MediaImage } from "./media-image";
import { helpAuri } from "./auri-help";
import { AuriAsk } from "./auri-ask";
import { GitHubStarButton, resolveProductGitHubRepo } from "./github-star";
import { VideoSection } from "./video-player";
import { ReleaseNotify } from "./release-notify";
import { RichProse } from "./rich-prose";
import {
  Header,
  Footer,
  DeferredAuri,
  ProductCard,
  ReleaseHelp,
  downloadHref,
  fileExt,
} from "./site";
import "./public-theme.css";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function useDetectedPlatform(product: Product) {
  const [detected, setDetected] = useState("");
  const [platform, setPlatform] = useState(
    product.releases[0]?.platform || product.platforms[0] || ""
  );

  useEffect(() => {
    const ua = navigator.userAgent;
    const os = /Android/i.test(ua)
      ? "Android"
      : /iPhone|iPad/i.test(ua)
        ? "iOS"
        : /Mac/i.test(ua)
          ? "macOS"
          : /Win/i.test(ua)
            ? "Windows"
            : /Linux/i.test(ua)
              ? "Linux"
              : "";
    setDetected(os);
    if (os && (product.releases.some((r) => r.platform === os) || product.platforms.includes(os))) {
      setPlatform(os);
    }
  }, [product.id, product.platforms, product.releases]);

  return { detected, platform, setPlatform };
}

function latestReleaseIndex(product: Product, platform: string) {
  let best = -1;
  product.releases.forEach((r, i) => {
    if (r.platform === platform && (best < 0 || r.date > product.releases[best].date)) {
      best = i;
    }
  });
  return best;
}

function useClipboard() {
  const [copiedKey, setCopiedKey] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = async (value: string, key = value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedKey(""), 2000);
    } catch {
      helpAuri("Clipboard access is unavailable. You can select and copy the text directly.");
    }
  };

  return { copiedKey, copy };
}

function ProductPageShell({
  children,
  product,
  content = defaultContent,
}: {
  children: ReactNode;
  product: Product;
  content?: SiteContent;
}) {
  const [shared, setShared] = useState(false);
  const faqsCount = parseFaq(product.faq).length;

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      helpAuri("Copy the page URL from your browser address bar to share this tool.");
    }
  };

  return (
    <div className={`public-site product-landing template-${product.category}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header content={content} path={"/" + product.slug} />
      <main id="main">
        <div className="section-wrap detail-breadcrumb">
          <Link href="/products">
            <ArrowLeft size={14} /> All products
          </Link>
          <span>{categoryLabel(product.category)}</span>
          <span className={`status-pill ${product.status}`}>
            <i />
            {statusLabel(product.status)}
          </span>
          <div className="pl-breadcrumb-actions">
            <div className="pl-jump-links" aria-label="Jump to section">
              <a href="#features">Features</a>
              {product.video && <a href="#video">Video</a>}
              {product.releases.length > 0 && <a href="#downloads">Downloads</a>}
              {faqsCount > 0 && <a href="#faq">FAQ</a>}
              <a href="#ask-auri">Ask Auri</a>
            </div>
            <button
              type="button"
              className={shared ? "pl-share-btn copied" : "pl-share-btn"}
              onClick={copyShareUrl}
            >
              {shared ? <Check size={13} /> : <Share2 size={13} />}
              {shared ? "Link copied" : "Copy link"}
            </button>
          </div>
        </div>
        {children}
      </main>
      <Footer content={content} />
      <DeferredAuri guides={content.settings.auriGuides} />
    </div>
  );
}

function ProductHeroVisual({ product }: { product: Product }) {
  const [shot, setShot] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  if (product.screenshots.length === 0) {
    return <ProductVisual product={product} large priority />;
  }

  return (
    <div className="detail-showcase">
      <button
        type="button"
        className="screenshot-main"
        onClick={() => dialog.current?.showModal()}
        aria-label="Enlarge screenshot"
      >
        <MediaImage
          src={product.screenshots[shot]}
          alt={`${product.name} screenshot ${shot + 1}`}
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
        />
        <span>
          <Plus size={18} /> Explore screenshot
        </span>
      </button>
      {product.screenshots.length > 1 && (
        <div className="screenshot-thumbs">
          {product.screenshots.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={i === shot ? "active" : ""}
              onClick={() => setShot(i)}
              aria-label={`View screenshot ${i + 1}`}
            >
              <MediaImage src={src} alt="" thumb />
            </button>
          ))}
        </div>
      )}
      <dialog
        className="lightbox"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          type="button"
          className="lightbox-close icon-button"
          onClick={() => dialog.current?.close()}
          aria-label="Close screenshot"
        >
          <X />
        </button>
        <MediaImage
          src={product.screenshots[shot]}
          alt={`${product.name} screenshot ${shot + 1}`}
          sizes="100vw"
        />
        {product.screenshots.length > 1 && (
          <div className="lightbox-controls">
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={() =>
                setShot((s) => (s - 1 + product.screenshots.length) % product.screenshots.length)
              }
            >
              <ChevronLeft />
            </button>
            <span>
              {shot + 1} / {product.screenshots.length}
            </span>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={() => setShot((s) => (s + 1) % product.screenshots.length)}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}

function PrimaryCtaBlock({
  product,
  detected,
  platform,
  labelPrefix = "Download for",
}: {
  product: Product;
  detected: string;
  platform: string;
  labelPrefix?: string;
}) {
  const hasReleases = product.status === "released" && product.releases.length > 0;
  const githubRepo = resolveProductGitHubRepo(product);

  if (!hasReleases) {
    const contactHref = `/contact?product=${encodeURIComponent(product.name)}&topic=${encodeURIComponent(
      product.status === "released" ? "Product support" : "A problem to solve"
    )}`;
    return (
      <div className="pl-cta-wrap">
        <div className="pl-cta">
          <Link href={contactHref} className="button orange">
            {product.status === "released" ? "Ask about a download" : "Share your feedback"}
          </Link>
          {product.repository && (
            <a
              href={product.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="button light"
            >
              <GithubIcon size={18} />
              Source
            </a>
          )}
          {githubRepo && <GitHubStarButton repo={githubRepo} />}
        </div>
        <p className="pl-status-note">
          {product.status === "concept"
            ? `${product.name} is an illustrative concept preview. No download is available yet.`
            : `${product.name} is currently in development. Check back soon or reach out to help test.`}
        </p>
        <ReleaseNotify productName={product.name} platform={detected || platform} />
      </div>
    );
  }

  const available = [...new Set(product.releases.map((r) => r.platform))];
  const target = detected ? (available.includes(detected) ? detected : "") : platform;
  const idx = target ? latestReleaseIndex(product, target) : -1;

  return (
    <div className="pl-cta-wrap">
      <div className="pl-cta">
        {idx >= 0 ? (
          <a href={downloadHref(product, idx)} rel="nofollow" className="button orange">
            <Download size={18} />
            {labelPrefix} {product.releases[idx].platform}
          </a>
        ) : (
          <a href="#downloads" className="button orange">
            <Download size={18} />
            See available downloads
          </a>
        )}
        {product.repository && (
          <a
            href={product.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="button light"
          >
            <GithubIcon size={18} />
            Source
          </a>
        )}
        {githubRepo && <GitHubStarButton repo={githubRepo} />}
      </div>
      {idx >= 0 ? (
        <p className="download-meta">
          v{product.releases[idx].version.replace(/^v/i, "")} · {product.releases[idx].architecture}
          {fileExt(product.releases[idx].url) ? ` · ${fileExt(product.releases[idx].url)}` : ""} ·{" "}
          <a href="#downloads" className="text-link">
            All builds &amp; checksums
          </a>
        </p>
      ) : (
        detected && (
          <p className="download-note">
            {product.name} isn’t available for {detected} yet. Builds exist for{" "}
            {available.join(", ")}.
          </p>
        )
      )}
    </div>
  );
}

function ProductOverviewAndDownloads({
  product,
  content,
  platform,
  setPlatform,
  copiedKey,
  copy,
}: {
  product: Product;
  content: SiteContent;
  platform: string;
  setPlatform: (p: string) => void;
  copiedKey: string;
  copy: (value: string, key?: string) => void;
}) {
  const paragraphs = product.description.split("\n\n").filter(Boolean);
  const faqs = parseFaq(product.faq);
  const releasesForPlatform = product.releases.filter((r) => r.platform === platform);
  const displayedReleases: { release: Release; index: number }[] = (
    releasesForPlatform.length > 0 ? releasesForPlatform : product.releases
  ).map((release) => ({
    release,
    index: product.releases.indexOf(release),
  }));
  const otherProducts = content.products
    .filter((p) => p.published && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {product.video && (
        <VideoSection
          url={product.video}
          title={`${product.name} launch video`}
          caption={`See ${product.name} in action`}
        />
      )}

      {paragraphs.length > 1 && (
        <section className="pl-about">
          <div className="pl-about-inner prose">
            <h2>About {product.name}</h2>
            <RichProse body={product.description} />
          </div>
        </section>
      )}

      {product.screenshots.length > 1 && (
        <section className="pl-screenshots">
          <h2>Screenshots</h2>
          <div className="pl-screenshot-grid">
            {product.screenshots.map((src, i) => (
              <MediaImage
                key={src + i}
                src={src}
                alt={`${product.name} screenshot ${i + 1}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
        </section>
      )}

      {product.releases.length > 0 && (
        <section className="pl-downloads" id="downloads">
          <h2>Download {product.name}</h2>
          <div className="pl-release-list">
            <div className="platform-filters" role="group" aria-label="Filter releases by platform">
              {[...new Set(product.releases.map((r) => r.platform))].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === platform ? "selected" : ""}
                  onClick={() => setPlatform(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            {displayedReleases.map(({ release, index }) => (
              <div key={index} className="pl-release-card">
                <div className="pl-release-info">
                  <strong>
                    {release.platform} · v{release.version.replace(/^v/i, "")}
                  </strong>
                  <span>
                    {release.architecture} · Released {release.date}
                  </span>
                  {release.requirements && <small>{release.requirements}</small>}
                  {release.notes && <p className="pl-release-notes">{release.notes}</p>}
                  {release.checksum && (
                    <button
                      type="button"
                      className="checksum"
                      onClick={() => copy(release.checksum, `chk-${index}`)}
                    >
                      <Copy size={13} />
                      <span>
                        {copiedKey === `chk-${index}` ? "Copied SHA-256 ✓" : release.checksum}
                      </span>
                    </button>
                  )}
                  <ReleaseHelp r={release} />
                </div>
                <a href={downloadHref(product, index)} className="button dark" rel="nofollow">
                  <Download size={16} />
                  Download free
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="pl-faq" id="faq">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      )}

      <nav
        aria-label={`${product.name} legal and support links`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 20px",
          margin: "24px auto",
          fontSize: 13,
          color: "var(--muted)",
        }}
      >
        <Link href={product.privacyPolicy?.trim() ? `/${product.slug}/privacy` : "/privacy"}>
          Privacy Policy
        </Link>
        <span aria-hidden="true">·</span>
        <Link href={product.termsOfUse?.trim() ? `/${product.slug}/terms` : "/terms"}>
          Terms of Use
        </Link>
        <span aria-hidden="true">·</span>
        <Link href={product.supportText?.trim() ? `/${product.slug}/support` : "/support"}>
          Support
        </Link>
      </nav>

      <section className="pl-auri-section" id="ask-auri" aria-label={`Questions about ${product.name}`}>
        <div className="pl-auri-inner">
          <h2>Questions about {product.name}?</h2>
          <p>Ask Auri to search our team-written notes and product guides.</p>
          <AuriAsk />
        </div>
      </section>

      <section className="pl-legal">
        <h2>Legal &amp; Privacy</h2>
        <div className="pl-legal-grid">
          <div>
            <Shield size={20} />
            <h3>Privacy</h3>
            <p>
              We do not add third-party analytics or ad trackers. Read how information is handled
              across Aur Labs tools and website.
            </p>
            <Link href="/privacy">Read our Privacy Policy →</Link>
          </div>
          <div>
            <FileText size={20} />
            <h3>License</h3>
            <p>{product.license || "To be confirmed before release"}</p>
          </div>
        </div>
      </section>

      {otherProducts.length > 0 && (
        <section className="pl-more-products">
          <div className="pl-more-header">
            <div>
              <span className="eyebrow">
                <span className="orange-dot" />
                From the Aur Labs catalogue
              </span>
              <h2>More tools from Aur Labs</h2>
            </div>
            <Link href="/products" className="text-link">
              Explore all products →
            </Link>
          </div>
          <div className="product-grid">
            {otherProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** Product landing template for desktop software tools. */
export function DesktopSoftwareTemplate({
  product,
  content = defaultContent,
}: {
  product: Product;
  content?: SiteContent;
}) {
  const { detected, platform, setPlatform } = useDetectedPlatform(product);
  const { copiedKey, copy } = useClipboard();

  return (
    <ProductPageShell product={product} content={content}>
      <section className="pl-hero desktop-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Monitor size={14} />
            Desktop Software
          </span>
          <h1>{product.name}</h1>
          <p className="pl-tagline">{cleanDisplayText(product.tagline)}</p>
          <p className="pl-description">{cleanDisplayText(product.description.split("\n\n")[0])}</p>

          <PrimaryCtaBlock product={product} detected={detected} platform={platform} />

          <div className="pl-platforms">
            {product.platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className="pl-hero-showcase">
          <ProductHeroVisual product={product} />
        </div>
      </section>

      <section className="pl-features" id="features">
        <h2>
          {product.status === "released"
            ? `Why ${product.name}?`
            : `What ${product.name} aims to offer`}
        </h2>
        <div className="pl-features-grid">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <span className="pl-feature-icon" aria-hidden="true">
                <Check size={18} />
              </span>
              <p>{cleanDisplayText(feature)}</p>
            </div>
          ))}
        </div>
      </section>

      <ProductOverviewAndDownloads
        product={product}
        content={content}
        platform={platform}
        setPlatform={setPlatform}
        copiedKey={copiedKey}
        copy={copy}
      />
    </ProductPageShell>
  );
}

/** Product landing template for mobile applications. */
export function MobileAppTemplate({
  product,
  content = defaultContent,
}: {
  product: Product;
  content?: SiteContent;
}) {
  const { detected, platform, setPlatform } = useDetectedPlatform(product);
  const { copiedKey, copy } = useClipboard();
  const androidIdx = latestReleaseIndex(product, "Android");
  const iosIdx = latestReleaseIndex(product, "iOS");
  const hasStoreReleases = product.status === "released" && (androidIdx >= 0 || iosIdx >= 0);

  return (
    <ProductPageShell product={product} content={content}>
      <section className="pl-hero mobile-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Smartphone size={14} />
            Mobile App
          </span>
          <h1>{product.name}</h1>
          <p className="pl-tagline">{cleanDisplayText(product.tagline)}</p>
          <p className="pl-description">{cleanDisplayText(product.description.split("\n\n")[0])}</p>

          <PrimaryCtaBlock product={product} detected={detected} platform={platform} />

          <div className="pl-platforms">
            {product.platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className="pl-hero-showcase">
          <ProductHeroVisual product={product} />
        </div>
      </section>

      <section className="pl-features" id="features">
        <h2>Designed for mobile</h2>
        <div className="pl-features-grid mobile-features">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <span className="pl-feature-icon" aria-hidden="true">
                <Check size={18} />
              </span>
              <p>{cleanDisplayText(feature)}</p>
            </div>
          ))}
        </div>
      </section>

      {hasStoreReleases && (
        <section className="pl-store-badges">
          <h2>Get {product.name}</h2>
          <div className="store-badge-row">
            {androidIdx >= 0 && (
              <a href={downloadHref(product, androidIdx)} rel="nofollow" className="store-badge">
                <Download size={24} />
                <div>
                  <small>DOWNLOAD FOR</small>
                  <strong>Android</strong>
                </div>
              </a>
            )}
            {iosIdx >= 0 && (
              <a href={downloadHref(product, iosIdx)} rel="nofollow" className="store-badge">
                <Download size={24} />
                <div>
                  <small>DOWNLOAD FOR</small>
                  <strong>iOS</strong>
                </div>
              </a>
            )}
          </div>
        </section>
      )}

      <ProductOverviewAndDownloads
        product={product}
        content={content}
        platform={platform}
        setPlatform={setPlatform}
        copiedKey={copiedKey}
        copy={copy}
      />
    </ProductPageShell>
  );
}

/** Product landing template for command-line tools. */
export function CliToolTemplate({
  product,
  content = defaultContent,
}: {
  product: Product;
  content?: SiteContent;
}) {
  const { detected, platform, setPlatform } = useDetectedPlatform(product);
  const { copiedKey, copy } = useClipboard();
  const isReleased = product.status === "released";
  const quickstartSnippet = `# Install
npm install -g ${product.slug}

# Initialize
${product.slug} init

# Run
${product.slug} start`;

  return (
    <ProductPageShell product={product} content={content}>
      <section className="pl-hero cli-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Terminal size={14} />
            Command Line Tool
          </span>
          <h1>
            <code>{product.name.toLowerCase()}</code>
          </h1>
          <p className="pl-tagline">{cleanDisplayText(product.tagline)}</p>

          <div className="cli-install">
            <code>
              <span className="prompt">$</span> npm install -g {product.slug}
            </code>
            <button
              type="button"
              className={copiedKey === "cli-install" ? "copy-btn copied" : "copy-btn"}
              onClick={() => copy(`npm install -g ${product.slug}`, "cli-install")}
            >
              {copiedKey === "cli-install" ? "Copied ✓" : "Copy"}
            </button>
          </div>
          {!isReleased && (
            <p className="pl-cli-preview-note">
              Illustrative CLI preview: commands will work once {product.name} is released.
            </p>
          )}

          <p className="pl-description">{cleanDisplayText(product.description.split("\n\n")[0])}</p>

          <PrimaryCtaBlock
            product={product}
            detected={detected}
            platform={platform}
            labelPrefix="Download Binary for"
          />

          <div className="pl-platforms">
            {product.platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className="pl-hero-showcase">
          <ProductHeroVisual product={product} />
        </div>
      </section>

      <section className="pl-features cli-features" id="features">
        <h2>Developer friendly</h2>
        <div className="pl-features-grid">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <span className="pl-feature-icon" aria-hidden="true">
                <Terminal size={18} />
              </span>
              <p>{cleanDisplayText(feature)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pl-quickstart">
        <h2>Quick Start</h2>
        <div className="code-block">
          <div className="code-header">
            <div className="code-title">
              <span className="code-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>bash</span>
            </div>
            <button
              type="button"
              className={copiedKey === "cli-quickstart" ? "copied" : ""}
              onClick={() => copy(quickstartSnippet, "cli-quickstart")}
            >
              {copiedKey === "cli-quickstart" ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <pre>
            <code>{quickstartSnippet}</code>
          </pre>
        </div>
        {!isReleased && (
          <p className="pl-cli-preview-note center">
            Example workflow preview. Verify the published package documentation upon release.
          </p>
        )}
      </section>

      <ProductOverviewAndDownloads
        product={product}
        content={content}
        platform={platform}
        setPlatform={setPlatform}
        copiedKey={copiedKey}
        copy={copy}
      />
    </ProductPageShell>
  );
}

/** Selects the landing page template matching a product's category. */
export function ProductTemplate({
  product,
  content = defaultContent,
}: {
  product: Product;
  content?: SiteContent;
}) {
  switch (product.category) {
    case "app":
      return <MobileAppTemplate product={product} content={content} />;
    case "cli":
      return <CliToolTemplate product={product} content={content} />;
    case "software":
    default:
      return <DesktopSoftwareTemplate product={product} content={content} />;
  }
}
