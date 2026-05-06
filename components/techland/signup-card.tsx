"use client"

import * as React from "react"
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SignupCard({
  open,
  onOpenChange,
  onLogin,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  onLogin: () => void
}) {
  const [showPassword, setShowPassword] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Sign up" className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close sign up"
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
              <div className="text-3xl font-semibold text-foreground">Create account</div>
            </div>
          </div>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              onOpenChange(false)
            }}
          >
            <label className="block">
              <div className="text-sm font-medium text-foreground">Name</div>
              <input
                type="text"
                autoComplete="name"
                required
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-foreground">Email</div>
              <input
                type="email"
                autoComplete="email"
                required
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="you@domain.com"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-foreground">Password</div>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
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

            <div className="pt-2">
              <Button type="submit" className="h-10 w-full rounded-[10px]">
                Sign up
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 pt-3 text-center text-sm">
              <div className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-foreground underline-offset-4 hover:underline"
                  onClick={() => {
                    onOpenChange(false)
                    onLogin()
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

