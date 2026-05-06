"use client"

import * as React from "react"
import Link from "next/link"
import { Package, ShieldCheck, Truck, User } from "lucide-react"

import { Reveal } from "@/components/techland/motion"

const orders = [
  { id: "TL-18421", status: "Shipped", eta: "Arrives tomorrow", total: "$2,348" },
  { id: "TL-17602", status: "Delivered", eta: "Delivered", total: "$199" },
]

const trackingSteps = [
  { label: "Order placed", Icon: Package, done: true },
  { label: "In transit", Icon: Truck, done: true },
  { label: "Delivered", Icon: ShieldCheck, done: false },
] as const

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
            <User className="size-5 text-muted-foreground" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
            <p className="text-sm text-muted-foreground">Track orders and manage your preferences.</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Order tracking */}
        <Reveal className="rounded-[16px] border border-border bg-card p-6">
          <div className="text-sm font-bold uppercase tracking-widest text-[color:var(--tech-cta)]">
            Shipment Status
          </div>
          <div className="mt-4 flex items-center justify-between">
            {trackingSteps.map((step, i) => {
              const Icon = step.Icon
              return (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        step.done
                          ? "border-[color:var(--tech-cta)] bg-[color:var(--tech-cta)]/10"
                          : "border-border bg-background"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${
                          step.done ? "text-[color:var(--tech-cta)]" : "text-muted-foreground"
                        }`}
                        aria-hidden
                      />
                    </div>
                    <span className="text-center text-xs font-medium text-muted-foreground">
                      {step.label}
                    </span>
                  </div>
                  {i < trackingSteps.length - 1 && (
                    <div
                      className={`mb-5 h-[2px] flex-1 mx-2 ${
                        trackingSteps[i + 1].done ? "bg-[color:var(--tech-cta)]" : "bg-border"
                      }`}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </Reveal>

        {/* Recent orders */}
        <Reveal className="rounded-[16px] border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold uppercase tracking-widest text-[color:var(--tech-cta)]">
              Recent Orders
            </div>
            <Link href="/products" className="text-xs text-muted-foreground hover:text-foreground">
              Shop again →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-[10px] border border-border bg-background px-4 py-3"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">{o.id}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        o.status === "Delivered" ? "bg-green-500" : "bg-[color:var(--tech-cta)]"
                      }`}
                    />
                    {o.status} · {o.eta}
                  </div>
                </div>
                <div className="text-sm font-bold text-foreground">{o.total}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
