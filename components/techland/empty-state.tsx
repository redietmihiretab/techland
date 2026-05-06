import Link from "next/link"
import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"

export function EmptyState({
  title = "No results",
  description = "Try adjusting filters or exploring featured products.",
  actionHref = "/products",
  actionLabel = "Browse all products",
}: {
  title?: string
  description?: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="grid place-items-center border border-border bg-white p-10 text-center">
      <div className="grid size-12 place-items-center">
        <SearchX className="size-5 text-muted-foreground" />
      </div>
      <div className="mt-4 text-lg font-semibold">{title}</div>
      <div className="mt-1 max-w-md text-sm text-muted-foreground">{description}</div>
      <div className="mt-6">
        <Button asChild className="rounded-full">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      </div>
    </div>
  )
}

