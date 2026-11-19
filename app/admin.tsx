"use client";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  Package,
  PlayCircle,
  Plus,
  Save,
  Search,
  Settings as SettingsIcon,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  X,
  KeyRound,
  Eye,
  RefreshCw,
} from "lucide-react";
import type { SiteContent, ContentKind, Settings, Release } from "@/lib/content";
import { PLATFORMS } from "@/lib/content";
import { Mark } from "./visuals";
import Auri from "./auri";
import { GUIDE_FIELDS } from "@/lib/auri-guides";
import ContentPreview from "./content-preview";
import AuriKnowledge from "./admin-auri";
import DownloadStats from "./admin-downloads";
import SEODashboard from "./admin/seo-dashboard";
import ThemeToggle from "./theme-toggle";
import "./studio.css";

function SeoCheck({ e }: { e: any }) {
  const clipText = (s: string, n: number) => {
    const c = s.replace(/\s+/g, " ").trim();
    return c.length <= n ? c : c.slice(0, n - 1) + "…";
  };
  const title: string = (e.seoTitle || "").trim() || `${e.name || ""} | ${e.tagline || ""} | Aur Labs`;
  const desc: string =
    (e.seoDescription || "").trim() || clipText(String(e.description || "").split("\n\n")[0], 155);
  const kw = String(e.keyword || "").trim().toLowerCase();
  const text = (e.name + " " + e.tagline + " " + e.description).toLowerCase();
  const pairs = String(e.faq || "")
    .split(/\n\s*\n/)
    .filter((b: string) => b.trim().split("\n").length >= 2).length;
  const rows: [boolean, string][] = [
    [title.length >= 30 && title.length <= 65, `Search title is ${title.length} characters (aim for 30 to 65)`],
    [desc.length >= 70 && desc.length <= 160, `Search description is ${desc.length} characters (aim for 70 to 160)`],
    [!!kw, kw ? `Main search phrase: “${kw}”` : "Add a main search phrase"],
    ...(kw
      ? ([
          [title.toLowerCase().includes(kw), "The phrase is in the search title"],
          [desc.toLowerCase().includes(kw), "The phrase is in the search description"],
          [text.includes(kw), "The phrase appears in the product text"],
        ] as [boolean, string][])
      : []),
    [
      pairs >= 2,
      pairs >= 2
        ? `${pairs} questions with answers`
        : "Add at least 2 questions and answers (a blank line between each pair)",
    ],
    [!!(e.screenshots && e.screenshots.length), "A screenshot is set, so shared links show a picture"],
  ];
  return (
    <>
      <div className="serp-preview" aria-label="Google search snippet preview">
        <span className="serp-label">Search result preview</span>
        <div className="serp-url">https://aurlabs.online › {e.slug || "product-slug"}</div>
        <div className="serp-title">{title || "Product Name | Aur Labs"}</div>
        <p className="serp-desc">
          {desc || "Add a description or search description to preview how this product appears in search results."}
        </p>
        <div className="serp-meta">
          Free · {e.category === "app" ? "Mobile App" : e.category === "cli" ? "CLI Tool" : "Desktop Software"}
          {e.platforms?.length ? ` · ${e.platforms.join(", ")}` : ""}
        </div>
      </div>
      <ul className="seo-check" aria-label="Search checklist">
        {rows.map(([ok, msg], i) => (
          <li key={i} className={ok ? "ok" : "warn"}>
            <span aria-hidden="true">{ok ? "✓" : "!"}</span>
            {msg}
          </li>
        ))}
      </ul>
    </>
  );
}

type TeamAdminRecord = { id: string; name: string; email: string; created_at: number };
type ReleaseHealthRow = {
  product: string;
  slug: string;
  version: string;
  platform: string;
  url: string;
  ok: boolean;
  status: number;
};

type AdminData = {
  content: SiteContent;
  inbox: any[];
  assets: any[];
  events: any[];
  teamAdmins?: TeamAdminRecord[];
  username: string;
  role?: "owner" | "team";
};
type Section =
  | "overview"
  | "products"
  | "journal"
  | "research"
  | "team"
  | "access"
  | "auri"
  | "inbox"
  | "media"
  | "seo"
  | "settings";
type Status = { signedIn: boolean; configured: boolean; canSetup: boolean; isOwner: boolean };

