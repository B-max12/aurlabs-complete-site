import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { registerHooks } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = resolve(root, "lib/db.ts");

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === "next/cache") return { url: "aur-test:next-cache", shortCircuit: true };
    if (specifier === "next/server") return { url: "aur-test:next-server", shortCircuit: true };
    if (specifier.startsWith("@/")) {
      specifier = pathToFileURL(resolve(root, specifier.slice(2))).href;
    }
    try {
      const r = next(specifier, context);
      return r;
    } catch (error) {
      if (specifier.startsWith(".") || specifier.startsWith("file:")) {
        const base = new URL(specifier, context.parentURL).href;
        for (const ext of [".ts", ".tsx"]) {
          const url = base + ext;
          if (existsSync(fileURLToPath(url))) {
            if (fileURLToPath(url) === dbPath) return { url: "aur-test:db", shortCircuit: true };
            return { url, shortCircuit: true };
          }
        }
      }
      throw error;
    }
  },
  load(url, context, next) {
    if (url === "aur-test:next-cache") {
      return { format: "module", source: "export const revalidatePath = () => {};", shortCircuit: true };
    }
    if (url === "aur-test:next-server") {
      return { format: "module", source: "export const after = (fn) => {};", shortCircuit: true };
    }
    if (url === "aur-test:db") {
      return {
        format: "module",
        source: "export const db = globalThis.__aurTestDb; export const sql = () => globalThis.__aurTestSql;",
        shortCircuit: true,
      };
    }
    if (url.startsWith("file:") && fileURLToPath(url) === dbPath) {
      return {
        format: "module",
        source: "export const db = globalThis.__aurTestDb; export const sql = () => globalThis.__aurTestSql;",
        shortCircuit: true,
      };
    }
    if (/\.tsx?$/.test(url)) {
      const src = readFileSync(fileURLToPath(url), "utf8");
      const out = ts.transpileModule(src, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      }).outputText;
      return { format: "module", source: out, shortCircuit: true };
    }
    return next(url, context);
  },
});

const sqlite = new DatabaseSync(":memory:");
sqlite.exec(readFileSync(resolve(root, "drizzle/0000_huge_azazel.sql"), "utf8"));
sqlite.exec("CREATE TABLE media_blobs (id text PRIMARY KEY NOT NULL, data blob NOT NULL);");

class Statement {
  constructor(sqlStr, args = []) {
    this.sqlStr = sqlStr;
    this.args = args;
  }
  bind(...args) {
    return new Statement(this.sqlStr, args);
  }
  async first() {
    return sqlite.prepare(this.sqlStr).get(...this.args) || null;
  }
  async all() {
    return { results: sqlite.prepare(this.sqlStr).all(...this.args) };
  }
  async run() {
    sqlite.prepare(this.sqlStr).run(...this.args);
    return { success: true };
  }
}

globalThis.__aurTestDb = {
  prepare: (q) => new Statement(q),
  batch: async (stmts) => {
    sqlite.exec("BEGIN");
    try {
      const out = [];
      for (const s of stmts) out.push(await s.run());
      sqlite.exec("COMMIT");
      return out;
    } catch (e) {
      sqlite.exec("ROLLBACK");
      throw e;
    }
  },
};

globalThis.__aurTestSql = (strings, ...vals) => {
  const query = strings.reduce((acc, s, i) => acc + s + (i < vals.length ? "?" : ""), "");
  return sqlite.prepare(query).all(...vals);
};

const admin = await import("../app/api/admin/route.ts");
const submissions = await import("../app/api/submissions/route.ts");
const ghStars = await import("../app/api/github/stars/route.ts");
const feed = await import("../app/feed.xml/route.ts");
const { cleanDisplayText, defaultContent } = await import("../lib/content.ts");
const { videoURL, productSchema, settingsSchema, safeURL } = await import("../lib/validation.ts");

