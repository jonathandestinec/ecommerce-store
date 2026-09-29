"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dashboardTabs } from "@/components/dashboard/nav-config"

export function DashboardTabs() {
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const base = pathname.split("#")[0]

  const activeValue =
    dashboardTabs.find((t) => {
      if (t.href === "/dashboard") return base === "/dashboard"
      return base === t.href || base.startsWith(`${t.href}/`)
    })?.value ?? "overview"

  return (
    <Tabs value={activeValue} className="w-full">
      <TabsList className="hide-scrollbar" aria-label="Account sections">
        {dashboardTabs.map((tab) => {
          const locked = !loading && !user
          if (locked) {
            return (
              <TabsTrigger key={tab.value} value={tab.value} disabled aria-label={`${tab.label} — sign in required`} className="gap-1.5">
                <Lock className="size-3" aria-hidden="true" /> {tab.label}
              </TabsTrigger>
            )
          }
          return (
            <TabsTrigger key={tab.value} value={tab.value} asChild className={cn("gap-1.5")}>
              <Link href={tab.href}>{tab.label}</Link>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
