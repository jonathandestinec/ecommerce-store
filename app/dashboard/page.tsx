import Link from "next/link"
import { cookies } from "next/headers"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { volkhov } from "@/styles/fonts"

async function getOverview() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  const user = data.user
  if (!user) return { user: null, ordersCount: null, ordersTotal: null }
  const { data: orders } = await supabase
    .from("orders")
    .select("total_kobo,status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)
  const count = orders?.length ?? 0
  const total = (orders ?? []).filter((o) => o.status === "paid").reduce((s, o) => s + Number(o.total_kobo || 0), 0)
  return { user, ordersCount: count, ordersTotal: total }
}

export default async function DashboardPage() {
  const { user, ordersCount, ordersTotal } = await getOverview()

  return (
    <>
      <DashboardHeader title={user ? "Welcome back" : "Dashboard"} />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        {!user ? (
          <Card className="border-dashed bg-[#fafafa]">
            <CardHeader>
              <CardTitle className={`${volkhov.className} text-[22px] text-[#484848]`}>Welcome</CardTitle>
              <CardDescription>Sign in to continue.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild><Link href="/login?next=/dashboard">Sign in</Link></Button>
              <Button variant="outline" asChild><Link href="/register?next=/dashboard">Create account</Link></Button>
              <Button variant="ghost" asChild><Link href="/fashion">Continue as guest</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <StatsCards ordersCount={ordersCount} ordersTotal={ordersTotal} />
            <Link
              href="/dashboard/profile"
              aria-label="Open profile"
              className="flex items-center gap-4 rounded-[10px] border border-[#e6e6e6] bg-white p-5 transition hover:border-[#484848] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Avatar className="size-12">
                <AvatarFallback className="text-sm">
                  {(user.email?.slice(0, 2) ?? "FA").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className={`${volkhov.className} block text-[18px] leading-tight text-[#484848]`}>Profile</span>
                <span className="mt-1 block truncate text-[13px] text-[#8a8a8a]">View your details</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-[#8a8a8a]" aria-hidden="true" />
            </Link>
          </>
        )}
      </main>
    </>
  )
}
