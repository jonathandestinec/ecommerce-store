import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'
import { products } from '@/data/products'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((item) => item.id === Number(id))
  if (!product) notFound()

  return <>
    <ProductDetail product={product} />
    <Footer />
  </>
}
