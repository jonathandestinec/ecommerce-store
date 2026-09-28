'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createStore, useStore as useZustandStore, type StoreApi } from 'zustand'
import type { Product } from '@/types'
import { products } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface StoreState {
  cart: CartItem[]
  cartOpen: boolean
  giftWrap: boolean
  cartCount: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  setGiftWrap: (enabled: boolean) => void
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void
  setQuantity: (productId: number | string, size: string, color: string, quantity: number) => void
  removeFromCart: (productId: number | string, size: string, color: string) => void
  clearCart: () => void
  hydrateCart: (cart: CartItem[]) => void
}

const storageKey = 'fasco-cart'
const StoreContext = createContext<StoreApi<StoreState> | null>(null)

function totals(cart: CartItem[]) {
  return {
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  }
}

function makeStore() {
  return createStore<StoreState>()((set) => ({
    cart: [], cartOpen: false, giftWrap: false, cartCount: 0, subtotal: 0,
    openCart: () => set({ cartOpen: true }),
    closeCart: () => set({ cartOpen: false }),
    setGiftWrap: (giftWrap) => set({ giftWrap }),
    hydrateCart: (cart) => {
      const availableCart = cart.filter((item) => item.product.saleStatus !== 'Sold')
      set({ cart: availableCart, ...totals(availableCart) })
    },
    addToCart: (product, quantity = 1, size = 'M', color = product.colors?.[0] ?? '#000000') => set((state) => {
      if (product.saleStatus === 'Sold') return state
      const existing = state.cart.find((item) => item.product.id === product.id && item.size === size && item.color === color)
      const cart = existing
        ? state.cart.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
        : [...state.cart, { product, quantity, size, color }]
      return { cart, ...totals(cart) }
    }),
    setQuantity: (productId, size, color, quantity) => set((state) => {
      const cart = state.cart.map((item) => item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity: Math.max(1, quantity) } : item)
      return { cart, ...totals(cart) }
    }),
    removeFromCart: (productId, size, color) => set((state) => {
      const cart = state.cart.filter((item) => !(item.product.id === productId && item.size === size && item.color === color))
      return { cart, ...totals(cart) }
    }),
    clearCart: () => set({ cart: [], cartCount: 0, subtotal: 0 }),
  }))
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => makeStore())

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const storedCart = JSON.parse(saved) as CartItem[]
        const cart = storedCart.map((item) => {
          const currentProduct = products.find((product) => product.id === item.product.id)
          return currentProduct ? { ...item, product: currentProduct } : item
        })
        store.getState().hydrateCart(cart)
      }
    } catch {
      localStorage.removeItem(storageKey)
    }
    return store.subscribe((state, previous) => {
      if (state.cart !== previous.cart) {
        try { localStorage.setItem(storageKey, JSON.stringify(state.cart)) } catch { /* In-memory cart remains available. */ }
      }
    })
  }, [store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore<T = StoreState>(selector: (state: StoreState) => T = ((state) => state as unknown as T)) {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside StoreProvider')
  return useZustandStore(store, selector)
}
