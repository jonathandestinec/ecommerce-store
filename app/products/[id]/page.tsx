import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import {
  HydrationBoundary, dehydrate, noop
} from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client';


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
    queryKey: ['products'],
    queryFn: fetchProductDetail
  }).catch(noop)

  return <>
    {/* Set hydration boundry around the client component */}
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail params={params} />
    </HydrationBoundary>
    <Footer />
  </>
}
