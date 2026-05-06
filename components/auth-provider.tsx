"use client"

import * as React from "react"

export type AuthUser = {
  email: string
  role: "admin" | "user"
}

type AuthContextValue = {
  user: AuthUser | null
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string }
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "techland-auth-user"

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (!parsed?.email || (parsed.role !== "admin" && parsed.role !== "user")) return null
    return parsed
  } catch {
    return null
  }
}

function writeStoredUser(user: AuthUser | null) {
  if (typeof window === "undefined") return
  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)

  React.useEffect(() => {
    setUser(readStoredUser())
  }, [])

  const value = React.useMemo<AuthContextValue>(() => {
    const adminEmail = process.env.NEXT_PUBLIC_TEST_ADMIN_EMAIL
    const adminPassword = process.env.NEXT_PUBLIC_TEST_ADMIN_PASSWORD
    const userEmail = process.env.NEXT_PUBLIC_TEST_USER_EMAIL
    const userPassword = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD

    const login: AuthContextValue["login"] = (email, password) => {
      const normalizedEmail = email.trim().toLowerCase()

      if (
        adminEmail &&
        adminPassword &&
        normalizedEmail === adminEmail.trim().toLowerCase() &&
        password === adminPassword
      ) {
        const next: AuthUser = { email: adminEmail, role: "admin" }
        setUser(next)
        writeStoredUser(next)
        return { ok: true }
      }

      if (
        userEmail &&
        userPassword &&
        normalizedEmail === userEmail.trim().toLowerCase() &&
        password === userPassword
      ) {
        const next: AuthUser = { email: userEmail, role: "user" }
        setUser(next)
        writeStoredUser(next)
        return { ok: true }
      }

      return { ok: false, message: "Invalid email or password." }
    }

    const logout = () => {
      setUser(null)
      writeStoredUser(null)
    }

    return { user, login, logout }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

