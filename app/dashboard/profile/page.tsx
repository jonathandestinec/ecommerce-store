import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileClient } from "@/components/dashboard/profile-client"

export default async function ProfilePage() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/profile")

  const { count: ordersCount } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("user_id", data.user.id)

  const { count: wishlistCount } = await supabase
    .from("wishlist_items")
    .select("product_id", { count: "exact", head: true })
    .eq("user_id", data.user.id)

  return (
    <>
      <DashboardHeader title="Profile" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <ProfileClient
          email={data.user.email ?? ""}
          userId={data.user.id}
          memberSince={data.user.created_at}
          firstName={String(data.user.user_metadata?.first_name ?? "")}
          lastName={String(data.user.user_metadata?.last_name ?? "")}
          phone={String(data.user.user_metadata?.phone ?? "")}
          ordersCount={ordersCount ?? 0}
          wishlistCount={wishlistCount ?? 0}
        />
      </main>
    </>
  )
}
