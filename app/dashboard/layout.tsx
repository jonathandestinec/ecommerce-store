import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebarBody } from "@/components/dashboard/app-sidebar"
import { volkhov } from "@/styles/fonts"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-white">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className={`${volkhov.className} px-2 text-[32px] leading-none text-[#484848]`} aria-label="FASCO home">
              FASCO
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <AppSidebarBody />
          </SidebarContent>
        </Sidebar>
        <div className="flex min-w-0 flex-1 flex-col bg-white">{children}</div>
      </div>
    </SidebarProvider>
  )
}
