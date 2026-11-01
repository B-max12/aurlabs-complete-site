-- Real download counts (already applied to the aurlabs-site project). Kept here as documentation.
create table if not exists public.download_counts (
  id text primary key,
  product_slug text not null,
  version text not null,
  platform text not null,
  count integer not null default 0,
  last_at bigint not null
);
create index if not exists download_counts_product_idx on public.download_counts (product_slug);
alter table public.download_counts enable row level security;
grant select, insert, update, delete on public.download_counts to aur_app;
create policy aur_app_all on public.download_counts for all to aur_app using (true) with check (true);
