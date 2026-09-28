'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useStore } from './store-provider'
import { formatNaira, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'

const freeShippingAt = FREE_SHIPPING_THRESHOLD
const money = formatNaira

export default function CartDrawer() {
  const { cart, cartCount, subtotal, cartOpen, closeCart, setQuantity, removeFromCart } = useStore()
  if (!cartOpen) return null

  const remaining = Math.max(0, freeShippingAt - subtotal)

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button type="button" onClick={closeCart} aria-label="Close shopping cart" className="absolute inset-0 bg-black/25" />
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="relative flex h-dvh w-full max-w-[480px] flex-col bg-white px-6 py-5 text-[#222] shadow-2xl sm:px-8">
        <header className="flex items-center justify-between border-b border-[#dedede] pb-4">
          <div>
            <h2 id="cart-title" className="font-serif text-2xl">Shopping Cart</h2>
            <p className="mt-1 text-sm text-[#888]">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button type="button" onClick={closeCart} aria-label="Close shopping cart" className="grid size-9 place-items-center rounded-full hover:bg-[#f4f4f4]"><X className="size-5" /></button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="font-serif text-xl">Your cart is empty</p>
            <p className="mt-2 max-w-xs text-sm text-[#888]">Find something you love in our latest collection.</p>
            <Link href="/fashion" onClick={closeCart} className="mt-6 rounded-md bg-black px-6 py-3 text-sm text-white">Continue shopping</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-[#dedede] py-4 text-sm text-[#777]">
              {remaining > 0 ? <>You’re {money(remaining)} away from <strong className="font-semibold text-black">free shipping</strong></> : <strong className="font-semibold text-black">You’ve unlocked free shipping</strong>}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eee]"><div className="h-full bg-black transition-all" style={{ width: `${Math.min(100, (subtotal / freeShippingAt) * 100)}%` }} /></div>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto py-5">
              {cart.map(({ product, quantity, size, color }) => (
                <article key={`${product.id}-${size}-${color}`} className="flex gap-4 border-b border-[#ddd] pb-5">
                  <Link href={`/products/${product.id}`} onClick={closeCart} className="relative h-32 w-24 shrink-0 bg-[#f3f3f3]">
                    <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div><Link href={`/products/${product.id}`} onClick={closeCart} className="text-sm font-medium hover:underline">{product.name}</Link><p className="mt-1 text-xs text-[#888]">Size: {size} · Color: <span className="inline-block size-2.5 translate-y-0.5 rounded-full border" style={{ backgroundColor: color }} /></p></div>
                      <button type="button" onClick={() => removeFromCart(product.id, size, color)} aria-label={`Remove ${product.name}`} className="text-xs text-[#888] underline hover:text-black">Remove</button>
                    </div>
                    <p className="mt-2 text-sm">{money(product.price)}</p>
                    <div className="mt-3 inline-flex items-center border border-[#ddd]">
                      <button type="button" onClick={() => setQuantity(product.id, size, color, quantity - 1)} aria-label={`Decrease ${product.name} quantity`} className="grid size-8 place-items-center hover:bg-[#f6f6f6]"><Minus className="size-3" /></button>
                      <span aria-live="polite" className="min-w-8 text-center text-sm">{quantity}</span>
                      <button type="button" onClick={() => setQuantity(product.id, size, color, quantity + 1)} aria-label={`Increase ${product.name} quantity`} className="grid size-8 place-items-center hover:bg-[#f6f6f6]"><Plus className="size-3" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="border-t border-[#ddd] pt-4">
              <div className="flex items-center justify-between text-sm"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <p className="mt-2 text-xs text-[#888]">Shipping and taxes are calculated at checkout.</p>
              <Link href="/checkout" onClick={closeCart} className="mt-4 flex h-12 items-center justify-center rounded-md bg-black text-sm text-white shadow-md transition hover:bg-[#333]">Checkout</Link>
              <Link href="/cart" onClick={closeCart} className="mt-3 block text-center text-sm underline underline-offset-2">View cart</Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
