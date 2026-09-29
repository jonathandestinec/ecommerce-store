"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@/utils/supabase/client"
import { clearDbWishlist, fetchDbWishlist, readLocalWishlist, removeFromDbWishlist, syncLocalWishlistToDb, writeLocalWishlist } from "@/lib/wishlist"
import { formatNaira } from "@/lib/currency"
import type { Product } from "@/types"

export function WishlistClient({ initialIds }: { initialIds: string[] }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [ids, setIds] = useState<string[] | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    async function load() {
      if (loading) return
      if (!user) {
        router.push("/login?next=/dashboard/wishlist")
        return
      }
      // Merge any guest saves into the DB, then use DB as source of truth.
      const merged = await syncLocalWishlistToDb().catch(() => initialIds)
      if (!active) return
      setIds(merged)
      if (merged.length > 0) {
        const { data } = await createClient().from("products").select("*").in("id", merged)
        if (active && data) {
          const byId = new Map((data as Product[]).map((p) => [String(p.id), p]))
          setProducts(merged.map((id) => byId.get(String(id))).filter((p): p is Product => !!p))
        }
      }
    }
    load()
    return () => { active = false }
  }, [user, loading, initialIds, router])

  // Fallback to server-provided IDs while the DB sync runs.
  useEffect(() => {
    if (ids === null && initialIds.length > 0) {
      createClient().from("products").select("*").in("id", initialIds).then(({ data }) => {
        if (data) setProducts(data as Product[])
      })
    }
  }, [ids, initialIds])

  async function remove(id: string) {
    setBusy(true)
    await removeFromDbWishlist(id)
    setIds((prev) => (prev ?? []).filter((item) => item !== id))
    setProducts((prev) => prev.filter((p) => String(p.id) !== id))
    setBusy(false)
  }

  async function clear() {
    setBusy(true)
    await clearDbWishlist()
    writeLocalWishlist([])
    setIds([])
    setProducts([])
    setBusy(false)
  }

  // Live count for other components (overview stats) without extra queries.
  useEffect(() => {
    if (ids !== null && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("fasco:wishlist", { detail: ids.length }))
    }
  }, [ids])

  if (loading || ids === null) return <Skeleton className="h-40 w-full" />

  if (ids.length === 0) {
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
          <CardTitle className="text-base">{ids.length} saved {ids.length === 1 ? "item" : "items"}</CardTitle>
          <Button variant="ghost" size="sm" disabled={busy} onClick={clear}><Trash2 /> Clear</Button>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {products.map((product) => (
          <Card key={String(product.id)} className="overflow-hidden bg-white">
            <Link href={`/products/${product.id}`} className="relative block aspect-[3/4] bg-[#f1f1f1]">
              {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />}
            </Link>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`} className="truncate text-sm text-[#484848] hover:text-black">{product.name}</Link>
              <p className="mt-1 text-sm text-[#484848]">{formatNaira(Number(product.price))}</p>
              <Button variant="outline" size="sm" disabled={busy} onClick={() => remove(String(product.id))} className="mt-3 w-full">
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {products.length === 0 && (
        <Card className="bg-white">
          <CardContent className="flex flex-wrap gap-2 p-5">
            {ids.map((id) => (
              <Button key={id} variant="outline" size="sm" asChild><Link href={`/products/${id}`}>{id}</Link></Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Re-export for pages that only need the local fallback (guest bargain hunt before sign in).
export { readLocalWishlist, fetchDbWishlist }