function Input({
  label,
  value,
  onChange,
  area = false,
  type = "text",
  required = false,
  hint = "",
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  area?: boolean;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className={"field " + (area ? "span-two" : "")}>
      <span>{label}</span>
      {area ? (
        <textarea
          rows={label.toLowerCase().includes("body") ? 12 : 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
      <small className="field-hint">{hint}</small>
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  options: string[];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="check-label">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export default function Admin({ initial }: { initial: SiteContent }) {
  void initial;
  const [status, setStatus] = useState<Status | null>(null);
  const [data, setData] = useState<AdminData | null>(null);
  const [section, setSection] = useState<Section>("overview");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editor, setEditor] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [inboxKind, setInboxKind] = useState("all");
  const [loginMode, setLoginMode] = useState<"owner" | "team">("owner");
  const [auth, setAuth] = useState({ username: "", password: "", setupToken: "", teamEmail: "", teamToken: "" });
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(false);
  const [password, setPassword] = useState({ currentPassword: "", password: "" });
  const [invite, setInvite] = useState({ name: "", email: "" });
  const [issuedInvite, setIssuedInvite] = useState<{
    name: string;
    email: string;
    accessToken: string;
    emailed: boolean;
  } | null>(null);
  const [releaseHealth, setReleaseHealth] = useState<ReleaseHealthRow[] | null>(null);
  const editKind = section as ContentKind;
  const uploadRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLInputElement>(null);

  const statusLoad = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin?view=status");
      const d: any = await r.json();
      if (!r.ok) throw new Error(d.error);
      setStatus(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t connect.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    statusLoad();
  }, []);

  useEffect(() => {
    if (!editor) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [editor]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const getData = async (t = token) => {
    const r = await fetch("/api/admin", { headers: { "x-aur-unlock": t } });
    const d: any = await r.json();
    if (!r.ok) {
      if (r.status === 401) {
        setToken("");
        setData(null);
        statusLoad();
      }
      throw new Error(d.error);
    }
    setData(d);
    return d;
  };

  const action = async (body: any, t = token) => {
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-aur-unlock": t },
      body: JSON.stringify(body),
    });
    const d: any = await r.json();
    if (!r.ok) {
      if (r.status === 401 && !["unlock", "setup", "team_unlock"].includes(body.action)) {
        setToken("");
        setData(null);
        statusLoad();
      }
      throw new Error(d.error || "This action failed.");
    }
    return d;
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      if (status?.configured && loginMode === "team") {
        const r = await action({
          action: "team_unlock",
          email: auth.teamEmail,
          accessToken: auth.teamToken,
        });
        setToken(r.unlockToken);
        setAuth({ username: "", password: "", setupToken: "", teamEmail: "", teamToken: "" });
        await getData(r.unlockToken);
        return;
      }
      const r = await action({
        action: status?.configured ? "unlock" : "setup",
        username: auth.username,
        password: auth.password,
        setupToken: auth.setupToken,
      });
      setToken(r.unlockToken);
      setAuth({ username: "", password: "", setupToken: "", teamEmail: "", teamToken: "" });
      await getData(r.unlockToken);
      setStatus((s) => (s ? { ...s, configured: true, isOwner: true } : s));
    });
  };

  const navigate = (s: Section) => {
    if (editor && !window.confirm("Discard unsaved changes?")) return;
    setSection(s);
    setEditor(null);
    setSelected(null);
    setQuery("");
    setNotice("");
    setError("");
    setMenu(false);
  };

  const slugify = (t: string) =>
    t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);

  const edit = (key: string, value: any) =>
    setEditor((s: any) => ({
      ...s,
      [key]: value,
      ...(key === "slug"
        ? { _autoSlug: false }
        : s?._autoSlug && ((section === "products" && key === "name") || (section !== "products" && key === "title"))
          ? { slug: slugify(String(value)) }
          : {}),
    }));

  const newItem = () => {
    const id = crypto.randomUUID(),
      date = new Date().toISOString().slice(0, 10);
    if (section === "products") {
      setEditor({
        id,
        slug: "",
        _autoSlug: true,
        name: "",
        tagline: "",
        description: "",
        category: "software",
        platforms: ["Windows"],
        status: "development",
        featured: false,
        accent: "lavender",
        visual: "notes",
        features: [],
        screenshots: [],
        video: "",
        repository: "",
        license: "To be confirmed before release",
        releases: [],
        seoTitle: "",
        seoDescription: "",
        keyword: "",
        faq: "",
        published: false,
      });
    } else if (section === "team") {
      setEditor({ id, name: "", role: "", bio: "", initials: "", image: "", url: "", published: false });
    } else {
      setEditor({
        id,
        slug: "",
        _autoSlug: true,
        title: "",
        summary: "",
        body: "",
        tag: section === "research" ? "Research direction" : "From the lab",
        author: "Aur Labs",
        date,
        cover: "",
        video: "",
        references: [],
        published: false,
      });
    }
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      const { _autoSlug, ...clean } = editor;
      void _autoSlug;
      const payload =
        editKind === "products"
          ? { ...clean, features: (clean.features || []).map((f: string) => f.trim()).filter(Boolean) }
          : clean;
      await action({ action: "save", kind: editKind, data: payload });
      await getData();
      setEditor(null);
      setNotice(
        payload.published
          ? "Saved and published. This record is now live on the website."
          : "Draft saved. This record is visible only in the studio."
      );
    });
  };

  const remove = (item: any) => {
    if (
      !window.confirm(
        "Delete “" + (item.name || item.title) + "” from the website? This also removes its public page."
      )
    )
      return;
    run(async () => {
      await action({ action: "delete", kind: section, id: item.id });
      await getData();
      setNotice("Content deleted.");
    });
  };

  const upload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const r = await fetch("/api/media", { method: "POST", headers: { "x-aur-unlock": token }, body: form });
    const d: any = await r.json();
    if (!r.ok) throw new Error(d.error);
    return d.url as string;
  };

  const editorUpload = (file: File, key: string) =>
    run(async () => {
      const url = await upload(file);
      if (key === "screenshots") setEditor((s: any) => ({ ...s, screenshots: [...s.screenshots, url] }));
      else edit(key, url);
      await getData();
      setNotice("Media uploaded. Save the record to publish it.");
    });

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aur-labs-admin-export-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    setNotice("Export downloaded. It contains private inbox information; keep it secure.");
  };

  const handleRestoreBackup = (file: File) => {
    run(async () => {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      const r = await action({ action: "restore_backup", data: parsed });
      await getData();
      setNotice(`Backup restored successfully (${r.restored} content records updated).`);
    });
  };

  const fileField = (key: string, label: string, multiple = false) => (
    <div className="admin-image-field span-two">
      <span className="field-label">{label}</span>
      <div className="admin-image-preview">
        {(multiple ? editor[key] : editor[key] ? [editor[key]] : []).map((src: string, i: number) => (
          <div key={i}>
            <img src={src} alt="Uploaded preview" />
            <button
              type="button"
              className="icon-button"
              aria-label="Remove image from this record"
              onClick={() =>
                multiple
                  ? edit(
                      key,
                      editor[key].filter((_: string, n: number) => n !== i)
                    )
                  : edit(key, "")
              }
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <label className="button light small-button">
        <Upload size={14} /> Upload image
        <input
          hidden
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) editorUpload(f, key);
            e.target.value = "";
          }}
        />
      </label>
      <Input
        label={multiple ? "Image URLs (one per line)" : "Or paste an HTTPS image URL"}
        value={multiple ? editor[key].join("\n") : editor[key] || ""}
        area={multiple}
        onChange={(v) => edit(key, multiple ? v.split("\n").filter(Boolean) : v)}
        hint="PNG, JPEG, WebP, GIF · max 4 MB per upload. Use screenshots or images you have permission to publish."
      />
    </div>
  );

  const videoField = (
    key: string,
    label: string,
    val: string,
    onChangeVal: (v: string) => void
  ) => (
    <div className="admin-image-field span-two">
      <span className="field-label">{label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <label className="button light small-button">
          <PlayCircle size={14} /> Upload MP4/WebM video (max 4 MB)
          <input
            hidden
            type="file"
            accept="video/mp4,video/webm"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                run(async () => {
                  const url = await upload(f);
                  onChangeVal(url);
                  await getData();
                  setNotice("Video uploaded. Save changes to publish it.");
                });
              }
              e.target.value = "";
            }}
          />
        </label>
        {val && (
          <button type="button" className="button light small-button" onClick={() => onChangeVal("")}>
            <X size={14} /> Remove video
          </button>
        )}
      </div>
      <Input
        label="Or paste a YouTube, Vimeo, or HTTPS MP4/WebM URL"
        value={val}
        onChange={onChangeVal}
        hint="Supports YouTube links, YouTube Shorts, Vimeo links, direct HTTPS video URLs, or uploaded MP4/WebM clips."
      />
    </div>
  );

  const isOwnerRole = (data?.role || "owner") === "owner";
  const sidebar: [Section, string, any][] = [
    ["overview", "Overview", LayoutDashboard],
    ["products", "Products", Package],
    ["journal", "Journal", FileText],
    ["research", "Research", FlaskConical],
    ["team", "Team", Users],
    ...(isOwnerRole ? ([["access", "Team access", UserPlus]] as [Section, string, any][]) : []),
    ["auri", "Auri knowledge", Sparkles],
    ["inbox", "Inbox", Inbox],
    ["media", "Media library", ImageIcon],
    ["seo", "SEO Analytics", TrendingUp],
    ["settings", "Site settings", SettingsIcon],
  ];

  if (!data || !token) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-theme">
          <ThemeToggle />
        </div>
        <a href="/" className="brand">
          <Mark />
          <span>Aur Labs</span>
        </a>
        <div className="admin-gate-panel">
          <span className="admin-lock-icon">
            <LockKeyhole size={27} />
          </span>
          <h1>
            {status?.configured
              ? loginMode === "team"
                ? "Team member access"
                : "Admin sign in"
              : "Set up your studio"}
          </h1>
          <p>
            {status?.configured
              ? loginMode === "team"
                ? "Enter your invited email address and personal access token from the main owner."
                : "Enter your admin username and password."
              : "Create your administrator account. You’ll need the private setup token."}
          </p>
          {status?.configured && !loading && (
            <div className="category-tabs" style={{ marginBottom: 16 }} role="tablist" aria-label="Sign in method">
              <button
                type="button"
                role="tab"
                aria-selected={loginMode === "owner"}
                className={loginMode === "owner" ? "active" : ""}
                onClick={() => {
                  setLoginMode("owner");
                  setError("");
                }}
              >
                Main Admin
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={loginMode === "team"}
                className={loginMode === "team" ? "active" : ""}
                onClick={() => {
                  setLoginMode("team");
                  setError("");
                }}
              >
                Team Member Token
              </button>
            </div>
          )}
          {loading ? (
            <p className="loading-line">Checking secure access…</p>
          ) : status && !status.configured && !status.canSetup ? (
            <div className="setup-instructions">
              <h3>One private setup step first.</h3>
              <ol>
                <li>
                  Add a long, random <code>AUR_ADMIN_SETUP_TOKEN</code> in the hosting environment settings.
                </li>
                <li>Return here and open this page.</li>
                <li>
                  Enter that token, then choose your admin username and password. Remove the token from hosting after
                  setup.
                </li>
              </ol>
              <p>The admin is locked until that secret is configured. No default password is shipped.</p>
              <button className="button light" onClick={() => statusLoad()}>
                <RefreshCw size={15} /> Check again
              </button>
            </div>
          ) : status ? (
            <form onSubmit={signIn} className="admin-login-form">
              {!status.configured && (
                <Input
                  label="Private setup token"
                  type="password"
                  value={auth.setupToken}
                  onChange={(v) => setAuth((s) => ({ ...s, setupToken: v }))}
                  required
                />
              )}
              {status.configured && loginMode === "team" ? (
                <>
                  <Input
                    label="Invited email address"
                    type="email"
                    value={auth.teamEmail}
                    onChange={(v) => setAuth((s) => ({ ...s, teamEmail: v }))}
                    required
                  />
                  <Input
                    label="Personal access token"
                    type="password"
                    value={auth.teamToken}
                    onChange={(v) => setAuth((s) => ({ ...s, teamToken: v }))}
                    required
                    hint="Paste the aur_team_... token sent to your email by the main admin."
                  />
                </>
              ) : (
                <>
                  <Input
                    label="Admin username"
                    value={auth.username}
                    onChange={(v) => setAuth((s) => ({ ...s, username: v }))}
                    required
                  />
                  <Input
                    label="Admin password"
                    type="password"
                    value={auth.password}
                    onChange={(v) => setAuth((s) => ({ ...s, password: v }))}
                    required
                    hint={status.configured ? "" : "At least 12 characters. Use a unique password."}
                  />
                </>
              )}
              <button className="button orange full" disabled={busy}>
                {busy
                  ? "Checking…"
                  : !status.configured
                    ? "Create my admin account"
                    : loginMode === "team"
                      ? "Connect with team token"
                      : "Sign in"}
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <button className="button dark" onClick={() => statusLoad()}>
              Try connecting again
            </button>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <a href="/" className="text-link">
            <ArrowLeft size={14} /> Back to the website
          </a>
        </div>
        <p className="tiny muted">Admin access is protected by your owner password or verified team token.</p>
      </div>
    );
  }

  const inbox = data.inbox.filter(
    (x) =>
      (inboxKind === "all" || x.kind === inboxKind) &&
      [x.name, x.email, x.data].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="admin-app">
      <aside className={"admin-sidebar " + (menu ? "open" : "")}>
        <a href="/" className="brand">
          <Mark />
          <span>Aur Labs</span>
        </a>
        <nav aria-label="Admin navigation">
          {sidebar.map(([key, label, I]) => (
            <button key={key} className={section === key ? "active" : ""} onClick={() => navigate(key)}>
              <I size={17} />
              {label}
              {key === "inbox" && data.inbox.filter((x) => x.status === "new").length > 0 && (
                <span className="inbox-count">{data.inbox.filter((x) => x.status === "new").length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ArrowUpRight size={16} /> View website
          </a>
          <button
            onClick={() =>
              run(async () => {
                await action({ action: "lock" });
                setToken("");
                setData(null);
                await statusLoad();
              })
            }
          >
            <LogOut size={16} /> Lock studio
          </button>
          <span>
            <ShieldCheck size={13} /> {data.username} ({isOwnerRole ? "Main owner" : "Team admin"})
          </span>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="icon-button admin-menu" aria-label="Toggle admin menu" onClick={() => setMenu((v) => !v)}>
            <Menu />
          </button>
          <span>
            Aur Labs <ChevronRight size={13} /> {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
          <div>
            <ThemeToggle />
            <span className="green-dot" /> Connected to live content
            <button
              className="icon-button"
              aria-label="Refresh admin data"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  await getData();
                  setNotice("Refreshed.");
                })
              }
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </header>
        <div className="admin-workspace">
          {error && (
            <div className="form-error" role="alert">
              {error}
              <button className="icon-button" aria-label="Dismiss error" onClick={() => setError("")}>
                <X size={15} />
              </button>
            </div>
          )}
          {notice && (
            <div className="admin-notice" role="status">
              <CheckCircle2 size={17} />
              {notice}
            </div>
          )}

          {section === "overview" ? (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>Overview</h1>
                  <p>A summary of your site content, downloads, security log, and release health.</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    className="button light"
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        const r = await action({ action: "check_releases" });
                        setReleaseHealth(r.results || []);
                        setNotice(`Checked ${r.results?.length || 0} release download links.`);
                      })
                    }
                  >
                    <ShieldAlert size={16} /> Check download links
                  </button>
                  <button className="button light" onClick={exportData}>
                    <Download size={16} /> Export backup
                  </button>
                </div>
              </div>
              <div className="admin-stats">
                {[
                  ["Products", data.content.products.length, Package, "products"],
                  ["Stories & research", data.content.journal.length + data.content.research.length, FileText, "journal"],
                  ["Team members", data.content.team.length, Users, "team"],
                  ["New messages", data.inbox.filter((x) => x.status === "new").length, Inbox, "inbox"],
                ].map(([label, count, I, target]: any) => (
                  <button key={label} onClick={() => navigate(target)}>
                    <I size={21} />
                    <b>{count}</b>
                    <span>
                      {label}
                      <ArrowUpRight size={15} />
                    </span>
                  </button>
                ))}
              </div>
              {releaseHealth && (
                <section className="admin-panel" style={{ marginBottom: 22 }}>
                  <div className="section-heading">
                    <h2>Release download health</h2>
                    <button type="button" className="icon-button" aria-label="Close check" onClick={() => setReleaseHealth(null)}>
                      <X size={16} />
                    </button>
                  </div>
                  {releaseHealth.length === 0 ? (
                    <p className="muted">No release URLs are configured yet.</p>
                  ) : (
                    <div className="content-list" style={{ padding: 0 }}>
                      {releaseHealth.map((r, i) => (
                        <div className="content-row" key={i}>
                          <div>
                            <b>
                              {r.product} ({r.platform} v{r.version})
                            </b>
                            <p style={{ wordBreak: "break-all" }}>{r.url}</p>
                          </div>
                          <span className={"admin-badge " + (r.ok ? "published" : "")}>
                            {r.ok ? `OK (${r.status})` : r.status ? `HTTP ${r.status}` : "Unreachable"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}
              <DownloadStats token={token} />
              <div className="admin-overview-grid">
                <section className="admin-panel">
                  <h2>Launch checklist</h2>
                  <p className="muted">Finish these as your real content becomes ready.</p>
                  {[
                    ["Add real products & release files", "Replace illustrative concepts with your published work.", "products"],
                    ["Upload product screenshots & videos", "Make the catalogue unmistakably yours.", "media"],
                    ...(isOwnerRole
                      ? ([["Invite team admins by token", "Share studio access safely without giving your owner password.", "access"]] as [string, string, string][])
                      : []),
                    ["Review your public copy & socials", "Confirm your mission, social accounts, and contact channels.", "settings"],
                  ].map(([t, d, k], i) => (
                    <button className="launch-step" key={t} onClick={() => navigate(k as Section)}>
                      <span>0{i + 1}</span>
                      <div>
                        <b>{t}</b>
                        <p>{d}</p>
                      </div>
                      <ChevronRight size={17} />
                    </button>
                  ))}
                </section>
                <section className="admin-panel">
                  <h2>Recent security & edit log</h2>
                  {data.events.length ? (
                    data.events.slice(0, 15).map((e, i) => {
                      const isAlert = String(e.action || "").includes("failed");
                      const actorLabel =
                        e.actor === "owner"
                          ? "Main owner"
                          : String(e.actor || "").startsWith("team:")
                            ? "Team admin"
                            : "Anonymous";
                      return (
                        <div className="activity-row" key={i}>
                          <span className="orange-dot" style={isAlert ? { background: "#fb7185" } : undefined} />
                          <div>
                            <b>
                              {e.action.replaceAll(".", " / ")}
                              {isAlert && (
                                <span
                                  style={{
                                    marginLeft: 8,
                                    padding: "2px 7px",
                                    borderRadius: 999,
                                    fontSize: 10,
                                    background: "rgba(244, 63, 94, 0.16)",
                                    color: "#fb7185",
                                  }}
                                >
                                  Security alert
                                </span>
                              )}
                            </b>
                            <span>
                              {actorLabel} · {e.target}
                            </span>
                          </div>
                          <small>{new Date(e.created_at).toLocaleDateString()}</small>
                        </div>
                      );
                    })
                  ) : (
                    <p className="muted">Your edits and security events will appear here.</p>
                  )}
                  <div className="admin-tip">
                    <ShieldCheck size={20} />
                    <p>
                      Admin unlocks expire after 30 minutes and stay only in this tab’s memory. Save changes before leaving.
                    </p>
                  </div>
                </section>
              </div>
            </>
          ) : section === "access" && isOwnerRole ? (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>Team admin access</h1>
                  <p>
                    Grant studio access to teammates using a personal email + token instead of sharing your owner password.
                    Team admins cannot invite or remove other admins.
                  </p>
                </div>
              </div>
              <section className="admin-panel" style={{ marginBottom: 24 }}>
                <h2>Invite or re-issue token for a team member</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    run(async () => {
                      const r = await action({ action: "team_invite", name: invite.name, email: invite.email });
                      setIssuedInvite({
                        name: r.name,
                        email: r.email,
                        accessToken: r.accessToken,
                        emailed: Boolean(r.emailed),
                      });
                      setInvite({ name: "", email: "" });
                      await getData();
                      setNotice(
                        r.emailed
                          ? `Access token generated and emailed to ${r.email}.`
                          : `Access token generated for ${r.email}. Copy or send it via your email app below.`
                      );
                    });
                  }}
                >
                  <div className="fields-grid">
                    <Input
                      label="Team member name"
                      value={invite.name}
                      onChange={(v) => setInvite((s) => ({ ...s, name: v }))}
                      required
                    />
                    <Input
                      label="Team member email"
                      type="email"
                      value={invite.email}
                      onChange={(v) => setInvite((s) => ({ ...s, email: v }))}
                      required
                    />
                  </div>
                  <button className="button orange" disabled={busy}>
                    <UserPlus size={16} /> Generate token &amp; send email
                  </button>
                </form>
                {issuedInvite && (
                  <div className="admin-notice" style={{ marginTop: 18, flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                    <b>
                      Access token for {issuedInvite.name} ({issuedInvite.email})
                    </b>
                    <code style={{ wordBreak: "break-all", fontSize: 13 }}>{issuedInvite.accessToken}</code>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className="button light small-button"
                        onClick={() =>
                          run(async () => {
                            await navigator.clipboard.writeText(issuedInvite.accessToken);
                            setNotice("Team access token copied.");
                          })
                        }
                      >
                        <Copy size={13} /> Copy token
                      </button>
                      <a
                        className="button light small-button"
                        href={`mailto:${issuedInvite.email}?subject=${encodeURIComponent(
                          "Your Aur Labs Team Admin Access Token"
                        )}&body=${encodeURIComponent(
                          `Hello ${issuedInvite.name},\n\nYou have been added as a Team Admin on Aur Labs.\n\nOpen: ${window.location.origin}/admin\nChoose: Team Member Token\nEmail: ${issuedInvite.email}\nAccess Token: ${issuedInvite.accessToken}\n`
                        )}`}
                      >
                        <Mail size={13} /> Open email app
                      </a>
                    </div>
                  </div>
                )}
              </section>
              <section className="admin-panel content-list">
                <h2>Active team admins ({(data.teamAdmins || []).length})</h2>
                {(data.teamAdmins || []).length === 0 ? (
                  <p className="muted" style={{ padding: "12px 0" }}>
                    No team admins have been invited yet.
                  </p>
                ) : (
                  (data.teamAdmins || []).map((m) => (
                    <div className="content-row" key={m.id}>
                      <span className="content-row-icon">
                        <Users size={20} />
                      </span>
                      <div>
                        <b>{m.name}</b>
                        <p>
                          {m.email} · Added {new Date(m.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="admin-badge published">Team admin</span>
                      <button
                        type="button"
                        className="button light small-button"
                        disabled={busy}
                        onClick={() => {
                          if (!window.confirm(`Revoke admin access for ${m.name} (${m.email})?`)) return;
                          run(async () => {
                            await action({ action: "team_remove", id: m.id });
                            await getData();
                            setNotice(`Revoked admin access for ${m.email}.`);
                          });
                        }}
                      >
                        <Trash2 size={14} /> Revoke
                      </button>
                    </div>
                  ))
                )}
              </section>
            </>
          ) : ["products", "journal", "research", "team"].includes(section) ? (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>
                    {editor
                      ? editor.name || editor.title || "New record"
                      : section === "team"
                        ? "Team"
                        : section === "products"
                          ? "Products"
                          : section === "research"
                            ? "Research"
                            : "Journal"}
                  </h1>
                  <p>
                    {editor
                      ? "Save as a draft, or publish it to make it visible on the website."
                      : "Create, edit, and publish content. All changes are saved on the server."}
                  </p>
                </div>
                {!editor && (
                  <button className="button orange" onClick={newItem}>
                    <Plus size={16} /> Add {section === "team" ? "member" : section === "products" ? "product" : "article"}
                  </button>
                )}
              </div>
              {editor ? (
                <form className="admin-editor" onSubmit={save}>
                  <div className="editor-top">
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => {
                        if (window.confirm("Discard unsaved changes?")) setEditor(null);
                      }}
                    >
                      <ArrowLeft size={15} /> All {section}
                    </button>
                    <div data-auri="admin-publish">
                      <Toggle
                        label="Published on the website"
                        checked={editor.published}
                        onChange={(v) => edit("published", v)}
                      />
                    </div>
                  </div>
                  <div className="fields-grid">
                    {section === "products" ? (
                      <>
                        <Input label="Product name" value={editor.name} onChange={(v) => edit("name", v)} required />
                        <Input
                          label="URL slug"
                          value={editor.slug}
                          onChange={(v) => edit("slug", v)}
                          required
                          hint="Lowercase letters, numbers, and hyphens. Example: aur-notes"
                        />
                        <Input label="Tagline" value={editor.tagline} onChange={(v) => edit("tagline", v)} required />
                        <Select
                          label="Category"
                          value={editor.category}
                          onChange={(v) => edit("category", v)}
                          options={["software", "app", "cli"]}
                        />
                        <Input
                          label="Description"
                          value={editor.description}
                          onChange={(v) => edit("description", v)}
                          area
                          required
                        />
                        <Select
                          label="Release status"
                          value={editor.status}
                          onChange={(v) => edit("status", v)}
                          options={["concept", "development", "released"]}
                        />
                        <Input label="License" value={editor.license} onChange={(v) => edit("license", v)} required />
                        <div className="span-two seo-box">
                          <h3>Search appearance</h3>
                          <p className="muted">
                            How this product looks on Google and when its link is shared. Leave a box empty and the name,
                            tagline and description are used automatically.
                          </p>
                          <div className="fields-grid">
                            <Input
                              label="Main search phrase"
                              value={editor.keyword || ""}
                              onChange={(v) => edit("keyword", v)}
                              hint="The one phrase you want people to find this by."
                            />
                            <Input
                              label="Search title"
                              value={editor.seoTitle || ""}
                              onChange={(v) => edit("seoTitle", v)}
                              hint="Around 50 to 60 characters, with the main phrase near the start."
                            />
                            <Input
                              label="Search description"
                              value={editor.seoDescription || ""}
                              onChange={(v) => edit("seoDescription", v)}
                              area
                              hint="Around 120 to 155 characters: what it does and who it is for."
                            />
                            <Input
                              label="Questions and answers (FAQ)"
                              value={editor.faq || ""}
                              onChange={(v) => edit("faq", v)}
                              area
                              hint="First line is the question, next lines are the answer. Leave a blank line between pairs."
                            />
                          </div>
                          <SeoCheck e={editor} />
                        </div>
                        <div className="span-two admin-platforms">
                          <span className="field-label">Target / supported platforms</span>
                          {PLATFORMS.map((p) => (
                            <Toggle
                              key={p}
                              label={p}
                              checked={editor.platforms.includes(p)}
                              onChange={(v) =>
                                edit(
                                  "platforms",
                                  v ? [...editor.platforms, p] : editor.platforms.filter((x: string) => x !== p)
                                )
                              }
                            />
                          ))}
                        </div>
                        <Input
                          label="Features (one per line)"
                          value={editor.features.join("\n")}
                          onChange={(v) => edit("features", v.split("\n"))}
                          area
                        />
                        <Input
                          label="Source repository URL (optional)"
                          value={editor.repository}
                          onChange={(v) => edit("repository", v)}
                          type="url"
                        />
                        <Toggle
                          label="Feature on the home page"
                          checked={editor.featured}
                          onChange={(v) => edit("featured", v)}
                        />
                        <Select
                          label="Preview background"
                          value={editor.accent}
                          onChange={(v) => edit("accent", v)}
                          options={["peach", "lavender", "mint"]}
                        />
                        <Select
                          label="Fallback concept illustration"
                          value={editor.visual}
                          onChange={(v) => edit("visual", v)}
                          options={["notes", "mobile", "terminal"]}
                        />
                        {fileField("screenshots", "Product screenshots", true)}
                        {videoField("video", "Product launch / demo video (optional)", editor.video || "", (v) =>
                          edit("video", v)
                        )}
                        <div className="span-two releases-editor">
                          <div className="section-heading">
                            <h2>Releases &amp; versions</h2>
                            <button
                              className="button light small-button"
                              type="button"
                              onClick={() =>
                                edit("releases", [
                                  ...editor.releases,
                                  {
                                    platform: editor.platforms[0] || "Windows",
                                    version: "",
                                    url: "",
                                    architecture: "x64",
                                    requirements: "",
                                    checksum: "",
                                    notes: "",
                                    date: new Date().toISOString().slice(0, 10),
                                  },
                                ])
                              }
                            >
                              <Plus size={15} /> Add release
                            </button>
                          </div>
                          <p className="tiny muted">
                            Use real HTTPS release URLs. Specify tested OS distributions, architecture, and requirements.
                          </p>
                          {editor.releases.map((r: Release, i: number) => {
                            const setR = (key: string, v: string) =>
                              edit(
                                "releases",
                                editor.releases.map((old: Release, n: number) => (n === i ? { ...old, [key]: v } : old))
                              );
                            return (
                              <fieldset key={i}>
                                <legend>Release {i + 1}</legend>
                                <div className="fields-grid">
                                  <Select
                                    label="Platform"
                                    value={r.platform}
                                    onChange={(v) => setR("platform", v)}
                                    options={[...PLATFORMS]}
                                  />
                                  <Input label="Version" value={r.version} onChange={(v) => setR("version", v)} required />
                                  <Input
                                    label="Architecture"
                                    value={r.architecture}
                                    onChange={(v) => setR("architecture", v)}
                                    required
                                  />
                                  <Input
                                    label="Release date"
                                    type="date"
                                    value={r.date}
                                    onChange={(v) => setR("date", v)}
                                    required
                                  />
                                  <Input
                                    label="Download URL"
                                    value={r.url}
                                    onChange={(v) => setR("url", v)}
                                    required
                                    type="url"
                                  />
                                  <Input
                                    label="SHA-256 checksum (optional)"
                                    value={r.checksum}
                                    onChange={(v) => setR("checksum", v)}
                                  />
                                  <Input
                                    label="Requirements / supported distributions"
                                    value={r.requirements}
                                    onChange={(v) => setR("requirements", v)}
                                    area
                                  />
                                  <Input
                                    label="Release notes / changelog"
                                    value={r.notes}
                                    onChange={(v) => setR("notes", v)}
                                    area
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="danger-link"
                                  onClick={() =>
                                    edit(
                                      "releases",
                                      editor.releases.filter((_: Release, n: number) => n !== i)
                                    )
                                  }
                                >
                                  <Trash2 size={14} /> Remove release
                                </button>
                              </fieldset>
                            );
                          })}
                        </div>
                      </>
                    ) : section === "team" ? (
                      <>
                        <Input label="Full name" value={editor.name} onChange={(v) => edit("name", v)} required />
                        <Input label="Role" value={editor.role} onChange={(v) => edit("role", v)} required />
                        <Input
                          label="Initials (1 to 4 characters)"
                          value={editor.initials}
                          onChange={(v) => edit("initials", v)}
                          required
                        />
                        <Input label="Profile link (optional)" value={editor.url} onChange={(v) => edit("url", v)} type="url" />
                        <Input label="Biography" value={editor.bio} onChange={(v) => edit("bio", v)} area />
                        {fileField("image", "Portrait")}
                      </>
                    ) : (
                      <>
                        <Input label="Title" value={editor.title} onChange={(v) => edit("title", v)} required />
                        <Input label="URL slug" value={editor.slug} onChange={(v) => edit("slug", v)} required />
                        <Input label="Category / tag" value={editor.tag} onChange={(v) => edit("tag", v)} required />
                        <Input label="Author" value={editor.author} onChange={(v) => edit("author", v)} required />
                        <Input label="Date" type="date" value={editor.date} onChange={(v) => edit("date", v)} required />
                        <Input label="Summary" value={editor.summary} onChange={(v) => edit("summary", v)} area required />
                        <Input
                          label="Article body"
                          value={editor.body}
                          onChange={(v) => edit("body", v)}
                          area
                          required
                          hint="Separate paragraphs with a blank line. Start a paragraph with ## for a section heading."
                        />
                        {fileField("cover", "Cover image")}
                        {videoField("video", "Article / walkthrough video (optional)", editor.video || "", (v) =>
                          edit("video", v)
                        )}
                        <div className="references-editor span-two">
                          <h3>References &amp; further reading</h3>
                          <p className="muted">Add sources readers can open from the article. Up to 20 HTTPS links.</p>
                          {(editor.references || []).map((ref: { label: string; url: string }, i: number) => (
                            <div className="reference-editor-row" key={i}>
                              <Input
                                label={"Reference " + (i + 1) + " title"}
                                value={ref.label}
                                onChange={(v) =>
                                  edit(
                                    "references",
                                    editor.references.map((r: any, n: number) => (n === i ? { ...r, label: v } : r))
                                  )
                                }
                              />
                              <Input
                                label="Source URL"
                                type="url"
                                value={ref.url}
                                onChange={(v) =>
                                  edit(
                                    "references",
                                    editor.references.map((r: any, n: number) => (n === i ? { ...r, url: v } : r))
                                  )
                                }
                              />
                              <button
                                type="button"
                                className="icon-button danger"
                                aria-label={"Remove reference " + (i + 1)}
                                onClick={() =>
                                  edit(
                                    "references",
                                    editor.references.filter((_: unknown, n: number) => n !== i)
                                  )
                                }
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          ))}
                          <button
                            className="button light small-button"
                            type="button"
                            disabled={(editor.references || []).length >= 20}
                            onClick={() =>
                              edit("references", [...(editor.references || []), { label: "", url: "" }])
                            }
                          >
                            <Plus size={14} /> Add reference
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="editor-footer">
                    <span className="tiny muted">
                      {editor.published
                        ? "This save publishes your changes immediately."
                        : "This record will remain a private draft."}
                    </span>
                    <div className="editor-buttons">
                      <button className="button light" type="button" onClick={() => setPreview(true)}>
                        <Eye size={16} /> Preview
                      </button>
                      <button data-auri="admin-save" className="button orange" disabled={busy}>
                        <Save size={16} />
                        {busy ? "Saving…" : "Save " + (editor.published ? "& publish" : "draft")}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                (() => {
                  const items = data.content[section as "products" | "journal" | "research" | "team"] as any[];
                  const filtered = items.filter((item) =>
                    [item.name, item.title, item.tagline, item.role, item.summary, item.slug]
                      .filter(Boolean)
                      .join(" ")
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  );
                  return (
                    <>
                      {items.length >= 2 && (
                        <div className="admin-list-toolbar">
                          <label className="search-box">
                            <Search size={16} />
                            <input
                              aria-label={"Search " + section}
                              placeholder={"Filter " + section + "…"}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                              <button type="button" aria-label="Clear filter" onClick={() => setQuery("")}>
                                <X size={14} />
                              </button>
                            )}
                          </label>
                        </div>
                      )}
                      <div className="admin-panel content-list">
                        {filtered.map((item) => (
                          <div className="content-row" key={item.id}>
                            <span className="content-row-icon">
                              {section === "products" ? (
                                <Package size={20} />
                              ) : section === "team" ? (
                                <Users size={20} />
                              ) : (
                                <FileText size={20} />
                              )}
                            </span>
                            <div>
                              <b>{item.name || item.title}</b>
                              <p>{item.tagline || item.role || item.summary}</p>
                            </div>
                            <span className={"admin-badge " + (item.published ? "published" : "")}>
                              {item.published ? "Published" : "Draft"}
                            </span>
                            {item.published && section !== "team" && (
                              <a
                                className="button light small-button"
                                href={section === "products" ? "/" + item.slug : "/" + section + "/" + item.slug}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View <ArrowUpRight size={14} />
                              </a>
                            )}
                            <button
                              className="button light small-button"
                              onClick={() => setEditor(structuredClone(item))}
                            >
                              Edit <ArrowUpRight size={14} />
                            </button>
                            <button
                              className="icon-button danger"
                              aria-label={"Delete " + (item.name || item.title)}
                              onClick={() => remove(item)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        {!items.length && (
                          <div className="empty-state">
                            <Plus size={30} />
                            <h2>A blank canvas.</h2>
                            <p>Add your first item to get started.</p>
                            <button className="button dark" onClick={newItem}>
                              Create an item
                            </button>
                          </div>
                        )}
                        {items.length > 0 && !filtered.length && (
                          <div className="empty-state compact">
                            <Search size={26} />
                            <h3>No matching {section}.</h3>
                            <button className="button light small-button" onClick={() => setQuery("")}>
                              Clear filter
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()
              )}
            </>
          ) : section === "seo" ? (
            <SEODashboard
              products={data.content.products}
              token={token}
              onEditProduct={(p) => {
                setSection("products");
                setEditor(structuredClone(p));
                setNotice("");
              }}
            />
          ) : section === "auri" ? (
            <AuriKnowledge token={token} />
          ) : section === "inbox" ? (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>Inbox</h1>
                  <p>Applications, ideas, and problems worth listening to. Latest 500 submissions.</p>
                </div>
                <button className="button light" onClick={exportData}>
                  <Download size={16} /> Export data
                </button>
              </div>
              <div className="catalogue-toolbar">
                <div className="category-tabs">
                  {[
                    ["all", "All messages"],
                    ["join", "Applications"],
                    ["contact", "Contact"],
                    ["notify", "Release alerts"],
                  ].map(([k, l]) => (
                    <button className={inboxKind === k ? "active" : ""} key={k} onClick={() => setInboxKind(k)}>
                      {l}
                    </button>
                  ))}
                </div>
                <label className="search-box">
                  <Search size={16} />
                  <input
                    aria-label="Search inbox"
                    placeholder="Search name, email, or message"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>
              <div className="inbox-layout">
                <div className="admin-panel inbox-list">
                  {inbox.length ? (
                    inbox.map((item) => (
                      <button
                        className={"inbox-item " + (selected?.id === item.id ? "active" : "")}
                        key={item.id}
                        onClick={() => setSelected(item)}
                      >
                        <span className="inbox-avatar">{item.name.charAt(0)}</span>
                        <span>
                          <b>
                            {item.name}
                            <small>{item.kind === "join" ? "Application" : item.kind === "notify" ? "Release alert" : "Message"}</small>
                          </b>
                          <span>{item.email}</span>
                          <em>
                            {item.status} · {new Date(item.created_at).toLocaleDateString()}
                          </em>
                        </span>
                        <ChevronRight size={15} />
                      </button>
                    ))
                  ) : (
                    <div className="empty-state compact">
                      <Inbox size={30} />
                      <h3>Room for a good conversation.</h3>
                      <p>{query ? "No matching submissions." : "New applications and messages will appear here."}</p>
                    </div>
                  )}
                </div>
                {selected ? (
                  <div className="admin-panel inbox-detail">
                    <div className="section-heading">
                      <h2>{selected.name}</h2>
                      <button className="icon-button" aria-label="Close message" onClick={() => setSelected(null)}>
                        <X size={17} />
                      </button>
                    </div>
                    <a href={"mailto:" + selected.email} className="text-link">
                      {selected.email}
                      <Mail size={15} />
                    </a>
                    <div className="inbox-status">
                      <span>Status</span>
                      <select
                        value={selected.status}
                        disabled={busy}
                        onChange={(e) =>
                          run(async () => {
                            await action({ action: "submission", id: selected.id, status: e.target.value });
                            setSelected({ ...selected, status: e.target.value });
                            await getData();
                            setNotice("Message status updated.");
                          })
                        }
                      >
                        {["new", "reviewing", "replied", "archived"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <dl>
                      {Object.entries(JSON.parse(selected.data))
                        .filter(([k]) => !["kind", "name", "email"].includes(k))
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt>{k.replace(/([A-Z])/g, " $1")}</dt>
                            <dd>{typeof v === "boolean" ? (v ? "Yes" : "No") : String(v) || "Not provided"}</dd>
                          </div>
                        ))}
                    </dl>
                    <p className="tiny muted">
                      Reference: {selected.id.slice(0, 8)} · {new Date(selected.created_at).toLocaleString()}
                    </p>
                    <div className="form-actions">
                      <a
                        className="button dark"
                        href={
                          "mailto:" +
                          selected.email +
                          "?subject=" +
                          encodeURIComponent("Your Aur Labs " + (selected.kind === "join" ? "application" : "message"))
                        }
                      >
                        <Mail size={15} /> Reply by email
                      </a>
                      <button
                        className="danger-link"
                        disabled={busy}
                        onClick={() => {
                          if (window.confirm("Permanently delete this submission and its personal information?"))
                            run(async () => {
                              await action({ action: "submission", id: selected.id, status: "delete" });
                              setSelected(null);
                              await getData();
                              setNotice("Submission permanently deleted.");
                            });
                        }}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-panel inbox-detail empty-state">
                    <Mail size={35} />
                    <h3>A little context, right here.</h3>
                    <p>Select a message to read its details.</p>
                  </div>
                )}
              </div>
            </>
          ) : section === "media" ? (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>Media library</h1>
                  <p>Product screenshots, videos, article covers, and team portraits. Latest 200 uploads.</p>
                </div>
                <button className="button orange" disabled={busy} onClick={() => uploadRef.current?.click()}>
                  <Upload size={16} />
                  {busy ? "Uploading…" : "Upload image or video"}
                </button>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm"
                  hidden
                  ref={uploadRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f)
                      run(async () => {
                        await upload(f);
                        await getData();
                        setNotice("Media uploaded. Copy its URL or select it in a content editor.");
                      });
                    e.target.value = "";
                  }}
                />
              </div>
              <div className="media-grid">
                {data.assets.map((a) => (
                  <div className="media-card" key={a.id}>
                    {String(a.mime || "").startsWith("video/") ? (
                      <video src={"/api/media/" + a.id} controls preload="metadata" style={{ width: "100%", height: 140, borderRadius: 8, objectFit: "cover" }} />
                    ) : (
                      <img src={"/api/media/" + a.id} alt={a.name} />
                    )}
                    <b>{a.name}</b>
                    <span>
                      {Math.round(a.size / 1024)} KB · {a.mime}
                    </span>
                    <button
                      className="button light small-button"
                      onClick={() =>
                        run(async () => {
                          await navigator.clipboard.writeText("/api/media/" + a.id);
                          setNotice("Media URL copied.");
                        })
                      }
                    >
                      <Copy size={13} /> Copy URL
                    </button>
                  </div>
                ))}
              </div>
              {!data.assets.length && (
                <div className="empty-state">
                  <ImageIcon size={38} />
                  <h2>Make it unmistakably yours.</h2>
                  <p>Upload PNG, JPEG, WebP, GIF images or MP4/WebM videos up to 4 MB.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="admin-page-title">
                <div>
                  <h1>Site settings</h1>
                  <p>Update public identity, intro video, social accounts, donations, and security controls.</p>
                </div>
              </div>
              <SettingsEditor
                settings={data.content.settings}
                busy={busy}
                upload={upload}
                save={(s) =>
                  run(async () => {
                    await action({ action: "save", kind: "settings", data: s });
                    await getData();
                    setNotice("Site settings saved and published.");
                  })
                }
              />
              {isOwnerRole && (
                <>
                  <section className="admin-panel password-panel">
                    <h2>Change owner password</h2>
                    <p className="muted">This revokes all active unlocks and keeps the current tab signed in.</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        run(async () => {
                          const r = await action({ action: "password", ...password });
                          setToken(r.unlockToken);
                          setPassword({ currentPassword: "", password: "" });
                          setNotice("Password updated. Other admin unlocks were revoked.");
                        });
                      }}
                    >
                      <div className="fields-grid">
                        <Input
                          label="Current password"
                          type="password"
                          required
                          value={password.currentPassword}
                          onChange={(v) => setPassword((s) => ({ ...s, currentPassword: v }))}
                        />
                        <Input
                          label="New password (12 to 128 characters)"
                          type="password"
                          required
                          value={password.password}
                          onChange={(v) => setPassword((s) => ({ ...s, password: v }))}
                        />
                      </div>
                      <button className="button dark" disabled={busy}>
                        <KeyRound size={16} /> Update password
                      </button>
                    </form>
                  </section>

                  <section className="admin-panel password-panel">
                    <h2>Security &amp; backups</h2>
                    <p className="muted">
                      Revoke all other open admin sessions (owner or team), or restore site content from a previously
                      exported JSON backup.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
                      <button
                        type="button"
                        className="button dark"
                        disabled={busy}
                        onClick={() => {
                          if (!window.confirm("Log out every other browser or team session?")) return;
                          run(async () => {
                            await action({ action: "revoke_sessions" });
                            setNotice("All other admin sessions were revoked.");
                          });
                        }}
                      >
                        <ShieldCheck size={16} /> Revoke all other sessions
                      </button>
                      <button
                        type="button"
                        className="button light"
                        disabled={busy}
                        onClick={() => restoreRef.current?.click()}
                      >
                        <Upload size={16} /> Restore JSON backup
                      </button>
                      <input
                        ref={restoreRef}
                        type="file"
                        accept="application/json,.json"
                        hidden
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f && window.confirm("Restore content from this backup file? Existing records with matching IDs will be updated.")) {
                            handleRestoreBackup(f);
                          }
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </section>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {preview && editor && <ContentPreview kind={editKind} record={editor} close={() => setPreview(false)} />}
      <Auri admin guides={data.content.settings.auriGuides} />
    </div>
  );
}

function SettingsEditor({
  settings,
  busy,
  upload,
  save,
}: {
  settings: Settings;
  busy: boolean;
  upload: (f: File) => Promise<string>;
  save: (s: Settings) => void;
}) {
  const [s, setS] = useState(settings);
  const [upBusy, setUpBusy] = useState(false);
  const field = (key: keyof Settings, label: string, area = false, type = "text", hint = "") => (
    <Input
      label={label}
      value={String(s[key] ?? "")}
      onChange={(v) => setS((d) => ({ ...d, [key]: v }))}
      area={area}
      type={type}
      hint={hint}
    />
  );

  return (
    <form
      className="admin-editor"
      onSubmit={(e) => {
        e.preventDefault();
        save(s);
      }}
    >
      <h2>Identity &amp; home page</h2>
      <div className="fields-grid">
        {field("name", "Organization name")}
        {field("email", "Contact email", false, "email")}
        {field("tagline", "Brand tagline")}
        {field("footerNote", "Footer note")}
        {field("heroLine1", "Hero headline / first line")}
        {field("heroLine2", "Hero headline / second line")}
        {field("heroDescription", "Hero description", true)}
        {field("mission", "Mission statement", true)}
        {field("about", "About us (blank line between paragraphs)", true)}
        <div className="admin-image-field span-two">
          <span className="field-label">Home &amp; About intro video (optional)</span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <label className="button light small-button">
              <PlayCircle size={14} /> {upBusy ? "Uploading…" : "Upload MP4/WebM video (max 4 MB)"}
              <input
                hidden
                type="file"
                accept="video/mp4,video/webm"
                disabled={busy || upBusy}
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setUpBusy(true);
                    try {
                      const url = await upload(f);
                      setS((d) => ({ ...d, introVideo: url }));
                    } finally {
                      setUpBusy(false);
                    }
                  }
                  e.target.value = "";
                }}
              />
            </label>
            {s.introVideo && (
              <button
                type="button"
                className="button light small-button"
                onClick={() => setS((d) => ({ ...d, introVideo: "" }))}
              >
                <X size={14} /> Remove video
              </button>
            )}
          </div>
          {field(
            "introVideo",
            "Intro video URL (YouTube, Vimeo, or HTTPS video)",
            false,
            "text",
            "Leave empty to hide the intro video section."
          )}
        </div>
        <Toggle label="Accept volunteer applications" checked={s.hiring} onChange={(v) => setS((d) => ({ ...d, hiring: v }))} />
      </div>

      <h2>Social accounts</h2>
      <p className="muted guide-editor-note">
        Add links to your official social accounts. Any configured accounts appear in the website footer and contact page.
      </p>
      <div className="fields-grid">
        {field("githubUrl", "GitHub URL (optional)", false, "url")}
        {field("youtubeUrl", "YouTube channel URL (optional)", false, "url")}
        {field("xUrl", "X / Twitter URL (optional)", false, "url")}
        {field("linkedinUrl", "LinkedIn URL (optional)", false, "url")}
        {field("instagramUrl", "Instagram URL (optional)", false, "url")}
        {field("discordUrl", "Discord community URL (optional)", false, "url")}
      </div>

      <h2>Auri’s field guidance</h2>
      <p className="muted guide-editor-note">
        These hints appear beside the matching field. Leave a hint empty to use its default. Changes go live when you save settings.
      </p>
      <div className="fields-grid">
        {Object.entries(GUIDE_FIELDS).map(([id, guide]) => (
          <Input
            key={id}
            label={guide.label}
            area
            value={s.auriGuides?.[id] || ""}
            hint={guide.text}
            onChange={(v) => setS((d) => ({ ...d, auriGuides: { ...d.auriGuides, [id]: v } }))}
          />
        ))}
      </div>

      <h2>Donations &amp; transparency</h2>
      <div className="fields-grid">
        {field("donationIntro", "Support page introduction", true)}
        {field(
          "donationUrl",
          "One-time donation URL (optional)",
          false,
          "url",
          "Use a verified HTTPS checkout or donation page. Leave blank to show an email inquiry."
        )}
        {field(
          "donationMonthlyUrl",
          "Monthly donation URL (optional)",
          false,
          "url",
          "Use a provider page that explicitly supports recurring contributions."
        )}
        {field("donationProvider", "Donation provider / button name")}
        {field("donationTransparency", "Donation transparency statement", true)}
      </div>

      <div className="info-banner">
        <ShieldCheck size={20} />
        <p>
          Verify the recipient, payment provider, currency, tax status, and any recurring terms before publishing.
        </p>
      </div>

      <div className="editor-footer">
        <span className="tiny muted">Changes take effect after saving.</span>
        <button className="button orange" disabled={busy || upBusy}>
          <Save size={16} />
          {busy ? "Saving…" : "Save site settings"}
        </button>
      </div>
    </form>
  );
}
