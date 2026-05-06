"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { useAuth } from "@/components/auth-provider"

export function AdminModeGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    if (user?.role === "admin" && pathname !== "/admin") {
      router.replace("/admin")
    }
  }, [pathname, router, user?.role])

  if (user?.role === "admin") {
    if (pathname !== "/admin") return null
    return <>{children}</>
  }

  // Non-admin users should never see admin UI.
  if (pathname === "/admin") {
    router.replace("/")
    return null
  }

  return <>{children}</>
}

