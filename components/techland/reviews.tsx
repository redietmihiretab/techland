"use client"

import { Star } from "lucide-react"

import { Reveal } from "@/components/techland/motion"

const sample = [
  {
    name: "Jordan K.",
    rating: 5,
    text: "Ridiculously fast checkout and the build quality is unreal. Thermals are tuned perfectly.",
  },
  {
    name: "Mina S.",
    rating: 5,
    text: "The OLED is insane. Bright, crisp, and color-accurate. Packaging felt premium too.",
  },
  {
    name: "Andre P.",
    rating: 4,
    text: "Super clean experience. Quick view is the perfect feature when comparing specs.",
  },
]

export function Reviews() {
  return (
    <section className="mt-10">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Reviews</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Loved by performance buyers
          </h2>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {sample.map((r) => (
          <Reveal
            key={r.name}
            className="rounded-3xl border border-border/60 bg-card/40 p-5 shadow-sm"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4"
                  fill={i < r.rating ? "currentColor" : "transparent"}
                  style={{
                    color: i < r.rating ? "var(--tech-cta)" : "color-mix(in oklch, var(--foreground) 22%, transparent)",
                  }}
                />
              ))}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{r.text}</div>
            <div className="mt-4 text-sm font-semibold">{r.name}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

