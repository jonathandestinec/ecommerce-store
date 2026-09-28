-- Product records use UUID primary keys. Store that identifier on order items.
-- Converting from text preserves any previous integer product IDs as text.
alter table public.order_items
  alter column product_id type text using product_id::text;
