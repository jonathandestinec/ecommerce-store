'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useStore } from '@/components/store-provider'
import Newsletter from '@/components/newsletter'
import SiteFooter from '@/components/site-footer'

const money = (value: number) => `$${value.toFixed(2)}`

export default function CheckoutPage() {
  const { cart, subtotal, giftWrap } = useStore()
  const [message, setMessage] = useState('')
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 8
  const total = subtotal + shipping + (giftWrap ? 10 : 0)

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('This checkout is a design preview. No payment was taken and no order was placed.')
  }

  return <main>
    <h1 className="my-8 text-center font-serif text-3xl">FASCO Demo Checkout</h1>
    <div className="grid border-y border-[#ddd] lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submitOrder} className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex items-baseline justify-between"><h2 className="font-serif text-2xl">Contact</h2><p className="text-xs text-[#888]">Have an account? <Link href="/fashion" className="text-blue-600 underline">Sign in</Link></p></div>
        <label className="mt-4 block"><span className="sr-only">Email address</span><input type="email" required autoComplete="email" placeholder="Email address" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm outline-none focus:border-black" /></label>

        <h2 className="mt-8 font-serif text-2xl">Delivery</h2>
        <div className="mt-4 grid gap-3">
          <label><span className="sr-only">Country or region</span><select defaultValue="" required className="h-11 w-full rounded border border-[#ccc] bg-white px-3 text-sm"><option value="" disabled>Country / Region</option><option>Nigeria</option><option>United States</option><option>United Kingdom</option><option>Canada</option></select></label>
          <div className="grid grid-cols-2 gap-3"><label><span className="sr-only">First name</span><input required autoComplete="given-name" placeholder="First name" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label><label><span className="sr-only">Last name</span><input required autoComplete="family-name" placeholder="Last name" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label></div>
          <label><span className="sr-only">Address</span><input required autoComplete="street-address" placeholder="Address" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label>
          <div className="grid grid-cols-2 gap-3"><label><span className="sr-only">City</span><input required autoComplete="address-level2" placeholder="City" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label><label><span className="sr-only">Postal code</span><input required autoComplete="postal-code" placeholder="Postal Code" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label></div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-xs text-[#777]"><input type="checkbox" className="size-4 accent-black" /> Save this information for next time</label>

        <h2 className="mt-8 font-serif text-2xl">Payment</h2>
        <div className="mt-4 rounded-t border border-[#ccc] bg-white px-3 py-3 text-sm">Credit card <span className="float-right text-xs text-[#777]">VISA · Mastercard</span></div>
        <div className="grid gap-2 border-x border-b border-[#ccc] bg-[#f7f7f7] p-3">
          <label><span className="sr-only">Card number</span><input inputMode="numeric" autoComplete="cc-number" placeholder="Card Number" className="h-10 w-full rounded border border-[#ccc] bg-white px-3 text-sm" /></label>
          <div className="grid grid-cols-2 gap-2"><label><span className="sr-only">Expiration date</span><input autoComplete="cc-exp" placeholder="Expiration Date" className="h-10 w-full rounded border border-[#ccc] bg-white px-3 text-sm" /></label><label><span className="sr-only">Security code</span><input inputMode="numeric" autoComplete="cc-csc" placeholder="Security Code" className="h-10 w-full rounded border border-[#ccc] bg-white px-3 text-sm" /></label></div>
          <label><span className="sr-only">Cardholder name</span><input autoComplete="cc-name" placeholder="Card Holder Name" className="h-10 w-full rounded border border-[#ccc] bg-white px-3 text-sm" /></label>
        </div>
        <p className="mt-3 text-xs text-[#888]">This checkout is a visual demo and does not process or store payment details.</p>
        <button type="submit" className="mt-5 h-12 w-full rounded-md bg-black text-sm text-white shadow-md transition hover:bg-[#333]">Pay {money(total)}</button>
        {message && <p role="status" className="mt-3 rounded border border-[#ddd] bg-white p-3 text-sm text-[#555]">{message}</p>}
      </form>

      <aside className="min-h-[420px] bg-[#f7f7f7] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-xl">
          {cart.length ? <div className="space-y-4 border-b border-[#ddd] pb-5">{cart.map(({ product, quantity, color, size }) => <div key={`${product.id}-${color}-${size}`} className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 bg-white"><Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" /><span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#555] text-[10px] text-white">{quantity}</span></div>
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-[#777]">{size} · {color}</p></div><span className="text-sm">{money(product.price * quantity)}</span>
          </div>)}</div> : <div className="border-b border-[#ddd] pb-5 text-sm text-[#777]">Your cart is empty. <Link href="/fashion" className="underline">Browse products</Link></div>}
          <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>{giftWrap && <div className="flex justify-between"><span>Gift wrap</span><span>{money(10)}</span></div>}<div className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div><div className="flex justify-between border-t border-[#ddd] pt-4 text-base font-medium"><span>Total</span><span>{money(total)}</span></div></div>
          <Link href="/cart" className="mt-6 inline-block text-sm underline">Return to cart</Link>
        </div>
      </aside>
    </div>
    <SiteFooter />
    <Newsletter />
  </main>
}
