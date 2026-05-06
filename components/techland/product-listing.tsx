"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { FiltersSidebar } from "@/components/techland/filters-sidebar"
import { EmptyState } from "@/components/techland/empty-state"
import { ProductCard } from "@/components/techland/product-card"
import { ProductCardSkeleton } from "@/components/techland/skeletons"
import { Reveal } from "@/components/techland/motion"
import { type Product } from "@/lib/products"
import { getAllProductsClient } from "@/lib/products-client"

type Sort = "performance" | "price_asc" | "price_desc" | "popularity"

export function ProductListing({
  initialCategory,
  initialSort,
}: {
  initialCategory?: string
  initialSort?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const [sort, setSort] = React.useState<Sort>(
    (initialSort as Sort) || "performance"
  )
  const [filters, setFilters] = React.useState<{
    brand?: string
    type?: "laptops" | "desktops" | "accessories" | "gadgets"
    minPrice?: number
    maxPrice?: number
    minRating?: 3 | 4 | 4.5
    minRamGb?: 8 | 16 | 32
    gpuTier?: "rtx" | "integrated"
    onSale?: boolean
  }>({
    brand: undefined,
    type: undefined,
  })

  const category = initialCategory

  const [allProducts, setAllProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    setAllProducts(getAllProductsClient())
  }, [])

  const triggerLoading = React.useCallback(() => {
    setLoading(true)
  }, [])

  React.useEffect(() => {
    if (!loading) return
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [loading])

  const items = React.useMemo(() => {
    let list = allProducts
    if (category) list = list.filter((p) => p.category === category)
    if (filters.type) list = list.filter((p) => p.category === filters.type)
    if (filters.brand) list = list.filter((p) => p.brand === filters.brand)
    if (filters.minPrice != null) list = list.filter((p) => p.price >= filters.minPrice!)
    if (filters.maxPrice != null) list = list.filter((p) => p.price <= filters.maxPrice!)
    if (filters.onSale) list = list.filter((p) => p.originalPrice != null && p.originalPrice > p.price)
    if (filters.minRating != null) list = list.filter((p) => p.rating >= filters.minRating!)

    if (filters.minRamGb != null) {
      list = list.filter((p) => {
        const ram = p.specs.find((s) => s.label.toLowerCase() === "ram")?.value ?? ""
        const match = ram.match(/(\d+)\s*gb/i)
        const gb = match ? Number(match[1]) : NaN
        return Number.isFinite(gb) ? gb >= filters.minRamGb! : false
      })
    }

    if (filters.gpuTier) {
      list = list.filter((p) => {
        const gpu = p.specs.find((s) => s.label.toLowerCase() === "gpu")?.value ?? ""
        const hasDedicated =
          /rtx|radeon|geforce|nvidia|amd/i.test(gpu) && !/integrated|intel/i.test(gpu)
        return filters.gpuTier === "rtx" ? hasDedicated : !hasDedicated
      })
    }

    switch (sort) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case "popularity":
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        list = [...list].sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [allProducts, category, filters, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Products</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {category ? category[0].toUpperCase() + category.slice(1) : "Shop all"}
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Premium electronics curated for performance and clarity.
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <div className="text-sm text-muted-foreground">Sort</div>
          <div className="relative w-[220px] sm:w-[240px]">
            <select
              value={sort}
              onChange={(e) => {
                triggerLoading()
                setSort(e.target.value as Sort)
              }}
              className="h-10 w-full appearance-none rounded-[10px] border border-border bg-background py-2 pl-3 pr-10 text-sm outline-none"
            >
              <option value="performance">Performance</option>
              <option value="popularity">Popularity</option>
              <option value="price_asc">Low → High</option>
              <option value="price_desc">High → Low</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-[27px] top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <FiltersSidebar
            value={filters}
            onChange={(next) => {
              triggerLoading()
              setFilters(next)
            }}
          />
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length ? (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((p, idx) => (
                <ProductCard key={p.id} product={p} priority={idx < 4} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

