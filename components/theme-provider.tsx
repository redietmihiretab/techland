"use client"

import * as React from "react"

export type Theme = "dark" | "light" | "system"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "techland-theme"

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyThemeClass(resolved: "dark" | "light") {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("dark", resolved === "dark")
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">(
    defaultTheme === "system" ? "light" : (defaultTheme as "dark" | "light")
  )

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored)
    } else {
      window.localStorage.setItem(STORAGE_KEY, defaultTheme)
      setThemeState(defaultTheme)
    }
  }, [defaultTheme])

  React.useEffect(() => {
    const nextResolved = theme === "system" ? getSystemTheme() : theme
    setResolvedTheme(nextResolved)
    applyThemeClass(nextResolved)
    window.localStorage.setItem(STORAGE_KEY, theme)

    if (theme !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      const resolved = getSystemTheme()
      setResolvedTheme(resolved)
      applyThemeClass(resolved)
    }
    media.addEventListener?.("change", onChange)
    return () => media.removeEventListener?.("change", onChange)
  }, [theme])

  const value = React.useMemo<ThemeContextValue>(() => {
    const setTheme = (next: Theme) => setThemeState(next)
    const toggleTheme = () => setThemeState(resolvedTheme === "dark" ? "light" : "dark")

    return {
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }
  }, [theme, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

