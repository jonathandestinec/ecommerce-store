import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  HydrationBoundary, dehydrate
} from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client';


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

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

  const product = await queryClient.query({
    queryKey: ['product'],
    queryFn: fetchProductDetail
  })

  if (!product) notFound()

  return <>

    {/* Set hydration boundry around the client component */}
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail />
    </HydrationBoundary>
    <Footer />
  </>
}
