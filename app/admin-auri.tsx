"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Sparkles, RefreshCw, X } from "lucide-react";

type Kind = "qa" | "howto" | "feature";
type Entry = { id: string; product_slug: string; kind: Kind; question: string; answer: string; variants: string; published: number; has_vector: boolean; updated_at: number };
type Unanswered = { id: string; question: string; count: number; last_seen: number };
type Product = { slug: string; name: string; status: string };
type Draft = { id?: string; product_slug: string; kind: Kind; question: string; answer: string; variants: string; published: boolean };
type TestResult = { status: string; semantic: boolean; answer: string | null; matches: { question: string; product: string; sem: number; lex: number }[] };

const KIND_LABEL: Record<Kind, string> = { qa: "Question & answer", howto: "How to use", feature: "Feature detail" };
const blank = (slug = ""): Draft => ({ product_slug: slug, kind: "qa", question: "", answer: "", variants: "", published: true });

export default function AuriKnowledge({ token }: { token: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [unanswered, setUnanswered] = useState<Unanswered[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [vectorSearch, setVectorSearch] = useState(true);
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [testQ, setTestQ] = useState("");
  const [test, setTest] = useState<TestResult | null>(null);

  const call = useCallback(async (body?: Record<string, unknown>) => {
    const res = await fetch("/api/admin/kb", { method: body ? "POST" : "GET", headers: { "x-aur-unlock": token, ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
    return data;
  }, [token]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await call();
      setEntries(d.entries); setUnanswered(d.unanswered); setProducts(d.products); setVectorSearch(d.vectorSearch);
    } catch (e) { setError(e instanceof Error ? e.message : "Couldn’t load."); }
    finally { setLoading(false); }
  }, [call]);
  useEffect(() => { load(); }, [load]);

  const run = async (fn: () => Promise<void>) => { setBusy(true); setError(""); setMessage(""); try { await fn(); } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); } finally { setBusy(false); } };

  const visible = useMemo(() => entries.filter((e) => filter === "all" || (filter === "general" ? e.product_slug === "" : e.product_slug === filter)), [entries, filter]);
  const productName = (slug: string) => products.find((p) => p.slug === slug)?.name || (slug ? slug : "General");
  const missing = entries.filter((e) => !e.has_vector).length;
  const drafts = visible.filter((e) => !e.published).length;

  const save = () => draft && run(async () => {
    const r = await call({ action: "save", id: draft.id, product_slug: draft.product_slug, kind: draft.kind, question: draft.question, answer: draft.answer, variants: draft.variants, published: draft.published });
    setMessage(r.indexed ? "Saved. Auri can now find it by meaning and by words." : "Saved. Meaning-based search is temporarily unavailable, so use Re-index later.");
    setDraft(null); await load();
  });
  const remove = (id: string) => window.confirm("Delete this entry?") && run(async () => { await call({ action: "delete", id }); setMessage("Deleted."); await load(); });
  const starter = () => run(async () => {
    if (filter === "all" || filter === "general") throw new Error("Choose a product in the filter first.");
    const r = await call({ action: "starter", slug: filter });
    setMessage(r.created ? `${r.created} draft entries created. Edit each one, then tick Published.` : "The starter set already exists for this product."); await load();
  });
  const reindex = () => run(async () => { const r = await call({ action: "reindex" }); setMessage(r.failed ? "The search service did not answer. Try again in a minute." : `${r.done} entries indexed.`); await load(); });
  const runTest = () => run(async () => { setTest(await call({ action: "test", question: testQ, slug: filter !== "all" && filter !== "general" ? filter : "" })); });
  const dismiss = (id: string) => run(async () => { await call({ action: "dismiss", id }); await load(); });

  const field = (label: string, el: React.ReactNode, hint?: string) => <div className="field"><label>{label}</label>{el}{hint && <span className="field-hint">{hint}</span>}</div>;

  return (
    <>
      <div className="admin-page-title"><div><h1>Auri knowledge</h1><p>Write what Auri should know about each product. Auri finds the best match for a visitor’s question and answers with your words. Nothing is invented.</p></div><button className="button dark" onClick={() => setDraft(blank(filter !== "all" && filter !== "general" ? filter : ""))}><Plus size={15} />New entry</button></div>
      {error && <div className="form-error" role="alert">{error}<button className="icon-button" aria-label="Dismiss error" onClick={() => setError("")}><X size={15} /></button></div>}
      {message && <div className="admin-notice" role="status">{message}</div>}
      {!vectorSearch && <div className="info-banner"><span>Meaning-based search is not configured (EMBED_KEY missing). Auri will match on words only.</span></div>}

      {draft ? (
        <div className="admin-editor kb-editor">
          <div className="editor-top"><b>{draft.id ? "Edit entry" : "New entry"}</b><label className="check-label"><input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} /><span>Published (Auri can use it)</span></label></div>
          <div className="fields-grid">
            {field("Product", <select value={draft.product_slug} onChange={(e) => setDraft({ ...draft, product_slug: e.target.value })}><option value="">General (about Aur Labs)</option>{products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select>)}
            {field("Type", <select value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value as Kind })}>{(Object.keys(KIND_LABEL) as Kind[]).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}</select>)}
          </div>
          {field("Question or title", <input value={draft.question} maxLength={200} onChange={(e) => setDraft({ ...draft, question: e.target.value })} placeholder="Does Aurelis resume interrupted downloads?" />, "Write it the way a visitor would ask.")}
          {field("Other ways people ask this", <textarea value={draft.variants} rows={4} onChange={(e) => setDraft({ ...draft, variants: e.target.value })} placeholder={"Can I pause and continue a download?\nWhat happens if my internet drops?"} />, "One per line, up to 12. This is what helps Auri understand different wording.")}
          {field("Answer", <textarea value={draft.answer} rows={8} maxLength={4000} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} placeholder={"Yes. Aurelis keeps the finished parts and continues from where it stopped."} />, "Start a line with “- ” for a bullet, or “1. ” for numbered steps. Be exact: Auri repeats this word for word.")}
          <div className="editor-footer"><span className="muted">English only for now.</span><div style={{ display: "flex", gap: 10 }}><button className="button light" onClick={() => setDraft(null)} disabled={busy}>Cancel</button><button className="button dark" onClick={save} disabled={busy || draft.question.trim().length < 4 || !draft.answer.trim()}>{busy ? "Saving…" : "Save entry"}</button></div></div>
        </div>
      ) : (
        <>
          <section className="admin-panel kb-test">
            <h2>Try a question</h2>
            <p className="muted">See what a visitor would get, and how close the match is. Search is done on the filter below.</p>
            <form className="kb-test-row" onSubmit={(e) => { e.preventDefault(); if (testQ.trim().length >= 3) runTest(); }}>
              <input value={testQ} onChange={(e) => setTestQ(e.target.value)} placeholder="Is it available for ubuntu?" aria-label="Test question" />
              <button className="button dark" disabled={busy || testQ.trim().length < 3}>Test</button>
            </form>
            {test && <div className="kb-test-result" role="status">
              <b>{test.status === "answer" ? "Auri would answer:" : test.status === "suggest" ? "Auri would ask “did you mean…”" : "Auri would say it doesn’t know yet"}</b>
              {test.answer && <p style={{ whiteSpace: "pre-wrap" }}>{test.answer}</p>}
              {test.matches.length > 0 && <ul>{test.matches.map((m, i) => <li key={i}>{m.question} <span className="muted">· {productName(m.product)} · meaning {m.sem} · words {m.lex}</span></li>)}</ul>}
              {!test.semantic && <p className="muted">Meaning-based search was unavailable for this test, so only words were compared.</p>}
            </div>}
          </section>

          <div className="catalogue-toolbar">
            <div className="field" style={{ minWidth: 220 }}><label>Show</label><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All entries ({entries.length})</option><option value="general">General</option>{products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select></div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
              <button className="button light" onClick={starter} disabled={busy || filter === "all" || filter === "general"} title="Creates draft questions from the product record"><Sparkles size={15} />Create starter questions</button>
              {missing > 0 && <button className="button light" onClick={reindex} disabled={busy}><RefreshCw size={15} />Re-index ({missing})</button>}
            </div>
          </div>
          {drafts > 0 && <p className="muted" style={{ margin: "0 0 12px" }}>{drafts} draft{drafts > 1 ? "s" : ""} here are not visible to Auri until you tick Published.</p>}

          {loading ? <p className="muted">Loading…</p> : visible.length === 0 ? (
            <div className="empty-state"><h2>Nothing here yet</h2><p>{filter !== "all" && filter !== "general" ? "Choose “Create starter questions” to get drafts built from this product, then edit and publish them." : "Add your first entry, or pick a product and create its starter questions."}</p></div>
          ) : (
            <div className="admin-panel" style={{ padding: "8px 24px" }}>
              {visible.map((e) => (
                <div className="content-row" key={e.id}>
                  <div className="tx" style={{ flex: 1, minWidth: 0 }}>
                    <b>{e.question}</b>
                    <p>{productName(e.product_slug)} · {KIND_LABEL[e.kind]}{!e.has_vector ? " · not indexed yet" : ""}</p>
                  </div>
                  <span className={"admin-badge" + (e.published ? " published" : "")}>{e.published ? "Published" : "Draft"}</span>
                  <button className="button light small-button" onClick={() => setDraft({ id: e.id, product_slug: e.product_slug, kind: e.kind, question: e.question, answer: e.answer, variants: e.variants, published: !!e.published })}>Edit</button>
                  <button className="icon-button danger" aria-label={"Delete " + e.question} onClick={() => remove(e.id)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}

          {unanswered.length > 0 && (
            <section className="admin-panel kb-unanswered">
              <h2>Questions Auri couldn’t answer</h2>
              <p className="muted">What visitors asked that has no good match. Write an answer for the ones that come up often. The text is stored without any name or address.</p>
              {unanswered.map((u) => (
                <div className="content-row" key={u.id}>
                  <div className="tx" style={{ flex: 1, minWidth: 0 }}><b>{u.question}</b><p>Asked {u.count} time{u.count > 1 ? "s" : ""}</p></div>
                  <button className="button light small-button" onClick={() => setDraft({ ...blank(filter !== "all" && filter !== "general" ? filter : ""), question: u.question.endsWith("?") ? u.question : u.question + "?" })}>Write an answer</button>
                  <button className="icon-button" aria-label={"Dismiss " + u.question} onClick={() => dismiss(u.id)}><X size={16} /></button>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
}