let checks = 0;
const ok = (cond, msg) => {
  assert.ok(cond, msg);
  checks++;
};
const eq = (a, b, msg) => {
  assert.equal(a, b, msg);
  checks++;
};

const req = (body, { token = "", origin = "https://aur.test", method = "POST", path = "/api/admin" } = {}) =>
  new Request("https://aur.test" + path, {
    method,
    headers: {
      ...(origin ? { origin } : {}),
      "content-type": "application/json",
      ...(token ? { "x-aur-unlock": token } : {}),
    },
    ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
  });

const callAdmin = async (body, opts) => {
  const res = await admin.POST(req(body, opts));
  return { status: res.status, data: await res.json() };
};

// 1. Validation & text cleaning
ok(videoURL.safeParse("https://www.youtube.com/watch?v=dQw4w9WgXcQ").success, "YouTube URL validates");
ok(videoURL.safeParse("/api/media/123e4567-e89b-12d3-a456-426614174000.mp4").success, "Uploaded MP4 URL validates");
ok(!videoURL.safeParse("javascript:alert(1)").success, "Unsafe video link rejected");
ok(!safeURL.safeParse("http://example.com").success, "Non-HTTPS link rejected");
ok(productSchema.safeParse({ ...defaultContent.products[0], video: "https://youtu.be/abc12345" }).success, "Product with video validates");
ok(settingsSchema.safeParse({ ...defaultContent.settings, youtubeUrl: "https://youtube.com/@aurlabs", xUrl: "https://x.com/aurlabs" }).success, "Social links validate");

eq(cleanDisplayText("*Hello* _world_ --- test\n- Bullet item"), "Hello world test\nBullet item", "Decorative _, -, * removed cleanly");

// 2. Owner setup + failed login audit logging
process.env.AUR_ADMIN_SETUP_TOKEN = "test-setup-token-with-at-least-32-chars-001";
const setup = await callAdmin({
  action: "setup",
  username: "mainowner",
  password: "strong-owner-password-2026",
  setupToken: process.env.AUR_ADMIN_SETUP_TOKEN,
});
eq(setup.status, 200, "Owner setup succeeds");
const ownerToken = setup.data.unlockToken;
eq(setup.data.role, "owner", "Setup returns owner role");

const badUnlock = await callAdmin({ action: "unlock", username: "mainowner", password: "wrong-password" });
eq(badUnlock.status, 403, "Wrong owner password rejected");
const failedAudit = sqlite.prepare("SELECT action FROM audit_log WHERE action = 'admin.unlock.failed'").get();
ok(!!failedAudit, "Failed unlock attempt recorded in audit_log");

// 3. Team Admin Invite + Token Sign-in + Permission Scoping + Revocation
const inv = await callAdmin(
  { action: "team_invite", name: "Sara Dev", email: "sara@aurlabs.test" },
  { token: ownerToken }
);
eq(inv.status, 200, "Owner invites team admin");
ok(String(inv.data.accessToken || "").startsWith("aur_team_"), "Team token formatted properly");
const teamId = inv.data.id;
const teamAccessToken = inv.data.accessToken;

const teamLogin = await callAdmin({
  action: "team_unlock",
  email: "sara@aurlabs.test",
  accessToken: teamAccessToken,
});
eq(teamLogin.status, 200, "Team member unlocks admin with email + token");
eq(teamLogin.data.role, "team", "Team unlock returns team role");
const teamSessionToken = teamLogin.data.unlockToken;

// Team member can edit content...
const teamSave = await callAdmin(
  {
    action: "save",
    kind: "products",
    data: { ...defaultContent.products[0], tagline: "Updated by team admin", published: true },
  },
  { token: teamSessionToken }
);
eq(teamSave.status, 200, "Team admin can save product content");

