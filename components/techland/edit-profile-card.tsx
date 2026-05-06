"use client"

import * as React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Profile = {
  name: string
  location: string
  phone: string
}

export function EditProfileCard({
  open,
  onOpenChange,
  value,
  userLabel,
  onSave,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  value: Profile
  userLabel: string
  onSave: (next: Profile) => void
}) {
  const [draft, setDraft] = React.useState<Profile>(value)

  React.useEffect(() => {
    if (!open) return
    setDraft(value)
  }, [open, value])

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
    <div role="dialog" aria-modal="true" aria-label="Edit profile" className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close edit profile"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative mx-auto flex min-h-full max-w-sm items-center justify-center px-4 py-10">
        <div
          className={cn(
            "w-full rounded-[10px] border border-border bg-muted p-5 shadow-xl",
            "supports-[backdrop-filter]:bg-muted/90"
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
              <div className="text-3xl font-semibold text-foreground">Edit profile</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{userLabel}</span>
              </div>
            </div>
          </div>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              onSave({
                name: draft.name.trim(),
                location: draft.location.trim(),
                phone: draft.phone.trim(),
              })
              onOpenChange(false)
            }}
          >
            <label className="block">
              <div className="text-sm font-medium text-foreground">Full name</div>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-foreground">Location</div>
              <input
                value={draft.location}
                onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="City, Country"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-foreground">Phone (optional)</div>
              <input
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                className="mt-1 h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="+1 (555) 000-0000"
              />
            </label>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full rounded-[10px]"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 w-full rounded-[10px]">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

