'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/button'
import { newArivals } from '@/data/new-arrivals'
import { formatNumber } from '@/lib/functions'
import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import { formatNaira } from '@/lib/currency'

const categories = ["Women's Fashion", "Men's Fashion", 'Women Accessories', 'Men Accessories', 'Discount Deals'] as const

export default function NewArrivals() {
  const [active, setActive] = useState<(typeof categories)[number]>('Women\'s Fashion')
  const products = useMemo(() => newArivals.filter((product) => product.category === active), [active])

  return (
    <section id="new-arrivals" className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto grid max-w-2xl gap-3 text-center">
          <h2 className={`${volkhov.className} text-3xl text-[#484848] md:text-5xl`}>New Arrivals</h2>
          <p className="text-sm leading-6 text-[#8A8A8A] md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.</p>
        </div>

        <div role="tablist" aria-label="Product categories" className="hide-scrollbar mx-auto mt-8 flex max-w-full gap-2 overflow-x-auto pb-2 md:mt-12 md:justify-center md:gap-4">
          {categories.map((category) => (
            <button key={category} role="tab" aria-selected={active === category} onClick={() => setActive(category)} className={cn('shrink-0 rounded-lg px-4 py-3 text-xs transition-colors md:px-7 md:text-sm', active === category ? 'bg-black text-white shadow-lg' : 'bg-[#FAFAFA] text-[#8A8A8A] hover:bg-[#eee]')}>
              {category}
            </button>
          ))}
        </div>

        <div key={active} className="mx-auto mt-7 flex max-w-6xl flex-wrap items-stretch justify-center gap-3 animate-[fade-in_.35s_ease-out] sm:gap-5 md:mt-12 md:gap-7">
          {products.map((product, index) => (
            <Link key={product.id} href="/fashion" className="group w-[calc(50%-6px)] max-w-[360px] min-w-0 rounded-xl bg-white p-2.5 shadow-[0_16px_50px_rgba(0,0,0,.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,.12)] sm:w-[calc(50%-10px)] sm:p-4 md:w-[calc(33.333%-19px)] md:p-5">
              <div className="relative aspect-[.9] overflow-hidden rounded-lg bg-[#F5F5F5]">
                <Image src={product.image} alt={product.name} fill unoptimized loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 640px) 48vw, (max-width: 900px) 30vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0"><h3 className="truncate text-sm font-medium text-[#484848] md:text-lg">{product.name}</h3><p className="text-xs text-[#8A8A8A]">{product.seller}</p></div>
                <span aria-label={`${product.rating} out of 5 stars`} className="shrink-0 text-xs tracking-tight text-[#FCA120] md:text-sm">★★★★★</span>
              </div>
              <p className="mt-3 text-[10px] font-medium text-[#484848] md:text-xs">({formatNumber(product.reviews)}) Customer Reviews</p>
              <div className="mt-2 flex items-center justify-between gap-1"><span className="font-medium text-[#484848] md:text-xl">{formatNaira(product.price)}</span><span className="text-right text-[9px] text-[#FF4646] md:text-xs">{product.saleStatus}</span></div>
            </Link>
          ))}
        </div>
        {products.length === 0 && <p className="py-12 text-center text-sm text-[#8A8A8A]">No products in this category yet.</p>}
        <Link href="/fashion" className="mx-auto mt-10 flex w-max"><Button text="View More" className="px-10 md:px-15" /></Link>
      </div>
    </section>
  )
}
