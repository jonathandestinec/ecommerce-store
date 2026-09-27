import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatNaira } from '@/lib/currency'

const money = formatNaira

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="min-w-0">
      <Link href={`/products/${product.id}`} className="group block" aria-label={`View ${product.name}`}>
        <div className="relative aspect-[.76] overflow-hidden bg-[#f1f1f1]">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 24vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
          {product.saleStatus === 'Sold' && <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-[10px] leading-3 text-white">Sold<br />out</span>}
        </div>
        <h2 className="mt-3 text-xs font-medium text-[#222] sm:text-sm">{product.name}</h2>
      </Link>
      <div className="mt-1 flex items-center gap-2 text-xs text-[#555]">
        <span>{money(product.price)}</span>
        {product.discount && <span className="text-[10px] text-[#888] line-through">{money(product.price + product.discount)}</span>}
      </div>
      {product.colors && <div className="mt-2 flex items-center gap-1.5" aria-label="Available colors">
        {product.colors.map((color, index) => <span key={`${color}-${index}`} className="grid size-4 place-items-center rounded-full border border-[#bbb]" title={`Color ${index + 1}`}><span className="size-2.5 rounded-full" style={{ backgroundColor: color }} /></span>)}
      </div>}
    </article>
  )
}
