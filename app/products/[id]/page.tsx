import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'
import { productQueryKey } from '@/lib/products'
import { fetchProductServer } from '@/lib/products-server'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const queryClient = getQueryClient()

  // Key includes the id: every product gets its own cache entry.
  // Errors propagate to app/products/[id]/error.tsx; missing product → 404.
  const product = await queryClient.query({
    queryKey: productQueryKey(id),
    queryFn: () => fetchProductServer(id),
  })
  if (!product) notFound()

  return <>
    {/* loading.tsx owns the loading state; key remounts detail per product */}
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail key={id} productId={id} />
    </HydrationBoundary>
    <Footer />
  </>
}
