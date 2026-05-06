"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const partners = [
  { name: "Samsung", src: "/company logo/Samsung.svg" },
  { name: "ASUS", src: "/company logo/Asus.svg" },
  { name: "Lenovo", src: "/company logo/Lenovo.svg" },
  { name: "HP", src: "/company logo/Hewlett-Packard-Logo.wine.svg" },
  { name: "Dell", src: "/company logo/Dell_Technologies-Logo.wine.svg" },
  { name: "LG", src: "/company logo/LG_Corporation-Logo.wine.svg" },
  { name: "Toshiba", src: "/company logo/Toshiba-Logo.wine.svg" },
  { name: "OPPO", src: "/company logo/Oppo-Logo.wine.svg" },
]

export function PartnersMarquee({ className }: { className?: string }) {
  const items = React.useMemo(() => [...partners, ...partners], [])

  return (
    <div className={cn("overflow-hidden", className)} aria-label="Partners">
      <div className="tech-marquee-right flex w-max items-center gap-8 py-3">
        {items.map((p, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={p.src + idx}
            className="flex items-center"
          >
            <Image
              src={p.src}
              alt={p.name}
              width={90}
              height={90}
              className="size-[90px] object-contain opacity-80 transition hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

