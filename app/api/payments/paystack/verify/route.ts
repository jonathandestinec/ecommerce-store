import { NextResponse } from 'next/server'
import { confirmOrderPayment, setOrderFailed } from '@/lib/orders'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  const signedReference = new URL(request.url).searchParams.get('reference') || ''
  if (!secret || !signedReference) return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 400 })

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(signedReference)}`, {
      headers: { Authorization: `Bearer ${secret}` }, cache: 'no-store',
    })
    const result = await response.json() as { status?: boolean; message?: string; data?: { status?: string; reference?: string; amount?: number; currency?: string; customer?: { email?: string } } }
    const transaction = result.data
    if (!response.ok || !result.status || !transaction) return NextResponse.json({ error: result.message || 'Could not verify this payment.' }, { status: 502 })
    if (transaction.reference !== signedReference) return NextResponse.json({ error: 'Payment reference does not match.' }, { status: 400 })
    if (transaction.status !== 'success') {
      if (transaction.status === 'failed' || transaction.status === 'abandoned') {
        await setOrderFailed(signedReference)
      }
      return NextResponse.json({ paid: false, status: transaction.status ?? 'pending' })
    }

    const resultData = await confirmOrderPayment({
      reference: signedReference,
      status: transaction.status,
      amount: transaction.amount ?? 0,
      currency: transaction.currency ?? '',
      email: transaction.customer?.email ?? '',
    })
    return NextResponse.json(resultData)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to confirm this order.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
