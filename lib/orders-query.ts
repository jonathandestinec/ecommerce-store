import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchOrdersListClient, type OrderRow } from "@/lib/orders-client"

export interface OrdersSummary {
  count: number
  total: number
}

/** User-scoped so cached orders can never leak across logins on one tab. */
export const ordersScopeKey = (userId: string) => ["orders", userId] as const
export const ordersListKey = (userId: string) => [...ordersScopeKey(userId), "list"] as const

export function useOrdersList(userId: string) {
  return useSuspenseQuery({
    queryKey: ordersListKey(userId),
    queryFn: () => fetchOrdersListClient(userId),
  })
}

/** Derived from the list query — no second request. */
export function useOrdersSummary(userId: string): OrdersSummary {
  const { data: orders } = useOrdersList(userId)
  return {
    count: orders.length,
    total: orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + Number(o.total_kobo || 0), 0),
  }
}

export type { OrderRow }
