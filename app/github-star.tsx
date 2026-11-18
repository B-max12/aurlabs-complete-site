"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Star } from "lucide-react";
import {
  clearProviderToken,
  getProviderToken,
  snapshot,
  startOAuth,
  subscribe,
} from "./visitor-session";

const RESERVED_OWNER_PATHS = new Set([
  "orgs",
  "users",
  "topics",
  "settings",
  "features",
  "marketplace",
  "sponsors",
  "login",
  "join",
  "about",
  "pricing",
  "explore",
  "trending",
  "collections",
  "events",
  "search",
]);

export function parseGitHubRepo(url?: string): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/i, "");
    if (RESERVED_OWNER_PATHS.has(owner.toLowerCase())) return null;
    if (!/^[A-Za-z0-9_.-]{1,100}$/.test(owner) || !/^[A-Za-z0-9_.-]{1,100}$/.test(repo)) {
      return null;
    }
    return `${owner}/${repo}`;
  } catch {
    return null;
  }
}

export function resolveProductGitHubRepo(product: {
  repository?: string;
  releases?: { url: string }[];
}): string | null {
  const fromRepo = parseGitHubRepo(product.repository);
  if (fromRepo) return fromRepo;
  if (Array.isArray(product.releases)) {
    for (const r of product.releases) {
      const fromRelease = parseGitHubRepo(r.url);
      if (fromRelease) return fromRelease;
    }
  }
  return null;
}

const PENDING_STAR_KEY = "aur-pending-star";

function formatStarCount(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}

export function GitHubStarButton({
  repo,
  compact = false,
}: {
  repo: string;
  compact?: boolean;
}) {
  const sessionRaw = useSyncExternalStore(subscribe, snapshot, () => null);
  const providerToken = sessionRaw ? getProviderToken() : null;

  const [stars, setStars] = useState<number | null>(null);
  const [starred, setStarred] = useState(false);
  const [busy, setBusy] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  const performToggle = useCallback(
    async (action: "star" | "unstar", token: string) => {
      if (busy) return;
      const nextStarred = action === "star";
      const prevStarred = starred;
      const prevStars = stars;

      setBusy(true);
      setPromptOpen(false);
      setStarred(nextStarred);
      if (typeof prevStars === "number" && prevStarred !== nextStarred) {
        setStars(Math.max(0, prevStars + (nextStarred ? 1 : -1)));
      }

      try {
        const res = await fetch("/api/github/stars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repo, action, providerToken: token }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          starred?: boolean;
          stars?: number;
          code?: string;
          error?: string;
        };
        if (res.status === 401 || data.code === "AUTH_REQUIRED") {
          setStarred(prevStarred);
          setStars(prevStars);
          clearProviderToken();
          setPromptOpen(true);
          return;
        }
        if (!res.ok || !data.ok) {
          setStarred(prevStarred);
          setStars(prevStars);
          setFeedback(data.error || "Could not update star on GitHub.");
          return;
        }
        setStarred(Boolean(data.starred));
        if (typeof data.stars === "number") setStars(data.stars);
        setFeedback(data.starred ? "Starred on GitHub" : "Removed star on GitHub");
        window.setTimeout(() => setFeedback(""), 2600);
      } catch {
        setStarred(prevStarred);
        setStars(prevStars);
        setFeedback("Network error while updating GitHub star.");
      } finally {
        setBusy(false);
      }
    },
    [busy, repo, starred, stars]
  );

  // Fetch public live star count on mount.
  useEffect(() => {
    let alive = true;
    fetch(`/api/github/stars?repo=${encodeURIComponent(repo)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { stars?: number; available?: boolean } | null) => {
        if (!alive || !d) return;
        if (typeof d.stars === "number") setStars(d.stars);
      })
      .catch(() => {
        /* non-blocking */
      });
    return () => {
      alive = false;
    };
  }, [repo]);

  // Check if visitor has already starred, or finish a pending star after OAuth return.
  useEffect(() => {
    if (!providerToken) {
      setStarred(false);
      return;
    }
    let pending = "";
    try {
      pending = sessionStorage.getItem(PENDING_STAR_KEY) || "";
      if (pending === repo) sessionStorage.removeItem(PENDING_STAR_KEY);
    } catch {
      /* storage unavailable */
    }
    if (pending === repo) {
      void performToggle("star", providerToken);
      return;
    }

    let alive = true;
    fetch("/api/github/stars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo, action: "check", providerToken }),
    })
      .then(async (r) => {
        const d = (await r.json()) as { ok?: boolean; starred?: boolean; stars?: number; code?: string };
        if (!alive) return;
        if (r.status === 401 || d.code === "AUTH_REQUIRED") {
          clearProviderToken();
          return;
        }
        if (d.ok) {
          setStarred(Boolean(d.starred));
          if (typeof d.stars === "number") setStars(d.stars);
        }
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      alive = false;
    };
  }, [providerToken, repo]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close popover when clicking outside or pressing Escape.
  useEffect(() => {
    if (!promptOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPromptOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPromptOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [promptOpen]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (providerToken) {
      void performToggle(starred ? "unstar" : "star", providerToken);
    } else {
      setPromptOpen((v) => !v);
    }
  };

  const handleConnectGitHub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      sessionStorage.setItem(PENDING_STAR_KEY, repo);
    } catch {
      /* ignore */
    }
    startOAuth("github", "public_repo");
  };

  return (
    <div
      ref={wrapRef}
      className={compact ? "gh-star-wrap compact" : "gh-star-wrap"}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={[
          "gh-star-btn",
          compact ? "compact" : "",
          starred ? "starred" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleClick}
        disabled={busy}
        aria-pressed={starred}
        aria-expanded={!providerToken ? promptOpen : undefined}
        aria-label={
          starred
            ? `Starred ${repo} on GitHub${stars !== null ? ` (${stars} stars)` : ""}`
            : `Star ${repo} on GitHub${stars !== null ? ` (${stars} stars)` : ""}`
        }
        title={
          providerToken
            ? starred
              ? `Unstar ${repo} on GitHub`
              : `Star ${repo} on GitHub`
            : `Star ${repo} on GitHub`
        }
      >
        <Star
          size={compact ? 13 : 15}
          fill={starred ? "currentColor" : "none"}
          aria-hidden="true"
        />
        <span>{starred ? "Starred" : "Star"}</span>
        {stars !== null && (
          <span className="gh-star-count">{formatStarCount(stars)}</span>
        )}
      </button>

      {feedback && (
        <span className="gh-star-feedback" role="status" aria-live="polite">
          {feedback}
        </span>
      )}

      {promptOpen && (
        <div
          className="gh-star-popover"
          role="dialog"
          aria-label={`Star ${repo} on GitHub`}
        >
          <p>
            Connect your GitHub account to star <strong>{repo}</strong> directly from Aur Labs, or open it on GitHub.
          </p>
          <div className="gh-star-popover-actions">
            <button
              type="button"
              className="gh-star-connect"
              onClick={handleConnectGitHub}
            >
              Connect GitHub &amp; Star
            </button>
            <a
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-star-ext"
              onClick={() => setPromptOpen(false)}
            >
              Open on GitHub ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
