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

## Build and run
`pnpm install` then `pnpm build` and `pnpm start` (Node 22.13+). Vercel runs `next build` automatically.

## Domain
The domain `aurlabs.online` lives at Namecheap. When Vercel shows the DNS records for the domain, change only the `@` A record and the `www` CNAME. Do not touch email (MX / mail forwarding) settings.
