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

export async function sendTeamAdminInvite(opts: { to: string; name: string; token: string; adminUrl: string }): Promise<boolean> {
  const safeName = clean(opts.name, 80);
  const text = [
    `Hello ${safeName},`,
    "",
    "You have been granted Team Admin access to the Aur Labs studio.",
    "",
    `Admin page: ${opts.adminUrl}`,
    `Your email: ${opts.to}`,
    `Your access token: ${opts.token}`,
    "",
    "Open the admin page, choose Team Member Token, enter your email and paste this access token.",
    "Team Admin accounts can edit and publish content, upload media, and review submissions, but cannot invite or remove other admins.",
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#121216;max-width:560px">
<p style="margin:0 0 8px;font-size:13px;color:#4a4b52">Aur Labs Studio Invitation</p>
<h2 style="margin:0 0 12px;font-size:20px">Hello ${esc(safeName)},</h2>
<p style="margin:0 0 14px">You have been invited as a <strong>Team Admin</strong> for Aur Labs. Open the studio sign in page, switch to <strong>Team Member Token</strong>, and enter your email with the token below.</p>
<div style="padding:14px 16px;background:#f4f4f6;border:1px solid #d5d6dc;border-radius:10px;margin:0 0 16px">
  <div style="font-size:12px;color:#4a4b52;margin-bottom:4px">Email</div>
  <div style="font-weight:600;margin-bottom:10px">${esc(opts.to)}</div>
  <div style="font-size:12px;color:#4a4b52;margin-bottom:4px">Personal Access Token</div>
  <code style="display:block;word-break:break-all;font-size:13px;color:#121216">${esc(opts.token)}</code>
</div>
<p style="margin:0 0 16px"><a href="${esc(opts.adminUrl)}" style="display:inline-block;padding:10px 16px;background:#121216;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600">Open Aur Labs Studio</a></p>
<p style="margin:0;font-size:12px;color:#4a4b52">Keep this token private. Only the main owner can invite or revoke team access.</p>
</div>`;
  return sendMail({ to: opts.to, subject: "Your Aur Labs Team Admin access token", text, html });
}
