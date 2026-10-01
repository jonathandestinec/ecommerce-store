import { createClient } from "@/utils/supabase/client"
import type { Product } from "@/types"

/** Browser fetchers. Import from client components only. */
export async function fetchProductsClient(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("products").select()
  if (error) throw error
  return (data ?? []) as Product[]
}

export async function fetchProductClient(id: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return (data ?? null) as Product | null
}