// ...but CANNOT invite other team members, remove them, change owner password, or restore backup
eq(
  (await callAdmin({ action: "team_invite", name: "Other", email: "other@aurlabs.test" }, { token: teamSessionToken })).status,
  403,
  "Team admin blocked from inviting new admins"
);
eq(
  (await callAdmin({ action: "team_remove", id: teamId }, { token: teamSessionToken })).status,
  403,
  "Team admin blocked from deleting admins"
);
eq(
  (await callAdmin({ action: "password", currentPassword: "strong-owner-password-2026", password: "new-password-12345" }, { token: teamSessionToken })).status,
  403,
  "Team admin blocked from changing owner password"
);
eq(
  (await callAdmin({ action: "revoke_sessions" }, { token: teamSessionToken })).status,
  403,
  "Team admin blocked from revoking all sessions"
);

// Owner revokes team member -> immediately invalidates team session & token
eq((await callAdmin({ action: "team_remove", id: teamId }, { token: ownerToken })).status, 200, "Owner deletes team admin");
eq(
  (await admin.GET(req(null, { method: "GET", token: teamSessionToken }))).status,
  401,
  "Revoked team session immediately rejected"
);
eq(
  (await callAdmin({ action: "team_unlock", email: "sara@aurlabs.test", accessToken: teamAccessToken })).status,
  403,
  "Revoked team token cannot sign in again"
);

// 4. Backup restore & revoke sessions
const backup = await callAdmin(
  {
    action: "restore_backup",
    data: { content: defaultContent },
  },
  { token: ownerToken }
);
eq(backup.status, 200, "Zod-validated backup restore succeeds for owner");

const extraUnlock = await callAdmin({
  action: "unlock",
  username: "mainowner",
  password: "strong-owner-password-2026",
});
eq((await callAdmin({ action: "revoke_sessions" }, { token: ownerToken })).status, 200, "Revoke other sessions succeeds");
eq(
  (await admin.GET(req(null, { method: "GET", token: extraUnlock.data.unlockToken }))).status,
  401,
  "Other unlock session revoked"
);
eq(
  (await admin.GET(req(null, { method: "GET", token: ownerToken }))).status,
  200,
  "Current owner session stays active"
);

// 5. Submissions timing trap
const contact = {
  kind: "contact",
  name: "Test Visitor",
  email: "visitor@example.invalid",
  website: "",
  consent: true,
  topic: "A problem to solve",
  subject: "Hello Aur Labs",
  product: "",
  platform: "Linux",
  message: "Testing the submission minimum elapsed time anti-bot protection.",
  idempotencyKey: crypto.randomUUID(),
};
eq(
  (await submissions.POST(req({ ...contact, elapsedMs: 250 }, { path: "/api/submissions" }))).status,
  400,
  "Fast bot submission (<1.2s) rejected"
);
eq(
  (await submissions.POST(req({ ...contact, elapsedMs: 5000 }, { path: "/api/submissions" }))).status,
  201,
  "Normal human submission (>=1.2s) accepted"
);

// 6. GitHub stars API validation + RSS feed
eq(
  (await ghStars.GET(new Request("https://aur.test/api/github/stars?repo=bad"))).status,
  400,
  "Invalid GitHub repo rejected"
);
eq(
  (await ghStars.POST(req({ repo: "B-max12/dear_diary", action: "check", providerToken: "short" }, { path: "/api/github/stars" }))).status,
  401,
  "Short GitHub provider token rejected"
);
eq(
  (await ghStars.POST(req({ repo: "B-max12/dear_diary", action: "check", providerToken: "valid_length_token_12345" }, { path: "/api/github/stars", origin: "https://evil.test" }))).status,
  403,
  "Cross-origin GitHub star call blocked"
);

const rssRes = await feed.GET();
eq(rssRes.status, 200, "RSS /feed.xml responds 200");
const rssXml = await rssRes.text();
ok(rssXml.includes("<rss version=\"2.0\"") && rssXml.includes("why-we-build-for-everyone"), "RSS feed contains published entries");

console.log(`PASS: ${checks} security & feature assertions passed.`);
sqlite.close();
