"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/techland/motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/techland/product-card"
import { products } from "@/lib/products"

const CATEGORIES = [
  { id: "1", name: "Desktops", image: "/product/images/desktop.png", href: "/products?category=desktops" },
  { id: "2", name: "Laptops", image: "/product/images/iabtop.png", href: "/products?category=laptops" },
  { id: "3", name: "Smartphones", image: "/product/images/phone.png", href: "/products?category=gadgets" },
  { id: "4", name: "Headphones", image: "/product/images/headset.png", href: "/products?category=accessories" },
  { id: "5", name: "Gaming", image: "/product/images/desktop.png", href: "/products?category=gaming" },
  { id: "6", name: "Accessories", image: "/product/images/headset.png", href: "/products?category=accessories" },
  { id: "7", name: "Workstations", image: "/product/images/desktop.png", href: "/products?category=desktops" },
  { id: "8", name: "Ultrabooks", image: "/product/images/iabtop.png", href: "/products?category=laptops" },
  { id: "9", name: "Wearables", image: "/product/images/phone.png", href: "/products?category=gadgets" },
  { id: "10", name: "Audio", image: "/product/images/headset.png", href: "/products?category=accessories" },
]

export function HomeHero() {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (dir: "prev" | "next") => {
    if (!scrollRef.current) return
    const firstCard = scrollRef.current.querySelector<HTMLElement>("[data-category-card]")
    const gap = 16 // gap-4
    const cardWidth = firstCard ? firstCard.offsetWidth + gap : 126
    scrollRef.current.scrollBy({ left: dir === "next" ? cardWidth : -cardWidth, behavior: "smooth" })
  }

  return (
    <section className="w-full bg-background px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Top: Title */}
        <Reveal>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">
            Browse by <span className="text-[color:var(--tech-cta)]">category</span>
          </h2>
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.1}>
          <div className="relative group w-full lg:px-[100px]">
            {/* Arrows */}
            <button
              onClick={() => scroll("prev")}
              className="absolute -left-6 top-[40%] z-10 hidden -translate-y-1/2 items-center justify-center text-[color:var(--tech-cta)] transition-colors hover:text-[color:var(--tech-cta)]/70 sm:-left-10 lg:-left-14 lg:flex"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-8 w-8 stroke-[1.5]" />
            </button>
            
            <button
              onClick={() => scroll("next")}
              className="absolute -right-6 top-[40%] z-10 hidden -translate-y-1/2 items-center justify-center text-[color:var(--tech-cta)] transition-colors hover:text-[color:var(--tech-cta)]/70 sm:-right-10 lg:-right-14 lg:flex"
              aria-label="Next categories"
            >
              <ChevronRight className="h-8 w-8 stroke-[1.5]" />
            </button>

            {/* Cards */}
            <div 
              ref={scrollRef}
              className="flex snap-x snap-mandatory justify-start gap-4 overflow-x-auto pb-4 scrollbar-hide lg:overflow-x-hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {CATEGORIES.map((cat) => (
                  <Link
                  key={cat.id}
                  href={cat.href}
                  data-category-card
                  className="flex w-[110px] shrink-0 snap-start flex-col items-center gap-3 lg:w-auto lg:basis-[calc((100%-96px)/7)]"
                >
                  <div className="relative flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-[5px] border border-[color:var(--tech-cta)]/30 bg-[#fffcf5]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="110px"
                    />
                  </div>
                  <span className="text-base font-medium text-foreground">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured strip (under category boxes, above main hero headline) */}
        <div className="mt-8">
          <Reveal>
            <div className="mb-4 text-lg font-extrabold tracking-tight text-foreground">
              <span className="text-[color:var(--tech-cta)]">Best Sell</span> Portable Laptop
            </div>
          </Reveal>

          <div className="grid items-stretch gap-5 lg:grid-cols-[1.6fr_1fr]">
            {/* Left: big featured image (matches cards height on desktop) */}
            <Reveal delay={0.05} className="h-full">
              <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-muted sm:h-[260px] lg:h-full">
                <Image
                  src="/product/images/man.png"
                  alt="Featured"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </div>
            </Reveal>

            {/* Right: two standard product cards */}
            <div className="grid items-stretch grid-cols-2 gap-5">
              {products.slice(0, 2).map((p, idx) => (
                <Reveal key={p.id} delay={0.1 + idx * 0.05} className="h-full">
                  <ProductCard product={p} priority />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Hero Text */}
        <div className="mt-10 text-center">
          <Reveal delay={0.2}>
            <h1 className="text-[45px] font-extrabold leading-tight tracking-tight text-foreground">
              Time to <span className="text-[color:var(--tech-cta)]">Upgrade</span> Your Tech!
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-[14px] font-medium text-muted-foreground">
              Get the best deals on premium electronics <br className="hidden sm:block" />
              delivered as soon as today
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
