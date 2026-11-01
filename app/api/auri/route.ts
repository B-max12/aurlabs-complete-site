import { json, parseBody, sameOrigin, clientIp, rateLimit } from "@/lib/server";
import { search, logUnanswered, suggestions, type Hit } from "@/lib/kb";

export const runtime = "nodejs";
const productFrom = (path: string) => { const m = /^\/products\/([a-z0-9-]{1,80})/.exec(path || ""); return m ? m[1] : ""; };
const brief = (h: Hit) => ({ question: h.question });

/** Starting-point questions for the page the visitor is on. */
export async function GET(req: Request) {
  const slug = productFrom(new URL(req.url).searchParams.get("path") || "");
  try { return json({ suggestions: await suggestions(slug) }); } catch { return json({ suggestions: [] }); }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "This action must come from the website." }, 403);
  if (!(await rateLimit("auri:" + clientIp(req), 20, 600000)) || !(await rateLimit("auri:all", 5000, 86400000))) return json({ error: "That’s a lot of questions at once. Please try again in a few minutes." }, 429);
  let b: Record<string, unknown>;
  try { b = await parseBody(req, 4000); } catch { return json({ error: "That request couldn’t be read." }, 400); }
  const question = typeof b.question === "string" ? b.question.trim() : "";
  if (question.length < 3 || question.length > 300) return json({ error: "Please ask a question between 3 and 300 characters." }, 400);
  try {
    const r = await search(question, productFrom(typeof b.path === "string" ? b.path : ""));
    if (r.status !== "answer") await logUnanswered(question).catch(() => undefined);
    if (r.status === "answer") return json({ status: "answer", question: r.hit.question, answer: r.hit.answer, kind: r.hit.kind, href: r.hit.product_slug ? "/products/" + r.hit.product_slug : null, related: r.related.map(brief) });
    return json({ status: r.status, related: r.related.map(brief) });
  } catch {
    return json({ error: "Auri couldn’t look that up right now. Please try again, or contact the team." }, 503);
  }
}
