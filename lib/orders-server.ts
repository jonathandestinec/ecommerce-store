import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { OrderRow } from "@/lib/orders-client"

/** Server-only orders fetchers. Import from server components only. */
export async function fetchOrdersListServer(userId: string): Promise<OrderRow[]> {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase
    .from("orders")
    .select("id,payment_reference,customer_name,total_kobo,status,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50)
  if (error) throw error
  return (data ?? []) as OrderRow[]
}
