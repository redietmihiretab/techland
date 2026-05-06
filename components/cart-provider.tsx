"use client"

import * as React from "react"

export type CartLine = { productId: string; qty: number }

type CartContextValue = {
  lines: CartLine[]
  count: number
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "techland-cart"

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((x: any) => ({ productId: String(x.productId), qty: Number(x.qty) }))
      .filter((x) => x.productId && Number.isFinite(x.qty) && x.qty > 0)
  } catch {
    return []
  }
}

function writeStoredCart(lines: CartLine[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([])

  React.useEffect(() => {
    setLines(readStoredCart())
  }, [])

  const api = React.useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (productId, qty = 1) => {
      setLines((prev) => {
        const nextQty = Math.max(1, Math.floor(qty))
        const idx = prev.findIndex((l) => l.productId === productId)
        const next =
          idx >= 0
            ? prev.map((l, i) =>
                i === idx ? { ...l, qty: l.qty + nextQty } : l
              )
            : [...prev, { productId, qty: nextQty }]
        writeStoredCart(next)
        return next
      })
    }

    const setQty: CartContextValue["setQty"] = (productId, qty) => {
      setLines((prev) => {
        const nextQty = Math.max(0, Math.floor(qty))
        const next =
          nextQty === 0
            ? prev.filter((l) => l.productId !== productId)
            : prev.map((l) => (l.productId === productId ? { ...l, qty: nextQty } : l))
        writeStoredCart(next)
        return next
      })
    }

    const remove: CartContextValue["remove"] = (productId) => {
      setLines((prev) => {
        const next = prev.filter((l) => l.productId !== productId)
        writeStoredCart(next)
        return next
      })
    }

    const clear: CartContextValue["clear"] = () => {
      setLines(() => {
        writeStoredCart([])
        return []
      })
    }

    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      add,
      setQty,
      remove,
      clear,
    }
  }, [lines])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

