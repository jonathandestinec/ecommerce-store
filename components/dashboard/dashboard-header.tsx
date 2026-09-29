"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { SidebarMobileTrigger, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { volkhov } from "@/styles/fonts"
import { useStore } from "@/components/store-provider"

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const pathname = usePathname()
  const cartCount = useStore((s) => s.cartCount)
  const openCart = useStore((s) => s.openCart)
  const { setMobileOpen } = useSidebar()

  const crumbs = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)

  return (
    <header className="border-b border-[#e6e6e6] bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-3 md:px-7 md:py-5">
        <SidebarTrigger />
        <SidebarMobileTrigger />
        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-xs text-[#8a8a8a]">
            <Link href="/" className="hover:text-black">Home</Link>
            {crumbs.map((c, i) => {
              const href = `/${crumbs.slice(0, i + 1).join("/")}`
              const last = i === crumbs.length - 1
              return (
                <span key={href} className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true">›</span>
                  {last ? (
                    <span aria-current="page" className="truncate text-[#333] capitalize">{decodeURIComponent(c)}</span>
                  ) : (
                    <Link href={href} className="truncate hover:text-black capitalize" onClick={() => setMobileOpen(false)}>{decodeURIComponent(c)}</Link>
                  )}
                </span>
              )
            })}
          </nav>
          <h1 className={`${volkhov.className} mt-1 truncate text-left text-[24px] leading-tight text-[#484848] md:text-[30px]`}>{title}</h1>
          {subtitle && <p className="mt-1 truncate text-left text-[13px] text-[#8a8a8a]">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={openCart}
          aria-label={cartCount ? `Open cart, ${cartCount} items` : "Open cart"}
          className="relative grid size-10 shrink-0 place-items-center rounded-full text-[#484848] transition hover:bg-[#f4f4f4]"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          {cartCount > 0 && (
            <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#f13b3b] text-[10px] text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
