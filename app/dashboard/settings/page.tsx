import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { SettingsClient } from "@/components/dashboard/settings-client"

export default async function SettingsPage() {
  const supabase = createClient(await cookies())
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/login?next=/dashboard/settings")
  return (
    <>
      <DashboardHeader title="Settings" />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-5 pb-16 pt-6 md:px-7 md:pt-10">
        <DashboardTabs />
        <SettingsClient />
      </main>
    </>
  )
}
