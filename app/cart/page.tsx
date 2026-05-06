"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CreditCard, Package, ShieldCheck } from "lucide-react"

import { Reveal, motion } from "@/components/techland/motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice, type Product } from "@/lib/products"
import { getAllProductsClient } from "@/lib/products-client"

export default function CartPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"cart" | "shipping" | "payment">("cart")
  const { lines, setQty, remove } = useCart()
  const [allProducts, setAllProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    setAllProducts(getAllProductsClient())
  }, [])

  const items = lines
    .map((c) => {
      const product = allProducts.find((p) => p.id === c.productId)
      if (!product) return null
      return { product, qty: c.qty }
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const shipping = subtotal > 999 ? 0 : 24
  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
        </div>
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/products">
          Continue shopping →
        </Link>
      </Reveal>

      <div className="mt-8 grid items-start gap-6 lg:h-[calc(100vh-140px)] lg:grid-cols-[1.2fr_0.8fr] lg:overflow-hidden">
        <Reveal className="tech-scroll rounded-[5px] border border-border bg-background p-5 lg:h-full lg:overflow-y-auto">
          <div className="flex items-center gap-2">
            {[
              { id: "cart", label: "Cart" },
              { id: "shipping", label: "Shipping" },
              { id: "payment", label: "Payment" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id as typeof step)}
                className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span className={step === s.id ? "text-foreground" : undefined}>{s.label}</span>
                {step === s.id ? (
                  <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-px bg-foreground" />
                ) : null}
              </button>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            {step === "cart" ? (
              <div className="space-y-3">
                {items.length ? (
                  items.map((i) => (
                  <div
                    key={i.product.id}
                    className="flex items-start justify-between gap-4 border-t border-border pt-4"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{i.product.name}</div>
                      <div className="text-sm text-muted-foreground">{i.product.tagline}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatPrice(i.product.price)} each</span>
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            className="h-7 rounded-[5px] border border-border bg-background px-2 text-foreground"
                            onClick={() => setQty(i.product.id, i.qty - 1)}
                            aria-label={`Decrease quantity of ${i.product.name}`}
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center tabular-nums text-foreground">
                            {i.qty}
                          </span>
                          <button
                            type="button"
                            className="h-7 rounded-[5px] border border-border bg-background px-2 text-foreground"
                            onClick={() => setQty(i.product.id, i.qty + 1)}
                            aria-label={`Increase quantity of ${i.product.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => remove(i.product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      {formatPrice(i.product.price * i.qty)}
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                    Your cart is empty. Add a product to get started.
                  </div>
                )}
                <Button
                  className="h-11 w-full rounded-[5px]"
                  onClick={() => setStep("shipping")}
                  disabled={!items.length}
                >
                  Continue to shipping <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            ) : step === "shipping" ? (
              <div className="space-y-3">
                <div className="border-t border-border pt-4">
                  <div className="text-sm font-semibold">Delivery</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Express shipping with tracking. Free over $999.
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    placeholder="Full name"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    placeholder="Email"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    placeholder="Address"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
                  />
                </div>
                <Button className="h-11 w-full rounded-[5px]" onClick={() => setStep("payment")}>
                  Continue to payment <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Secure payment</div>
                      <div className="text-sm text-muted-foreground">
                        Encrypted checkout with fraud protection.
                      </div>
                    </div>
                    <ShieldCheck className="size-5 text-foreground" />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    placeholder="Card number"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
                  />
                  <input
                    placeholder="MM/YY"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    placeholder="CVC"
                    className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="h-11 w-full rounded-[5px]">
                  <CreditCard className="mr-2 size-4" />
                  Place order
                </Button>
              </div>
            )}
          </motion.div>
        </Reveal>

        <div className="h-fit rounded-[5px] border border-border bg-background p-5 lg:self-start">
          <div className="text-sm font-semibold">Order summary</div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="h-px bg-border/60" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-semibold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-foreground" /> Tracking included
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-foreground" /> Secure checkout
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <Button asChild className="h-11 w-full rounded-[5px]">
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

