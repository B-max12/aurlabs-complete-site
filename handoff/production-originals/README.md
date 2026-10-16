# Aur Labs website

A full-stack website for Aur Labs, an independent non-profit software initiative. Built with React, TypeScript, Vinext, Cloudflare Workers, D1, and R2. The design uses warm ivory, ink, orange, custom interface concepts, an interactive product workbench, and a draggable 3D guide named Auri with a CSS fallback.

## Public routes

- `/`: home
- `/products` and `/products/:slug`: searchable catalogue and release details
- `/about`: mission, values, and team
- `/journal` and `/journal/:slug`: editorial articles
- `/research` and `/research/:slug`: research directions and articles
- `/join`: three-step volunteer application
- `/support`: optional donation inquiry / configured external checkout
- `/contact`: problem reports and general inquiries
- `/privacy`, `/terms`: website notices
- `/admin`: protected content studio

## Run and verify

Use Node 24 for the integration suite. Runtime requires Node >=22.13.0 per the supplied starter. Dependencies are locked in `pnpm-lock.yaml`.

```sh
node node_modules/typescript/bin/tsc --noEmit
node tests/integration.mjs
node tests/client.mjs
npm run db:generate
npm run build
```

The integration suite uses isolated in-memory SQLite with a D1-shaped adapter and mock R2. It checks admin authorization, setup, credentials, draft visibility, publication, validation, form persistence, idempotency, inbox lifecycle, media restrictions, and server rendering. It does not replace browser or hosted end-to-end testing.

Use the Sites workflow for installation, builds, source synchronization, and deployment. `.openai/hosting.json` declares `DB` and `BUCKET`; Sites provisions storage and applies the migration under `drizzle/`.

## Administrator setup

1. Keep the initial deployment private while setting up.
2. Set the secret `AUR_ADMIN_SETUP_TOKEN` to at least 32 random characters through the hosting environment settings. Never commit a value.
3. Open `/admin`, sign in with the ChatGPT account that should own the admin, and enter the private setup token.
4. Choose a username (3–40 letters, numbers, dots, hyphens, underscores) and password (12–128 characters).
5. Remove the setup secret from hosting after successful creation.
6. Subsequent unlocks require the same platform identity and admin username/password.

Passwords use PBKDF2-SHA-256 with 100,000 iterations, a random salt, and a 256-bit output. A 30-minute unlock is bound to the authenticated platform identity; its bearer token exists only in tab memory and its hash is stored in D1. Reloading locks the studio. A password change revokes existing unlocks. No default credentials are included.

## Content and assets

`lib/content.ts` defines typed seed content. D1 overrides it; drafts and deleted seed records are excluded from public reads. The three initial products are explicitly labelled design concepts, with no downloads. Articles are introductory copy and an explicitly labelled research direction, not fabricated study results. Confirm all public copy before opening access.

Admin supports products, versions, releases, screenshots, articles, research, team, core site copy, donation links, application availability, image upload, inbox management, audit activity, and a JSON export. Uploaded images are public assets; never upload confidential material. Supported images: PNG, JPEG, WebP, GIF, up to 5 MiB. Actual release binaries are hosted elsewhere and linked with HTTPS URLs.

Auri is deterministic help, not an AI chatbot. It provides button hints and validation examples without sending information to an AI provider.

## Donation behavior

No payment provider is configured initially. The support form prepares an email inquiry and never charges a visitor. Configure separate one-time and monthly HTTPS URLs in Site settings when ready. Suggested amounts are not passed automatically to the provider: donors confirm their amount, currency, and recurrence there. No payment webhooks, receipts, accounting ledger, or tax-deductible status are claimed.

## Design asset provenance

`public/assets/aur-sculpture.png` is an original image generated with the built-in image generation tool for this website. It is a chrome sculptural letter A embracing an orange sphere. CSS adds pointer parallax; it is not a WebGL mesh. Product concept illustrations, the brand mark, and editorial art are code-native CSS/SVG. Auri uses a procedurally built Three.js mesh, loaded on demand, with a code-native CSS fallback. No external model or texture requests are made.

The full project handoff guide is supplied separately as `Aur-Labs-Complete-Website-Guide.md`.

## October 13 update and migration status

This release adds the product workbench, separate desktop/mobile/CLI filtering, pagination, article topic filters, reference links, platform detection and release-version selection, contextual field guidance, optional tab-scoped drafts, 20-second submission timeouts with safe idempotent retry, private in-tab content preview, and editable Auri guidance under Site settings. Auri never reads passwords or sends field values to an AI service. Its hints use semantic field IDs and fall back to reserved inline slots when there is no collision-free desktop position. Reduced-motion and save-data preferences are respected. Hints, motion, position reset, and minimize are visitor controls.

The existing D1/R2 backend and ChatGPT-bound admin authorization remain active. The Supabase connector returned zero accessible projects on October 13; no Supabase schema, auth, storage, or data migration has been applied. Do not describe this deployment as a completed Supabase migration. A new project requires organization selection and the provider's project-cost confirmation before creation.

Before cutover: establish the project, back up and reconcile D1 records/R2 objects, create the normalized schema and RLS policies, migrate Auth securely without copying plaintext credentials, validate content/asset counts, test anonymous rejection for private data, verify public submissions and authorized CRUD against Supabase, and reconcile writes during the switch. Keep the old backend and previous saved Site version available for rollback. Do not run a second writer or delete D1/R2 while this is pending.

Validation uses isolated backend integration tests and Happy DOM client interaction tests. Happy DOM does not verify visual layout, native dialog focus trapping, mobile keyboards, WebGL rendering, or real-device performance. Managed browser QA was unavailable because the control-browser skill was not present. Real-browser journeys and visual/performance checks remain outstanding; the broad upgrade plan is not fully accepted solely by a successful build.
