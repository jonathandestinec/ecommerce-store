"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Heart, Package } from "lucide-react"
import { volkhov } from "@/styles/fonts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/components/auth-provider"
import { createClient } from "@/utils/supabase/client"
import { formatNaira } from "@/lib/currency"

export function StatsCards({
  ordersCount,
  ordersTotal,
}: {
  ordersCount: number | null
  ordersTotal: number | null
}) {
  const { user, loading } = useAuth()
  const [wishlistCount, setWishlistCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      if (!user) return
      const { count } = await createClient()
        .from("wishlist_items")
        .select("product_id", { count: "exact", head: true })
        .eq("user_id", user.id)
      if (active) setWishlistCount(count ?? 0)
    }
    load()
    function onUpdate(event: Event) {
      const detail = (event as CustomEvent).detail
      if (typeof detail === "number" && active) setWishlistCount(detail)
    }
    window.addEventListener("fasco:wishlist", onUpdate)
    return () => {
      active = false
      window.removeEventListener("fasco:wishlist", onUpdate)
    }
  }, [user])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
        {[0, 1].map((i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    )
  }

  if (!user) return null

  const cards = [
    {
      title: "Orders",
      value: String(ordersCount ?? 0),
      hint: ordersTotal !== null && ordersTotal > 0 ? `${formatNaira(ordersTotal)} spent` : "No paid orders yet",
      icon: Package,
      href: "/dashboard/orders",
    },
    {
      title: "Wishlist",
      value: wishlistCount === null ? "—" : String(wishlistCount),
      hint: "Saved to your account",
      icon: Heart,
      href: "/dashboard/wishlist",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
      {cards.map((card) => (
        <Link key={card.title} href={card.href} className="block rounded-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          <Card className="bg-white transition hover:border-[#484848]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal text-[#8a8a8a]">{card.title}</CardTitle>
              <card.icon className="size-4 text-[#8a8a8a]" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <p className={`${volkhov.className} truncate text-[30px] leading-none text-[#484848]`}>{card.value}</p>
              <CardDescription className="mt-2">{card.hint}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
