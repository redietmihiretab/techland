"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Star } from "lucide-react"

import { formatPrice, type Product } from "@/lib/products"
import { resolveImageSrc } from "@/lib/resolve-image-src"

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const images = product.images.slice(0, 3)
  const dots = images.length
  const [activeIndex, setActiveIndex] = React.useState(0)
  const rafRef = React.useRef<number | null>(null)
  const nextIndexRef = React.useRef(0)

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : null
  const savingsPct =
    savings && product.originalPrice
      ? Math.round((savings / product.originalPrice) * 100)
      : null

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]">
      {/* ── Image ── */}
      <div className="relative shrink-0">
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden bg-muted"
            onPointerMove={(e) => {
              if (dots <= 1) return
              const rect = e.currentTarget.getBoundingClientRect()
              const next = Math.min(
                dots - 1,
                Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * dots))
              )
              if (nextIndexRef.current === next) return
              nextIndexRef.current = next
              if (rafRef.current != null) return
              rafRef.current = window.requestAnimationFrame(() => {
                rafRef.current = null
                setActiveIndex(nextIndexRef.current)
              })
            }}
            onPointerLeave={() => {
              nextIndexRef.current = 0
              if (rafRef.current != null) {
                window.cancelAnimationFrame(rafRef.current)
                rafRef.current = null
              }
              setActiveIndex(0)
            }}
          >
            {images.map((img, idx) => (
              <Image
                key={img.src + idx}
                src={resolveImageSrc(img.src, { seed: `${product.id}:${idx}` })}
                alt={img.alt}
                fill
                priority={priority && idx === 0}
                sizes="(max-width: 768px) 50vw, 25vw"
                className={
                  "object-cover transition-all duration-500 transform-gpu group-hover:scale-[1.04] " +
                  (idx === activeIndex ? "opacity-100" : "opacity-0")
                }
              />
            ))}
          </div>
        </Link>

        {/* Savings badge */}
        {savingsPct && savingsPct >= 5 ? (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Save {savingsPct}%
          </div>
        ) : null}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <div className="line-clamp-2 text-base font-bold leading-snug text-foreground hover:text-[color:var(--tech-cta)]">
            {product.name}
          </div>
        </Link>

        {/* Description - 2 lines with ellipsis */}
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>

        {/* Rating - Single Star Style */}
        <div className="mt-auto flex items-center gap-1 text-xs">
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
          <span className="font-bold text-foreground">{product.rating || "4.4"}</span>
          <span className="text-muted-foreground">
            (
            {product.reviewCount >= 1000
              ? (product.reviewCount / 1000).toFixed(1) + "K"
              : product.reviewCount}
            )
          </span>
        </div>

        {/* Price block */}
        <div className="mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tabular-nums text-foreground">
              {formatPrice(product.price)}
            </span>
            <span
              className={
                "text-xs text-muted-foreground line-through " +
                (savings && product.originalPrice ? "opacity-100" : "opacity-0")
              }
            >
              {formatPrice(product.originalPrice ?? product.price)}
            </span>
          </div>
          <div
            className={
              "text-[10px] font-semibold text-green-600 dark:text-green-400 min-h-[14px] " +
              (savings ? "opacity-100" : "opacity-0")
            }
          >
            Save {formatPrice(savings ?? 0)}
          </div>
        </div>
      </div>
    </div>
  )
}
