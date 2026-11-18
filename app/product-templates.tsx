"use client";

import type { ReactNode } from "react";
import type { Product } from "@/lib/content";
import { Download, Smartphone, Terminal, Monitor, Check, Shield, FileText, Star } from "lucide-react";
import { Mark } from "./visuals";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ProductPageShell({ children, product }: { children: ReactNode; product: Product }) {
  return (
    <div className={`product-landing template-${product.category}`}>
      <header className="pl-header">
        <nav className="pl-nav">
          <a href="/" className="brand">
            <Mark />
            <span>Aur Labs</span>
          </a>
          <div className="pl-nav-links">
            <a href="/products">All Products</a>
            <a href="/about">About</a>
            <a href="/support">Support</a>
          </div>
        </nav>
      </header>
      {children}
      <footer className="pl-footer">
        <p>© 2026 Aur Labs. Free software for everyone.</p>
        <div className="pl-footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

/** Product landing template for desktop software tools. */
export function DesktopSoftwareTemplate({ product }: { product: Product }) {
  return (
    <ProductPageShell product={product}>
      <section className="pl-hero desktop-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Monitor size={14} />
            Desktop Software
          </span>
          <h1>{product.name}</h1>
          <p className="pl-tagline">{product.tagline}</p>
          <p className="pl-description">{product.description.split("\n\n")[0]}</p>

          <div className="pl-cta">
            <a href={product.releases[0]?.url || "#"} className="button orange">
              <Download size={18} />
              Download for {product.platforms[0] || "Desktop"}
            </a>
            {product.repository && (
              <a href={product.repository} target="_blank" rel="noopener noreferrer" className="button light">
                <GithubIcon size={18} />
                Source
              </a>
            )}
          </div>

          <div className="pl-platforms">
            {product.platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className={`pl-visual ${product.accent}`}>
          <div className="product-visual">
            <div className="desktop-mock">
              <div className="mock-top">
                <div className="traffic">
                  <i />
                  <i />
                  <i />
                </div>
                <span>{product.name}</span>
              </div>
              <div className="mock-workspace">
                <div className="mock-sidebar">
                  <b>Files</b>
                  <span>Document 1</span>
                  <span>Document 2</span>
                </div>
                <div className="mock-doc">
                  <span className="mock-eyebrow">WELCOME</span>
                  <h4>{product.name}</h4>
                  <p>{product.tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pl-features">
        <h2>Why {product.name}?</h2>
        <div className="pl-features-grid">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <Check size={20} />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {product.screenshots.length > 0 && (
        <section className="pl-screenshots">
          <h2>Screenshots</h2>
          <div className="pl-screenshot-grid">
            {product.screenshots.map((src, i) => (
              <img key={i} src={src} alt={`${product.name} screenshot ${i + 1}`} />
            ))}
          </div>
        </section>
      )}

      {product.releases.length > 0 && (
        <section className="pl-downloads">
          <h2>Download {product.name}</h2>
          <div className="pl-release-list">
            {product.releases.map((release, i) => (
              <div key={i} className="pl-release-card">
                <div>
                  <strong>{release.platform}</strong>
                  <span>
                    v{release.version} • {release.architecture}
                  </span>
                  {release.requirements && <small>{release.requirements}</small>}
                </div>
                <a href={release.url} className="button dark" download>
                  <Download size={16} />
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.faq && (
        <section className="pl-faq">
          <h2>Frequently Asked Questions</h2>
          {product.faq.split("\n\n").map((qa, i) => {
            const [question, ...answerParts] = qa.split("\n");
            return (
              <details key={i}>
                <summary>{question}</summary>
                <p>{answerParts.join(" ")}</p>
              </details>
            );
          })}
        </section>
      )}

      <section className="pl-legal">
        <h2>Legal &amp; Privacy</h2>
        <div className="pl-legal-grid">
          <div>
            <Shield size={20} />
            <h3>Privacy</h3>
            <p>{product.name} collects no personal data. All information stays on your device.</p>
            <a href="/privacy">Read our Privacy Policy →</a>
          </div>
          <div>
            <FileText size={20} />
            <h3>License</h3>
            <p>{product.license}</p>
          </div>
        </div>
      </section>
    </ProductPageShell>
  );
}

/** Product landing template for mobile applications. */
export function MobileAppTemplate({ product }: { product: Product }) {
  return (
    <ProductPageShell product={product}>
      <section className="pl-hero mobile-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Smartphone size={14} />
            Mobile App
          </span>
          <h1>{product.name}</h1>
          <p className="pl-tagline">{product.tagline}</p>

          <div className="pl-rating">
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <span>4.8 • 10K+ downloads</span>
          </div>

          <p className="pl-description">{product.description.split("\n\n")[0]}</p>

          <div className="pl-cta">
            <a href="#" className="button orange">
              <Download size={18} />
              Get it on Google Play
            </a>
            <a href="#" className="button dark">
              <Download size={18} />
              Download on App Store
            </a>
          </div>

          <div className="pl-platforms">
            {product.platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className={`pl-visual ${product.accent}`}>
          <div className="phones">
            <div className="phone phone-back">
              <div className="phone-camera" />
              <div className="phone-orb">✨</div>
              <h4>{product.name}</h4>
              <p>{product.tagline}</p>
            </div>
            <div className="phone phone-front">
              <div className="phone-camera" />
              <span className="phone-greeting">GOOD MORNING</span>
              <h4>
                Ready for <span>today?</span>
              </h4>
              <div className="phone-task">
                <span>UPCOMING</span>
                <b>Team standup</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pl-features">
        <h2>Designed for mobile</h2>
        <div className="pl-features-grid mobile-features">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <Check size={20} />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pl-store-badges">
        <h2>Get {product.name}</h2>
        <div className="store-badge-row">
          <a href="#" className="store-badge">
            <Download size={24} />
            <div>
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>
          </a>
          <a href="#" className="store-badge">
            <Download size={24} />
            <div>
              <small>DOWNLOAD ON</small>
              <strong>App Store</strong>
            </div>
          </a>
        </div>
      </section>
    </ProductPageShell>
  );
}

/** Product landing template for command-line tools. */
export function CliToolTemplate({ product }: { product: Product }) {
  const quickstartSnippet = `# Install
npm install -g ${product.slug}

# Initialize
${product.slug} init

# Run
${product.slug} start`;

  return (
    <ProductPageShell product={product}>
      <section className="pl-hero cli-hero">
        <div className="pl-hero-content">
          <span className="eyebrow">
            <Terminal size={14} />
            Command Line Tool
          </span>
          <h1>
            <code>{product.name.toLowerCase()}</code>
          </h1>
          <p className="pl-tagline">{product.tagline}</p>

          <div className="cli-install">
            <code>
              <span className="prompt">$</span> npm install -g {product.slug}
            </code>
            <button
              type="button"
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(`npm install -g ${product.slug}`)}
            >
              Copy
            </button>
          </div>

          <p className="pl-description">{product.description.split("\n\n")[0]}</p>

          <div className="pl-cta">
            <a href={product.releases[0]?.url || "#"} className="button orange">
              <Download size={18} />
              Download Binary
            </a>
            {product.repository && (
              <a href={product.repository} className="button light">
                <GithubIcon size={18} />
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className={`pl-visual ${product.accent}`}>
          <div className="terminal-mock">
            <div className="mock-top">
              <span>Terminal</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-brand">
                <span>⚡</span> {product.name}
              </div>
              <p className="terminal-dim"># Install</p>
              <p>
                <span className="terminal-green">$</span> npm i -g {product.slug}
              </p>
              <p className="terminal-dim"># Initialize</p>
              <p>
                <span className="terminal-green">$</span> {product.slug} init
              </p>
              <p className="terminal-dim"># Run</p>
              <p>
                <span className="terminal-green">$</span> {product.slug} start
              </p>
              <div className="terminal-cursor">
                <span className="terminal-green">$</span>
                <i />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pl-features cli-features">
        <h2>Developer-friendly</h2>
        <div className="pl-features-grid">
          {product.features.map((feature, i) => (
            <div key={i} className="pl-feature-card">
              <Terminal size={20} />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pl-quickstart">
        <h2>Quick Start</h2>
        <div className="code-block">
          <div className="code-header">
            <span>bash</span>
            <button type="button" onClick={() => navigator.clipboard.writeText(quickstartSnippet)}>
              Copy
            </button>
          </div>
          <pre>
            <code>{quickstartSnippet}</code>
          </pre>
        </div>
      </section>
    </ProductPageShell>
  );
}

/** Selects the landing page template matching a product's category. */
export function ProductTemplate({ product }: { product: Product }) {
  switch (product.category) {
    case "app":
      return <MobileAppTemplate product={product} />;
    case "cli":
      return <CliToolTemplate product={product} />;
    case "software":
    default:
      return <DesktopSoftwareTemplate product={product} />;
  }
}
