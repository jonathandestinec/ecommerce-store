import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/app/get-query-client"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { OrdersList } from "@/components/dashboard/orders-client"
import { Skeleton } from "@/components/ui/skeleton"
import { ordersListKey } from "@/lib/orders-query"
import { fetchOrdersListServer } from "@/lib/orders-server"

export default function OrdersPage() {
  return (
    <>
      <DashboardHeader title="Orders" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <DashboardTabs />
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <OrdersContent />
        </Suspense>
      </main>
    </>
  )
}

async function OrdersContent() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/orders")

  const queryClient = getQueryClient()
  await queryClient.query({
    queryKey: ordersListKey(data.user.id),
    queryFn: () => fetchOrdersListServer(data.user.id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersList userId={data.user.id} />
    </HydrationBoundary>
  )
}
