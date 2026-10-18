# Deployment: Vercel + Supabase

The site is a standard Next.js (App Router) app. Data lives in a Supabase project, and it deploys on Vercel.
(The earlier ChatGPT/Cloudflare version is preserved in git history; ARCHITECTURE.md and the older notes describe that version.)

## Services
- Supabase project `aurlabs-site` (org "Aur Labs", region ap-south-1, ref `zitgifdbkpvdrgpvczle`). Tables: content, submissions, administrators, admin_unlocks, rate_limits, audit_log, media, media_blobs. Row Level Security is ON for all of them, and no public policies exist: only the server reads and writes, through a direct database connection.
- Vercel hosts the site. Uploaded images are stored in the `media_blobs` table (limit 4 MB per image because Vercel accepts request bodies up to about 4.5 MB).

## Environment variables (Vercel -> Project Settings -> Environment Variables)
| Name | Secret? | What it is |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | no | `https://zitgifdbkpvdrgpvczle.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | no | the project's publishable key (see `.env.example`) |
| `SUPABASE_DB_URL` | YES | Supabase -> Connect -> Transaction pooler string (port 6543) with the database password filled in |
| `AUR_ADMIN_SETUP_TOKEN` | YES | random string, 32+ characters, used once to create the first admin |

## Supabase Auth settings (dashboard, one time)
1. Authentication -> URL Configuration: set Site URL to `https://aurlabs.online` and add `https://aurlabs.online/admin` to Redirect URLs (also add the Vercel preview URL while testing).
2. After the owner has signed in once, turn off "Allow new users to sign up" (Authentication -> Sign In / Providers). Strangers cannot become admin anyway (setup needs the secret token), but this keeps the user list clean.

## Admin login (two steps)
1. Email sign-in link (Supabase Auth proves you own the email).
2. Admin username + password (first visit: also the setup token). Unlocks last 30 minutes.

## Build and run
`pnpm install` then `pnpm build` and `pnpm start` (Node 22.13+). Vercel runs `next build` automatically.

## Domain
The domain `aurlabs.online` lives at Namecheap. When Vercel shows the DNS records for the domain, change only the `@` A record and the `www` CNAME. Do not touch email (MX / mail forwarding) settings.
