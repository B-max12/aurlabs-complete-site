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

| Variable | Secret | Value |
|---|---|---|
| `RESEND_API_KEY` | yes | a Resend key with sending access, restricted to aurlabs.online |
| `MAIL_FROM` | no | `Aur Labs <noreply@aurlabs.online>` |
| `MAIL_TO` | no | `aur@aurlabs.online` |

DNS for sending (Namecheap): DKIM `resend._domainkey`, SPF TXT and MX on `send`, CNAME `rsend`. The `send` MX needs Namecheap Mail Settings set to Custom MX; the mailbox itself (Private Email) needs its own MX records kept at the root.

## Auri knowledge (answers by meaning)
Tables `kb_entries` and `kb_unanswered`, the search function `kb_search` and the Edge Function `embed` live in the Supabase project (see `supabase/`). The website server calls the function with the `EMBED_KEY` environment variable (secret). See `AURI_GUIDE.md`.

## Downloads and counting
Download buttons point to `/api/download?p=<slug>&os=<platform>&v=<version>&r=<release index>` (`app/api/download/route.ts`). It redirects to the release URL saved in the admin (never to an address from the request) and adds one to `download_counts` (one per visitor per file per 10 minutes; crawlers and HEAD requests are ignored). Counts show in Admin > Overview. The product page picks the visitor's platform from their browser and offers the newest release for it; for a platform with no build it says so. Add a new version in Admin > Products as another release; the newest by date is offered first.

## SEO
Per-product titles, descriptions, structured data, `sitemap.xml` and `robots.txt` are generated from the database (`lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/route-page.tsx`). See `SEO_GUIDE.md`. The route file `app/[[...slug]]/page.tsx` is deliberately tiny: Next.js needs `revalidate` written in that file, everything else is in `app/route-page.tsx`.

## Visitor sign-in (public site)
Visitors can sign in with Google, GitHub, Microsoft or an email link (Supabase Auth). Code: `app/visitor-session.ts`, `app/visitor.tsx`. Visitor accounts never get admin access (the admin uses its own username/password). A signed-in visitor gets name/email pre-filled on forms.

Supabase dashboard settings this relies on:
1. Authentication > Sign In / Providers: enable Google, GitHub, Azure (Microsoft) and Email. In each provider's own console, set the callback URL to `https://<project-ref>.supabase.co/auth/v1/callback`.
2. Authentication > URL Configuration: Site URL `https://aurlabs.online`; Redirect URLs `https://aurlabs.online/**`.
3. Authentication > Emails > SMTP: configure a custom SMTP sender. Supabase's built-in email service only delivers to project team members, so email sign-in links will not reach ordinary visitors without it.

Optional env vars (defaults are built in): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Performance and security notes
- Font: Inter is self-hosted (`app/fonts`, loaded with `next/font/local`); no request goes to Google Fonts.
- Images: uploaded screenshots are served through Next's optimiser (`app/media-image.tsx`, `images` settings in `next.config.ts`). The first (hero) image is preloaded with high priority.
- The 3D guide (Auri, three.js) loads a few seconds after the page is ready, or on first interaction (`DeferredAuri` in `app/site.tsx`; `app/auri-help.ts` is the small always-loaded bridge).
- CSS is inlined into the HTML (`experimental.inlineCss`), so there are no render-blocking stylesheets.
- Security headers (HSTS, nosniff, frame protection, referrer and permissions policy, COOP) are set in `next.config.ts`. A strict script CSP is not enabled because Next's inline scripts need nonces; only the safe directives are set.
- Production source maps are published (`productionBrowserSourceMaps`).

## Build and run
`pnpm install` then `pnpm build` and `pnpm start` (Node 22.13+). Vercel runs `next build` automatically.

## Domain
The domain `aurlabs.online` lives at Namecheap. When Vercel shows the DNS records for the domain, change only the `@` A record and the `www` CNAME. Do not touch email (MX / mail forwarding) settings.
