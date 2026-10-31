// Auri knowledge base: entries the owner writes, found again by meaning (vector) and by words (full text).
// Auri only ever answers with text the owner wrote. Nothing is generated.
import { sql } from "./db";
import { sha } from "./server";
import type { Product } from "./content";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zitgifdbkpvdrgpvczle.supabase.co";

export type KbKind = "qa" | "howto" | "feature";
export type KbRow = { id: string; product_slug: string; kind: KbKind; question: string; answer: string; variants: string; published: number; has_vector: boolean; updated_at: number };

/** Turns texts into 384-number vectors through the `embed` edge function. Returns null when it is unavailable. */
export async function embed(texts: string[], timeoutMs = 6000): Promise<number[][] | null> {
  const key = process.env.EMBED_KEY;
  if (!key || !texts.length) return null;
  try {
    const res = await fetch(SB_URL + "/functions/v1/embed", { method: "POST", headers: { "Content-Type": "application/json", "x-embed-key": key }, body: JSON.stringify({ texts }), signal: AbortSignal.timeout(timeoutMs), cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const e = data?.embeddings;
    return Array.isArray(e) && e.length === texts.length && e.every((v: unknown) => Array.isArray(v) && v.length === 384) ? e : null;
  } catch {
    return null;
  }
}

const vec = (v: number[]) => "[" + v.map((n) => Number(n.toFixed(6))).join(",") + "]";
export const embedText = (e: { question: string; variants: string; answer: string }) =>
  ("Question: " + e.question + (e.variants.trim() ? "\nAlso asked as: " + e.variants.split("\n").map((s) => s.trim()).filter(Boolean).join("; ") : "") + "\nAnswer: " + e.answer.replace(/\s+/g, " ").slice(0, 160)).slice(0, 1500);

export type EntryInput = { id: string; product_slug: string; kind: KbKind; question: string; answer: string; variants: string; published: boolean };

export async function saveEntry(e: EntryInput, opts: { skipEmbed?: boolean } = {}): Promise<{ indexed: boolean }> {
  const v = opts.skipEmbed ? undefined : (await embed([embedText(e)], 12000))?.[0];
  await sql()`
    insert into public.kb_entries (id, product_slug, kind, question, answer, variants, published, embedding, updated_at)
    values (${e.id}, ${e.product_slug}, ${e.kind}, ${e.question}, ${e.answer}, ${e.variants}, ${e.published ? 1 : 0}, ${v ? vec(v) : null}::extensions.vector, ${Date.now()})
    on conflict (id) do update set product_slug = excluded.product_slug, kind = excluded.kind, question = excluded.question, answer = excluded.answer,
      variants = excluded.variants, published = excluded.published, embedding = excluded.embedding, updated_at = excluded.updated_at`;
  return { indexed: !!v };
}

export async function listEntries(): Promise<KbRow[]> {
  const rows = await sql()`select id, product_slug, kind, question, answer, variants, published, (embedding is not null) as has_vector, updated_at from public.kb_entries order by product_slug, updated_at desc limit 1000`;
  return Array.from(rows) as unknown as KbRow[];
}
export async function deleteEntry(id: string) { await sql()`delete from public.kb_entries where id = ${id}`; }

/** Creates vectors for entries that do not have one yet (for example when the embedding service was down while saving). */
export async function reindexMissing(): Promise<{ done: number; failed: number }> {
  const rows = (await sql()`select id, question, variants, answer from public.kb_entries where embedding is null limit 24`) as unknown as { id: string; question: string; variants: string; answer: string }[];
  if (!rows.length) return { done: 0, failed: 0 };
  const vectors = await embed(rows.map(embedText), 20000);
  if (!vectors) return { done: 0, failed: rows.length };
  for (let i = 0; i < rows.length; i++) await sql()`update public.kb_entries set embedding = ${vec(vectors[i])}::extensions.vector where id = ${rows[i].id}`;
  return { done: rows.length, failed: 0 };
}

export type Hit = { id: string; product_slug: string; kind: KbKind; question: string; answer: string; sem: number; lex: number; tri: number; score: number };
export type Answer =
  | { status: "answer"; hit: Hit; related: Hit[]; semantic: boolean }
  | { status: "suggest"; related: Hit[]; semantic: boolean }
  | { status: "none"; related: Hit[]; semantic: boolean };

/** Chooses between answering, asking "did you mean", and admitting it does not know. Limits come from measured similarities. */
export function decide(rows: Hit[], semantic: boolean): Answer {
  const top = rows[0];
  if (!top) return { status: "none", related: [], semantic };
  const second = rows[1];
  const near = (h: Hit) => (semantic ? h.sem >= 0.8 || h.lex >= 0.4 : h.lex >= 0.3);
  // tri is how closely the words match the written question or one of its alternative phrasings; near-identical wording is always answered.
  const confident = semantic ? top.tri >= 0.8 || top.sem >= 0.86 || (top.sem >= 0.82 && top.sem - (second?.sem ?? 0) >= 0.03) || (top.lex >= 0.75 && top.sem >= 0.78) || (top.tri >= 0.6 && top.sem >= 0.82) : top.lex >= 0.6;
  if (confident) return { status: "answer", hit: top, related: rows.slice(1).filter(near).slice(0, 3), semantic };
  const related = rows.filter(near).slice(0, 3);
  return related.length ? { status: "suggest", related, semantic } : { status: "none", related: [], semantic };
}

export async function search(question: string, slug: string): Promise<Answer> {
  const q = question.trim().slice(0, 300);
  const v = (await embed([q], 5000))?.[0];
  const rows = (await sql()`select * from public.kb_search(${v ? vec(v) : null}::extensions.vector, ${q}, ${slug}, 6)`) as unknown as Hit[];
  return decide(rows.map((r) => ({ ...r, sem: Number(r.sem), lex: Number(r.lex), tri: Number(r.tri), score: Number(r.score) })), !!v);
}

export async function logUnanswered(question: string) {
  const q = question.trim().replace(/\s+/g, " ").slice(0, 300);
  if (q.length < 4) return;
  const id = (await sha(q.toLowerCase().replace(/[^\p{L}\p{N} ]+/gu, ""))).slice(0, 16);
  await sql()`insert into public.kb_unanswered (id, question, count, last_seen, handled) values (${id}, ${q}, 1, ${Date.now()}, 0)
    on conflict (id) do update set count = kb_unanswered.count + 1, last_seen = excluded.last_seen, handled = 0`;
}
export async function listUnanswered() {
  return Array.from(await sql()`select id, question, count, last_seen from public.kb_unanswered where handled = 0 order by count desc, last_seen desc limit 40`) as unknown as { id: string; question: string; count: number; last_seen: number }[];
}
export async function dismissUnanswered(id: string) { await sql()`update public.kb_unanswered set handled = 1 where id = ${id}`; }

/** Questions to show as starting points: this product's first, then general ones. */
export async function suggestions(slug: string, limit = 4): Promise<string[]> {
  const rows = (await sql()`select question from public.kb_entries where published = 1 and kind = 'qa' order by (product_slug = ${slug}) desc, updated_at desc limit ${limit}`) as unknown as { question: string }[];
  return rows.map((r) => r.question);
}

const list = (items: string[]) => items.map((x) => "- " + x).join("\n");

/** Draft entries built from what the product record already says. They are saved unpublished for the owner to review. */
export function starterEntries(p: Product): EntryInput[] {
  const slug = p.slug, n = p.name;
  const draft = (key: string, kind: KbKind, question: string, answer: string, variants: string[] = []): EntryInput => ({ id: `starter-${slug}-${key}`, product_slug: slug, kind, question, answer, variants: variants.join("\n"), published: false });
  const out: EntryInput[] = [
    draft("what", "qa", `What is ${n}?`, `${n} — ${p.tagline}\n\n${p.description.split("\n\n")[0]}`, [`Tell me about ${n}`, `What does ${n} do?`, `What is ${n} used for?`]),
    draft("platforms", "qa", `Which platforms does ${n} support?`, p.platforms.length ? `${n} is built for: ${p.platforms.join(", ")}.${p.status === "released" ? "" : " It is not released yet."}` : `The supported platforms for ${n} have not been announced yet.`, [`Does ${n} run on Windows?`, `Does ${n} run on Linux?`, `Is ${n} available for Mac?`, `What operating systems does ${n} work on?`]),
    draft("download", "qa", `How do I download ${n}?`, p.releases.length ? `Downloads for ${n} are on its page under Releases:\n${list(p.releases.map((r) => `${r.platform} ${r.version}`))}` : `${n} is not released yet, so there is nothing to download. Check back on its page soon.`, [`Where can I get ${n}?`, `Where is the download link for ${n}?`, `How do I install ${n}?`]),
    draft("features", "qa", `What features does ${n} have?`, p.features.length ? `${n} offers:\n${list(p.features)}` : `The feature list for ${n} is being written.`, [`What can ${n} do?`, `What are the main features of ${n}?`]),
    draft("price", "qa", `Is ${n} free?`, `Add the real answer here: price, license${p.license ? ` (the record says ${p.license})` : ""} and anything that costs money.`, [`How much does ${n} cost?`, `Is ${n} open source?`, `What license does ${n} use?`]),
    draft("howto", "howto", `How do I use ${n}?`, `1. Add the first step.\n2. Add the next step.\n3. Add what the person should see when it works.`, [`How do I get started with ${n}?`, `${n} tutorial`, `${n} getting started guide`]),
  ];
  if (p.repository) out.push(draft("source", "qa", `Where is the source code for ${n}?`, `The source code for ${n} is public: ${p.repository}`, [`Is ${n} open source?`, `Where is the ${n} GitHub?`]));
  p.features.slice(0, 12).forEach((f, i) => out.push(draft("feature-" + i, "feature", `What is "${f}" in ${n}?`, `Add the full details of "${f}": what it does, how to use it, and when it helps.`, [`How does ${f} work in ${n}?`, `Tell me about ${f}`])));
  return out;
}

