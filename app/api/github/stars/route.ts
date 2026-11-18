import { json, sameOrigin, parseBody, clientIp, rateLimit } from "@/lib/server";

export const runtime = "nodejs";

const REPO_RE = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/;
const CACHE_TTL_MS = 5 * 60 * 1000;
const starCache = new Map<string, { stars: number; updatedAt: number }>();

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "AurLabs-Website/1.0",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const auth = token || process.env.GITHUB_TOKEN;
  if (auth) headers.Authorization = `Bearer ${auth}`;
  return headers;
}

async function fetchRepoStars(repo: string, userToken?: string, bypassCache = false): Promise<number | null> {
  const key = repo.toLowerCase();
  const cached = starCache.get(key);
  if (!bypassCache && cached && Date.now() - cached.updatedAt < CACHE_TTL_MS) {
    return cached.stars;
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: githubHeaders(userToken),
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!res.ok) return cached ? cached.stars : null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    if (typeof data.stargazers_count === "number" && Number.isFinite(data.stargazers_count)) {
      starCache.set(key, { stars: data.stargazers_count, updatedAt: Date.now() });
      return data.stargazers_count;
    }
    return cached ? cached.stars : null;
  } catch {
    return cached ? cached.stars : null;
  }
}

export async function GET(req: Request) {
  const repo = (new URL(req.url).searchParams.get("repo") || "").trim();
  if (!REPO_RE.test(repo)) {
    return json({ error: "Invalid repository." }, 400);
  }
  const key = repo.toLowerCase();
  const cached = starCache.get(key);
  if (cached && Date.now() - cached.updatedAt < CACHE_TTL_MS) {
    return json({ repo, stars: cached.stars, cached: true, available: true });
  }
  const stars = await fetchRepoStars(repo);
  return json({ repo, stars: stars ?? 0, available: stars !== null });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return json({ error: "Cross-site requests are not allowed." }, 403);
  }
  const ok = await rateLimit("gh-star:" + clientIp(req), 40, 60_000);
  if (!ok) {
    return json({ error: "Too many star requests. Please wait a minute." }, 429);
  }

  let body: { repo?: unknown; action?: unknown; providerToken?: unknown };
  try {
    body = (await parseBody(req, 8000)) as typeof body;
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }

  const repo = typeof body.repo === "string" ? body.repo.trim() : "";
  const action = typeof body.action === "string" ? body.action : "";
  const providerToken = typeof body.providerToken === "string" ? body.providerToken.trim() : "";

  if (!REPO_RE.test(repo)) {
    return json({ error: "Invalid repository." }, 400);
  }
  if (action !== "check" && action !== "star" && action !== "unstar") {
    return json({ error: "Invalid action." }, 400);
  }
  if (providerToken.length < 10 || providerToken.length > 300) {
    return json({ error: "Missing or invalid GitHub authorization.", code: "AUTH_REQUIRED" }, 401);
  }

  const method = action === "check" ? "GET" : action === "star" ? "PUT" : "DELETE";
  const headers = githubHeaders(providerToken);
  if (action === "star") headers["Content-Length"] = "0";

  let res: Response;
  try {
    res = await fetch(`https://api.github.com/user/starred/${repo}`, {
      method,
      headers,
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
  } catch {
    return json({ error: "Could not reach GitHub right now." }, 502);
  }

  if (res.status === 401 || res.status === 403) {
    return json(
      { error: "GitHub authorization expired or missing public_repo permission.", code: "AUTH_REQUIRED" },
      401
    );
  }
  if (res.status === 404 && action !== "check") {
    return json({ error: "Repository not found on GitHub." }, 404);
  }

  if (action === "check") {
    const starred = res.status === 204;
    const stars = starCache.get(repo.toLowerCase())?.stars ?? (await fetchRepoStars(repo, providerToken)) ?? 0;
    return json({ ok: true, starred, stars });
  }

  if (res.status === 204 || res.status === 304) {
    const freshStars = await fetchRepoStars(repo, providerToken, true);
    return json({ ok: true, starred: action === "star", stars: freshStars ?? 0 });
  }

  return json({ error: "Unexpected response from GitHub." }, 502);
}
