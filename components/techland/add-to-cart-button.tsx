"use client"

import * as React from "react"
import { ShoppingCart } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"

export function AddToCartButton({
  productId,
  className,
  variant = "cta",
}: {
  productId: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cta"
}) {
  const { add } = useCart()

  return (
    <Button variant={variant} type="button" className={className} onClick={() => add(productId, 1)}>
      <ShoppingCart className="mr-2 size-4" />
      Add to cart
    </Button>
  )
}

