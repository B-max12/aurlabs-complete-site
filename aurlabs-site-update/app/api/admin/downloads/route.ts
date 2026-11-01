import { authorized, json } from "@/lib/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!(await authorized(req))) return json({ error: "Sign in to continue." }, 401);
  try {
    const rows = Array.from(await sql()`select product_slug, version, platform, count, last_at from public.download_counts order by count desc, last_at desc limit 100`) as unknown as { product_slug: string; version: string; platform: string; count: number; last_at: number }[];
    return json({ rows, total: rows.reduce((n, r) => n + Number(r.count), 0) });
  } catch { return json({ error: "Download counts couldn’t be loaded." }, 503); }
}
