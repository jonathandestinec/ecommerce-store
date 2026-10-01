import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { Product } from "@/types"

/** Server-only fetchers. Import from server components only. */
export async function fetchProductsServer(): Promise<Product[]> {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase.from("products").select()
  if (error) throw error
  return (data ?? []) as Product[]
}

export async function fetchProductServer(id: string): Promise<Product | null> {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return (data ?? null) as Product | null
}
