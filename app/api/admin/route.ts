import {
  database,
  json,
  parseBody,
  sameOrigin,
  clientIp,
  getAdmin,
  authSession,
  rateLimit,
  passwordHash,
  constantTime,
  issueUnlock,
  audit,
  readContent,
  sha,
} from "@/lib/server";
import { sendTeamAdminInvite } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { productSchema, articleSchema, teamSchema, settingsSchema } from "@/lib/validation";

const refreshSite = () => {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
  } catch {
    /* the cached copy refreshes itself within a minute anyway */
  }
};

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const admin = await getAdmin();
    const status = {
      signedIn: true,
      configured: !!admin,
      canSetup: (process.env.AUR_ADMIN_SETUP_TOKEN?.length || 0) >= 32,
      isOwner: !!admin,
    };
    if (new URL(req.url).searchParams.get("view") === "status") return json(status);
    const session = await authSession(req);
    if (!session) return json({ error: "Sign in to continue.", ...status }, 401);

    const content = await readContent(true);
    const inbox = await database()
      .prepare("SELECT * FROM submissions ORDER BY created_at DESC LIMIT 500")
      .all();
    const assets = await database()
      .prepare("SELECT * FROM media ORDER BY created_at DESC LIMIT 200")
      .all();
    const events = await database()
      .prepare("SELECT actor, action, target, created_at FROM audit_log ORDER BY created_at DESC LIMIT 50")
      .all();
    const teamAdmins =
      session.role === "owner"
        ? (
            await database()
              .prepare(
                "SELECT id, username AS name, salt AS email, created_at FROM administrators WHERE id LIKE 'team:%' ORDER BY created_at DESC"
              )
              .all()
          ).results
        : [];

    return json({
      content,
      inbox: inbox.results,
      assets: assets.results,
      events: events.results,
      teamAdmins,
      username: session.username,
      role: session.role,
    });
  } catch {
    return json({ error: "Admin storage is temporarily unavailable." }, 503);
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "This action must come from the website." }, 403);
  try {
    const b = await parseBody(req, 1500000);
    if (b.action === "setup" || b.action === "unlock" || b.action === "team_unlock") {
      if (
        !(await rateLimit("admin:" + clientIp(req), 10, 900000)) ||
        !(await rateLimit("admin:all", 60, 900000))
      ) {
        return json({ error: "Too many attempts. Please wait 15 minutes." }, 429);
      }

      const admin = await getAdmin();
      if (b.action === "setup") {
        const key = process.env.AUR_ADMIN_SETUP_TOKEN;
        if (admin) return json({ error: "An administrator is already configured." }, 409);
        if (!key || key.length < 32 || typeof b.setupToken !== "string" || !constantTime(key, b.setupToken)) {
          return json(
            {
              error:
                "The setup token is missing or incorrect. Configure AUR_ADMIN_SETUP_TOKEN in the hosting environment first.",
            },
            403
          );
        }
        if (typeof b.username !== "string" || !/^[a-zA-Z0-9_.-]{3,40}$/.test(b.username)) {
          return json(
            { error: "Use 3–40 letters, numbers, dots, hyphens, or underscores for your username." },
            400
          );
        }
        if (typeof b.password !== "string" || b.password.length < 12 || b.password.length > 128) {
          return json({ error: "Choose a password of 12–128 characters." }, 400);
        }
        const salt = crypto.randomUUID();
        await database()
          .prepare(
            "INSERT INTO administrators (id,user_id,username,password_hash,salt,created_at) VALUES ('owner',?,?,?,?,?)"
          )
          .bind("owner", b.username, await passwordHash(b.password, salt), salt, Date.now())
          .run();
        await audit("owner", "admin.setup", "owner");
        return json({ ok: true, role: "owner", ...(await issueUnlock("owner")) });
      }

      if (b.action === "team_unlock") {
        if (!admin) return json({ error: "Studio is not initialized yet." }, 403);
        const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
        const accessToken = typeof b.accessToken === "string" ? b.accessToken.trim() : "";
        if (!email || !accessToken || accessToken.length > 200) {
          return json({ error: "Enter your invited email address and personal access token." }, 400);
        }
        if (!(await rateLimit("admin:team:" + email, 8, 900000))) {
          return json({ error: "Too many attempts for this account. Please wait 15 minutes." }, 429);
        }
        const member = await database()
          .prepare("SELECT * FROM administrators WHERE id LIKE 'team:%' AND salt = ?")
          .bind(email)
          .first<{ id: string; user_id: string; username: string; password_hash: string; salt: string }>();
        const hash = await sha(accessToken);
        if (!member || !constantTime(hash, member.password_hash)) {
          await audit("anonymous", "admin.team_unlock.failed", email.slice(0, 80) || "unknown");
          return json({ error: "The email or team access token doesn’t match." }, 403);
        }
        await audit(member.user_id, "admin.team_unlock", email);
        return json({
          ok: true,
          role: "team",
          username: member.username,
          ...(await issueUnlock(member.user_id)),
        });
      }

      const usernameKey = String(b.username || "").trim().toLowerCase().slice(0, 60) || "empty";
      if (!(await rateLimit("admin:user:" + usernameKey, 8, 900000))) {
        return json({ error: "Too many failed attempts for this username. Wait 15 minutes." }, 429);
      }
      if (
        !admin ||
        typeof b.username !== "string" ||
        typeof b.password !== "string" ||
        b.password.length > 128 ||
        b.username !== admin.username ||
        !constantTime(await passwordHash(b.password, admin.salt), admin.password_hash)
      ) {
        await audit("anonymous", "admin.unlock.failed", usernameKey);
        return json({ error: "The username or password doesn’t match." }, 403);
      }
      await audit(admin.user_id, "admin.unlock", "owner");
      return json({ ok: true, role: "owner", ...(await issueUnlock(admin.user_id)) });
    }

    const session = await authSession(req);
    if (!session) {
      return json({ error: "Your admin session has ended. Sign in again to continue.", signedIn: true }, 401);
    }
    const user = session.userId;

    if (b.action === "lock") {
      await database()
        .prepare("DELETE FROM admin_unlocks WHERE token_hash = ?")
        .bind(await sha(req.headers.get("x-aur-unlock") || ""))
        .run();
      return json({ ok: true });
    }

    if (b.action === "password") {
      if (session.role !== "owner") {
        return json({ error: "Only the main owner can change the owner password." }, 403);
      }
      const admin = await getAdmin();
      if (
        typeof b.currentPassword !== "string" ||
        !admin ||
        !constantTime(await passwordHash(b.currentPassword, admin.salt), admin.password_hash)
      ) {
        return json({ error: "Your current password is incorrect." }, 403);
      }
      if (typeof b.password !== "string" || b.password.length < 12 || b.password.length > 128) {
        return json({ error: "Choose a password of 12–128 characters." }, 400);
      }
      const salt = crypto.randomUUID();
      await database().batch([
        database()
          .prepare("UPDATE administrators SET password_hash=?, salt=? WHERE id='owner'")
          .bind(await passwordHash(b.password, salt), salt),
        database().prepare("DELETE FROM admin_unlocks"),
      ]);
      await audit(user, "admin.password", "owner");
      return json({ ok: true, role: "owner", ...(await issueUnlock(user)) });
    }

    if (b.action === "revoke_sessions") {
      if (session.role !== "owner") {
        return json({ error: "Only the main owner can revoke admin sessions." }, 403);
      }
      const currentHash = await sha(req.headers.get("x-aur-unlock") || "");
      await database()
        .prepare("DELETE FROM admin_unlocks WHERE token_hash <> ?")
        .bind(currentHash)
        .run();
      await audit(user, "admin.revoke_sessions", "all_other");
      return json({ ok: true });
    }

    if (b.action === "team_invite") {
      if (session.role !== "owner") {
        return json({ error: "Only the main owner can invite team admins." }, 403);
      }
      const name = typeof b.name === "string" ? b.name.trim() : "";
      const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
      if (name.length < 2 || name.length > 80) {
        return json({ error: "Enter the team member’s full name (2–80 characters)." }, 400);
      }
      if (!/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email)) {
        return json({ error: "Enter a valid team member email address." }, 400);
      }
      const accessToken =
        "aur_team_" +
        crypto.randomUUID().replace(/-/g, "") +
        crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      const tokenHash = await sha(accessToken);
      const existing = await database()
        .prepare("SELECT id, user_id FROM administrators WHERE id LIKE 'team:%' AND salt = ?")
        .bind(email)
        .first<{ id: string; user_id: string }>();
      const memberId = existing?.id || "team:" + crypto.randomUUID();
      if (existing) {
        await database().batch([
          database()
            .prepare("UPDATE administrators SET username = ?, password_hash = ?, created_at = ? WHERE id = ?")
            .bind(name, tokenHash, Date.now(), existing.id),
          database().prepare("DELETE FROM admin_unlocks WHERE user_id = ?").bind(existing.user_id),
        ]);
      } else {
        await database()
          .prepare(
            "INSERT INTO administrators (id,user_id,username,password_hash,salt,created_at) VALUES (?,?,?,?,?,?)"
          )
          .bind(memberId, memberId, name, tokenHash, email, Date.now())
          .run();
      }
      const adminUrl = new URL("/admin", req.url).toString();
      const emailed = await sendTeamAdminInvite({ to: email, name, token: accessToken, adminUrl });
      await audit(user, "admin.team_invite", email);
      return json({ ok: true, id: memberId, name, email, accessToken, emailed });
    }

    if (b.action === "team_remove") {
      if (session.role !== "owner") {
        return json({ error: "Only the main owner can remove team admins." }, 403);
      }
      const id = typeof b.id === "string" ? b.id : "";
      if (!id.startsWith("team:") || id.length > 100) {
        return json({ error: "Invalid team admin selection." }, 400);
      }
      const existing = await database()
        .prepare("SELECT user_id, salt FROM administrators WHERE id = ? AND id LIKE 'team:%'")
        .bind(id)
        .first<{ user_id: string; salt: string }>();
      if (!existing) {
        return json({ error: "Team member access record not found." }, 404);
      }
      await database().batch([
        database().prepare("DELETE FROM admin_unlocks WHERE user_id = ?").bind(existing.user_id),
        database().prepare("DELETE FROM administrators WHERE id = ?").bind(id),
      ]);
      await audit(user, "admin.team_remove", existing.salt);
      return json({ ok: true });
    }

    if (b.action === "save") {
      const schemas = {
        products: productSchema,
        journal: articleSchema,
        research: articleSchema,
        team: teamSchema,
        settings: settingsSchema,
      };
      const schema = schemas[b.kind as keyof typeof schemas];
      if (!schema) return json({ error: "Unknown content type." }, 400);
      const r = schema.safeParse(b.data);
      if (!r.success) {
        return json(
          { error: r.error.issues.map((i) => i.path.join(".") + ": " + i.message).join(" · ") },
          400
        );
      }
      const d = r.data as { id?: string; slug?: string; published?: boolean };
      const id = b.kind === "settings" ? "site-settings" : d.id;
      const current = await database()
        .prepare("SELECT kind FROM content WHERE id=?")
        .bind(id)
        .first<{ kind: string }>();
      if (current && current.kind !== b.kind) {
        return json({ error: "This ID belongs to another content type." }, 409);
      }
      if (d.slug) {
        const all = await readContent(true);
        const duplicate = (all[b.kind as "products" | "journal" | "research"] as { slug: string; id: string }[]).some(
          (x) => x.slug === d.slug && x.id !== id
        );
        if (duplicate) return json({ error: "That URL slug is already in use." }, 409);
      }
      await database()
        .prepare(
          "INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,published=excluded.published,deleted=0,updated_at=excluded.updated_at"
        )
        .bind(id, b.kind, JSON.stringify(d), b.kind === "settings" ? 1 : Number(d.published), Date.now())
        .run();
      await audit(user, "content.save", b.kind + ":" + id);
      refreshSite();
      return json({ ok: true });
    }

    if (b.action === "delete") {
      if (
        !["products", "journal", "research", "team"].includes(b.kind) ||
        typeof b.id !== "string" ||
        !/^[a-z0-9-]{1,100}$/.test(b.id)
      ) {
        return json({ error: "Invalid content selection." }, 400);
      }
      await database()
        .prepare(
          "INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,'{}',0,1,?) ON CONFLICT(id) DO UPDATE SET deleted=1,published=0,updated_at=excluded.updated_at"
        )
        .bind(b.id, b.kind, Date.now())
        .run();
      await audit(user, "content.delete", b.kind + ":" + b.id);
      refreshSite();
      return json({ ok: true });
    }

    if (b.action === "restore_backup") {
      if (session.role !== "owner") {
        return json({ error: "Only the main owner can restore a site backup." }, 403);
      }
      const rawContent = b.content || b.data?.content || b.data;
      if (!rawContent || typeof rawContent !== "object") {
        return json({ error: "Choose a valid Aur Labs JSON backup file." }, 400);
      }
      const now = Date.now();
      const upserts: { id: string; kind: string; data: string; published: number }[] = [];
      if (rawContent.settings) {
        const sr = settingsSchema.safeParse(rawContent.settings);
        if (!sr.success) return json({ error: "Invalid settings in backup." }, 400);
        upserts.push({ id: "site-settings", kind: "settings", data: JSON.stringify(sr.data), published: 1 });
      }
      const listDefs = [
        ["products", productSchema],
        ["journal", articleSchema],
        ["research", articleSchema],
        ["team", teamSchema],
      ] as const;
      for (const [kind, schema] of listDefs) {
        const arr = rawContent[kind];
        if (!arr) continue;
        if (!Array.isArray(arr) || arr.length > 200) {
          return json({ error: `Invalid ${kind} list in backup.` }, 400);
        }
        for (const item of arr) {
          const parsed = schema.safeParse(item);
          if (!parsed.success) {
            return json(
              {
                error:
                  `Invalid ${kind} record in backup: ` +
                  parsed.error.issues.map((i) => i.path.join(".") + ": " + i.message).join(" · "),
              },
              400
            );
          }
          upserts.push({
            id: parsed.data.id,
            kind,
            data: JSON.stringify(parsed.data),
            published: Number(parsed.data.published),
          });
        }
      }
      if (!upserts.length) return json({ error: "No valid content records found in backup." }, 400);
      await database().batch(
        upserts.map((u) =>
          database()
            .prepare(
              "INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET kind=excluded.kind,data=excluded.data,published=excluded.published,deleted=0,updated_at=excluded.updated_at"
            )
            .bind(u.id, u.kind, u.data, u.published, now)
        )
      );
      await audit(user, "admin.restore_backup", `${upserts.length}_records`);
      refreshSite();
      return json({ ok: true, restored: upserts.length });
    }

    if (b.action === "check_releases") {
      const all = await readContent(true);
      const checks: {
        product: string;
        slug: string;
        version: string;
        platform: string;
        url: string;
        ok: boolean;
        status: number;
      }[] = [];
      for (const p of all.products) {
        for (const r of p.releases || []) {
          let status = 0;
          let ok = false;
          try {
            let res = await fetch(r.url, {
              method: "HEAD",
              redirect: "follow",
              signal: AbortSignal.timeout(5000),
            });
            if (res.status === 405 || res.status === 501) {
              res = await fetch(r.url, {
                method: "GET",
                headers: { Range: "bytes=0-0" },
                redirect: "follow",
                signal: AbortSignal.timeout(5000),
              });
            }
            status = res.status;
            ok = res.ok;
          } catch {
            status = 0;
            ok = false;
          }
          checks.push({
            product: p.name,
            slug: p.slug,
            version: r.version,
            platform: r.platform,
            url: r.url,
            ok,
            status,
          });
        }
      }
      await audit(user, "admin.check_releases", `${checks.length}_links`);
      return json({ ok: true, results: checks });
    }

    if (b.action === "submission") {
      if (
        typeof b.id !== "string" ||
        !["new", "reviewing", "replied", "archived", "delete"].includes(b.status)
      ) {
        return json({ error: "Invalid inbox action." }, 400);
      }
      if (b.status === "delete") {
        await database().prepare("DELETE FROM submissions WHERE id=?").bind(b.id).run();
      } else {
        await database().prepare("UPDATE submissions SET status=? WHERE id=?").bind(b.status, b.id).run();
      }
      await audit(user, "inbox." + b.status, b.id);
      return json({ ok: true });
    }

    return json({ error: "Unknown action." }, 400);
  } catch (error) {
    console.error("Admin operation failed", error instanceof Error ? error.message : "unknown");
    return json({ error: "The change wasn’t saved. Check the fields and try again." }, 500);
  }
}
