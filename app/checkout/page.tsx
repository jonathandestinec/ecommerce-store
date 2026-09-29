'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useStore } from '@/components/store-provider'
import Newsletter from '@/components/newsletter'
import SiteFooter from '@/components/site-footer'
import { formatNaira, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, GIFT_WRAP_FEE } from '@/lib/currency'

const money = formatNaira

export default function CheckoutPage() {
  const { cart, subtotal, giftWrap } = useStore()
  const [message, setMessage] = useState('')
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping + (giftWrap ? GIFT_WRAP_FEE : 0)

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/payments/paystack/initialize', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'), firstName: formData.get('firstName'), lastName: formData.get('lastName'),
          address: formData.get('address'), city: formData.get('city'), postalCode: formData.get('postalCode'), country: formData.get('country'),
          cart: cart.map(({ product, quantity, size, color }) => ({ productId: product.id, quantity, size, color })), giftWrap,
        }),
      })
      const result = await response.json() as { authorizationUrl?: string; error?: string }
      if (!response.ok || !result.authorizationUrl) throw new Error(result.error || 'Could not start checkout.')
      window.location.assign(result.authorizationUrl)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not start checkout. Please try again.')
    }
  }

  return <main>
    <h1 className="my-8 text-center font-serif text-3xl">Checkout</h1>
    <div className="grid border-y border-[#ddd] lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submitOrder} className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex items-baseline justify-between"><h2 className="font-serif text-2xl">Contact</h2><p className="text-xs text-[#888]">Have an account? <Link href="/login" className="text-blue-600 underline">Sign in</Link></p></div>
        <label className="mt-4 block"><span className="sr-only">Email address</span><input name="email" type="email" required autoComplete="email" placeholder="Email address" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm outline-none focus:border-black" /></label>

        <h2 className="mt-8 font-serif text-2xl">Delivery</h2>
        <div className="mt-4 grid gap-3">
          <label><span className="sr-only">Country or region</span><select name="country" defaultValue="" required className="h-11 w-full rounded border border-[#ccc] bg-white px-3 text-sm"><option value="" disabled>Country / Region</option><option>Nigeria</option><option>United States</option><option>United Kingdom</option><option>Canada</option></select></label>
          <div className="grid grid-cols-2 gap-3"><label><span className="sr-only">First name</span><input name="firstName" required autoComplete="given-name" placeholder="First name" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label><label><span className="sr-only">Last name</span><input name="lastName" required autoComplete="family-name" placeholder="Last name" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label></div>
          <label><span className="sr-only">Address</span><input name="address" required autoComplete="street-address" placeholder="Address" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label>
          <div className="grid grid-cols-2 gap-3"><label><span className="sr-only">City</span><input name="city" required autoComplete="address-level2" placeholder="City" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label><label><span className="sr-only">Postal code</span><input name="postalCode" required autoComplete="postal-code" placeholder="Postal Code" className="h-11 w-full rounded border border-[#ccc] px-3 text-sm" /></label></div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-xs text-[#777]"><input type="checkbox" className="size-4 accent-black" /> Save this information for next time</label>

        <h2 className="mt-8 font-serif text-2xl">Payment</h2>
        <p className="mt-3 text-sm leading-6 text-[#777]">You’ll complete your payment securely with Paystack. Your card details are entered on Paystack’s checkout page.</p>
        <button disabled={!cart.length} type="submit" className="mt-5 h-12 w-full rounded-md bg-black text-sm text-white shadow-md transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50">Continue to Paystack · {money(total)}</button>
        {message && <p role="status" className="mt-3 rounded border border-[#ddd] bg-white p-3 text-sm text-[#555]">{message}</p>}
      </form>

      <aside className="min-h-[420px] bg-[#f7f7f7] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-xl">
          {cart.length ? <div className="space-y-4 border-b border-[#ddd] pb-5">{cart.map(({ product, quantity, color, size }) => <div key={`${product.id}-${color}-${size}`} className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 bg-white"><Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-cover" /><span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#555] text-[10px] text-white">{quantity}</span></div>
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-[#777]">{size} · {color}</p></div><span className="text-sm">{money(product.price * quantity)}</span>
          </div>)}</div> : <div className="border-b border-[#ddd] pb-5 text-sm text-[#777]">Your cart is empty. <Link href="/fashion" className="underline">Browse products</Link></div>}
          <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>{giftWrap && <div className="flex justify-between"><span>Gift wrap</span><span>{money(GIFT_WRAP_FEE)}</span></div>}<div className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div><div className="flex justify-between border-t border-[#ddd] pt-4 text-base font-medium"><span>Total</span><span>{money(total)}</span></div></div>
          <Link href="/cart" className="mt-6 inline-block text-sm underline">Return to cart</Link>
        </div>
      </aside>
    </div>
    <SiteFooter />
    <Newsletter />
    
  </main>
}
