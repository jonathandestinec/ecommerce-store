import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyId } from "@/components/ui/copy-id"
import { formatNaira } from "@/lib/currency"

export default async function OrdersPage() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/orders")

  const { data: orders } = await supabase
    .from("orders")
    .select("id,payment_reference,customer_name,total_kobo,status,created_at,paid_at")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <>
      <DashboardHeader title="Orders" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        {!orders?.length ? (
          <Card>
            <CardHeader><CardTitle className="text-base">No orders yet</CardTitle><CardDescription>Your orders will appear here.</CardDescription></CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:gap-5">
            {orders.map((o) => (
              <Card key={o.id} className="bg-white">
                <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                  <div className="min-w-0">
                    <CardTitle className="flex min-w-0 items-center gap-1.5 text-sm text-[#484848]">
                      <span className="shrink-0">Order</span>
                      <CopyId value={String(o.id)} label="Order ID" />
                    </CardTitle>
                    <CardDescription className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                      <span className="shrink-0">Ref</span>
                      <CopyId value={o.payment_reference} label="Payment reference" className="min-w-0 max-w-55" />
                      <span className="shrink-0">· {new Date(o.created_at).toLocaleDateString()}</span>
                    </CardDescription>
                  </div>
                  <Badge variant={o.status === "paid" ? "default" : o.status === "pending" ? "secondary" : "destructive"}>{o.status}</Badge>
                </CardHeader>
                <CardContent className="flex items-center justify-between border-t border-[#eee] pt-4 text-sm">
                  <span className="text-[#8a8a8a]">{o.customer_name}</span>
                  <strong className="text-[#484848]">{formatNaira(Number(o.total_kobo))}</strong>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
