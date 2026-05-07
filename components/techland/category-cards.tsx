"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { MonitorSmartphone, Cpu, Headphones } from "lucide-react"
import { Reveal } from "@/components/techland/motion"
import { PromoBanner } from "./promo-banner"

const cards = [
  {
    href: "/products?category=laptops",
    title: "Laptops",
    desc: "OLED clarity, RTX power, silent thermals.",
    Icon: MonitorSmartphone,
    gradient: "from-orange-500/20 to-amber-400/10",
    border: "border-orange-500/20",
  },
  {
    href: "/products?category=desktops",
    title: "Desktops",
    desc: "Creator towers with tuned airflow & quiet cooling.",
    Icon: Cpu,
    gradient: "from-blue-500/20 to-indigo-400/10",
    border: "border-blue-500/20",
  },
  {
    href: "/products?category=accessories",
    title: "Accessories",
    desc: "Precision input devices for peak performance.",
    Icon: Headphones,
    gradient: "from-emerald-500/20 to-teal-400/10",
    border: "border-emerald-500/20",
  },
]

export function CategoryCards() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <PromoBanner 
          className="mb-10"
          title={<>UP TO <span className="text-orange-950">40% OFF</span> ON ALL ACCESSORIES</>}
          description="Limited time offer. Elevate your setup with premium gear today."
          href="/products?category=accessories"
          backgroundImage="/product/images/man.png"
        />
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-[color:var(--tech-cta)]">
              Shop by Category
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              Browse our collection
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
          >
            View all <ArrowRightIcon className="size-4" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <Reveal key={c.title}>
              <Link
                href={c.href}
                className={`group flex flex-col gap-5 rounded-[16px] border ${c.border} bg-gradient-to-br ${c.gradient} p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm">
                    <c.Icon className="size-6 text-[color:var(--tech-cta)]" aria-hidden />
                  </div>
                  <ArrowRightIcon className="size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                </div>

                <div>
                  <div className="text-lg font-bold tracking-tight text-foreground">
                    {c.title}
                  </div>
                  <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </div>
                </div>

                <div className="mt-auto text-sm font-semibold text-[color:var(--tech-cta)]">
                  Shop {c.title} →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
