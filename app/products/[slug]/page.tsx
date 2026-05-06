"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronRight,
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react"

import { Reveal } from "@/components/techland/motion"
import { AddToCartButton } from "@/components/techland/add-to-cart-button"
import { useCart } from "@/components/cart-provider"
import { ProductCard } from "@/components/techland/product-card"
import { ProductGallery } from "@/components/techland/product-gallery"
import { Button } from "@/components/ui/button"
import { formatPrice, type Product } from "@/lib/products"
import { getAllProductsClient, getProductBySlugClient } from "@/lib/products-client"
import { cn } from "@/lib/utils"

type Tab = "overview" | "specs" | "reviews"

const trustItems = [
  { Icon: Truck, text: "Free shipping on orders over $999" },
  { Icon: ShieldCheck, text: "2-year warranty included" },
  { Icon: RotateCcw, text: "30-day hassle-free returns" },
  { Icon: Headphones, text: "24/7 expert support" },
]

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const [product, setProduct] = React.useState<Product | null>(null)
  const [related, setRelated] = React.useState<Product[]>([])
  const [tab, setTab] = React.useState<Tab>("overview")
  const { add } = useCart()

  React.useEffect(() => {
    if (!slug) return
    const p = getProductBySlugClient(slug)
    setProduct(p)
    if (p) {
      const all = getAllProductsClient()
      setRelated(all.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3))
    }
  }, [slug])

  if (!slug) return null
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-[12px] border border-border p-8 text-center">
          <div className="text-lg font-semibold">Product not found</div>
          <Link className="mt-3 inline-block text-sm text-[color:var(--tech-cta)] hover:underline" href="/products">
            ← Back to products
          </Link>
        </div>
      </div>
    )
  }

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : null
  const savingsPct =
    savings && product.originalPrice
      ? Math.round((savings / product.originalPrice) * 100)
      : null

  const specsTable = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    ...product.specs,
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* ── Breadcrumb ── */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="size-3" />
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-foreground font-medium max-w-[180px]">{product.name}</span>
      </nav>

      {/* ── Main grid ── */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* Gallery */}
        <Reveal>
          <ProductGallery images={product.images} seed={product.id} />
        </Reveal>

        {/* ── Buy Box ── */}
        <div className="lg:sticky lg:top-[136px] lg:self-start">
          <Reveal className="space-y-5 rounded-[16px] border border-border bg-card p-6 shadow-sm">
            {/* Brand + name */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--tech-cta)]">
                {product.brand}
              </div>
              <h1 className="mt-1.5 text-2xl font-bold leading-snug tracking-tight text-foreground">
                {product.name}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{product.tagline}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "size-4",
                      s <= Math.round(product.rating || 4.4)
                        ? "fill-amber-500 text-amber-500"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating || "4.4"}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount >= 1000
                  ? (product.reviewCount / 1000).toFixed(1) + "K"
                  : product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="rounded-[10px] bg-muted/40 p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold tabular-nums text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                ) : null}
                {savingsPct && savingsPct >= 5 ? (
                  <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                    Save {savingsPct}%
                  </span>
                ) : null}
              </div>
              {savings ? (
                <div className="mt-1 text-sm font-semibold text-green-600 dark:text-green-400">
                  You save {formatPrice(savings)}
                </div>
              ) : null}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                In stock · Ships in 1–2 business days
              </div>
            </div>

            {/* Key specs (4 chips) */}
            <div className="grid grid-cols-2 gap-2">
              {product.specs.slice(0, 4).map((s) => (
                <div
                  key={s.label}
                  className="rounded-[10px] border border-border bg-background px-3 py-2"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <AddToCartButton
                productId={product.id}
                className="h-12 w-full rounded-[10px]"
                variant="cta"
              />
            </div>

            {/* Trust icons */}
            <div className="space-y-2.5 border-t border-border pt-4">
              {trustItems.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="size-4 shrink-0 text-[color:var(--tech-cta)]" aria-hidden />
                  {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Tabs section ── */}
      <section className="mt-12">
        {/* Tab bar */}
        <div className="flex justify-center gap-1 border-b border-border">
          {(["overview", "specs", "reviews"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-5 py-3 text-sm font-semibold capitalize transition-colors",
                tab === t
                  ? "border-b-2 border-[color:var(--tech-cta)] text-[color:var(--tech-cta)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "reviews" ? `Reviews (${product.reviewCount >= 1000 ? (product.reviewCount / 1000).toFixed(1) + "K" : product.reviewCount})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <Reveal className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 rounded-[12px] border border-border bg-card px-4 py-3 text-sm"
              >
                <span className="mt-0.5 text-[color:var(--tech-cta)]">✓</span>
                <span>{h}</span>
              </div>
            ))}
          </Reveal>
        )}

        {/* Specs */}
        {tab === "specs" && (
          <Reveal className="mt-8 overflow-hidden rounded-[12px] border border-border bg-card">
            <div className="divide-y divide-border">
              {specsTable.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-6 px-5 py-3"
                >
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-right text-sm font-semibold text-foreground">{s.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Reviews */}
        {tab === "reviews" && (
          <Reveal className="mt-8">
            <div className="flex items-center gap-4 rounded-[12px] border border-border bg-card p-6">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-foreground">{product.rating || "4.4"}</div>
                <div className="mt-1 flex justify-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        "size-4",
                        s <= Math.round(product.rating || 4.4)
                          ? "fill-amber-500 text-amber-500"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {product.reviewCount >= 1000
                    ? (product.reviewCount / 1000).toFixed(1) + "K"
                    : product.reviewCount}{" "}
                  reviews
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const pct = stars === 5 ? 68 : stars === 4 ? 21 : stars === 3 ? 7 : stars === 2 ? 3 : 1
                  return (
                    <div key={stars} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-right text-muted-foreground">{stars}★</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-muted-foreground">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="mt-14">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--tech-cta)]">
              You May Also Like
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
              More from {product.category}
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
