import type { AuriMood } from "@/lib/auri-guides";

let pending: { message: string; target?: string; mood: AuriMood; at: number } | null = null;

/** Asks the Auri guide to say something. Safe to call before Auri has loaded: the request is remembered briefly. */
export function helpAuri(message: string, target?: string, mood: AuriMood = "explaining") {
  pending = { message, target, mood, at: Date.now() };
  window.dispatchEvent(new CustomEvent("auri-help", { detail: { message, target, mood } }));
}
export function takePendingHelp() {
  const p = pending;
  pending = null;
  return p && Date.now() - p.at < 6000 ? p : null;
}

