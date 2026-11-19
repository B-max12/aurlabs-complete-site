"use client";

import { ExternalLink, PlayCircle } from "lucide-react";

function parseYouTubeId(url: URL): string | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const v = url.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{6,20}$/.test(v)) return v;
    const parts = url.pathname.split("/").filter(Boolean);
    if ((parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") && parts[1]) {
      return /^[A-Za-z0-9_-]{6,20}$/.test(parts[1]) ? parts[1] : null;
    }
  }
  return null;
}

function parseVimeoId(url: URL): string | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[0] === "video" ? parts[1] : parts[0];
    return id && /^\d{4,15}$/.test(id) ? id : null;
  }
  return null;
}

function isDirectVideo(raw: string): boolean {
  if (/^\/api\/media\/[a-f0-9-]+\.(mp4|webm)$/i.test(raw)) return true;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

export function VideoSection({
  url,
  title = "Video",
  caption,
  id = "video",
}: {
  url?: string;
  title?: string;
  caption?: string;
  id?: string;
}) {
  const raw = (url || "").trim();
  if (!raw) return null;

  let youtubeId: string | null = null;
  let vimeoId: string | null = null;
  const direct = isDirectVideo(raw);

  if (!direct) {
    try {
      const parsed = new URL(raw);
      if (parsed.protocol !== "https:") return null;
      youtubeId = parseYouTubeId(parsed);
      if (!youtubeId) vimeoId = parseVimeoId(parsed);
    } catch {
      return null;
    }
  }

  return (
    <section className="aur-video-section" id={id} aria-label={title}>
      <div className="aur-video-head">
        <span className="eyebrow">
          <PlayCircle size={14} />
          Video showcase
        </span>
        <h2>{title}</h2>
        {caption && <p>{caption}</p>}
      </div>

      {direct ? (
        <div className="aur-video-frame">
          <video controls playsInline preload="metadata" src={raw}>
            Sorry, your browser does not support embedded videos.
          </video>
        </div>
      ) : youtubeId ? (
        <div className="aur-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : vimeoId ? (
        <div className="aur-video-frame">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <a
          href={raw}
          target="_blank"
          rel="noopener noreferrer"
          className="aur-video-fallback"
        >
          <PlayCircle size={22} />
          <div>
            <b>Watch video on external platform</b>
            <span>{raw}</span>
          </div>
          <ExternalLink size={16} />
        </a>
      )}
    </section>
  );
}
