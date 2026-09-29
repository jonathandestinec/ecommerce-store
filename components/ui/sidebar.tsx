"use client"

import * as React from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider")
  return ctx
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const setCollapsed = React.useCallback(
    (v: boolean | ((prev: boolean) => boolean)) => {
      setCollapsedState((prev) => (typeof v === "function" ? v(prev) : v))
    },
    []
  )

  const value = React.useMemo(
    () => ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }),
    [collapsed, setCollapsed, mobileOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      onClick={() => setCollapsed((v) => !v)}
      className={cn("hidden rounded-full hover:bg-[#f4f4f4] lg:inline-flex", className)}
    >
      <PanelLeft className="size-5" />
    </Button>
  )
}

export function SidebarMobileTrigger({ className }: { className?: string }) {
  const { setMobileOpen } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open sidebar menu"
      onClick={() => setMobileOpen(true)}
      className={cn("rounded-full hover:bg-[#f4f4f4] lg:hidden", className)}
    >
      <PanelLeft className="size-5" />
    </Button>
  )
}

export function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar()
  return (
    <>
      {/* Desktop */}
      <aside
        aria-label="Dashboard sidebar"
        data-collapsed={collapsed}
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 flex-col border-r border-[#e6e6e6] bg-white text-[#484848] transition-[width] duration-200 lg:flex",
          collapsed ? "w-[4.5rem]" : "w-64",
          className
        )}
      >
        {children}
      </aside>
      {/* Mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[18rem] overflow-y-auto bg-white p-0 text-[#484848]">
          {children}
        </SheetContent>
      </Sheet>
    </>
  )
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center gap-2 px-5 pb-2 pt-4 md:pt-7", className)}>{children}</div>
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-1 flex-col gap-4 overflow-y-auto px-3 pb-4", className)}>{children}</div>
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-t border-[#e6e6e6] p-3", className)}>{children}</div>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const { collapsed } = useSidebar()
  if (collapsed) return <div className="mx-2 my-2 h-px bg-[#eee]" aria-hidden="true" />
  return (
    <p className={cn("px-3 pb-1.5 text-xs font-medium text-[#8a8a8a]", className)}>
      {children}
    </p>
  )
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("flex flex-col gap-0.5", className)}>{children}</ul>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("w-full", className)}>{children}</li>
}
