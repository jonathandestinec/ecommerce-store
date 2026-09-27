import { createAdminClient } from '@/lib/supabase-admin'

export type DeliveryAddress = {
  address: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export type OrderItemRecord = {
  id: number
  order_id: string
  product_id: number
  product_name: string
  product_image: string
  unit_price_kobo: number
  quantity: number
  size: string
  color: string
}

export type OrderRecord = {
  id: string
  payment_reference: string
  user_id: string | null
  customer_email: string
  customer_name: string
  delivery_address: DeliveryAddress
  currency: 'NGN'
  subtotal_kobo: number
  shipping_kobo: number
  gift_wrap_kobo: number
  total_kobo: number
  status: 'pending' | 'paid' | 'failed' | 'reversed'
  paid_at: string | null
}

export type NewOrder = Omit<OrderRecord, 'id' | 'status' | 'paid_at'>
export type NewOrderItem = Omit<OrderItemRecord, 'id' | 'order_id'>

export async function createOrder(order: NewOrder, items: NewOrderItem[]) {
  const admin = createAdminClient()
  const { data: created, error } = await admin.from('orders').insert(order).select('*').single()
  if (error) throw new Error('Could not save the order before payment.')

  const { error: itemError } = await admin.from('order_items').insert(items.map((item) => ({ ...item, order_id: created.id })))
  if (itemError) {
    await admin.from('orders').delete().eq('id', created.id)
    throw new Error('Could not save the items for this order.')
  }
  return created as OrderRecord
}

export async function setOrderFailed(paymentReference: string) {
  const admin = createAdminClient()
  await admin.from('orders').update({ status: 'failed', updated_at: new Date().toISOString() })
    .eq('payment_reference', paymentReference).eq('status', 'pending')
}

export async function confirmOrderPayment(input: {
  reference: string
  status: string
  amount: number
  currency: string
  email: string
}) {
  const admin = createAdminClient()
  const { data: orderData, error } = await admin.from('orders').select('*').eq('payment_reference', input.reference).maybeSingle()
  if (error || !orderData) throw new Error('No order matches this payment reference.')
  let order = orderData as OrderRecord

  if (input.status !== 'success' || input.currency !== order.currency || input.amount !== order.total_kobo || input.email.trim().toLowerCase() !== order.customer_email.toLowerCase()) {
    throw new Error('The payment details do not match the saved order.')
  }
  if (order.status === 'reversed' || order.status === 'failed') throw new Error('This order is no longer awaiting payment.')

  if (order.status === 'pending') {
    const { data: updated, error: updateError } = await admin.from('orders').update({ status: 'paid', paid_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', order.id).eq('status', 'pending').select('*').maybeSingle()
    if (updateError) throw new Error('Payment was verified, but the order could not be updated.')
    if (updated) order = updated as OrderRecord
    else {
      const { data: latest } = await admin.from('orders').select('*').eq('id', order.id).maybeSingle()
      if (!latest || latest.status !== 'paid') throw new Error('This order is no longer awaiting payment.')
      order = latest as OrderRecord
    }
  }

  return { paid: true, orderId: order.id }
}
