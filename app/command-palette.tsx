"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Compass,
  FlaskConical,
  Heart,
  Mail,
  Monitor,
  Rss,
  Search,
  Smartphone,
  SunMoon,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { cleanDisplayText, statusLabel, type SiteContent } from "@/lib/content";

type PaletteItem = {
  id: string;
  group: "Products" | "Journal & Research" | "Pages & Actions";
  title: string;
  subtitle: string;
  badge?: string;
  href?: string;
  action?: () => void;
  keywords: string;
  icon: "desktop" | "mobile" | "cli" | "journal" | "research" | "page" | "heart" | "users" | "mail" | "theme" | "rss";
};

function ItemIcon({ kind }: { kind: PaletteItem["icon"] }) {
  switch (kind) {
    case "desktop":
      return <Monitor size={16} />;
    case "mobile":
      return <Smartphone size={16} />;
    case "cli":
      return <Terminal size={16} />;
    case "journal":
      return <BookOpen size={16} />;
    case "research":
      return <FlaskConical size={16} />;
    case "heart":
      return <Heart size={16} />;
    case "users":
      return <Users size={16} />;
    case "mail":
      return <Mail size={16} />;
    case "theme":
      return <SunMoon size={16} />;
    case "rss":
      return <Rss size={16} />;
    default:
      return <Compass size={16} />;
  }
}

export function CommandPalette({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("aur-theme", next);
    } catch {
      /* ignore */
    }
  };

  const allItems = useMemo<PaletteItem[]>(() => {
    const productItems: PaletteItem[] = content.products.map((p) => ({
      id: "prod-" + p.id,
      group: "Products",
      title: p.name,
      subtitle: cleanDisplayText(p.tagline),
      badge: statusLabel(p.status),
      href: "/" + p.slug,
      keywords: [p.name, p.tagline, p.category, ...p.platforms, p.keyword || ""].join(" ").toLowerCase(),
      icon: p.category === "app" ? "mobile" : p.category === "cli" ? "cli" : "desktop",
    }));

    const articleItems: PaletteItem[] = [
      ...content.journal.map((a) => ({
        id: "jour-" + a.id,
        group: "Journal & Research" as const,
        title: cleanDisplayText(a.title),
        subtitle: cleanDisplayText(a.summary),
        badge: a.tag,
        href: "/journal/" + a.slug,
        keywords: [a.title, a.summary, a.tag, "journal"].join(" ").toLowerCase(),
        icon: "journal" as const,
      })),
      ...content.research.map((a) => ({
        id: "res-" + a.id,
        group: "Journal & Research" as const,
        title: cleanDisplayText(a.title),
        subtitle: cleanDisplayText(a.summary),
        badge: a.tag,
        href: "/research/" + a.slug,
        keywords: [a.title, a.summary, a.tag, "research"].join(" ").toLowerCase(),
        icon: "research" as const,
      })),
    ];

    const pageItems: PaletteItem[] = [
      {
        id: "page-products",
        group: "Pages & Actions",
        title: "Explore all products",
        subtitle: "Browse desktop, mobile, and CLI tools by platform",
        href: "/products",
        keywords: "products tools software apps cli download catalogue",
        icon: "page",
      },
      {
        id: "page-about",
        group: "Pages & Actions",
        title: "About Aur Labs",
        subtitle: "Our story, mission, and team members",
        href: "/about",
        keywords: "about story mission team lab people",
        icon: "page",
      },
      {
        id: "page-join",
        group: "Pages & Actions",
        title: "Join the team",
        subtitle: "Volunteer your skills to build free tools",
        href: "/join",
        keywords: "join volunteer contribute career apply team",
        icon: "users",
      },
      {
        id: "page-support",
        group: "Pages & Actions",
        title: "Support the mission",
        subtitle: "Help keep useful software free for everyone",
        href: "/support",
        keywords: "support donate contribution funding mission",
        icon: "heart",
      },
      {
        id: "page-contact",
        group: "Pages & Actions",
        title: "Contact & share a problem",
        subtitle: "Report a bug, suggest an idea, or ask a question",
        href: "/contact",
        keywords: "contact email message feedback problem bug help",
        icon: "mail",
      },
      {
        id: "act-theme",
        group: "Pages & Actions",
        title: "Switch Bronze / Pearl theme mode",
        subtitle: "Toggle between dark Bronze and light Pearl appearance",
        action: toggleTheme,
        keywords: "theme dark light mode color bronze pearl appearance",
        icon: "theme",
      },
      {
        id: "page-rss",
        group: "Pages & Actions",
        title: "RSS & JSON syndication feed",
        subtitle: "Subscribe to lab articles and updates via /feed.xml",
        href: "/feed.xml",
        keywords: "rss atom json feed xml subscribe updates",
        icon: "rss",
      },
    ];

    return [...productItems, ...articleItems, ...pageItems];
  }, [content]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    const words = q.split(/\s+/).filter(Boolean);
    return allItems.filter((item) => words.every((w) => item.keywords.includes(w) || item.title.toLowerCase().includes(w)));
  }, [allItems, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const selectItem = (item: PaletteItem) => {
    setOpen(false);
    setQuery("");
    if (item.action) {
      item.action();
      return;
    }
    if (item.href) {
      if (item.href.endsWith(".xml") || item.href.endsWith(".json")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        selectItem(filtered[activeIndex]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  const groups: PaletteItem["group"][] = ["Products", "Journal & Research", "Pages & Actions"];

  return (
    <>
      <button
        type="button"
        className="cmd-trigger-btn"
        onClick={() => setOpen(true)}
        aria-label="Quick search (Ctrl+K)"
        title="Quick search (Ctrl+K)"
      >
        <Search size={14} />
        <span className="cmd-trigger-label">Search</span>
        <kbd className="cmd-trigger-kbd">⌘K</kbd>
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="cmd-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div className="cmd-dialog" role="dialog" aria-modal="true" aria-label="Quick search">
              <div className="cmd-input-row">
                <Search size={17} />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools, articles, or actions…"
                  aria-label="Search tools, articles, or actions"
                />
                {query && (
                  <button
                    type="button"
                    className="cmd-clear-btn"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
                <button
                  type="button"
                  className="cmd-esc-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                >
                  ESC
                </button>
              </div>

              <div className="cmd-results" role="listbox">
                {filtered.length === 0 ? (
                  <div className="cmd-empty">
                    <p>No matching tools or pages for “{query}”.</p>
                  </div>
                ) : (
                  groups.map((g) => {
                    const groupItems = filtered.filter((i) => i.group === g);
                    if (!groupItems.length) return null;
                    return (
                      <div key={g} className="cmd-group">
                        <span className="cmd-group-label">{g}</span>
                        {groupItems.map((item) => {
                          const flatIndex = filtered.indexOf(item);
                          const isSelected = flatIndex === activeIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              className={isSelected ? "cmd-item active" : "cmd-item"}
                              onMouseEnter={() => setActiveIndex(flatIndex)}
                              onClick={() => selectItem(item)}
                            >
                              <span className="cmd-item-icon">
                                <ItemIcon kind={item.icon} />
                              </span>
                              <span className="cmd-item-text">
                                <b>{item.title}</b>
                                <small>{item.subtitle}</small>
                              </span>
                              {item.badge && <span className="cmd-item-badge">{item.badge}</span>}
                              <ArrowRight size={14} className="cmd-item-arrow" />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="cmd-footer">
                <span>↑↓ to navigate</span>
                <span>↵ to open</span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
