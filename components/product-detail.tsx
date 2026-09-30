'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownUp, ChevronDown, Eye, Heart, Share2, Truck } from 'lucide-react'
import type { Product } from '@/types'
import { products } from '@/data/products'
import { useStore } from './store-provider'
import { useAuth } from './auth-provider'
import { addToDbWishlist, readLocalWishlist, removeFromDbWishlist, writeLocalWishlist } from '@/lib/wishlist'
import { formatNaira, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'
import { useQuery } from '@tanstack/react-query'

const sizes = ['M', 'L', 'XL', 'XXL']
const money = formatNaira

export default function ProductDetail() {
  const { addToCart, openCart } = useStore()
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '#8db4d2')
  const [quantity, setQuantity] = useState(1)
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState('Description')
  const gallery = [product.images[0], ...products.filter((item) => item.id !== product.id).map((item) => item.images[0])].slice(0, 7)
  const regularPrice = product.price + (product.discount ?? 0)
  const discountPercent = product.discount ? Math.round((product.discount / regularPrice) * 100) : 0
  const colorNames: Record<string, string> = { '#8db4d2': 'Blue', '#000000': 'Black', '#ffd1dc': 'Pink', '#d0d5dd': 'White', '#d1e9cf': 'Green', '#1d3557': 'Navy', '#d8b4e2': 'Lilac', '#ffd700': 'Gold' }
  const colorName = colorNames[selectedColor.toLowerCase()] ?? 'Selected'
  const soldOut = product.saleStatus === 'Sold'
  const productId = String(product.id)

  async function checkSaved() {
    let active = true
    if (user) {
      const { createClient } = await import('@/utils/supabase/client')
      const supabase = createClient()
      const { data } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle()
      if (active) setSaved(!!data)
    } else if (typeof window !== 'undefined') {
      if (active) setSaved(readLocalWishlist().includes(productId))
    }

    active = false
  }

  const { isPending, error, data: product } = useQuery({
    queryKey: ['product'],
    queryFn: checkSaved
  })


  async function toggleSaved() {
    const next = !saved
    setSaved(next)
    if (user) {
      if (next) await addToDbWishlist(productId)
      else await removeFromDbWishlist(productId)
    } else if (typeof window !== 'undefined') {
      const current = readLocalWishlist()
      writeLocalWishlist(next ? [...new Set([...current, productId])] : current.filter((id) => id !== productId))
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-14 pt-8 md:px-7 md:pt-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#888]"><Link href="/" className="hover:text-black">Home</Link><span className="mx-2">›</span><Link href="/fashion" className="hover:text-black">Fashion</Link><span className="mx-2">›</span><span className="text-[#333]">{product.name}</span></nav>

      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.95fr)] lg:gap-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-4">
          <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
            {gallery.map((image, index) => <button key={index} type="button" aria-label={`Show product image ${index + 1}`} aria-pressed={selectedImage === image} onClick={() => setSelectedImage(image)} className={`relative size-16 shrink-0 overflow-hidden bg-[#f2f2f2] sm:size-14 ${selectedImage === image ? 'ring-1 ring-black ring-offset-2' : ''}`}><Image src={image} alt="" fill sizes="56px" className="object-cover" /></button>)}
          </div>
          <div className="relative order-1 aspect-[.78] overflow-hidden bg-[#f0f0f0] sm:order-2 sm:aspect-[.75]">
            <Image src={selectedImage} alt={product.name} fill loading="eager" sizes="(max-width: 640px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>

        <section className="text-[#222]">
          <div className="flex items-start justify-between gap-4">
            <div><p className="font-serif text-sm text-[#777]">FASCO</p><h1 className="mt-1 font-serif text-3xl md:text-4xl">{product.name}</h1></div>
            <button type="button" onClick={toggleSaved} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={saved} className={`mt-2 grid size-10 shrink-0 place-items-center rounded-full border ${saved ? 'border-black bg-black text-white' : 'border-[#eee] hover:border-black'}`}><Heart className="size-4" fill={saved ? 'currentColor' : 'none'} /></button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm"><span className="tracking-tight text-black">★★★★<span className="text-[#aaa]">★</span></span><span className="text-xs text-[#777]">(3 reviews)</span></div>
          <div className="mt-4 flex items-center gap-3"><span className="text-xl font-medium">{money(product.price)}</span>{product.discount && <><span className="text-sm text-[#888] line-through">{money(regularPrice)}</span><span className="rounded-full bg-[#e85050] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Save {discountPercent}%</span></>}</div>

          <p className="mt-5 flex items-center gap-2 text-xs text-[#888]"><Eye className="size-4 text-black" /> 24 people are viewing this right now</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#f5cccc] bg-[#fff5f5] px-3 py-3 text-xs text-[#df5555]"><span>Hurry up! Sale ends in:</span><span className="font-mono font-semibold tracking-[.2em]">00 : 05 : 59 : 47</span></div>
          <div className="mt-5">{soldOut ? <p className="text-sm font-medium text-[#b42318]">Sold out</p> : <><p className="text-xs text-[#777]">Only <strong className="text-[#222]">9 item(s)</strong> left in stock!</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-[#ddd]"><div className="h-full w-[18%] bg-[#ed5555]" /></div></>}</div>

          <fieldset className="mt-6"><legend className="text-sm font-semibold">Size: {selectedSize}</legend><div className="mt-3 flex gap-2">{sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`grid h-10 min-w-10 place-items-center rounded border px-3 text-xs ${selectedSize === size ? 'border-black bg-black text-white' : 'border-[#ddd] hover:border-black'}`}>{size}</button>)}</div></fieldset>

          <fieldset className="mt-5"><legend className="text-sm font-semibold">Color: <span className="font-normal text-[#777]">{colorName}</span></legend><div className="mt-3 flex gap-2.5">{(product.colors?.length ? product.colors : ['#8db4d2', '#000000', '#ffd1dc']).slice(0, 3).map((color, index) => <button key={`${color}-${index}`} type="button" onClick={() => setSelectedColor(color)} aria-label={`Select color ${colorNames[color.toLowerCase()] ?? index + 1}`} aria-pressed={selectedColor === color} className={`grid size-7 place-items-center rounded-full ${selectedColor === color ? 'ring-1 ring-black ring-offset-2' : ''}`} style={{ backgroundColor: color }} />)}</div></fieldset>

          <div className="mt-6 grid grid-cols-[112px_1fr] gap-3">
            <div className={`flex h-11 items-center justify-between border border-[#ddd] px-2 ${soldOut ? 'opacity-50' : ''}`}><button type="button" disabled={soldOut} aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-7 place-items-center text-[#777] disabled:cursor-not-allowed">−</button><span aria-live="polite" className="text-sm">{quantity}</span><button type="button" disabled={soldOut} aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="grid size-7 place-items-center text-[#777] disabled:cursor-not-allowed">+</button></div>
            <button type="button" disabled={soldOut} onClick={() => { addToCart(product, quantity, selectedSize, selectedColor); setAdded(true); openCart() }} className="h-11 rounded border border-black bg-black px-4 text-sm text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:border-[#aaa] disabled:bg-[#aaa]">{soldOut ? 'Sold out' : added ? 'Added to cart' : 'Add to cart'}</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 border-b border-[#eee] py-4 text-xs text-[#555]"><button type="button" className="inline-flex items-center gap-2"><ArrowDownUp className="size-4" />Compare</button><button type="button" className="inline-flex items-center gap-2"><Share2 className="size-4" />Share</button></div>
          <p className="mt-4 flex items-center gap-2 text-xs"><Truck className="size-4" /><strong>Estimated delivery:</strong> Jul 30 – Aug 03</p>
          <p className="mt-2 flex items-center gap-2 text-xs"><Truck className="size-4" /><strong>Free Shipping &amp; Returns:</strong> On all orders over {money(FREE_SHIPPING_THRESHOLD)}</p>
          <div className="mt-5 rounded-md bg-[#f7f7f7] px-5 py-4 text-center"><p className="text-xs font-medium">Guaranteed safe &amp; secure checkout</p><p className="mt-2 text-[10px] tracking-[.18em] text-[#777]">VISA · MASTERCARD · AMEX · DISCOVER</p></div>
          <div className="mt-5 divide-y divide-[#eee] border-y border-[#eee]">{['Description', 'Shipping & Returns', 'Reviews'].map((label) => <div key={label}><button type="button" onClick={() => setDetailsOpen(detailsOpen === label ? '' : label)} aria-expanded={detailsOpen === label} className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">{label}<ChevronDown className={`size-4 transition-transform ${detailsOpen === label ? 'rotate-180' : ''}`} /></button>{detailsOpen === label && <p className="pb-4 text-xs leading-5 text-[#777]">{label === 'Description' ? 'A timeless wardrobe essential with a considered fit and premium feel. Designed for easy everyday styling.' : label === 'Reviews' ? 'Customers love the fit, fabric, and quality of this piece.' : 'Orders are prepared with care. Returns are accepted within 30 days of delivery.'}</p>}</div>)}</div>
        </section>
      </div>

      {added && <p role="status" className="sr-only">{product.name} added to your cart.</p>}
    </main>
  )
}
