// Outgoing email through Resend's HTTP API. Best effort: a failed email never blocks a form submission.
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
const clean = (s: string, max = 200) => s.replace(/[\r\n\t\u0000-\u001f]+/g, " ").trim().slice(0, max);

export async function sendMail(opts: { to: string; subject: string; text: string; html: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [opts.to], subject: clean(opts.subject, 150), text: opts.text, html: opts.html, reply_to: opts.replyTo }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("Email not sent", res.status);
    return res.ok;
  } catch (e) {
    console.error("Email not sent", e instanceof Error ? e.name : "error");
    return false;
  }
}

const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase());

/** Tells the site owner that a visitor sent a form. Replying to this email goes straight to the visitor. */
export async function notifySubmission(kind: string, name: string, email: string, details: Record<string, unknown>, reference: string) {
  const to = process.env.MAIL_TO;
  if (!to) return;
  const rows = Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => [label(k), clean(Array.isArray(v) ? v.join(", ") : typeof v === "object" ? JSON.stringify(v) : String(v), 3000)] as const);
  const what = kind === "join" ? "volunteer application" : "message";
  const text = [`New ${what} from ${clean(name, 80)} <${email}>`, "", ...rows.map(([k, v]) => `${k}: ${v}`), "", `Reference: ${reference}`, "Reply to this email to answer them directly."].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0a0a0a;max-width:560px">
<p style="margin:0 0 4px;font-size:13px;color:#737373">New ${esc(what)}</p>
<h2 style="margin:0 0 16px;font-size:20px">${esc(clean(name, 80))}</h2>
<p style="margin:0 0 16px"><a href="mailto:${esc(email)}" style="color:#0a0a0a">${esc(email)}</a></p>
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-top:1px solid #ececec">${rows.map(([k, v]) => `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #ececec;color:#737373;vertical-align:top;width:140px">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #ececec;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table>
<p style="margin:16px 0 0;font-size:13px;color:#737373">Reference ${esc(reference)} · Reply to this email to answer them directly.</p></div>`;
  await sendMail({ to, subject: `New ${what} from ${clean(name, 60)}`, text, html, replyTo: email });
}