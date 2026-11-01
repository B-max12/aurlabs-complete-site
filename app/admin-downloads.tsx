"use client";
import { useEffect, useState } from "react";

type Row = { product_slug: string; version: string; platform: string; count: number; last_at: number };

/** Real download counts: one is counted each time someone starts a download from a button on this website. */
export default function DownloadStats({ token }: { token: string }) {
  const [data, setData] = useState<{ rows: Row[]; total: number } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    fetch("/api/admin/downloads", { headers: { "x-aur-unlock": token } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (live) setData(d); })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [token]);
  return (
    <section className="admin-panel" style={{ marginBottom: 24 }}>
      <h2>Downloads</h2>
      <p className="muted">Counted when someone starts a download from this website. Repeat clicks by the same person within 10 minutes count once, and search engines and link checkers are ignored. Downloads from GitHub directly are not included.</p>
      {failed ? <p className="muted">The counts couldn’t be loaded.</p> : !data ? <p className="muted">Loading…</p> : data.rows.length === 0 ? <p className="muted">No downloads counted yet.</p> : (
        <>
          <p style={{ fontSize: 28, fontWeight: 600, margin: "6px 0 10px" }}>{data.total.toLocaleString()} <span className="muted" style={{ fontSize: 14, fontWeight: 400 }}>total</span></p>
          {data.rows.slice(0, 8).map((r) => (
            <div className="content-row" key={r.product_slug + r.version + r.platform}>
              <div className="tx" style={{ flex: 1, minWidth: 0 }}><b>{r.product_slug} {r.version}</b><p>{r.platform} · last {new Date(Number(r.last_at)).toLocaleDateString()}</p></div>
              <b>{Number(r.count).toLocaleString()}</b>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
