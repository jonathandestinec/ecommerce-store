'use client'

import { ArrowUp, ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useStore } from './store-provider'

export default function FloatingActions() {
  const { cartCount, openCart } = useStore()
  const pathname = usePathname()
  if (['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'].includes(pathname)) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 md:bottom-8 md:right-8">
      <button type="button" onClick={openCart} aria-label={`Open shopping cart${cartCount ? `, ${cartCount} items` : ''}`} className="relative grid size-11 place-items-center rounded-md bg-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <ShoppingCart className="size-5" strokeWidth={1.8} />
        {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-[#f13b3b] text-[10px] font-medium text-white">{cartCount}</span>}
      </button>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Back to top" className="grid size-11 place-items-center rounded-full border border-black bg-white text-black shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <ArrowUp className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
