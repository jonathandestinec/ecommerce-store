import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/app/get-query-client"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { ProfileClient } from "@/components/dashboard/profile-client"
import { Skeleton } from "@/components/ui/skeleton"
import { ordersListKey } from "@/lib/orders-query"
import { fetchOrdersListServer } from "@/lib/orders-server"
import { wishlistCountKey } from "@/lib/wishlist-query"
import { fetchWishlistCountServer } from "@/lib/wishlist-server"

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader title="Profile" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <DashboardTabs />
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <ProfileContent />
        </Suspense>
      </main>
    </>
  )
}

async function ProfileContent() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/profile")

  // Counts on this page read these same cached queries — no separate count queries.
  const queryClient = getQueryClient()
  await queryClient.query({
    queryKey: ordersListKey(data.user.id),
    queryFn: () => fetchOrdersListServer(data.user.id),
  })
  await queryClient.query({
    queryKey: wishlistCountKey(data.user.id),
    queryFn: () => fetchWishlistCountServer(data.user.id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient
        email={data.user.email ?? ""}
        userId={data.user.id}
        memberSince={data.user.created_at}
        firstName={String(data.user.user_metadata?.first_name ?? "")}
        lastName={String(data.user.user_metadata?.last_name ?? "")}
        phone={String(data.user.user_metadata?.phone ?? "")}
      />
    </HydrationBoundary>
  )
}
