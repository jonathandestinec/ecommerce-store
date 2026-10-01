import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/app/get-query-client"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { WishlistClient } from "@/components/dashboard/wishlist-client"
import { Skeleton } from "@/components/ui/skeleton"
import { wishlistIdsKey, wishlistProductsKey } from "@/lib/wishlist-query"
import { fetchWishlistIdsServer, fetchWishlistProductsServer } from "@/lib/wishlist-server"

export default function WishlistPage() {
  return (
    <>
      <DashboardHeader title="Wishlist" subtitle="Saved to your account" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <DashboardTabs />
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <WishlistContent />
        </Suspense>
      </main>
    </>
  )
}

async function WishlistContent() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/wishlist")

  const queryClient = getQueryClient()
  const ids = await queryClient.query({
    queryKey: wishlistIdsKey(data.user.id),
    queryFn: () => fetchWishlistIdsServer(data.user.id),
  })
  await queryClient.query({
    queryKey: wishlistProductsKey(data.user.id, ids),
    queryFn: () => fetchWishlistProductsServer(ids),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishlistClient userId={data.user.id} />
    </HydrationBoundary>
  )
}
