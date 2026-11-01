"use client";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LogOut, User, X } from "lucide-react";
import { STORAGE_KEY, completeSignIn, notify, parseVisitor, sendEmailLink, signOut, snapshot, startOAuth, subscribe, type Provider, type Visitor } from "./visitor-session";

export function useVisitor(): Visitor | null {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => parseVisitor(raw), [raw]);
}

const GoogleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" /><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24z" /><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" /><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" /></svg>;
const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" /></svg>;
const MicrosoftIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#F25022" d="M2 2h9.5v9.5H2z" /><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" /><path fill="#00A4EF" d="M2 12.5h9.5V22H2z" /><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" /></svg>;
const PROVIDERS: [Provider, string, () => ReactNode][] = [["google", "Continue with Google", GoogleIcon], ["github", "Continue with GitHub", GithubIcon], ["azure", "Continue with Microsoft", MicrosoftIcon]];

function SignInDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button, input")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>("button:not([disabled]), input, a[href]"));
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; previous?.focus(); };
  }, [onClose]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setState("sending");
    try { await sendEmailLink(email); setState("sent"); }
    catch (err) { setError(err instanceof Error ? err.message : "We couldn’t send the link."); setState("idle"); }
  };
  return (
    <div className="visitor-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={panel} className="visitor-dialog" role="dialog" aria-modal="true" aria-labelledby="visitor-title">
        <button type="button" className="visitor-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h2 id="visitor-title">Sign in to Aur Labs</h2>
        <p className="visitor-lead">Use an account you already have. We only use it to recognise you and fill in your details on forms.</p>
        {state === "sent" ? (
          <div className="visitor-sent" role="status">
            <b>Check your inbox</b>
            <p>We sent a sign-in link to <strong>{email.trim()}</strong>. Open it on this device to finish signing in.</p>
            <button type="button" className="visitor-link" onClick={() => setState("idle")}>Use a different email</button>
          </div>
        ) : (
          <>
            <div className="visitor-providers">
              {PROVIDERS.map(([id, label, Icon]) => <button key={id} type="button" className="visitor-provider" onClick={() => startOAuth(id)}><Icon />{label}</button>)}
            </div>
            <div className="visitor-or"><span>or</span></div>
            <form onSubmit={submit} noValidate>
              <label htmlFor="visitor-email">Email address</label>
              <input id="visitor-email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? "visitor-error" : undefined} />
              {error && <p id="visitor-error" className="visitor-error" role="alert">{error}</p>}
              <button type="submit" className="visitor-submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Email me a sign-in link"}</button>
            </form>
          </>
        )}
        <p className="visitor-fine">By continuing you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}

let booted = false;
export function AccountMenu() {
  const visitor = useVisitor();
  const [dialog, setDialog] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (booted) return;
    booted = true;
    completeSignIn().then((n) => { if (n) { setNotice(n); window.setTimeout(() => setNotice(null), 6000); } });
  }, []);
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setMenu(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", key); };
  }, [menu]);
  // Keep tabs in sync when the visitor signs in or out elsewhere.
  useEffect(() => {
    const sync = (e: StorageEvent) => { if (e.key === STORAGE_KEY) notify(); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const initial = (visitor?.name || visitor?.email || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="visitor-account" ref={wrap}>
      {visitor ? (
        <>
          <button type="button" className="visitor-avatar-btn" aria-haspopup="menu" aria-expanded={menu} aria-label="Account menu" onClick={() => setMenu((v) => !v)}>
            {visitor.avatar ? <img src={visitor.avatar} alt="" referrerPolicy="no-referrer" /> : <span>{initial}</span>}
          </button>
          {menu && (
            <div className="visitor-menu" role="menu">
              <div className="visitor-menu-head"><b>{visitor.name || "Signed in"}</b><span>{visitor.email}</span></div>
              <button type="button" role="menuitem" onClick={() => { setMenu(false); signOut(); }}><LogOut size={15} /> Sign out</button>
            </div>
          )}
        </>
      ) : (
        <button type="button" className="visitor-signin-btn" aria-label="Sign in" onClick={() => setDialog(true)}><User size={15} /><span>Sign in</span></button>
      )}
      {dialog && !visitor && createPortal(<SignInDialog onClose={() => setDialog(false)} />, document.body)}
      {notice && createPortal(<div className={"visitor-toast " + notice.kind} role="status">{notice.text}</div>, document.body)}
    </div>
  );
}
