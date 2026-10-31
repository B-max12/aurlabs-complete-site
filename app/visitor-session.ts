"use client";
// Visitor sign-in through Supabase Auth (Google, GitHub, Microsoft or an email link).
// This is separate from the admin login: visitor accounts never get admin access.
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zitgifdbkpvdrgpvczle.supabase.co";
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Fk0YvX-4fPS3Cqly8CqF5Q_hv6vyeeO";

export type Visitor = { id: string; email: string; name: string; avatar: string; provider: string };
type Stored = { access_token: string; refresh_token: string; expires_at: number; user: Visitor };

export const STORAGE_KEY = "aur-visitor-v1";
const RETURN_KEY = "aur-return-to";
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((f) => f());
export const notify = () => emit();
export const subscribe = (f: () => void) => { listeners.add(f); return () => { listeners.delete(f); }; };
export const snapshot = () => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } };

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s?.access_token && s?.user?.id ? (s as Stored) : null;
  } catch { return null; }
}
function write(s: Stored | null) {
  try { if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); else localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
  emit();
}
export function parseVisitor(raw: string | null): Visitor | null {
  if (!raw) return null;
  try { const s = JSON.parse(raw); return s?.user?.id ? (s.user as Visitor) : null; } catch { return null; }
}
export const getVisitor = (): Visitor | null => read()?.user ?? null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toVisitor = (u: any): Visitor => ({
  id: String(u?.id || ""),
  email: String(u?.email || ""),
  name: String(u?.user_metadata?.full_name || u?.user_metadata?.name || u?.user_metadata?.user_name || String(u?.email || "").split("@")[0] || "").slice(0, 80),
  avatar: String(u?.user_metadata?.avatar_url || u?.user_metadata?.picture || ""),
  provider: String(u?.app_metadata?.provider || "email"),
});

async function fetchUser(token: string): Promise<Visitor> {
  const r = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
  if (!r.ok) throw new Error("We couldn’t verify that sign-in. Please try again.");
  const v = toVisitor(await r.json());
  if (!v.id) throw new Error("We couldn’t verify that sign-in. Please try again.");
  return v;
}

/** Call once per page load. Reads the result of a provider redirect from the URL. Returns a short message to show, or null. */
export async function completeSignIn(): Promise<{ kind: "ok" | "error"; text: string } | null> {
  const hash = new URLSearchParams(location.hash.startsWith("#") ? location.hash.slice(1) : "");
  const query = new URLSearchParams(location.search);
  const clean = () => history.replaceState(null, "", location.pathname + (query.has("error_description") || query.has("error") ? "" : location.search));
  const problem = hash.get("error_description") || query.get("error_description");
  if (problem) { clean(); return { kind: "error", text: "Sign-in didn’t complete: " + problem.replace(/\+/g, " ").slice(0, 160) + "." }; }
  const token = hash.get("access_token");
  if (!token) return null;
  try {
    const user = await fetchUser(token);
    const expiresIn = Number(hash.get("expires_in")) || 3600;
    write({ access_token: token, refresh_token: hash.get("refresh_token") || "", expires_at: Date.now() + expiresIn * 1000, user });
    let back = "";
    try { back = sessionStorage.getItem(RETURN_KEY) || ""; sessionStorage.removeItem(RETURN_KEY); } catch { /* ignore */ }
    history.replaceState(null, "", location.pathname + location.search);
    if (back && back.startsWith("/") && !back.startsWith("//") && back !== location.pathname + location.search) { location.replace(back); return null; }
    return { kind: "ok", text: "Signed in as " + (user.name || user.email) + "." };
  } catch (e) {
    history.replaceState(null, "", location.pathname + location.search);
    return { kind: "error", text: e instanceof Error ? e.message : "Sign-in failed. Please try again." };
  }
}

/** Returns a valid access token (refreshing it when it is about to expire), or null when signed out. */
export async function getAccessToken(): Promise<string | null> {
  const s = read();
  if (!s) return null;
  if (s.expires_at - Date.now() > 60_000) return s.access_token;
  if (!s.refresh_token) { write(null); return null; }
  try {
    const r = await fetch(SB_URL + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: SB_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: s.refresh_token }) });
    if (!r.ok) { write(null); return null; }
    const d = await r.json();
    write({ access_token: d.access_token, refresh_token: d.refresh_token || s.refresh_token, expires_at: Date.now() + (Number(d.expires_in) || 3600) * 1000, user: d.user ? toVisitor(d.user) : s.user });
    return d.access_token as string;
  } catch { return s.access_token; }
}

export async function signOut() {
  const s = read();
  write(null);
  if (s) { try { await fetch(SB_URL + "/auth/v1/logout", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + s.access_token } }); } catch { /* already signed out locally */ } }
}

const rememberReturn = () => { try { sessionStorage.setItem(RETURN_KEY, location.pathname + location.search); } catch { /* ignore */ } };
const redirectTarget = () => encodeURIComponent(location.origin + "/");

export type Provider = "google" | "github" | "azure";
export function startOAuth(provider: Provider) {
  rememberReturn();
  location.href = SB_URL + "/auth/v1/authorize?provider=" + provider + (provider === "azure" ? "&scopes=email" : "") + "&redirect_to=" + redirectTarget();
}

export async function sendEmailLink(email: string) {
  const value = email.trim();
  if (!/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(value)) throw new Error("Enter a valid email address.");
  rememberReturn();
  const r = await fetch(SB_URL + "/auth/v1/otp?redirect_to=" + redirectTarget(), { method: "POST", headers: { apikey: SB_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ email: value, create_user: true }) });
  if (r.ok) return;
  let msg = "";
  try { const d = await r.json(); msg = String(d.msg || d.error_description || d.message || ""); } catch { /* ignore */ }
  if (r.status === 429) throw new Error("Too many requests. Please wait a minute and try again.");
  throw new Error(msg ? msg.slice(0, 160) : "We couldn’t send the link. Please try again.");
}
