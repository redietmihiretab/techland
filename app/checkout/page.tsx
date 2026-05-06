"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Reveal } from "@/components/techland/motion"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Checkout</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Secure, distraction‑free
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Clear fields. Clear pricing. No surprises.
          </div>
        </div>
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/cart">
          Back to cart →
        </Link>
      </Reveal>

      <div className="mt-8 border border-border bg-white p-6 sm:p-8">
        {!submitted && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800 shadow-sm animate-pulse">
            <span className="font-bold">🔥 High Demand:</span> Your items are reserved for 10:00 minutes.
          </div>
        )}
        {submitted ? (
          <div className="space-y-3">
            <div className="text-lg font-semibold">Order placed (demo)</div>
            <div className="text-sm text-muted-foreground">
              Payment is not processed. This page is a UI prototype.
            </div>
            <div className="pt-2">
              <Button asChild className="rounded-full">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <section className="grid gap-3">
              <div className="text-sm font-semibold">Contact</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </section>

            <section className="grid gap-3 border-t border-border pt-6">
              <div className="text-sm font-semibold">Shipping</div>
              <div className="grid gap-2">
                <input
                  required
                  placeholder="Address"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    required
                    placeholder="City"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="State"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="ZIP"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-3 border-t border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold">Payment</div>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4" aria-hidden />
                  Encrypted
                </div>
              </div>
              <div className="grid gap-2">
                <input
                  required
                  placeholder="Card number"
                  inputMode="numeric"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    required
                    placeholder="MM/YY"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="CVC"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                By placing your order, you agree to our terms.
              </div>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 rounded-full px-6">
                Place order
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/*
"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Reveal } from "@/components/techland/motion"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Checkout</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Secure, distraction‑free
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Clear fields. Clear pricing. No surprises.
          </div>
        </div>
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/cart">
          Back to cart →
        </Link>
      </Reveal>

      <div className="mt-8 border border-border bg-white p-6 sm:p-8">
        {submitted ? (
          <div className="space-y-3">
            <div className="text-lg font-semibold">Order placed (demo)</div>
            <div className="text-sm text-muted-foreground">
              Payment is not processed. This page is a UI prototype.
            </div>
            <div className="pt-2">
              <Button asChild className="rounded-full">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <section className="grid gap-3">
              <div className="text-sm font-semibold">Contact</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </section>

            <section className="grid gap-3 border-t border-border pt-6">
              <div className="text-sm font-semibold">Shipping</div>
              <div className="grid gap-2">
                <input
                  required
                  placeholder="Address"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    required
                    placeholder="City"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="State"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="ZIP"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-3 border-t border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold">Payment</div>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4" aria-hidden />
                  Encrypted
                </div>
              </div>
              <div className="grid gap-2">
                <input
                  required
                  placeholder="Card number"
                  inputMode="numeric"
                  className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    required
                    placeholder="MM/YY"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    placeholder="CVC"
                    className="h-11 rounded-2xl border border-border bg-white px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                By placing your order, you agree to our terms.
              </div>
              <Button type="submit" className="h-11 rounded-full px-6">
                Place order
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Lock, ShieldCheck } from "lucide-react";

import { Container } from "@/components/container";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatMoney } from "@/lib/money";
import { getProduct } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clear } = useCart();

  const items = lines
    .map((l) => {
      const product = getProduct(l.slug);
      if (!product) return null;
      return { line: l, product, total: product.price * l.quantity };
    })
    .filter(Boolean) as Array<{
    line: { slug: string; quantity: number };
    product: NonNullable<ReturnType<typeof getProduct>>;
    total: number;
  }>;

  const total = items.reduce((sum, x) => sum + x.total, 0);
  const disabled = items.length === 0;

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Short, readable, and transparent — exactly like the product pages.
          </p>
        </div>
        <Link
          href="/cart"
          className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Back to cart
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <form
          className="grid gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (disabled) return;
            clear();
            router.push("/order/success");
          }}
        >
          <Card>
            <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  Secure checkout (demo)
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  This is a prototype flow — no payment is processed.
                </p>
              </div>
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
            <div className="text-sm font-semibold tracking-tight">Contact</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>First name</Label>
                <Input required />
              </div>
              <div className="grid gap-2">
                <Label>Last name</Label>
                <Input required />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label>Email</Label>
                <Input required type="email" />
              </div>
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
            <div className="text-sm font-semibold tracking-tight">Delivery</div>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label>Address</Label>
                <Input required />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="grid gap-2 sm:col-span-2">
                  <Label>City</Label>
                  <Input required />
                </div>
                <div className="grid gap-2">
                  <Label>ZIP</Label>
                  <Input required />
                </div>
              </div>
            </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={disabled} className="gap-2">
            <Lock className="h-4 w-4" aria-hidden />
            Place order
          </Button>
        </form>

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="text-sm font-semibold tracking-tight">Summary</div>
          <div className="mt-4 grid gap-3 text-sm">
            {items.length === 0 ? (
              <div className="text-muted-foreground">
                No items yet. Add a system first.
              </div>
            ) : (
              items.map(({ product, line, total: lineTotal }) => (
                <div key={product.slug} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-muted-foreground">
                      Qty {line.quantity} • {formatMoney(product.price)} each
                    </div>
                  </div>
                  <div className="font-medium tabular-nums">{formatMoney(lineTotal)}</div>
                </div>
              ))
            )}
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold tabular-nums">{formatMoney(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
*/
