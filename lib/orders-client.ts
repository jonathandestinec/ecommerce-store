import { createClient } from "@/utils/supabase/client"

export interface OrderRow {
  id: string
  payment_reference: string
  customer_name: string
  total_kobo: number
  status: string
  created_at: string
}

/** Browser orders fetchers. Import from client components/hooks only. */
export async function fetchOrdersListClient(userId: string): Promise<OrderRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("id,payment_reference,customer_name,total_kobo,status,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50)
  if (error) throw error
  return (data ?? []) as OrderRow[]
}
