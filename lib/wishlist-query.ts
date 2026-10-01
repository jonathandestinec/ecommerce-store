import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { addToDbWishlist, clearDbWishlist, readLocalWishlist, removeFromDbWishlist, writeLocalWishlist } from "@/lib/wishlist"
import { fetchWishlistCountClient, fetchWishlistIdsClient } from "@/lib/wishlist-client"

/**
 * User-scoped wishlist keys: ["wishlist", userId, ...].
 * A shared key across users would leak one user's cached wishlist
 * to the next user on the same tab — hence the userId segment.
 * Guests share the stable ["wishlist", "guest"] scope (localStorage-backed).
 */
export const wishlistScopeKey = (userId: string | null) => ["wishlist", userId ?? "guest"] as const
export const wishlistIdsKey = (userId: string | null) => [...wishlistScopeKey(userId), "ids"] as const
export const wishlistCountKey = (userId: string) => [...wishlistScopeKey(userId), "count"] as const
export const wishlistProductsKey = (userId: string | null, ids: string[]) =>
  [...wishlistScopeKey(userId), "products", ids] as const

function wishlistIdsOptions(userId: string | null) {
  return {
    queryKey: wishlistIdsKey(userId),
    queryFn: () =>
      userId ? fetchWishlistIdsClient(userId) : Promise.resolve(readLocalWishlist()),
  }
}

/** Suspense version — for dashboard surfaces prefetched on the server. */
export function useWishlistIds(userId: string | null) {
  return useSuspenseQuery(wishlistIdsOptions(userId))
}

/** Non-suspense version — for the product heart, which must never block render. */
export function useWishlistIdsQuery(userId: string | null) {
  return useQuery(wishlistIdsOptions(userId))
}

export function useWishlistCount(userId: string) {
  return useSuspenseQuery({
    queryKey: wishlistCountKey(userId),
    queryFn: () => fetchWishlistCountClient(userId),
  })
}

export function useToggleWishlist(userId: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, next }: { productId: string; next: boolean }) => {
      if (userId) {
        const ok = next ? await addToDbWishlist(productId) : await removeFromDbWishlist(productId)
        if (!ok) throw new Error("Could not update wishlist.")
      } else {
        const current = readLocalWishlist()
        writeLocalWishlist(
          next ? [...new Set([...current, productId])] : current.filter((id) => id !== productId)
        )
      }
    },
    onMutate: async ({ productId, next }) => {
      const key = wishlistIdsKey(userId)
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<string[]>(key) ?? []
      queryClient.setQueryData<string[]>(key, next
        ? [...new Set([...previous, productId])]
        : previous.filter((id) => id !== productId)
      )
      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context) queryClient.setQueryData(wishlistIdsKey(userId), context.previous)
    },
    onSettled: () => {
      // Prefix invalidates ids + derived products queries for this scope only.
      queryClient.invalidateQueries({ queryKey: wishlistScopeKey(userId) })
    },
  })
}

export function useClearWishlist(userId: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      if (userId) {
        const ok = await clearDbWishlist()
        if (!ok) throw new Error("Could not clear wishlist.")
      } else {
        writeLocalWishlist([])
      }
    },
    onMutate: async () => {
      const key = wishlistIdsKey(userId)
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<string[]>(key) ?? []
      queryClient.setQueryData<string[]>(key, [])
      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context) queryClient.setQueryData(wishlistIdsKey(userId), context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: wishlistScopeKey(userId) })
    },
  })
}
