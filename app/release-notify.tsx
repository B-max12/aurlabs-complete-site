"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { getKnownVisitor, getVisitor } from "./visitor-session";

export function ReleaseNotify({
  productName,
  platform = "",
}: {
  productName: string;
  platform?: string;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const openedAt = useRef(0);
  const idKey = useRef("");

  useEffect(() => {
    if (!openedAt.current) openedAt.current = Date.now();
    if (!idKey.current) idKey.current = crypto.randomUUID();
    const v = getVisitor() || getKnownVisitor();
    if (v?.email) setEmail((prev) => prev || v.email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const trimmed = email.trim();
    if (!/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Enter a valid email address such as you@example.com.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (!idKey.current) idKey.current = crypto.randomUUID();
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "notify",
          email: trimmed,
          product: productName,
          platform,
          website: "",
          idempotencyKey: idKey.current,
          elapsedMs: openedAt.current ? Math.max(1500, Date.now() - openedAt.current) : 2000,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !data.reference) {
        throw new Error(data.error || "Could not save your notification request.");
      }
      setReference(data.reference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (reference) {
    return (
      <div className="release-notify-box done" role="status">
        <CheckCircle2 size={16} />
        <span>
          You’re on the release list for <strong>{productName}</strong> (Ref {reference}).
        </span>
      </div>
    );
  }

  return (
    <form className="release-notify-box" onSubmit={handleSubmit} noValidate>
      <div className="release-notify-label">
        <Bell size={14} />
        <span>
          Get notified when <strong>{productName}</strong>
          {platform ? ` for ${platform}` : ""} is ready:
        </span>
      </div>
      <div className="release-notify-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label={`Email for ${productName} release notification`}
          required
        />
        <button type="submit" className="button orange small-button" disabled={busy}>
          {busy ? "Saving…" : "Notify me"}
        </button>
      </div>
      {error && (
        <p className="release-notify-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
