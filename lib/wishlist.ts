"use client"

import { createClient } from "@/utils/supabase/client"

export const WISHLIST_KEY = "fasco-wishlist"

export function readLocalWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export function writeLocalWishlist(ids: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids))
  } catch {
    /* Private browsing etc. DB remains source of truth when signed in. */
  }
}

export async function fetchDbWishlist(): Promise<string[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
  if (error) return []
  return (data ?? []).map((row) => String(row.product_id))
}

/** Push guest (localStorage) items into the DB after sign in, then return the merged list. */
export async function syncLocalWishlistToDb(): Promise<string[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return readLocalWishlist()
  const local = readLocalWishlist()
  if (local.length > 0) {
    const { error } = await supabase.from("wishlist_items").upsert(
      local.map((product_id) => ({ user_id: user.id, product_id })),
      { onConflict: "user_id,product_id", ignoreDuplicates: true }
    )
    if (error) throw error
    writeLocalWishlist([])
  }
  return fetchDbWishlist()
}

export async function addToDbWishlist(productId: string): Promise<boolean> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { error } = await supabase
    .from("wishlist_items")
    .upsert({ user_id: user.id, product_id: String(productId) }, { onConflict: "user_id,product_id", ignoreDuplicates: true })
  return !error
}

export async function removeFromDbWishlist(productId: string): Promise<boolean> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", String(productId))
  return !error
}

export async function clearDbWishlist(): Promise<boolean> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { error } = await supabase.from("wishlist_items").delete().eq("user_id", user.id)
  return !error
}
