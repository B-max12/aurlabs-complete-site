-- Auri knowledge base (already applied to the aurlabs-site project). Kept here as documentation.
create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

create table if not exists public.kb_entries (
  id text primary key,
  product_slug text not null default '',
  kind text not null default 'qa',
  question text not null,
  answer text not null,
  variants text not null default '',
  published integer not null default 0,
  embedding extensions.vector(384),
  updated_at bigint not null
);
create index if not exists kb_entries_product_idx on public.kb_entries (product_slug);
create index if not exists kb_entries_fts_idx on public.kb_entries using gin (to_tsvector('english', question || ' ' || variants || ' ' || answer));
create index if not exists kb_entries_vec_idx on public.kb_entries using hnsw (embedding extensions.vector_cosine_ops);

create table if not exists public.kb_unanswered (
  id text primary key,
  question text not null,
  count integer not null default 1,
  last_seen bigint not null,
  handled integer not null default 0
);

alter table public.kb_entries enable row level security;
alter table public.kb_unanswered enable row level security;
grant select, insert, update, delete on public.kb_entries, public.kb_unanswered to aur_app;
create policy aur_app_all on public.kb_entries for all to aur_app using (true) with check (true);
create policy aur_app_all on public.kb_unanswered for all to aur_app using (true) with check (true);

create function public.kb_search(q_emb extensions.vector, q_text text, p_slug text, n integer default 6)
returns table (id text, product_slug text, kind text, question text, answer text, sem double precision, lex double precision, tri double precision, score double precision)
language sql stable set search_path = public, extensions as $$
  with base as (
    select e.id, e.product_slug, e.kind, e.question, e.answer,
      case when q_emb is null or e.embedding is null then 0::double precision else (1 - (e.embedding <=> q_emb))::double precision end as sem,
      coalesce(ts_rank_cd(to_tsvector('english', e.question || ' ' || e.variants || ' ' || e.answer), websearch_to_tsquery('english', q_text)), 0)::double precision as ts,
      greatest(similarity(lower(e.question), lower(q_text)), coalesce((select max(similarity(lower(v), lower(q_text))) from unnest(string_to_array(e.variants, E'\n')) v), 0))::double precision as tri
    from public.kb_entries e where e.published = 1)
  select b.id, b.product_slug, b.kind, b.question, b.answer, b.sem,
    least(1::double precision, b.ts * 2 + b.tri) as lex, b.tri,
    (0.7 * b.sem + 0.3 * least(1::double precision, b.ts * 2 + b.tri) + case when p_slug <> '' and b.product_slug = p_slug then 0.04 else 0 end)::double precision as score
  from base b order by score desc limit n;
$$;
grant execute on function public.kb_search(extensions.vector, text, text, integer) to aur_app;

