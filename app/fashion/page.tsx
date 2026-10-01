export const dynamic = 'force-dynamic'

import Footer from '@/components/footer'
import PageTitle from '@/components/page-title'
import ProductGrid from '@/components/product-grid'
import { getQueryClient } from '../get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { SpinnerCustom } from '@/components/ui/spinner-custom'
import { productsQueryKey } from '@/lib/products'
import { fetchProductsServer } from '@/lib/products-server'

export default async function FashionPage() {
  const queryClient = getQueryClient()

  // Awaited: dehydrate() must run AFTER data arrives, otherwise the
  // server fetch is discarded and the client refetches anyway.
  await queryClient.query({
    queryKey: productsQueryKey,
    queryFn: fetchProductsServer,
  })

  return (
    <main>
      <PageTitle title="Fashion" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={
          <div className="flex items-center justify-center mt-10">
            <SpinnerCustom />
          </div>
        }>
          <ProductGrid />
        </Suspense>
      </HydrationBoundary>
      <Footer />
    </main>
  )
}
