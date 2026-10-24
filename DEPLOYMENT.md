# Deployment: Vercel + Supabase

The site is a standard Next.js (App Router) app. Data lives in a Supabase project, and it deploys on Vercel.
(The earlier ChatGPT/Cloudflare version is preserved in git history; ARCHITECTURE.md and the older notes describe that version.)

## Services
- Supabase project `aurlabs-site` (org "Aur Labs", region ap-south-1, ref `zitgifdbkpvdrgpvczle`). Tables: content, submissions, administrators, admin_unlocks, rate_limits, audit_log, media, media_blobs. Row Level Security is ON for all of them, and no public policies exist: only the server reads and writes, through a direct database connection.
- Vercel hosts the site. Uploaded images are stored in the `media_blobs` table (limit 4 MB per image because Vercel accepts request bodies up to about 4.5 MB).

## Environment variables (Vercel -> Project Settings -> Environment Variables)
| Name | Secret? | What it is |
|---|---|---|
| `SUPABASE_DB_URL` | YES | Supabase -> Connect -> Transaction pooler string (port 6543) with the database password filled in |
| `AUR_ADMIN_SETUP_TOKEN` | YES | random string, 32+ characters, used once to create the first admin |

## Admin login
Username + password only (first visit: also the private setup token). Sessions last 30 minutes. Repeated wrong attempts are rate limited per IP. There is no third-party or email sign-in on the admin page; Supabase is used only as the database.

## Email (Resend)
Form submissions are saved to the admin Inbox and also emailed to the site owner (`lib/mail.ts`). Replying to that email answers the visitor directly. Sending is best effort and never blocks a submission.

| Variable | Secret? | What it is |
|---|---|---|
| `RESEND_API_KEY` | YES | a Resend key with sending access, restricted to aurlabs.online |
| `MAIL_FROM` | no | `Aur Labs <noreply@aurlabs.online>` |
| `MAIL_TO` | no | `aur@aurlabs.online` |

DNS for sending (Namecheap): DKIM `resend._domainkey`, SPF TXT and MX on `send`, CNAME `rsend`. The `send` MX needs Namecheap Mail Settings set to Custom MX; the mailbox itself (Private Email) needs its own MX records kept at the root.

## Visitor sign-in (public site)
Visitors can sign in with Google, GitHub, Microsoft or an email link (Supabase Auth). Code: `app/visitor-session.ts`, `app/visitor.tsx`. Visitor accounts never get admin access (the admin uses its own username/password). A signed-in visitor gets name/email pre-filled on forms.

Supabase dashboard settings this relies on:
1. Authentication > Sign In / Providers: enable Google, GitHub, Azure (Microsoft) and Email. In each provider's own console, set the callback URL to `https://<project-ref>.supabase.co/auth/v1/callback`.
2. Authentication > URL Configuration: Site URL `https://aurlabs.online`; Redirect URLs `https://aurlabs.online/**`.
3. Authentication > Emails > SMTP: configure a custom SMTP sender. Supabase's built-in email service only delivers to project team members, so email sign-in links will not reach ordinary visitors without it.

Optional env vars (defaults are built in): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Build and run
`pnpm install` then `pnpm build` and `pnpm start` (Node 22.13+). Vercel runs `next build` automatically.

## Domain
The domain `aurlabs.online` lives at Namecheap. When Vercel shows the DNS records for the domain, change only the `@` A record and the `www` CNAME. Do not touch email (MX / mail forwarding) settings.
