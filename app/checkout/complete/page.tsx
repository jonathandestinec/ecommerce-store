'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useStore } from '@/components/store-provider'
import { CopyId } from '@/components/ui/copy-id'

function PaymentResult() {
  const params = useSearchParams()
  const reference = params.get('reference')
  const clearCart = useStore((state) => state.clearCart)
  const [message, setMessage] = useState(reference ? 'Verifying your payment…' : 'No payment reference was provided.')
  const [paid, setPaid] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

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
          setOrderId(result.orderId ?? null)
          setMessage('Your payment was successful. Your order is confirmed.')
        }
        else setMessage(`Payment status: ${result.status || 'pending'}. Please check again shortly.`)
      })
      .catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : 'Unable to verify payment.') })
    return () => { active = false }
  }, [reference, clearCart])

  return <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
    <h1 className="font-serif text-3xl text-[#484848]">{paid ? 'Thank you!' : 'Payment update'}</h1>
    <p role="status" className="mt-4 text-sm text-[#777]">{message}</p>
    {paid && (
      <div className="mt-4 flex max-w-full flex-col items-center gap-2 rounded-[10px] border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-xs text-[#555]">
        {orderId && <span className="flex max-w-full items-center gap-1.5">Order <CopyId value={orderId} label="Order ID" /></span>}
        {reference && <span className="flex max-w-full items-center gap-1.5">Receipt <CopyId value={reference} label="Payment reference" className="max-w-60" /></span>}
      </div>
    )}
    <Link href={paid ? '/' : '/cart'} className="mt-7 rounded-[10px] bg-black px-7 py-3 text-sm text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] transition hover:bg-[#333]">{paid ? 'Continue shopping' : 'Return to cart'}</Link>
  </main>
}

export default function CheckoutCompletePage() {
  return <Suspense fallback={<main className="grid min-h-[55vh] place-items-center text-sm text-[#777]">Verifying payment…</main>}><PaymentResult /></Suspense>
}
