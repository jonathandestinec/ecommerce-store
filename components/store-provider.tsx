'use client'

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import type { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface StoreContextValue {
  cart: CartItem[]
  cartCount: number
  subtotal: number
  cartOpen: boolean
  giftWrap: boolean
  openCart: () => void
  closeCart: () => void
  setGiftWrap: (enabled: boolean) => void
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void
  setQuantity: (productId: number, size: string, color: string, quantity: number) => void
  removeFromCart: (productId: number, size: string, color: string) => void
  clearCart: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)
const storageKey = 'fasco-cart'
let cartSnapshot: CartItem[] = []
let initialized = false
const listeners = new Set<() => void>()
const serverCartSnapshot: CartItem[] = []

function getCartSnapshot() {
  if (typeof window !== 'undefined' && !initialized) {
    initialized = true
    const storedValue = localStorage.getItem(storageKey)
    try {
      cartSnapshot = storedValue ? JSON.parse(storedValue) as CartItem[] : []
    } catch {
      cartSnapshot = []
      localStorage.removeItem(storageKey)
    }
  }
  return cartSnapshot
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      initialized = false
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function updateCart(update: (current: CartItem[]) => CartItem[]) {
  cartSnapshot = update(getCartSnapshot())
  const value = JSON.stringify(cartSnapshot)
  try {
    localStorage.setItem(storageKey, value)
  } catch {
    // Keep the in-memory cart usable when browser storage is unavailable.
  }
  listeners.forEach((listener) => listener())
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => serverCartSnapshot)
  const [cartOpen, setCartOpen] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)

  const addToCart = useCallback((product: Product, quantity = 1, size = 'M', color = product.colors?.[0] ?? '#000000') => {
    updateCart((current) => {
      const existing = current.find((item) => item.product.id === product.id && item.size === size && item.color === color)
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
      return [...current, { product, quantity, size, color }]
    })
  }, [])

  const setQuantity = useCallback((productId: number, size: string, color: string, quantity: number) => {
    updateCart((current) => current.map((item) => item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity: Math.max(1, quantity) } : item))
  }, [])

  const removeFromCart = useCallback((productId: number, size: string, color: string) => {
    updateCart((current) => current.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)))
  }, [])

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    cartOpen,
    giftWrap,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    setGiftWrap,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart: () => updateCart(() => []),
  }), [cart, cartOpen, giftWrap, addToCart, setQuantity, removeFromCart])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
