"use client"

import { volkhov } from '@/styles/fonts'
import { Menu, Search, ShoppingBag, Star, User, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Button from './button'

const links = [
  { text: 'Home', url: '/' },
  { text: 'Deals', url: '/deals' },
  { text: 'New Arrivals', url: '/new' },
  { text: 'Packages', url: '/packages' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 px-5 py-5 md:px-0 md:py-0" aria-label="Main navigation">
      <div className="flex items-center justify-between md:hidden">
        <Link href="/" onClick={() => setOpen(false)} aria-label="FASCO home">
          <span className={`text-[30px] text-[#484848] ${volkhov.className}`}>FASCO</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="rounded-full p-2 text-[#484848] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className="hidden items-center justify-between md:flex">
        <Link href="/" aria-label="FASCO home">
          <span className={`text-[52px] text-[#484848] ${volkhov.className}`}>FASCO</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-10 lg:gap-14.5">
            {links.map((link) => (
              <li key={link.url}>
                <Link className={`text-[14px] transition-colors hover:text-[#8a8a8a] ${pathname === link.url ? 'font-medium' : ''}`} href={link.url}>
                  {link.text}
                </Link>
              </li>
            ))}
            <li><Link href="/signin" className="text-[14px] hover:text-[#8a8a8a]">Sign in</Link></li>
            <li><Link href="/signup"><Button text="Sign up" className="px-10 py-3 text-[13px]" /></Link></li>
          </ul>
        </nav>
        <div className="flex items-center gap-3" aria-label="Account actions">
          <button type="button" aria-label="Search" className="rounded-full p-2 hover:bg-[#f7f7f7]"><Search /></button>
          <button type="button" aria-label="Account" className="rounded-full p-2 hover:bg-[#f7f7f7]"><User /></button>
          <button type="button" aria-label="Wishlist" className="rounded-full p-2 hover:bg-[#f7f7f7]"><Star /></button>
          <button type="button" aria-label="Shopping bag" className="rounded-full p-2 hover:bg-[#f7f7f7]"><ShoppingBag /></button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="absolute inset-x-5 top-full rounded-2xl bg-white p-5 shadow-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.url}>
                <Link href={link.url} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[#484848] hover:bg-[#f7f7f7]">{link.text}</Link>
              </li>
            ))}
            <li><Link href="/signin" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[#484848] hover:bg-[#f7f7f7]">Sign in</Link></li>
            <li><Link href="/signup" onClick={() => setOpen(false)} className="block pt-2"><Button text="Sign up" className="w-full" /></Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export { Nav }
