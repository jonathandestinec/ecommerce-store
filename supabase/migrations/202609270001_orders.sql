create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  payment_reference text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  delivery_address jsonb not null,
  currency text not null default 'NGN' check (currency = 'NGN'),
  subtotal_kobo bigint not null check (subtotal_kobo >= 0),
  shipping_kobo bigint not null check (shipping_kobo >= 0),
  gift_wrap_kobo bigint not null default 0 check (gift_wrap_kobo >= 0),
  total_kobo bigint not null check (total_kobo = subtotal_kobo + shipping_kobo + gift_wrap_kobo),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'reversed')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text not null,
  unit_price_kobo bigint not null check (unit_price_kobo >= 0),
  quantity integer not null check (quantity between 1 and 25),
  size text not null,
  color text not null
);

create index if not exists orders_user_id_created_at_idx on public.orders (user_id, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Customers can read their own orders" on public.orders;
create policy "Customers can read their own orders"
  on public.orders for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can read their own order items" on public.order_items;
create policy "Customers can read their own order items"
  on public.order_items for select to authenticated
  using (exists (
    select 1 from public.orders
    where orders.id = order_items.order_id and orders.user_id = (select auth.uid())
  ));

grant select on public.orders, public.order_items to authenticated;
