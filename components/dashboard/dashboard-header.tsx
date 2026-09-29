"use client"

import { ShoppingBag } from "lucide-react"
import { SidebarMobileTrigger, SidebarTrigger } from "@/components/ui/sidebar"
import { volkhov } from "@/styles/fonts"
import { useStore } from "@/components/store-provider"

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const cartCount = useStore((s) => s.cartCount)
  const openCart = useStore((s) => s.openCart)

  return (
    <header className="border-b border-[#e6e6e6] bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-3 md:px-7 md:py-5">
        <SidebarTrigger />
        <SidebarMobileTrigger />
        <div className="min-w-0 flex-1">
          <h1 className={`${volkhov.className} truncate text-left text-[24px] leading-tight text-[#484848] md:text-[30px]`}>{title}</h1>
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
