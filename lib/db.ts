// Postgres (Supabase) adapter that keeps the small D1-style API the original
// Cloudflare version used: database().prepare(sql).bind(...).first()/all()/run(), batch([...]).
import postgres from "postgres";

type Row = Record<string, unknown>;
let client: ReturnType<typeof postgres> | null = null;

export function sql() {
  if (!client) {
    const url = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
    if (!url) throw new Error("Database is not configured.");
    const options = {
      prepare: false, // required for Supabase's transaction pooler
      max: 3,
      max_pipeline: 1, // Supabase's pooler cannot handle several queries sent at once on one connection
      idle_timeout: 20,
      connect_timeout: 15,
      ssl: "require",
      // bigint columns hold millisecond timestamps; the app expects plain numbers.
      types: { bigint: { to: 20, from: [20], parse: (x: string) => Number(x), serialize: (x: unknown) => String(x) } },
    };
    // max_pipeline exists in postgres.js but is missing from its type definitions.
    client = postgres(url, options as unknown as postgres.Options<Record<string, postgres.PostgresType>>);
  }
  return client;
}

function convert(query: string) {
  let i = 0;
  let q = query.replace(/\?/g, () => "$" + ++i);
  if (/^\s*INSERT\s+OR\s+IGNORE\b/i.test(q)) q = q.replace(/INSERT\s+OR\s+IGNORE/i, "INSERT") + " ON CONFLICT DO NOTHING";
  return q;
}

function withTimeout<T>(promise: PromiseLike<T>, ms = 12000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Database query timed out.")), ms);
    Promise.resolve(promise).then((v) => { clearTimeout(timer); resolve(v); }, (e) => { clearTimeout(timer); reject(e); });
  });
}

export class Statement {
  constructor(readonly query: string, readonly params: unknown[] = []) {}
  bind(...params: unknown[]) { return new Statement(this.query, params); }
  async all<T = Row>(): Promise<{ results: T[] }> {
    const rows = await withTimeout(sql().unsafe(convert(this.query), this.params as never[]));
    return { results: Array.from(rows) as unknown as T[] };
  }
  async first<T = Row>(): Promise<T | null> { return ((await this.all<T>()).results[0] as T) ?? null; }
  async run() { await withTimeout(sql().unsafe(convert(this.query), this.params as never[])); return { success: true }; }
}

export const db = {
  prepare: (query: string) => new Statement(query),
  async batch(statements: Statement[]) {
    return sql().begin(async (tx) => {
      const out: unknown[] = [];
      for (const s of statements) out.push(Array.from(await tx.unsafe(convert(s.query), s.params as never[])));
      return out;
    });
  },
};
