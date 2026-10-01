/**
 * Shared TanStack Query keys for the product catalog.
 *
 * Server prefetch (page components) and client readers
 * (components/product-grid.tsx, components/product-detail.tsx)
 * must use the SAME keys or hydration silently breaks.
 */
export const productsQueryKey = ["products"] as const

export const productQueryKey = (id: string) => ["product", id] as const
