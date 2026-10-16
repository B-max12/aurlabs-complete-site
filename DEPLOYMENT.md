# Hosting and Vercel compatibility

Verified at `2026-10-16T21:08:40.131652+00:00`. This is an export of live v2 source, not a completed Vercel deployment. No DNS, production settings or existing deployment was changed.

## Current serving path

Production domain: https://aurlabs.online. Staff area: https://aurlabs.online/admin. Alternate hostname: https://www.aurlabs.online. Generated Sites origin: https://aur-labs.warmkid256.chatgpt.site. Both custom domains were reported active with active TLS. Sites runs the application in Cloudflare Workers behind its gateway/CDN and supplies D1 (`DB`), R2 (`BUCKET`) and trusted ChatGPT identity context.

The platform currently declares `custom-domains.chatgpt.site.` as the custom-domain CNAME target and apex proxy targets `162.159.143.30` and `172.66.3.26`. The user confirmed the www CNAME points there. These are existing Sites targets, **not Vercel targets**. The application has no hostname-wide www/apex redirect rule in its source. Direct HTTP probes to both names returned Cloudflare 403/error 1010 without Location, so an edge redirect could not be independently confirmed. Do not invent a current redirect policy from those blocked probes.

## Can this exact source be deployed unchanged to Vercel?

**No.** Its build emits a Cloudflare Worker importing `cloudflare:workers`, and its live routes directly use D1/R2 bindings and a Sites identity gateway. Vercel does not acquire those resources from `.openai/hosting.json`. The bundled `next` package does not turn a Vinext/Workers build into a Next.js/Vercel build. Serving `dist/client` alone would omit dynamic pages/APIs and would not be the same site.

| Requested Vercel setting | Truth for the unchanged export |
| --- | --- |
| Framework preset | No preset makes this Cloudflare-specific app deployable unchanged. Do not claim Next.js or static Vite is sufficient. |
| Root directory | Repository root `.` |
| Install command | `npx --yes pnpm@11.25.0 install --frozen-lockfile` |
| Existing build command | `node scripts/run-framework.mjs build`; this produces Workers output |
| Existing output | `dist/server` plus `dist/client`; neither is an already prepared Vercel server deployment |
| Node | 24.x for a future Vercel build; local export verified on 24.19.0 |
| Runtime variables | Only `AUR_ADMIN_SETUP_TOKEN` is an application string variable in v2; it cannot replace D1/R2/identity bindings |

No fake `vercel.json`, missing adapter stub, fabricated database URL or static export is supplied as if it solved this. The closest **verified working** alternative is the complete original app with local workerd/D1/R2 simulation, started with `node scripts/start-local.mjs`. To deploy the same application architecture independently, a user-owned Cloudflare environment plus a real trusted identity replacement is needed; the simulator IDs are never production resources.

## Exact portability boundaries for the receiving assistant

| Dependency | Current code | Independent replacement boundary |
| --- | --- | --- |
| Server rendering/runtime | `vite.config.ts`, `build/sites-worker.ts` | A supported Node/Vercel server adapter or a deliberate Next build conversion preserving React/UI behavior |
| D1 methods and transactions | `lib/server.ts`, `db/index.ts`, all API routes | A persistent database implementation preserving queries, atomic updates, content merge, rate limits and idempotency; Vercel ephemeral disk is not durable storage |
| R2 object operations | `app/api/media/route.ts`, `app/api/media/[key]/route.ts` | An owned object store or authenticated R2 HTTP/S3 adapter, retaining keys/metadata/access rules |
| ChatGPT identity gateway | `app/chatgpt-auth.ts`, `lib/server.ts`, `app/admin.tsx` | A real server-verified authentication provider/session; never trust user-supplied identity headers |
| Existing owner/session data | `administrators`, `admin_unlocks` | Deliberate secure enrollment/session transition; no exported password or active token |
| CMS content | `lib/content.ts`, D1 `content` | Current empty override snapshot is complete; preserve future changes at cutover |

These replacements are **not implemented in this exact-source export** because changing them would cease to be the unchanged live application. The archived v6 contains a working source-level Supabase adapter, but it also changes design and behavior and has no hosted acceptance. It must not be silently substituted for v2.

Current upstream Vinext documentation describes a Nitro Vite plugin for other platforms, including Vercel. That is a possible server packaging mechanism, not a replacement for this app's D1/R2/Auth code; this pinned source has no Nitro dependency or tested Nitro build. The receiving assistant must not assume current upstream instructions prove support for this older exact pin. Reference: https://github.com/cloudflare/vinext/blob/main/README.md#other-platforms-via-nitro . Vercel's output contract is documented at https://vercel.com/docs/build-output-api .

## GitHub import and domain configuration

The private GitHub push could not be performed: repository creation is unavailable through the connected tools, target lookup returned not found, and no authenticated `gh` executable is installed. The complete ZIP is the working transfer mechanism. The README includes the exact `git`/`gh` commands to create the private `aurlabs-site` repository on `main` after local authentication.

After a real compatible application has been deployed and verified on its issued Vercel URL, add **aurlabs.online** and **www.aurlabs.online** to that Vercel project's Settings → Domains. At the existing DNS provider, replace only the site-routing records:

| DNS name | Type | New value |
| --- | --- | --- |
| `@` / `aurlabs.online` | A | The exact recommended IPv4 address issued by that Vercel project's domain verification |
| `www` | CNAME | The exact project-specific CNAME target issued by Vercel, replacing `custom-domains.chatgpt.site` |
| Domain ownership record, if requested | TXT | The exact verification record issued for that project |

There is no Vercel project in this handoff, so its actual IP/CNAME/verification values cannot be supplied truthfully. Vercel explicitly instructs using the project's recommended values; a generic old IP is not guaranteed correct. Keep MX, SPF, DKIM, DMARC and unrelated service records for **aur@Aurlabs.online**. Do not remove email DNS when moving website hosting.

Once the project is named `aurlabs-site`, these commands retrieve and verify its actual required records:

```sh
npx vercel domains verify aurlabs.online --project aurlabs-site
npx vercel domains verify www.aurlabs.online --project aurlabs-site
```

Choose one canonical hostname in Vercel. For the user's stated production name, a deliberate **www → aurlabs.online** redirect is suitable; it is a proposed new explicit policy, not an observed old edge rule. Update `app/layout.tsx` metadataBase from the generated Sites origin to `https://aurlabs.online` in the migrated application. The source export retains the original value so the mismatch is visible and auditable.

Domain reference, checked for this export: https://vercel.com/docs/domains/set-up-custom-domain . Node reference: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions . No domain purchase, Vercel project creation, paid resource creation, DNS edit or production cutover occurred.
