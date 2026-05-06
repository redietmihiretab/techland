"use client"

import Image from "next/image"
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveImageSrc } from "@/lib/resolve-image-src"

export function ProductGallery({
  images,
  seed = "gallery",
}: {
  images: { src: string; alt: string }[]
  seed?: string
}) {
  const [active, setActive] = React.useState(0)
  const current = images[active]
  const count = Math.max(1, Math.min(5, images.length))

  return (
    <div className="space-y-3">
      <div className="group relative overflow-hidden rounded-[10px] border border-border/60 bg-card/40 shadow-sm">
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_30%_10%,black,transparent_55%)] opacity-10 blur-2xl" />
        <div className="relative aspect-[16/12]">
          <Image
            src={resolveImageSrc(current.src, { seed: `${seed}:${active}` })}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-foreground opacity-0 transition group-hover:opacity-100"
              onClick={() => setActive((i) => (i - 1 + count) % count)}
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-foreground opacity-0 transition group-hover:opacity-100"
              onClick={() => setActive((i) => (i + 1) % count)}
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 w-2 rounded-full shadow transition",
                    i === active ? "bg-foreground" : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

