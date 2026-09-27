'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingBag, Star, UserRound, X } from 'lucide-react'
import { volkhov } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import { useStore } from './store-provider'

const links = [
  { text: 'Home', href: '/' },
  { text: 'Deals', href: '/#deals' },
  { text: 'New Arrivals', href: '/#new-arrivals' },
  { text: 'Packages', href: '/#banner' },
]

const storeLinks = [
  { text: 'Home', href: '/' },
  { text: 'Shop', href: '/fashion' },
  { text: 'Products', href: '/fashion' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const pathname = usePathname()
  const { cartCount, openCart } = useStore()
  if (['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'].includes(pathname)) return null
  const showStoreIcons = pathname !== '/'
  return <header className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-4 md:pt-7">
    <nav className="flex items-center justify-between" aria-label="Main navigation">
      <Link href="/" className={`${volkhov.className} text-3xl text-[#484848] md:text-[42px]`}>FASCO</Link>
      <div className="hidden items-center gap-8 md:flex lg:gap-10">
        {(showStoreIcons ? storeLinks : links).map((link, index) => {
          const active = showStoreIcons && (link.text === 'Home' ? pathname === '/' : link.text === 'Shop' ? pathname === '/fashion' : link.text === 'Products' ? pathname.startsWith('/products/') : pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)))
          return <Link key={`${link.text}-${index}`} href={link.href} aria-current={active ? 'page' : undefined} className={`relative py-2 text-sm text-[#484848] transition hover:text-black after:absolute after:-bottom-0.5 after:-left-2 after:h-px after:w-[calc(100%+16px)] after:origin-center after:scale-x-0 after:bg-[#555] after:transition-transform ${active ? 'after:scale-x-100' : ''}`}>{link.text}</Link>
        })}
        {showStoreIcons ? <details className="group relative">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-sm text-[#484848] transition hover:text-black [&::-webkit-details-marker]:hidden">Pages <span aria-hidden="true" className="-mt-1 text-xs">⌄</span></summary>
          <div className="absolute left-0 top-full z-30 mt-3 min-w-40 rounded-md border border-[#eee] bg-white p-2 shadow-lg">
            <Link href="/login" className="block rounded px-3 py-2 text-sm text-[#484848] hover:bg-[#f6f6f6]">Sign in</Link>
            <Link href="/register" className="block rounded px-3 py-2 text-sm text-[#484848] hover:bg-[#f6f6f6]">Create account</Link>
            <Link href="/cart" className="block rounded px-3 py-2 text-sm text-[#484848] hover:bg-[#f6f6f6]">Shopping cart</Link>
          </div>
        </details> : <Link href="/fashion" className="rounded-md bg-black px-7 py-3 text-xs text-white shadow-lg transition hover:bg-[#333]">Shop now</Link>}
      </div>
      {showStoreIcons && <div className="hidden items-center gap-1 md:flex lg:gap-0">
          <Link href="/fashion" aria-label="Search products" title="Search products" className="grid size-9 place-items-center text-[#484848] hover:text-black"><Search className="size-5" /></Link>
          <Link href="/login" aria-label="Sign in to your account" title="Sign in" className="grid size-9 place-items-center text-[#484848] hover:text-black"><UserRound className="size-5" /></Link>
          <button type="button" onClick={() => setSaved((value) => !value)} aria-label={saved ? 'Remove from wishlist' : 'Wishlist'} aria-pressed={saved} title="Wishlist" className="grid size-9 place-items-center text-[#484848] hover:text-black"><Star className={`size-5 ${saved ? 'fill-black' : ''}`} /></button>
          <button type="button" onClick={openCart} aria-label={`Open shopping cart${cartCount ? `, ${cartCount} items` : ''}`} className="relative grid size-9 place-items-center text-[#484848] hover:text-black"><ShoppingBag className="size-5" />{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-[#f13b3b] text-[10px] text-white">{cartCount}</span>}</button>
      </div>}
      <div className="flex items-center gap-2 md:hidden">
        {showStoreIcons && <button type="button" onClick={openCart} aria-label={`Open shopping cart${cartCount ? `, ${cartCount} items` : ''}`} className="relative grid size-10 place-items-center rounded-full hover:bg-[#f4f4f4]"><ShoppingBag className="size-5" />{cartCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#f13b3b] text-[10px] text-white">{cartCount}</span>}</button>}
        <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-full transition hover:bg-[#f4f4f4]">{open ? <X /> : <Menu />}</button>
      </div>
    </nav>
    <div id="mobile-navigation" className={cn('absolute inset-x-5 top-full mt-2 rounded-xl bg-white p-3 shadow-xl md:hidden', open ? 'block' : 'hidden')}>
      {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm text-[#484848] hover:bg-[#f6f6f6]">{link.text}</Link>)}
      <Link href="/fashion" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm text-[#484848] hover:bg-[#f6f6f6]">Shop</Link>
    </div>
  </header>
}
