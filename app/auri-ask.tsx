"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Send } from "lucide-react";

type Result =
  | { status: "answer"; question: string; answer: string; href: string | null; related: { question: string }[] }
  | { status: "suggest"; related: { question: string }[] }
  | { status: "none" };

/** Shows an answer written by the owner. Lines starting "- " become bullets and "1. " numbered steps; everything else stays plain text. */
function AnswerText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [], steps: string[] = [], para: string[] = [];
  const flush = () => {
    if (para.length) { blocks.push(<p key={blocks.length}>{para.join(" ")}</p>); para = []; }
    if (bullets.length) { blocks.push(<ul key={blocks.length}>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>); bullets = []; }
    if (steps.length) { blocks.push(<ol key={blocks.length}>{steps.map((b, i) => <li key={i}>{b}</li>)}</ol>); steps = []; }
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const b = /^[-•]\s+(.*)$/.exec(line), n = /^\d+[.)]\s+(.*)$/.exec(line);
    if (!line) flush();
    else if (b) { if (para.length || steps.length) flush(); bullets.push(b[1]); }
    else if (n) { if (para.length || bullets.length) flush(); steps.push(n[1]); }
    else { if (bullets.length || steps.length) flush(); para.push(line); }
  }
  flush();
  return <div className="ask-answer-text">{blocks}</div>;
}

export function AuriAsk() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [asked, setAsked] = useState("");
  const [error, setError] = useState("");
  const [starters, setStarters] = useState<string[]>([]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/auri?path=" + encodeURIComponent(location.pathname)).then((r) => r.json()).then((d) => { if (live && Array.isArray(d.suggestions)) setStarters(d.suggestions.slice(0, 4)); }).catch(() => undefined);
    return () => { live = false; };
  }, []);

  const ask = async (text: string) => {
    const question = text.trim();
    if (question.length < 3 || busy) return;
    setBusy(true); setError(""); setAsked(question); setQ(question);
    try {
      const res = await fetch("/api/auri", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, path: location.pathname }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Auri couldn’t answer that right now.");
      setResult(data as Result);
      window.setTimeout(() => box.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 50);
    } catch (e) { setResult(null); setError(e instanceof Error ? e.message : "Auri couldn’t answer that right now."); }
    finally { setBusy(false); }
  };

  const chips = (items: { question: string }[], label: string) => items.length > 0 && (
    <div className="ask-related"><span>{label}</span>{items.map((r) => <button type="button" key={r.question} onClick={() => ask(r.question)}>{r.question}</button>)}</div>
  );

  return (
    <section className="auri-ask" aria-label="Ask Auri a question">
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }}>
        <label htmlFor="auri-question">Ask about our tools</label>
        <div className="ask-row">
          <input id="auri-question" value={q} maxLength={300} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Does it work on Linux?" autoComplete="off" />
          <button type="submit" disabled={busy || q.trim().length < 3} aria-label="Ask"><Send size={16} /></button>
        </div>
      </form>
      {!result && !error && starters.length > 0 && <div className="ask-related"><span>Try asking</span>{starters.map((s) => <button type="button" key={s} onClick={() => ask(s)}>{s}</button>)}</div>}
      <div ref={box} aria-live="polite">
        {busy && <p className="ask-status">Looking that up…</p>}
        {error && <p className="ask-status error">{error}</p>}
        {!busy && result?.status === "answer" && (
          <div className="ask-answer">
            <b>{result.question}</b>
            <AnswerText text={result.answer} />
            {result.href && <a className="text-link" href={result.href}>See the page <ArrowUpRight size={14} /></a>}
            {chips(result.related, "Related")}
          </div>
        )}
        {!busy && result?.status === "suggest" && (
          <div className="ask-answer">
            <b>I’m not sure I understood. Did you mean one of these?</b>
            {chips(result.related, "")}
            <p className="ask-status">Still not it? <a href="/contact">Ask the team</a>.</p>
          </div>
        )}
        {!busy && result?.status === "none" && (
          <div className="ask-answer">
            <b>I don’t know that yet.</b>
            <p className="ask-status">I’ve noted your question so the team can add an answer. You can also <a href="/contact">ask the team directly</a>.</p>
          </div>
        )}
      </div>
      <small className="ask-note">Answers come from what the team has written about its tools. Your question is matched on our own servers and saved, without your name or address, only so the team can see what is missing.</small>
    </section>
  );
}
