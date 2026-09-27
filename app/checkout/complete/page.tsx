'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useStore } from '@/components/store-provider'

function PaymentResult() {
  const params = useSearchParams()
  const reference = params.get('reference')
  const clearCart = useStore((state) => state.clearCart)
  const [message, setMessage] = useState(reference ? 'Verifying your payment…' : 'No payment reference was provided.')
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    let active = true
    if (!reference) return
    fetch(`/api/payments/paystack/verify?reference=${encodeURIComponent(reference)}`, { cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json() as { paid?: boolean; orderId?: string; status?: string; error?: string }
        if (!response.ok) throw new Error(result.error || 'Unable to verify payment.')
        if (!active) return
        if (result.paid) {
          clearCart()
          setPaid(true)
          setMessage(`Your payment was successful. Order ${result.orderId?.slice(0, 8).toUpperCase()} is confirmed.`)
        }
        else setMessage(`Payment status: ${result.status || 'pending'}. Please check again shortly.`)
      })
      .catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : 'Unable to verify payment.') })
    return () => { active = false }
  }, [reference, clearCart])

  return <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
    <h1 className="font-serif text-3xl">{paid ? 'Thank you!' : 'Payment update'}</h1>
    <p role="status" className="mt-4 text-sm text-[#777]">{message}</p>
    <Link href={paid ? '/' : '/cart'} className="mt-7 rounded bg-black px-7 py-3 text-sm text-white">{paid ? 'Continue shopping' : 'Return to cart'}</Link>
  </main>
}

export default function CheckoutCompletePage() {
  return <Suspense fallback={<main className="grid min-h-[55vh] place-items-center text-sm text-[#777]">Verifying payment…</main>}><PaymentResult /></Suspense>
}
