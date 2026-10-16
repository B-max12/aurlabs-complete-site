# Environment, secrets and external services

No real secret value is included here, in `.env.example`, in the source transcript or in the archive. The current Sites runtime revision 2 returned **no configured environment entries**. Existing credentials in database security rows were not retrieved. Previously shared Supabase privileged keys were owner-confirmed rotated; no historical value is copied or requested. A password previously typed in chat is not a production default and is not part of this repository.

## Live v2 application

| Name / service | Purpose | Where it comes from | Required? | Secret? |
| --- | --- | --- | --- | --- |
| `AUR_ADMIN_SETUP_TOKEN` | First owner enrollment guard, at least 32 random characters | Generate securely and store in hosting secret settings only while enrolling; local launcher creates its own ignored token | Only for first admin enrollment; remove afterwards | Yes |
| `DB` | D1 database object for CMS/inbox/auth/rate/audit tables | Sites resource binding; independent deployment needs an owned persistent database/binding | Yes for live API/admin/data behavior | Binding object, not a string/API key |
| `BUCKET` | R2 object store for uploaded images | Sites resource binding; independent deployment needs an owned object store | Yes for uploads and uploaded-media reads | Binding object, not a string/API key |
| Sites identity gateway | Verified ChatGPT identity and reserved sign-in routes | Existing hosting platform; not a reusable username/password API | Yes for current production admin Auth | Gateway capability |
| `oai-authenticated-user-id` | Owner identity from trusted gateway | Server-injected request header; never set by an untrusted caller | Yes for protected current admin operations | Trusted identity context, not an env var |
| `oai-authenticated-user-email`, `oai-authenticated-user-full-name`, `oai-authenticated-user-full-name-encoding` | Optional identity display helpers | Trusted gateway request context | Helpers only | Personal identity context |
| `x-aur-unlock` | Short-lived owner unlock bearer | Issued by authorized app login, held in tab memory; only hash stored in D1 | Yes for current protected mutations | Yes; never commit or log |
| `cf-connecting-ip` | Public form rate-limit identity input | Trusted Cloudflare request context | Production rate-limit behavior | Request metadata, not config |
| Namecheap/existing DNS provider | Apex/www routing and email DNS | User's domain account | Yes for custom domain, not local use | Credentials stay in provider |
| `aur@Aurlabs.online` mailbox | Public contact and operator replies | User's email provider | Required for replies; forms themselves store to D1 | Address is public; mailbox credentials excluded |
| Payment provider | Would receive support payments | None configured in source settings | No live payment behavior exists | No key configured |
| Analytics service / analytics ID | Application analytics | None present in app source | No | No ID configured |

No Vercel variable can turn `DB` or `BUCKET` into an object binding. Do not enter resource IDs as environment values and expect the unchanged code to work. Vercel deployment credentials, database credentials, object-store credentials and a portable Auth provider are not provisioned or discoverable from this source.

## Separate unreleased v3 variables (not used by root v2)

| Name | Purpose and origin | Required for that adapter? | Secret? |
| --- | --- | --- | --- |
| `AUR_BACKEND` | Explicit d1/supabase choice; defaults to d1 | Only to select Supabase | No |
| `AUR_PUBLIC_URL` | Exact application origin/callback boundary configured by operator | Yes for Supabase OAuth/recovery | No |
| `AUR_REQUIRE_MFA` | MFA enforcement; defaults enabled | Keep enabled for staff | No |
| `AUR_OAUTH_PROVIDERS` | Allowlisted visible tested provider identifiers | Optional; empty hides providers | No |
| `SUPABASE_URL` | Project API URL from Supabase project settings | Yes for Supabase adapter | No |
| `SUPABASE_PUBLISHABLE_KEY` | New publishable client key from project settings | Yes for Supabase adapter | Public key, not privileged |
| `SUPABASE_SECRET_KEY` | Server-only privileged project key from secure Supabase controls | Yes for privileged server operations | Yes |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supported public aliases in the archived adapter | Optional aliases | Public only |
| OAuth provider client secrets / SMTP credentials | Provider→Supabase and email delivery configuration | Only for enabled methods | Yes; provider-side, not browser/source |

Known Supabase production reference is `opbgjmoztvqjsmxexptv`. It is a non-secret identifier, not a staging project or active v2 backend. Do not copy a service/secret key into any public-prefixed variable. See the archived authentication document for the actual `/api/auth/callback` and `/admin/recover` paths; those routes are **not in live v2**.

