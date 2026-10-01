"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatNaira } from "@/lib/currency"
import { syncLocalWishlistToDb } from "@/lib/wishlist"
import { fetchWishlistProductsClient } from "@/lib/wishlist-client"
import { useClearWishlist, useToggleWishlist, useWishlistIds, wishlistProductsKey, wishlistScopeKey } from "@/lib/wishlist-query"

export function WishlistClient({ userId }: { userId: string }) {
  const queryClient = useQueryClient()
  const { data: ids } = useWishlistIds(userId)
  const idList = ids ?? []
  const { data: products } = useSuspenseQuery({
    queryKey: wishlistProductsKey(userId, idList),
    queryFn: () => fetchWishlistProductsClient(idList),
  })
  const toggleWishlist = useToggleWishlist(userId)
  const clearWishlist = useClearWishlist(userId)
  const busy = toggleWishlist.isPending || clearWishlist.isPending

  // One-time merge: guest saves made before sign-in move into the DB,
  // then the ids query refreshes from the merged result.
  useEffect(() => {
    let active = true
    syncLocalWishlistToDb()
      .catch(() => [])
      .then(() => {
        if (active) queryClient.invalidateQueries({ queryKey: wishlistScopeKey(userId) })
      })
    return () => { active = false }
  }, [queryClient, userId])

  if ((ids ?? []).length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Heart className="size-4 text-[#8a8a8a]" /> Nothing saved yet</CardTitle>
          <CardDescription>Tap the heart on any product to save it here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm"><Link href="/fashion">Browse fashion</Link></Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">{ids!.length} saved {ids!.length === 1 ? "item" : "items"}</CardTitle>
          <Button variant="ghost" size="sm" disabled={busy} onClick={() => clearWishlist.mutate()}><Trash2 /> Clear</Button>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {(products ?? []).map((product) => (
          <Card key={String(product.id)} className="overflow-hidden bg-white">
            <Link href={`/products/${product.id}`} className="relative block aspect-[3/4] bg-[#f1f1f1]">
              {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />}
            </Link>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`} className="truncate text-sm text-[#484848] hover:text-black">{product.name}</Link>
              <p className="mt-1 text-sm text-[#484848]">{formatNaira(Number(product.price))}</p>
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => toggleWishlist.mutate({ productId: String(product.id), next: false })}
                className="mt-3 w-full"
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {(products ?? []).length === 0 && (
        <Card className="bg-white">
          <CardContent className="flex flex-wrap gap-2 p-5">
            {(ids ?? []).map((id) => (
              <Button key={id} variant="outline" size="sm" asChild><Link href={`/products/${id}`}>{id}</Link></Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
