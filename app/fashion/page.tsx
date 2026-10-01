import Footer from '@/components/footer'
import PageTitle from '@/components/page-title'
import ProductGrid from '@/components/product-grid'
import { getQueryClient } from '../get-query-client'
import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { SpinnerCustom } from '@/components/ui/spinner-custom'

export default function FashionPage() {

  // Prefetch the data

  const queryClient = getQueryClient()

  async function fetchProducts() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from("products").select()
    console.log("server fetch", { error })

    return data
  }

  void queryClient.query({
    queryKey: ['products'],
    queryFn: fetchProducts
  }).catch(noop)

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
