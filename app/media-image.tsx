// Serves uploaded product screenshots through Next's image optimiser (AVIF/WebP, right-sized for the screen).
// Uploaded files can be several MB; this sends the browser a version that fits its screen.
const WIDTHS = [640, 828, 1200, 1920];
const THUMB_WIDTHS = [256, 384];
const optimised = (src: string, w: number) => "/_next/image?url=" + encodeURIComponent(src) + "&w=" + w + "&q=75";

export function MediaImage({ src, alt, sizes = "100vw", priority = false, thumb = false, className }: { src: string; alt: string; sizes?: string; priority?: boolean; thumb?: boolean; className?: string }) {
  const common = { alt, className, decoding: "async" as const, loading: priority ? ("eager" as const) : ("lazy" as const), fetchPriority: priority ? ("high" as const) : undefined };
  if (!src.startsWith("/api/media/")) return <img src={src} {...common} />; // external addresses are left as they are
  const widths = thumb ? THUMB_WIDTHS : WIDTHS;
  return <img src={optimised(src, widths[Math.min(1, widths.length - 1)])} srcSet={widths.map((w) => optimised(src, w) + " " + w + "w").join(", ")} sizes={thumb ? "96px" : sizes} {...common} />;
}

