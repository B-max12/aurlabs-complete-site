# Aur Labs — production-source handoff

This is the source of the website currently served at https://aurlabs.online, exported at `2026-10-16T21:08:40.131652+00:00`. It is an independent software initiative's public website and single-owner content studio. Public contact: **aur@Aurlabs.online**. Founder and CEO: **Awab Ur Rehman**. UI/UX designer: **Nafisa**. The existing copy describes a non-profit initiative; the repository does not establish legal or tax registration.

## Which version is this?

The application at the repository root is **live version 2**, immutable source `4847db8e2e23a9acb1083b4c60b3d272514265d4`. The Sites deployment is `appgdep_6acea96d67088191876531ff4a31405d`, runtime revision 2. The newer saved versions 3–6 were never deployed. **Do not replace this site's original colors, system fonts or three-step join form with the newer monochrome design when reproducing production.**

All 144 production source files are included and SHA-256 checked. Application code, styles, assets, dependency files, build integration and tests are unchanged. The original README, empty-secret example and ignore file are preserved verbatim under `handoff/production-originals/`; their root versions contain this handoff, a fake environment example and an extra local-secret ignore rule. New documentation, data snapshots and localhost tooling are additions only. See `handoff/production-source-manifest.json` for exact correspondence.

`history/aur-labs-unreleased-v6.zip` contains the complete separate v6 source at `39f3cd0a4c1ef003b7353f5e7e918d29b07064ae`, including Supabase work, five migrations and release reports. It is **not the live site** and is not imported by this application. Extract it separately if recovering that work.

## Pages and features

- `/`: hero sculpture, interactive product workbench, featured concepts, introduction, journal previews and calls to action.
- `/products`: searchable/filterable/sortable paginated catalogue; `/products/aur-notes`, `/products/aur-pocket`, `/products/aur-cli` are the current concept detail routes.
- `/about`: mission, values, process and team.
- `/journal`: editorial index; two current stories have their own slug routes.
- `/research`: research-direction index and article routes, with reference links supported.
- `/join`: three-step volunteer application, optional tab draft, validation and confirmed server submission.
- `/support`: contribution information and email inquiry. No payment processor or money collection is configured.
- `/contact`: inquiry/problem form, product context, validation and stored submissions.
- `/privacy` and `/terms`: current source-defined notices.
- `/admin`: ChatGPT-bound owner login plus password unlock, content editor, publication, media upload, inbox, audit display, settings and JSON export.
- Auri contextual guidance, optional procedural Three.js animation, CSS fallback, product galleries and client-side interactions are included.

## Exact stack

| Layer | Verified version / implementation |
| --- | --- |
| Node used to verify this export | 24.19.0; original package engine is >=22.13.0; use Node 24 for the test APIs |
| Package manager | pnpm 11.25.0 |
| Framework | Vinext 1.0.0-beta.5, implementing Next-compatible routing/API imports |
| Next package | 16.3.4; this repository's build uses Vinext, not `next build` |
| React / React DOM | 19.2.6 / 19.2.6 |
| Language/compiler | TypeScript 5.9.3 |
| Build | Vite 8.0.13; Cloudflare Vite plugin 1.37.1 |
| Styling | Tailwind CSS 4.2.1 plus the complete custom `app/globals.css` |
| UI | lucide-react 1.31.0; @base-ui/react 1.7.0; radix-ui 1.6.7; @shadcn/react 0.3.0 and retained UI wrappers |
| 3D | Three.js 0.186.1 |
| Validation | Zod 3.25.76 |
| Database | Cloudflare D1; Drizzle ORM 0.45.2; application queries also use D1 directly |
| Storage/runtime | R2, Cloudflare Workers/workerd; Wrangler 4.92.0 |
| Client fixture tests | Happy DOM 20.14.5 |

The complete exact direct-dependency inventory is `handoff/dependencies.json`; **the full `pnpm-lock.yaml` is included**, not a dependency summary. It pins transitive resolutions. Fonts in live v2 are system Arial/Helvetica, Georgia and monospace; no downloadable font binary is required by v2.

## First command on a clean machine

Install Node.js 24, extract this project, change into `aurlabs-site`, then run:

```sh
node scripts/start-local.mjs
```

This verifies the export, installs the pinned dependencies if missing, creates a random local setup token in ignored `.dev.vars`, initializes the **local** D1 schema and starts the original app at http://localhost:5173. First installation needs npm registry access. No real production credential is needed. Local sign-in uses the included localhost-only test identity; it is not a portable production identity provider. The local token is never bundled and is not the old production admin password.

To run all verification without starting a server:

```sh
node scripts/start-local.mjs --check
```

## Individual commands

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
node scripts/start-local.mjs --prepare-only
node scripts/run-framework.mjs dev --host 127.0.0.1
```

Build and preview:

```sh
node scripts/run-framework.mjs build
npx --yes pnpm@11.25.0 start
```

The production build preview is Wrangler's local Worker at port 8787; the localhost development sign-in middleware is part of the dev server, so use the dev command for local admin identity testing. The build emits `dist/client` assets and `dist/server` Worker code, **not a self-contained static Vercel site**.

Existing tests:

```sh
node tests/integration.mjs
node tests/client.mjs
node node_modules/typescript/bin/tsc --noEmit
```

Fresh verification passed **85 integration + 220 DOM/geometry = 305 assertions**, TypeScript and the production build. Local migration initialization also succeeded. Logs are in `handoff/verification/`. No native-browser screenshot, live login, email, or Vercel deployment is claimed.

## Deployment and ownership

Read `DEPLOYMENT.md` before using Vercel. This exact code relies on Cloudflare resource bindings and a trusted Sites identity gateway. Selecting the Next.js or Vite preset does not replace those dependencies. This export completes the code/document handoff, not a Vercel backend migration.

The connected GitHub account was `B-max12`. Its `aurlabs-site` lookup returned not found; the available connector cannot create repositories, and no authenticated GitHub CLI is installed here. No GitHub repository was created or pushed. After authenticating your own GitHub CLI, the complete export can be uploaded without this chat:

```sh
git init -b main
git add .
git commit -m "Import exact Aur Labs production source and complete handoff"
gh auth login
gh repo create aurlabs-site --private --source=. --remote=origin --push
```

Keep the repository private. Review `ENV_AND_SECRETS.md`; real secrets and existing security/session database rows are not part of the export. The generated local `.dev.vars`, runtime state, dependencies and build output are ignored.

Start Claude with `CLAUDE.md`. Read `ARCHITECTURE.md` for every file, `CONTENT_AND_SEO.md` for the complete content reference, `ASSETS.md` for binary provenance and downloads, and `TODO_AND_KNOWN_ISSUES.md` for concrete unimplemented or unverified behavior.
