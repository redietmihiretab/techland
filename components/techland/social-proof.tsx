"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { Reveal } from "@/components/techland/motion"

const items = [
  {
    title: "4.8 average rating",
    body: "Checkout was smooth and delivery updates were clear at every step. Great experience.",
    person: "Amina K.",
  },
  {
    title: "Fast support",
    body: "Support replied quickly and helped me pick the right specs without any back-and-forth.",
    person: "Daniel R.",
  },
  {
    title: "Clear returns",
    body: "Return process was straightforward—no hidden steps, just quick confirmation and pickup.",
    person: "Sofia M.",
  },
]

export function SocialProof() {
  return (
    <section className="mt-6">
      <Reveal className="grid gap-4 md:grid-cols-3">
        {items.map((x) => (
          <div key={x.title} className="rounded-[10px] border border-border bg-background p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
                {x.person
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{x.person}</div>
                <div className="text-xs text-muted-foreground">Verified buyer</div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className="size-3 text-[color:var(--tech-cta)]"
                      fill={i < 5 ? "currentColor" : "transparent"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{x.body}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

