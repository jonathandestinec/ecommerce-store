import { createHmac, randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { products } from '@/data/products'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, GIFT_WRAP_FEE } from '@/lib/currency'
import { createOrder, setOrderFailed } from '@/lib/orders'
import { createAdminClient } from '@/lib/supabase-admin'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'nodejs'

type CheckoutLine = { productId: number; quantity: number; size: string; color: string }
type CheckoutBody = {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  cart?: CheckoutLine[]
  giftWrap?: boolean
}

function clean(value: unknown, maxLength = 160) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 503 })
  try { createAdminClient() } catch { return NextResponse.json({ error: 'Order storage is not configured yet.' }, { status: 503 }) }

  try {
    const body = await request.json() as CheckoutBody
    const email = clean(body.email, 254)
    const firstName = clean(body.firstName, 80)
    const lastName = clean(body.lastName, 80)
    const customerName = `${firstName} ${lastName}`.trim()
    const deliveryAddress = {
      address: clean(body.address, 240), city: clean(body.city, 120),
      postalCode: clean(body.postalCode, 40), country: clean(body.country, 80), phone: clean(body.phone, 40),
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (!firstName || !lastName || !deliveryAddress.address || !deliveryAddress.city || !deliveryAddress.postalCode || !deliveryAddress.country) return NextResponse.json({ error: 'Complete all required delivery details.' }, { status: 400 })
    if (!Array.isArray(body.cart) || body.cart.length === 0 || body.cart.length > 30) return NextResponse.json({ error: 'Your cart is empty or contains too many items.' }, { status: 400 })

    const lines = body.cart.map((line) => {
      const product = products.find((item) => item.id === line.productId)
      if (!product || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 25) throw new Error('Your cart contains an invalid item.')
      if (product.saleStatus === 'Sold') throw new Error(`${product.name} is sold out and can no longer be purchased.`)
      const size = clean(line.size, 12)
      const color = clean(line.color, 24)
      if (!['M', 'L', 'XL', 'XXL'].includes(size) || !product.colors?.some((candidate) => candidate.toLowerCase() === color.toLowerCase())) throw new Error('One of the selected product options is no longer available.')
      return { product, quantity: line.quantity, size, color }
    })

    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
    const giftWrap = Boolean(body.giftWrap)
    const giftWrapAmount = giftWrap ? GIFT_WRAP_FEE : 0
    const total = subtotal + shipping + giftWrapAmount
    const amount = Math.round(total * 100)
    if (amount < 5000) return NextResponse.json({ error: 'Paystack NGN payments must be at least ₦50.' }, { status: 400 })

    const currency = 'NGN'
    const reference = `fasco_${Date.now()}_${randomUUID().replaceAll('-', '').slice(0, 12)}`
    const signature = createHmac('sha256', secret).update(`${reference}|${email}|${amount}|${currency}`).digest('hex')
    const signedReference = `${reference}_${signature}`
    let userId: string | null = null
    try {
      const authClient = createClient(await cookies())
      const { data } = await authClient.auth.getUser()
      userId = data.user?.id ?? null
    } catch { /* Guest checkout remains available. */ }

    const order = await createOrder({
      payment_reference: signedReference, user_id: userId, customer_email: email, customer_name: customerName,
      delivery_address: deliveryAddress, currency, subtotal_kobo: Math.round(subtotal * 100),
      shipping_kobo: Math.round(shipping * 100), gift_wrap_kobo: Math.round(giftWrapAmount * 100), total_kobo: amount,
    }, lines.map(({ product, quantity, size, color }) => ({
      product_id: product.id, product_name: product.name, product_image: product.images[0],
      unit_price_kobo: Math.round(product.price * 100), quantity, size, color,
    })))

    const origin = new URL(request.url).origin
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount, currency, reference: signedReference, callback_url: `${origin}/checkout/complete`, metadata: { order_id: order.id, gift_wrap: giftWrap } }),
        cache: 'no-store',
      })
      const result = await response.json() as { status?: boolean; message?: string; data?: { authorization_url?: string } }
      if (!response.ok || !result.status || !result.data?.authorization_url) {
        await setOrderFailed(signedReference)
        return NextResponse.json({ error: result.message || 'Unable to start payment. Please try again.' }, { status: 502 })
      }
      return NextResponse.json({ authorizationUrl: result.data.authorization_url, orderId: order.id })
    } catch {
      await setOrderFailed(signedReference)
      return NextResponse.json({ error: 'Could not connect to Paystack. Please try again.' }, { status: 502 })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start payment.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
