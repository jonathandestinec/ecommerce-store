import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { Product } from "@/types"

/** Server-only wishlist fetchers. Import from server components only. */
export async function fetchWishlistIdsServer(userId: string): Promise<string[]> {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100)
  if (error) throw error
  return (data ?? []).map((row) => String(row.product_id))
}

export async function fetchWishlistCountServer(userId: string): Promise<number> {
  const supabase = createClient(await cookies())
  const { count, error } = await supabase
    .from("wishlist_items")
    .select("product_id", { count: "exact", head: true })
    .eq("user_id", userId)
  if (error) throw error
  return count ?? 0
}

export async function fetchWishlistProductsServer(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []
  const supabase = createClient(await cookies())
  const { data, error } = await supabase.from("products").select("*").in("id", ids)
  if (error) throw error
  const byId = new Map(((data ?? []) as Product[]).map((p) => [String(p.id), p]))
  return ids.map((id) => byId.get(String(id))).filter((p): p is Product => !!p)
}
