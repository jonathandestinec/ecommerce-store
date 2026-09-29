import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WishlistClient } from "@/components/dashboard/wishlist-client"

export default async function WishlistPage() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/wishlist")

  const { data: rows } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <>
      <DashboardHeader title="Wishlist" subtitle="Saved to your account" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <WishlistClient initialIds={(rows ?? []).map((r) => String(r.product_id))} />
      </main>
    </>
  )
}
