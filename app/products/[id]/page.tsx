import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { products } from '@/data/products'
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)

  const { id } = await params
  const { data: product, error } = await supabase.from("products")
    .select("*")
    .eq("id", id)
    .single()
  if (!product) notFound()

  return <>
    <ProductDetail product={product} />
    <Footer />
  </>
}
