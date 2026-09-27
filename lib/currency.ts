export const formatNaira = (amount: number) => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
}).format(amount)

export const FREE_SHIPPING_THRESHOLD = 99_676 // $75 converted at ₦1,329.0138 per USD.
export const SHIPPING_FEE = 10_632 // $8 converted at the same rate.
export const GIFT_WRAP_FEE = 13_290 // $10 converted at the same rate.
