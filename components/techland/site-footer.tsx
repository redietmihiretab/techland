import Link from "next/link"
import { Truck, RotateCcw, BadgePercent, Headphones } from "lucide-react"

const footerSections = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Laptops", href: "/products?category=laptops" },
      { label: "Desktops", href: "/products?category=desktops" },
      { label: "Accessories", href: "/products?category=accessories" },
      { label: "Today's Deals", href: "/products" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Order Status", href: "/cart" },
      { label: "Returns & Exchanges", href: "/" },
      { label: "FAQs", href: "/" },
      { label: "Contact Us", href: "/" },
      { label: "Warranty Info", href: "/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Techland", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Sustainability", href: "/" },
    ],
  },
]

const trustItems = [
  { 
    Icon: Truck, 
    label: "Free Shipping",
    sub: "On orders over $999"
  },
  { 
    Icon: RotateCcw, 
    label: "Easy Returns",
    sub: "30-day hassle-free returns"
  },
  { 
    Icon: BadgePercent, 
    label: "Price Match",
    sub: "We match any competitor price"
  },
  { 
    Icon: Headphones, 
    label: "24/7 Support",
    sub: "Expert help whenever you need it"
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Trust bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trustItems.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4 text-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--tech-cta)]/10 text-[color:var(--tech-cta)]">
                <Icon className="size-6" aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="text-xl font-extrabold tracking-tight text-[color:var(--tech-cta)]">
              Techland
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium electronics curated for performance, reliability, and every kind of builder.
            </p>
            <div className="mt-5 flex gap-3">
              {["Twitter / X", "Instagram", "YouTube"].map((name) => (
                <Link
                  key={name}
                  href="/"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs text-muted-foreground hover:border-[color:var(--tech-cta)] hover:text-[color:var(--tech-cta)]"
                >
                  {name[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <div className="text-sm font-bold uppercase tracking-widest text-foreground">
                {section.heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <div>© {new Date().getFullYear()} Techland. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((label) => (
              <Link key={label} href="/" className="hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
