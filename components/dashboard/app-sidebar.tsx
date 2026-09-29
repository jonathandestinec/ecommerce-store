"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Lock, LogIn } from "lucide-react"
import { volkhov } from "@/styles/fonts"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { useStore } from "@/components/store-provider"
import { useSidebar, SidebarGroupLabel } from "@/components/ui/sidebar"
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { dashboardNav, signInItem } from "@/components/dashboard/nav-config"

function isActive(pathname: string, href: string) {
  if (href.includes("#")) {
    const [base] = href.split("#")
    return pathname === base
  }
  if (href === "/") return pathname === "/"
  if (href === "/dashboard") return pathname === "/dashboard"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppSidebarBody() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const cartCount = useStore((s) => s.cartCount)
  const { collapsed, setMobileOpen } = useSidebar()

  const goLogin = (next: string) => {
    setMobileOpen(false)
    router.push(`/login?next=${encodeURIComponent(next)}`)
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-3">
        {dashboardNav.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => {
                const locked = item.requiresAuth && !loading && !user
                const active = isActive(pathname, item.href)
                const Icon = locked ? Lock : item.icon
                const badge = item.badgeKey === "cart" && cartCount > 0 ? cartCount : null

                const content = (
                  <>
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate text-left">{item.label}</span>
                        {badge !== null && (
                          <Badge variant="secondary" className="h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]">
                            {badge}
                          </Badge>
                        )}
                        {locked && <Lock className="size-3 opacity-60" aria-hidden="true" />}
                      </>
                    )}
                  </>
                )

                const classes = cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition",
                  collapsed && "justify-center px-0",
                  active
                  ? "bg-[#f6f6f6] font-medium text-black"
                    : "text-[#484848] hover:bg-[#f6f6f6] hover:text-black",
                  locked && !active && "opacity-70"
                )

                if (locked) {
                  return (
                    <SidebarMenuItem key={item.href + item.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={`${item.label} — sign in required`}
                            onClick={() => goLogin(item.href)}
                            className={classes}
                          >
                            {content}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label} requires sign in</TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.href + item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={classes}
                      title={collapsed ? item.label : undefined}
                    >
                      {content}
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        {!user && !loading && (
          <SidebarGroup>
            <SidebarGroupLabel>Access</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href={signInItem.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-md border border-dashed border-[#e6e6e6] px-3 py-2 text-sm text-[#484848] hover:bg-[#f6f6f6] hover:text-black"
                >
                  <LogIn className="size-4" />
                  {!collapsed && <span className="flex-1 text-left">Sign in / Register</span>}
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </div>

      <div className="mt-auto border-t border-[#e6e6e6] p-3">
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : user ? (
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileOpen(false)}
            aria-label="Open profile"
            title={collapsed ? "Profile" : undefined}
            className="flex items-center gap-2.5 rounded-[10px] border border-[#eee] bg-[#fafafa] p-2.5 transition hover:border-[#484848]"
          >
            <Avatar className="size-9 shrink-0">
              <AvatarFallback>
                {(user.email?.slice(0, 2) ?? "FA").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-[#484848]">{user.user_metadata?.first_name ? `${user.user_metadata.first_name} ${user.user_metadata?.last_name ?? ""}`.trim() : "My account"}</span>
                <span className="block truncate text-xs text-[#8a8a8a]">{user.email}</span>
              </span>
            )}
          </Link>
        ) : (
          !collapsed && (
            <Button size="sm" className="w-full" onClick={() => goLogin("/dashboard")}>
              <LogIn /> Sign in
            </Button>
          )
        )}
      </div>
    </TooltipProvider>
  )
}
