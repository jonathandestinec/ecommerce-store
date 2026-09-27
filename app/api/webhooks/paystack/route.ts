import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { confirmOrderPayment, setOrderFailed } from '@/lib/orders'

export const runtime = 'nodejs'

type PaystackEvent = {
  event?: string
  data?: { reference?: string }
}

function validSignature(rawBody: string, signature: string, secret: string) {
  const expected = createHmac('sha512', secret).update(rawBody).digest('hex')
  const providedBytes = Buffer.from(signature, 'hex')
  const expectedBytes = Buffer.from(expected, 'hex')
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes)
}

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 })
  const rawBody = await request.text()
  const signature = request.headers.get('x-paystack-signature') || ''
  if (!validSignature(rawBody, signature, secret)) return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 })

  let event: PaystackEvent
  try { event = JSON.parse(rawBody) as PaystackEvent } catch { return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 }) }
  const reference = event.data?.reference
  if (!reference) return NextResponse.json({ received: true })

  if (event.event === 'charge.success') {
    const verification = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` }, cache: 'no-store',
    })
    const result = await verification.json() as { status?: boolean; data?: { status?: string; reference?: string; amount?: number; currency?: string; customer?: { email?: string } } }
    const transaction = result.data
    if (!verification.ok || !result.status || transaction?.reference !== reference || transaction.status !== 'success') {
      return NextResponse.json({ error: 'Paystack transaction could not be verified.' }, { status: 502 })
    }
    try {
      await confirmOrderPayment({
        reference,
        status: transaction.status,
        amount: transaction.amount ?? 0,
        currency: transaction.currency ?? '',
        email: transaction.customer?.email ?? '',
      })
    } catch {
      return NextResponse.json({ error: 'Could not reconcile the verified payment with an order.' }, { status: 500 })
    }
  } else if (event.event === 'charge.failed') {
    await setOrderFailed(reference)
  }

  return NextResponse.json({ received: true })
}
