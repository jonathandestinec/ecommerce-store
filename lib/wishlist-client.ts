import { createClient } from "@/utils/supabase/client"
import type { Product } from "@/types"

/** Browser wishlist fetchers. Import from client components/hooks only. */
export async function fetchWishlistIdsClient(userId: string): Promise<string[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100)
  if (error) throw error
  return (data ?? []).map((row) => String(row.product_id))
}

export async function fetchWishlistCountClient(userId: string): Promise<number> {
  const supabase = createClient()
  const { count, error } = await supabase
    .from("wishlist_items")
    .select("product_id", { count: "exact", head: true })
    .eq("user_id", userId)
  if (error) throw error
  return count ?? 0
}

export async function fetchWishlistProductsClient(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []
  const supabase = createClient()
  const { data, error } = await supabase.from("products").select("*").in("id", ids)
  if (error) throw error
  const byId = new Map(((data ?? []) as Product[]).map((p) => [String(p.id), p]))
  return ids.map((id) => byId.get(String(id))).filter((p): p is Product => !!p)
}
