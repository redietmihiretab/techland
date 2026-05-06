"use client"

import Image from "next/image"
import Link from "next/link"
import { X, ShoppingCart } from "lucide-react"
import * as React from "react"
import { createPortal } from "react-dom"

import { Button } from "@/components/ui/button"
import { motion } from "@/components/techland/motion"
import { formatPrice, type Product } from "@/lib/products"
import { resolveImageSrc } from "@/lib/resolve-image-src"

export function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product | null
  open: boolean
  onClose: () => void
}) {
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (typeof document === "undefined") return null
  if (!open || !product) return null

  const primary = product.images[0]

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="absolute inset-0 grid place-items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.21, 0.61, 0.35, 1] }}
          className="w-full max-w-3xl overflow-hidden border border-border bg-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${product.name}`}
        >
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative aspect-[16/12] md:aspect-auto md:min-h-[420px]">
              <Image
                src={resolveImageSrc(primary.src, { seed: `${product.id}:primary` })}
                alt={primary.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="relative p-5 md:p-6">
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-4 rounded-full"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>

              <div className="text-sm text-muted-foreground">{product.brand}</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">
                {product.name}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {product.tagline}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-2xl font-semibold">{formatPrice(product.price)}</div>
                  {product.originalPrice ? (
                    <div className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  ) : null}
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.reviewCount.toLocaleString()} reviews
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {product.highlights.slice(0, 4).map((h) => (
                  <div key={h} className="border-t border-border pt-2 text-sm text-muted-foreground">
                    {h}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button variant="cta" className="rounded-full sm:flex-1">
                  <ShoppingCart className="mr-2 size-4" />
                  Add to cart
                </Button>
                <Button variant="outline" className="rounded-full sm:flex-1" asChild>
                  <Link href={`/products/${product.slug}`}>View details</Link>
                </Button>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">
                Ships in 1–2 days • Free returns • Secure checkout
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  )
}

