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
} from '@tanstack/react-query'


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

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

  const { isPending, isError, data: product, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchProductDetail,
  })

  if (!product) notFound()

  return <>
    <ProductDetail product={product} />
    <Footer />
  </>
}
