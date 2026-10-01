import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import {
  HydrationBoundary, dehydrate, noop
} from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinnerCustom } from '@/components/ui/spinner-custom';
import { Divide } from 'lucide-react';


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

  const queryClient = getQueryClient()


  const fetchProductDetail = async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const { id } = await params
    const { data: product } = await supabase.from("products")
      .select("*")
      .eq("id", id)
      .single()

    return product
  }

  void queryClient.query({
    queryKey: ['product'],
    queryFn: fetchProductDetail
  }).catch(noop)

  return <>
    {/* Set hydration boundry around the client component */}
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={
        <div className="flex items-center justify-center mt-10">
          <SpinnerCustom />
        </div>
      }>
        <ProductDetail params={params} />
      </Suspense>
    </HydrationBoundary>
    <Footer />
  </>
}
