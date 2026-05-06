"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import { Reveal } from "@/components/techland/motion"
import { ProductCard } from "@/components/techland/product-card"
import { products } from "@/lib/products"

/* ── Carousel ── */
function ProductCarousel({ items }: { items: React.ReactNode[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (dir: "prev" | "next") => {
    if (!scrollRef.current) return
    const cardWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 300
    scrollRef.current.scrollBy({ left: dir === "next" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" })
  }

  return (
    <div className="relative mt-6 group/carousel">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className="flex h-full w-[80vw] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Section header ── */
function SectionHeader({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string
  title: string
  aside?: string
}) {
  return (
    <Reveal className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--tech-cta)]">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {aside && (
        <div className="hidden text-sm text-muted-foreground sm:block">{aside}</div>
      )}
    </Reveal>
  )
}


/* ── Main export ── */
export function FeaturedProducts() {
  const bestSellers = React.useMemo(
    () => [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6),
    []
  )

  const onSale = React.useMemo(
    () =>
      products
        .filter((p) => p.originalPrice && p.originalPrice > p.price)
        .sort(
          (a, b) =>
            (b.originalPrice! - b.price) / b.originalPrice! -
            (a.originalPrice! - a.price) / a.originalPrice!
        )
        .slice(0, 4),
    []
  )

  const mostOrderedAccessories = React.useMemo(
    () =>
      products
        .filter((p) => p.category === "accessories")
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 3),
    []
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      {/* ── Today's Deals ── */}
      {onSale.length > 0 && (
        <section className="mb-14">
          <SectionHeader
            eyebrow="🔥 Limited Time"
            title="Today's Deals"
            aside="Prices drop at midnight"
          />
          <ProductCarousel
            items={onSale.map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} priority />
              </Reveal>
            ))}
          />
        </section>
      )}

      {/* ── Featured ── */}
      <section className="mb-14">
        <SectionHeader
          eyebrow="Editor's Choice"
          title="Featured Picks"
          aside="Hand-curated for performance"
        />
        <ProductCarousel
          items={products.slice(0, 6).map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} priority />
            </Reveal>
          ))}
        />
      </section>

      {/* ── Most ordered accessories (swapped layout, 3 cards) ── */}
      {mostOrderedAccessories.length > 0 && (
        <section className="mb-14">
          <Reveal>
            <div className="mb-4 text-lg font-extrabold tracking-tight text-foreground">
              <span className="text-[color:var(--tech-cta)]">Most order</span> accesaries
            </div>
          </Reveal>

          <div className="grid items-stretch gap-5 lg:grid-cols-[1.6fr_1fr]">
            {/* Left: 3 standard product cards */}
            <div className="grid gap-5 sm:grid-cols-3">
              {mostOrderedAccessories.map((p, idx) => (
                <Reveal key={p.id} delay={0.05 + idx * 0.05} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>

            {/* Right: big featured image */}
            <Reveal delay={0.05} className="h-full">
              <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-muted sm:h-[260px] lg:h-full">
                <Image
                  src={mostOrderedAccessories[0]?.images?.[0]?.src || "/product-images/Samsung T7 Shield SSD (2TB).png"}
                  alt="Accessories featured"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Best Sellers ── */}
      <section>
        <SectionHeader
          eyebrow="Trending Now"
          title="Best Sellers"
          aside="What customers keep buying"
        />
        <ProductCarousel
          items={bestSellers.map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        />
      </section>
    </div>
  )
}
