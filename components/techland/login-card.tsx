"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LoginCard({
  open,
  onOpenChange,
  onSignup,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  onSignup: () => void
}) {
  const { login } = useAuth()
  const [error, setError] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  React.useEffect(() => {
    if (open) setError(null)
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Login"
      className="fixed inset-0 z-[60]"
    >
      <button
        type="button"
        aria-label="Close login"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative mx-auto flex min-h-full max-w-sm items-center justify-center px-4 py-10">
        <div
          className={cn(
            "w-full rounded-[10px] border border-border bg-background p-5 shadow-xl",
            "supports-[backdrop-filter]:bg-background/90"
          )}
        >
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9 rounded-[10px] border border-transparent bg-transparent hover:bg-muted"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <XMarkIcon className="size-4" aria-hidden />
            </Button>

            <div className="pt-10 text-center">
              <div className="text-3xl font-semibold text-foreground">Welcome back</div>
            </div>
          </div>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const fd = new FormData(form)
              const email = String(fd.get("email") ?? "")
              const password = String(fd.get("password") ?? "")
              const res = login(email, password)
              if (res.ok) onOpenChange(false)
              else setError(res.message)
            }}
          >
            <label className="block">
              <div className="text-sm font-medium text-foreground">Email</div>
              <input
                type="email"
                autoComplete="email"
                required
                name="email"
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="you@domain.com"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-foreground">Password</div>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  name="password"
                  className="h-10 w-full rounded-[10px] border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[5px] p-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon className="size-4" aria-hidden /> : <EyeIcon className="size-4" aria-hidden />}
                </button>
              </div>
            </label>

            {error ? (
              <div className="text-sm text-muted-foreground" role="alert">{error}</div>
            ) : null}

            <div className="pt-2">
              <Button type="submit" className="h-10 w-full rounded-[10px]">
                Login
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 pt-3 text-center text-sm">
              <Link
                href="/forgot-password"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>

              <div className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-foreground underline-offset-4 hover:underline"
                  onClick={() => {
                    onOpenChange(false)
                    onSignup()
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

