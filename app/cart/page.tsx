'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import PageTitle from '@/components/page-title'
import { useStore } from '@/components/store-provider'
import Newsletter from '@/components/newsletter'
import { formatNaira, GIFT_WRAP_FEE } from '@/lib/currency'
import SiteFooter from '@/components/site-footer'

const money = formatNaira

export default function CartPage() {
  const { cart, subtotal, setQuantity, removeFromCart, giftWrap, setGiftWrap } = useStore()
  const total = subtotal + (giftWrap ? GIFT_WRAP_FEE : 0)

  return <main>
    <PageTitle title="Shopping Cart" />
    <div className="mx-auto min-h-[360px] w-full max-w-6xl px-5 pb-16 pt-10 md:px-7">
      {cart.length === 0 ? <div className="grid min-h-64 place-items-center text-center">
        <div><h2 className="font-serif text-2xl">Your cart is empty</h2><p className="mt-2 text-sm text-[#888]">Browse the collection and find something for your wardrobe.</p><Link href="/fashion" className="mt-5 inline-flex rounded-md bg-black px-6 py-3 text-sm text-white">Continue shopping</Link></div>
      </div> : <>
        <div className="hidden grid-cols-[minmax(0,2fr)_1fr_1.1fr_1fr] border-b border-[#ddd] pb-4 text-sm font-medium md:grid"><span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Total</span></div>
        <div className="divide-y divide-[#ddd]">
          {cart.map(({ product, quantity, size, color }) => <article key={`${product.id}-${size}-${color}`} className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[minmax(0,2fr)_1fr_1.1fr_1fr] sm:items-center">
            <div className="flex items-center gap-4">
              <Link href={`/products/${product.id}`} className="relative h-28 w-20 shrink-0 bg-[#f1f1f1]"><Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" /></Link>
              <div><Link href={`/products/${product.id}`} className="font-serif text-base hover:underline">{product.name}</Link><p className="mt-2 text-xs text-[#888]">Color: <span className="inline-block size-2.5 translate-y-0.5 rounded-full border" style={{ backgroundColor: color }} /></p><p className="mt-1 text-xs text-[#888]">Size: {size}</p><button type="button" onClick={() => removeFromCart(product.id, size, color)} className="mt-2 inline-flex items-center gap-1 text-xs text-[#888] underline hover:text-black"><Trash2 className="size-3" />Remove</button></div>
            </div>
            <span className="text-sm sm:block"><span className="mr-2 text-xs text-[#888] sm:hidden">Price</span>{money(product.price)}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888] sm:hidden">Quantity</span>
              <div className="inline-flex items-center border border-[#ddd]"><button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => setQuantity(product.id, size, color, quantity - 1)} className="grid size-8 place-items-center"><Minus className="size-3" /></button><span className="min-w-8 text-center text-sm">{quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => setQuantity(product.id, size, color, quantity + 1)} className="grid size-8 place-items-center"><Plus className="size-3" /></button></div>
            </div>
            <span className="text-left text-sm sm:text-right"><span className="mr-2 text-xs text-[#888] sm:hidden">Total</span>{money(product.price * quantity)}</span>
          </article>)}
        </div>

        <div className="mt-5 grid gap-8 border-t border-[#ddd] pt-6 md:grid-cols-[1fr_360px]">
          <div className="flex items-start gap-3"><input id="gift-wrap" type="checkbox" checked={giftWrap} onChange={(event) => setGiftWrap(event.target.checked)} className="mt-1 size-4 accent-black" /><label htmlFor="gift-wrap" className="text-sm text-[#888]">Add gift wrap for {money(GIFT_WRAP_FEE)}</label></div>
          <div className="rounded-lg bg-[#fafafa] p-5">
            <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            {giftWrap && <div className="mt-3 flex justify-between text-sm text-[#777]"><span>Gift wrap</span><span>{money(GIFT_WRAP_FEE)}</span></div>}
            <p className="mt-3 text-xs text-[#888]">Shipping and taxes are calculated at checkout.</p>
            <Link href="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-md bg-black text-sm text-white shadow-md hover:bg-[#333]">Checkout · {money(total)}</Link>
            <Link href="/fashion" className="mt-4 block text-center text-sm underline">Continue shopping</Link>
          </div>
        </div>
      </>}
    </div>
    <Newsletter />
    <SiteFooter />
  </main>
}
