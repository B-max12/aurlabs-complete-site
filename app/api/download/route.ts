import { readContent, clientIp, rateLimit } from "@/lib/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

// Visitors reach a file through this address so downloads can be counted. It only ever redirects to a download
// address that is saved on a published product in the admin, never to an address taken from the request.
const NOT_PEOPLE = /bot|crawl|spider|slurp|preview|curl|wget|python|axios|headless|monitor|lighthouse|pagespeed|uptime/i;
const headers = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

const PRIVATE_HOST_RE =
  /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|169\.254\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|0\.0\.0\.0|\[::1\]|.*\.local)$/i;

export function isSafeDownloadTarget(rawUrl?: string): boolean {
  if (!rawUrl || typeof rawUrl !== "string") return false;
  try {
    const u = new URL(rawUrl.trim());
    if (u.protocol !== "https:") return false;
    if (u.username || u.password) return false;
    if (!u.hostname || PRIVATE_HOST_RE.test(u.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

async function handle(req: Request, count: boolean) {
  const q = new URL(req.url).searchParams;
  const slug = q.get("p") || "";
  const os = q.get("os") || "";
  const version = q.get("v") || "";
  const index = Number(q.get("r"));
  const back = (path: string) =>
    new Response(null, { status: 302, headers: { ...headers, Location: new URL(path, req.url).toString() } });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return back("/products");

  let product;
  try {
    product = (await readContent()).products.find((p) => p.slug === slug);
  } catch {
    return back("/" + slug);
  }
  if (!product) return back("/products");

  const byIndex = Number.isInteger(index) ? product.releases[index] : undefined;
  const release =
    byIndex && byIndex.platform === os && byIndex.version === version
      ? byIndex
      : [...product.releases]
          .filter((r) => r.platform === os && (!version || r.version === version))
          .sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!release || !isSafeDownloadTarget(release.url)) return back("/" + slug);

  if (count && !NOT_PEOPLE.test(req.headers.get("user-agent") || "") && !req.headers.get("sec-purpose")) {
    try {
      const key = `${slug}|${release.version}|${release.platform}`;
      // One count per visitor per file every 10 minutes, so refreshing the page does not inflate the number.
      if (await rateLimit("dl:" + clientIp(req) + ":" + key, 1, 600000)) {
        await sql()`insert into public.download_counts (id, product_slug, version, platform, count, last_at)
          values (${key}, ${slug}, ${release.version}, ${release.platform}, 1, ${Date.now()})
          on conflict (id) do update set count = download_counts.count + 1, last_at = excluded.last_at`;
      }
    } catch {
      /* counting must never block a download */
    }
  }
  return new Response(null, { status: 302, headers: { ...headers, Location: release.url } });
}

export const GET = (req: Request) => handle(req, true);
export const HEAD = (req: Request) => handle(req, false);
