"use client"

import Link from "next/link"
import { Heart, Package } from "lucide-react"
import { volkhov } from "@/styles/fonts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNaira } from "@/lib/currency"
import { useOrdersSummary } from "@/lib/orders-query"
import { useWishlistCount } from "@/lib/wishlist-query"

export function StatsCards({ userId }: { userId: string }) {
  const { count: ordersCount, total: ordersTotal } = useOrdersSummary(userId)
  const { data: wishlistCount } = useWishlistCount(userId)

  const cards = [
    {
      title: "Orders",
      value: String(ordersCount),
      hint: ordersTotal > 0 ? `${formatNaira(ordersTotal)} spent` : "No paid orders yet",
      icon: Package,
      href: "/dashboard/orders",
    },
    {
      title: "Wishlist",
      value: String(wishlistCount),
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
