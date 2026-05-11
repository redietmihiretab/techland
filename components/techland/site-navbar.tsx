"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ShoppingCartIcon, MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline"

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
  const [mobileExpanded, setMobileExpanded] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

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

  // Focus input when expanded on mobile
  React.useEffect(() => {
    if (mobileExpanded) {
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [mobileExpanded])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) window.location.href = `/products?q=${encodeURIComponent(q)}`
  }

  // On mobile: clicking the icon button expands; if already expanded it submits
  const handleIconClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 640) {
      if (!mobileExpanded) {
        e.preventDefault()
        setMobileExpanded(true)
      }
      // if expanded, let the form submit naturally
    }
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

          {/*
            Unified search form.
            • sm+  : always fully expanded (flex-1, full width)
            • mobile collapsed: form shrinks to just the icon button (w-11, overflow hidden)
            • mobile expanded : full width slides in via transition
          */}
          <form
            onSubmit={handleSearch}
            className={cn(
              // shared
              "flex overflow-hidden rounded-[10px] border-2 border-[color:var(--tech-cta)] bg-background transition-all duration-300 ease-in-out focus-within:shadow-[0_0_0_3px_rgba(255,138,0,0.15)]",
              // desktop: always flex-1 full width
              "sm:mx-auto sm:w-full sm:max-w-2xl sm:flex-1",
              // mobile: collapsed = fixed small width, expanded = grow to fill
              mobileExpanded
                ? "ml-auto w-full flex-1"
                : "ml-auto h-11 w-11 sm:h-auto sm:w-auto"
            )}
            style={{ height: "2.75rem" }}
          >
            {/* Input — hidden on mobile when collapsed */}
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                // collapse on mobile if input is empty and blurred
                if (!searchQuery.trim()) setMobileExpanded(false)
              }}
              className={cn(
                "h-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground transition-all duration-300",
                mobileExpanded ? "flex-1 opacity-100 w-full" : "w-0 flex-none opacity-0 sm:flex-1 sm:opacity-100 sm:w-auto px-0 sm:px-4"
              )}
              placeholder="Search products, brands and categories…"
              aria-label="Search products"
              tabIndex={mobileExpanded ? 0 : -1}
            />

            {/* Icon button — always visible, acts as expand trigger on mobile */}
            <button
              type="submit"
              onClick={handleIconClick}
              className="flex h-full w-11 shrink-0 items-center justify-center bg-[color:var(--tech-cta)] transition-opacity hover:opacity-90"
              aria-label={mobileExpanded ? "Search" : "Expand search"}
            >
              <MagnifyingGlassIcon className="size-5 text-[color:var(--tech-cta-foreground)]" aria-hidden />
            </button>
          </form>

          {/* Right icons */}
          <div className={cn("flex shrink-0 items-center gap-2", mobileExpanded ? "hidden sm:flex" : "flex")}>
            <ThemeToggle className="h-10 w-10 rounded-sm" />

            <Link
              href="/account"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border hover:bg-muted"
              aria-label="My Account"
            >
              <UserIcon className="size-5" aria-hidden />
            </Link>

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
