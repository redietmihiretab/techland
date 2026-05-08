"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ShoppingCartIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline"

import { ThemeToggle } from "@/components/techland/theme-toggle"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

const categories = [
  { href: "/products", label: "All Products", matchExact: true },
  { href: "/products?category=laptops", label: "Laptops" },
  { href: "/products?category=desktops", label: "Desktops" },
  { href: "/products?category=accessories", label: "Accessories" },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const [category, setCategory] = React.useState<string | null>(null)
  const { count } = useCart()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const mobileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const update = () => {
      setCategory(new URLSearchParams(window.location.search).get("category"))
    }
    update()
    window.addEventListener("popstate", update)
    document.addEventListener("click", update, true)
    return () => {
      window.removeEventListener("popstate", update)
      document.removeEventListener("click", update, true)
    }
  }, [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Auto-focus the mobile input when the search row opens
  React.useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 50)
    }
  }, [mobileSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) window.location.href = `/products?q=${encodeURIComponent(q)}`
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/10 backdrop-blur-md pt-1.5 transition-shadow duration-200",
        scrolled && "shadow-md pt-0"
      )}
    >
      {/* ── Tier 1: Logo + Search + Cart ── */}
      <div className="border-b border-border bg-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-extrabold tracking-tight text-[color:var(--tech-cta)]"
          >
            Techland
          </Link>

          {/* Search bar — hidden on mobile, visible sm+ */}
          <form onSubmit={handleSearch} className="mx-auto hidden w-full max-w-2xl flex-1 sm:flex">
            <div className="flex h-11 w-full overflow-hidden rounded-[10px] border-2 border-[color:var(--tech-cta)] bg-background transition-shadow focus-within:shadow-[0_0_0_3px_rgba(255,138,0,0.15)]">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search products, brands and categories…"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="flex h-full items-center justify-center bg-[color:var(--tech-cta)] px-4 transition-opacity hover:opacity-90"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="size-5 text-[color:var(--tech-cta-foreground)]" aria-hidden />
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
            {/* Mobile-only: search icon toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border hover:bg-muted sm:hidden"
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
            >
              <MagnifyingGlassIcon className="size-5" aria-hidden />
            </button>

            <ThemeToggle className="h-10 w-10 rounded-sm" />

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-border hover:bg-muted"
              aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
            >
              <ShoppingCartIcon className="size-5" aria-hidden />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-w-[1.1rem] place-items-center rounded-full bg-[color:var(--tech-cta)] px-1 text-[10px] font-bold leading-[1.1rem] text-[color:var(--tech-cta-foreground)]">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile expanded search row — slides in below the top bar */}
        {mobileSearchOpen && (
          <form
            onSubmit={(e) => { handleSearch(e); setMobileSearchOpen(false) }}
            className="flex sm:hidden px-4 pb-3"
          >
            <div className="flex h-11 w-full overflow-hidden rounded-[10px] border-2 border-[color:var(--tech-cta)] bg-background transition-shadow focus-within:shadow-[0_0_0_3px_rgba(255,138,0,0.15)]">
              <input
                ref={mobileInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search products…"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="flex h-full items-center justify-center bg-[color:var(--tech-cta)] px-4 transition-opacity hover:opacity-90"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="size-5 text-[color:var(--tech-cta-foreground)]" aria-hidden />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Tier 2: Category pill nav (Centered) ── */}
      <div className="border-b border-border bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex h-12 items-center justify-center gap-2 overflow-x-auto" aria-label="Product categories">
            {categories.map((item) => {
              const itemCategory = new URLSearchParams(
                item.href.includes("?") ? item.href.split("?")[1] : ""
              ).get("category")
              const active =
                pathname === "/products" &&
                (itemCategory ? itemCategory === category : !category)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-[color:var(--tech-cta)] text-[color:var(--tech-cta-foreground)]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/products?onSale=true"
              className="hidden sm:inline-flex whitespace-nowrap rounded-full bg-[color:var(--tech-cta)]/10 px-5 py-2 text-sm font-bold text-[color:var(--tech-cta)] transition-colors hover:bg-[color:var(--tech-cta)]/20"
            >
              🔥 Today's Deals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
