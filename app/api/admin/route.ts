import { authorized, sameOrigin, json, parseBody, readContent } from "@/lib/server";
import { saveEntry, listEntries, deleteEntry, reindexMissing, listUnanswered, dismissUnanswered, starterEntries, search, type KbKind } from "@/lib/kb";

export const runtime = "nodejs";
const kinds: KbKind[] = ["qa", "howto", "feature"];

export async function GET(req: Request) {
  if (!(await authorized(req))) return json({ error: "Sign in to continue." }, 401);
  try {
    const entries = await listEntries();
    const unanswered = await listUnanswered();
    const products = (await readContent(true)).products.filter((p) => p.slug).map((p) => ({ slug: p.slug, name: p.name, status: p.status }));
    return json({ entries, unanswered, products, vectorSearch: !!process.env.EMBED_KEY });
  } catch { return json({ error: "The knowledge base couldn’t be loaded. Try again." }, 503); }
}

const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/\r/g, "").trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "This action must come from the website." }, 403);
  if (!(await authorized(req))) return json({ error: "Your admin session has ended. Sign in again to continue." }, 401);
  let b: Record<string, unknown>;
  try { b = await parseBody(req, 20000); } catch { return json({ error: "That request couldn’t be read." }, 400); }
  try {
    if (b.action === "save") {
      const question = clean(b.question, 200), answer = clean(b.answer, 4000);
      const slug = clean(b.product_slug, 80);
      if (question.length < 4) return json({ error: "Write the question (at least 4 characters)." }, 400);
      if (!answer) return json({ error: "Write the answer." }, 400);
      if (slug && !/^[a-z0-9-]+$/.test(slug)) return json({ error: "Choose a product from the list." }, 400);
      const kind = kinds.includes(b.kind as KbKind) ? (b.kind as KbKind) : "qa";
      const variants = clean(b.variants, 1800).split("\n").map((s) => s.trim().slice(0, 160)).filter(Boolean).slice(0, 12).join("\n");
      const id = typeof b.id === "string" && /^[a-zA-Z0-9-]{6,80}$/.test(b.id) ? b.id : crypto.randomUUID();
      const r = await saveEntry({ id, product_slug: slug, kind, question, answer, variants, published: b.published === true });
      return json({ ok: true, id, indexed: r.indexed });
    }
    if (b.action === "delete" && typeof b.id === "string") { await deleteEntry(b.id); return json({ ok: true }); }
    if (b.action === "reindex") return json({ ok: true, ...(await reindexMissing()) });
    if (b.action === "dismiss" && typeof b.id === "string") { await dismissUnanswered(b.id); return json({ ok: true }); }
    if (b.action === "starter") {
      const product = (await readContent(true)).products.find((p) => p.slug === clean(b.slug, 80));
      if (!product) return json({ error: "Choose a product first." }, 400);
      const existing = new Set((await listEntries()).map((e) => e.id));
      let created = 0;
      for (const e of starterEntries(product)) { if (existing.has(e.id)) continue; await saveEntry(e, { skipEmbed: true }); created++; }
      const r = await reindexMissing();
      return json({ ok: true, created, indexed: r.done });
    }
    if (b.action === "test") {
      const question = clean(b.question, 300);
      if (question.length < 3) return json({ error: "Type a question to test." }, 400);
      const r = await search(question, clean(b.slug, 80));
      const rows = r.status === "answer" ? [r.hit, ...r.related] : r.related;
      return json({ ok: true, status: r.status, semantic: r.semantic, answer: r.status === "answer" ? r.hit.answer : null, matches: rows.map((h) => ({ question: h.question, product: h.product_slug, sem: Number(h.sem.toFixed(3)), lex: Number(h.lex.toFixed(3)), tri: Number(h.tri.toFixed(3)) })) });
    }
    return json({ error: "Unknown action." }, 400);
  } catch { return json({ error: "That didn’t work. Please try again." }, 503); }
}
