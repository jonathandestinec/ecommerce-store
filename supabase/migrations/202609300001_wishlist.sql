create table if not exists public.wishlist_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists wishlist_items_user_id_created_at_idx
  on public.wishlist_items (user_id, created_at desc);

alter table public.wishlist_items enable row level security;

drop policy if exists "Customers can read their own wishlist" on public.wishlist_items;
create policy "Customers can read their own wishlist"
  on public.wishlist_items for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can add to their own wishlist" on public.wishlist_items;
create policy "Customers can add to their own wishlist"
  on public.wishlist_items for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Customers can remove from their own wishlist" on public.wishlist_items;
create policy "Customers can remove from their own wishlist"
  on public.wishlist_items for delete to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, delete on public.wishlist_items to authenticated;
grant usage, select on sequence public.wishlist_items_id_seq to authenticated;
