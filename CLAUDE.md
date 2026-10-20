# CURRENT STATE (read first)

This project was migrated from ChatGPT's Cloudflare hosting to **Next.js on Vercel + Supabase (Postgres)**.
- Database access: `lib/db.ts` (a small adapter that keeps the old D1-style `prepare().bind().first()/all()/run()` API on top of Postgres).
- Admin auth: username + password only (`lib/server.ts` `authorized()`, unlock tokens in `admin_unlocks`). No Supabase Auth / OAuth on the admin page.
- Media: `media` + `media_blobs` tables (no object storage).
- Deployment steps and env vars: `DEPLOYMENT.md`. Env template: `.env.example`.
- ARCHITECTURE.md, ENV_AND_SECRETS.md, TODO_AND_KNOWN_ISSUES.md and the `handoff/` folder describe the OLD Cloudflare version; treat them as history.
- Owner: Saad (Aur Labs). Domain: aurlabs.online (Namecheap). Never change DNS or mail settings without the owner's explicit approval.

---

# Claude handoff — Aur Labs

## Brief

The owner wants Aur Labs, a free-software initiative founded by Awab Ur Rehman with designer Nafisa, moved from ChatGPT Sites hosting to GitHub/Vercel and maintained by Claude. Public email is aur@Aurlabs.online. Preserve the website currently live at aurlabs.online; do not redesign it or silently deploy the unreleased monochrome candidate. This repository contains all context needed to start without the old chat.

Root application is **production v2 `4847db8e2e23a9acb1083b4c60b3d272514265d4`**. It uses React 19.2.6, TypeScript 5.9.3, Vinext 1.0.0-beta.5, Vite 8.0.13, Tailwind 4.2.1, Cloudflare Workers/D1/R2, Zod and Three.js. Node 24.19.0 and pnpm 11.25.0 were verified. Start locally with `node scripts/start-local.mjs`; check with `node scripts/start-local.mjs --check`. 305 assertions, TypeScript and a production build passed for the root source. This is not the 548-assertion v3 candidate.

## Five essential facts before editing

1. **Source identity:** all 144 original production files are present and hashed. Only README, fake env example and ignore metadata have root handoff changes; their originals are preserved. Application code/styles/assets are unchanged.
2. **Two distinct versions:** `history/aur-labs-unreleased-v6.zip` is a full archive of newer v3 work, never deployed. It includes an extensive Supabase adapter but also changes the design. Do not merge it wholesale to perform an exact migration.
3. **Platform boundary:** D1/R2 and ChatGPT trusted identity are runtime services, not portable files. The root build is a Cloudflare Worker. Vercel preset changes alone cannot run it. Never accept incoming identity headers as proof of login on a new host.
4. **Data/secrets:** complete bounded reads found no content overrides, media-index records or submissions. Source seeds reproduce visible content. Security/audit state and complete R2 inventory are not exported; no real passwords, keys or tokens are included. The owner previously confirmed Supabase key rotation. Do not request old credentials or assume empty public tables imply an empty full backend.
5. **Current owner intent:** transfer to GitHub/Vercel, preserve live appearance, document every limitation and avoid another vague implementation plan. GitHub create-repository tools were unavailable, so this is the complete transfer ZIP. No Vercel project, DNS change or production deployment was performed. Use the docs' explicit facts and working local export; do not claim an external cutover is complete until it is verified.

## Coding conventions and constraints

The original custom components are compact TSX, often with long lines. Preserve behavior when formatting. Client components use `use client`, React hooks and native dialogs; server route handlers use web Request/Response and D1. The `@/` alias points to repository root. Validate writes with the shared Zod schemas, require same-origin checks and server-side authorization, retain idempotency keys, and show success only after confirmed saves. Source content belongs in `lib/content.ts`; overrides live in D1. There is no live Supabase or SMTP client in v2.

Do not hand-edit the lockfile, invent released products, claim Linux compatibility beyond verified builds, treat concept imagery as real screenshots, invent donation receipts, or reuse the localhost auth mock in production. The original `next.config.ts` contains an empty object/comment because it had no extra options; no code is omitted. Existing decorative command text is illustrative, not a package installation instruction.

Read `ARCHITECTURE.md` for every file, `ENV_AND_SECRETS.md` for service boundaries, `DEPLOYMENT.md` for exact incompatibilities and DNS facts, `CONTENT_AND_SEO.md` for all text and SEO values, and `TODO_AND_KNOWN_ISSUES.md` for the remaining work. `data/public-content.json` is a readable copy of current public content; the production app still reads its canonical seed module and D1, so document/content-reference edits alone do not change runtime content. Intentional future source edits will make `scripts/verify-handoff.mjs` report drift; review and explicitly update/remove that export-only guard as part of the new development workflow, rather than claiming the changed app is still an exact production snapshot.

## Previous requests and present status

| Owner request | Status | Actual state |
| --- | --- | --- |
| Build Aur Labs website, pages and shop-like product catalogue | Done in live source | Original design and concepts preserved; no released binaries supplied |
| Founder/designer/public email and mission copy | Done in live source | See `lib/content.ts` |
| 3D-style branding and helpful robot/button explanations | Partly done | Hero raster parallax and procedural Auri exist; real-device/assistive-tech appearance is unverified |
| Manage versions/blogs/research/team through admin | Done in live source | Single ChatGPT-bound owner editor; actual live login not reverified during export |
| Host on aurlabs.online / understand one-domain admin | Done for existing host | Public site and `/admin` share the domain; new hosting move not done |
| Set requested admin credentials / retry login | Not confirmed | No password hardcoded, reset or exported; owner state not inspected |
| Aur Labs 3.0 monochrome upgrade | Partly done | Implemented in the complete unreleased archive; not live |
| Supabase, staff roles, MFA, recovery, OAuth/SMTP | Partly done | Source adapter exists in archive; provider configuration reported but hosted behavior not verified |
| Advanced Auri rules, settings/legal preview, media pagination | Partly done | Implemented/tested locally in archive; not live |
| Full backup, migration, staging and rollback | Not done | Tooling and reports available; actual complete export/rehearsal absent |
| Responsive image variants, scheduled publishing, install commands | Not done | Variant delivery and scheduler absent; no real reviewed install commands |
| Complete all launch checks | Partly done | Local source checks and release evidence done; hosted/browser/legal acceptance not established |
| Export exact live code and complete handoff | Done | This package contains source, assets, content snapshots, hashes, docs and verification logs |
| Create private GitHub aurlabs-site and push main | Not done | Current connector lacks repository creation; exact local upload commands supplied |
| Deploy unchanged on Vercel | Not done | Cloudflare bindings and platform identity require an actual compatibility implementation |

The current public URL is https://aurlabs.online. Do not delete its existing hosting or DNS while merely reviewing this package. No task depends on access to the previous chat; all source and concrete findings are recorded here.