## Optional build/local tooling variables

These are read by original helper scripts, not required application secrets. Clean external clones use the portable profile and can run the documented `npx pnpm` commands without the managed installation wrapper. No machine-specific values should be copied from this environment.

| Name | Purpose / source files | Required on Vercel? |
| --- | --- | --- |
| `CLOUDFLARE_CF_FETCH_ENABLED` | Controls local Cloudflare metadata fetch; default false in source. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `CODEX_SANDBOX` | Selects polling for the original macOS sandbox. Files: `vite.config.ts` | No; not a portable backend credential |
| `HOME` | Host/shell-provided context; do not repurpose as an application setting. Files: `scripts/install-ci.sh`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `MINIFLARE_REGISTRY_PATH` | Local Wrangler/Miniflare paths or telemetry/log behavior. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `PPID` | Host/shell-provided context; do not repurpose as an application setting. Files: `scripts/install-ci.sh` | No; not a portable backend credential |
| `SHARP_IGNORE_GLOBAL_LIBVIPS` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-ci.mjs` | No; not a portable backend credential |
| `SITES_BUILD_KILL_AFTER` | Optional time bound for managed installation/build helpers. Files: `scripts/build-verified.sh` | No; not a portable backend credential |
| `SITES_BUILD_TIMEOUT` | Optional time bound for managed installation/build helpers. Files: `scripts/build-verified.sh` | No; not a portable backend credential |
| `SITES_ENV_READY` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/build-verified.sh`, `scripts/install-ci.sh`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_INSTALL_KILL_AFTER` | Optional time bound for managed installation/build helpers. Files: `scripts/install-ci.sh`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_INSTALL_LOCKS_PID` | Host/shell-provided context; do not repurpose as an application setting. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_INSTALL_REPORT_PATH` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/npm-install.mjs`, `scripts/pnpm-install.mjs` | No; not a portable backend credential |
| `SITES_INSTALL_TIMEOUT` | Optional time bound for managed installation/build helpers. Files: `scripts/install-ci.sh`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_NPM_CACHE_SEED` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-ci.sh` | No; not a portable backend credential |
| `SITES_PNPM_BIN` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PNPM_BOOTSTRAP_TIMEOUT` | Optional time bound for managed installation/build helpers. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PNPM_CACHE_SEED` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PNPM_SHARED_STORE` | Managed installation/runtime cache, profile, process or report configuration. Files: `pnpm-workspace.yaml`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PNPM_STORE_LOCK_TIMEOUT` | Optional time bound for managed installation/build helpers. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PNPM_STORE_PREPARE_TIMEOUT` | Optional time bound for managed installation/build helpers. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_PROJECT_ROOT` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/build-verified.sh`, `scripts/install-ci.sh`, `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `SITES_RUNTIME_ROOT` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-ci.sh`, `scripts/install-pnpm.sh`, `scripts/sites-env.mjs`, `scripts/sites-env.sh` | No; not a portable backend credential |
| `WRANGLER_LOG_PATH` | Local Wrangler/Miniflare paths or telemetry/log behavior. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `WRANGLER_REGISTRY_PATH` | Local Wrangler/Miniflare paths or telemetry/log behavior. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `WRANGLER_SEND_METRICS` | Local Wrangler/Miniflare paths or telemetry/log behavior. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `WRANGLER_WRITE_LOGS` | Local Wrangler/Miniflare paths or telemetry/log behavior. Files: `scripts/sites-env.mjs`, `vite.config.ts` | No; not a portable backend credential |
| `XDG_CACHE_HOME` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |
| `XDG_DATA_HOME` | Managed installation/runtime cache, profile, process or report configuration. Files: `scripts/install-pnpm.sh` | No; not a portable backend credential |

## Real-secret handoff status

No real secret has been exported. There is no separate plaintext secret attachment. Existing owner password hashes/salts, active unlock hashes, platform bearer/source-write credentials, OAuth/SMTP passwords and any Supabase secrets are excluded. Obtain new independent-service credentials through each provider's secure settings. The local launcher generates a disposable `.dev.vars`; it is excluded by `.gitignore` and from this delivered ZIP. Test passwords in the original tests are explicit synthetic fixture values, not user credentials.
