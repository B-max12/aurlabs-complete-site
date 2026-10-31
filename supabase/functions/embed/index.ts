// @ts-nocheck - this file runs on Supabase (Deno), not in the Next.js build
// embed: turns short texts into 384-number vectors using Supabase's built-in gte-small model (English).
// Only the website server may call it: requests must carry the secret in the x-embed-key header.
// Deploy with verify_jwt = false and set the secret EMBED_KEY (the same value as the EMBED_KEY variable on Vercel).
// deno-lint-ignore no-explicit-any
declare const Supabase: any;

const session = new Supabase.ai.Session("gte-small");
const KEY = Deno.env.get("EMBED_KEY") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!KEY || req.headers.get("x-embed-key") !== KEY) return new Response("Unauthorized", { status: 401 });
  let body: { texts?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const texts = body?.texts;
  if (!Array.isArray(texts) || texts.length < 1 || texts.length > 16 || texts.some((t) => typeof t !== "string" || t.length > 4000)) {
    return new Response("Bad request", { status: 400 });
  }
  const embeddings: number[][] = [];
  for (const t of texts as string[]) {
    const e = await session.run(t, { mean_pool: true, normalize: true });
    embeddings.push(Array.from(e as ArrayLike<number>));
  }
  return new Response(JSON.stringify({ embeddings }), { headers: { "Content-Type": "application/json" } });
});
