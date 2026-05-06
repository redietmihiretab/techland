"use client"

import * as React from "react"
import Link from "next/link"

import { Reveal } from "@/components/techland/motion"
import { useAuth } from "@/components/auth-provider"
import { type Product } from "@/lib/products"
import { addCustomProduct, deleteCustomProduct, getAllProductsClient, type NewProductInput } from "@/lib/products-client"

const orders = [
  { id: "TL-18421", customer: "Jordan K.", total: "$2,348", status: "Shipped" },
  { id: "TL-18110", customer: "Mina S.", total: "$3,299", status: "Processing" },
  { id: "TL-17602", customer: "Andre P.", total: "$199", status: "Delivered" },
]

export default function AdminPage() {
  const { user, logout } = useAuth()
  const [all, setAll] = React.useState<Product[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [active, setActive] = React.useState<"add-product" | "product-list" | "orders">("add-product")

  const [form, setForm] = React.useState<NewProductInput>({
    name: "",
    brand: "Samsung",
    category: "laptops",
    tagline: "",
    price: 999,
    image1: "",
    image2: "",
    image3: "",
    highlights: "Clear specs you can scan fast\nReliable performance you can trust\nSafe checkout, fast fulfillment",
    specs: "Condition: New\nWarranty: 2-year coverage\nShipping: Tracked",
  })

  const refresh = React.useCallback(() => {
    setAll(getAllProductsClient())
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    let raf = 0

    const read = () => {
      const raw = window.location.hash || ""
      const h = raw.replace(/^#/, "")
      const next: typeof active =
        h === "product-list" || h === "orders" || h === "add-product" ? h : "add-product"
      setActive((prev) => (prev === next ? prev : next))
    }

    const scheduleRead = () => {
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(read)
    }

    // Initial sync and then keep in sync for hash/pushState based navigations.
    if (!window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}#add-product`)
    }
    scheduleRead()
    window.addEventListener("hashchange", scheduleRead)
    window.addEventListener("popstate", scheduleRead)

    // Next.js App Router may update the URL without firing hashchange in some cases.
    document.addEventListener("click", scheduleRead, true)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener("hashchange", scheduleRead)
      window.removeEventListener("popstate", scheduleRead)
      document.removeEventListener("click", scheduleRead, true)
    }
  }, [])

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal className="rounded-[5px] border border-border/60 bg-card/40 p-6">
          <div className="text-sm text-muted-foreground">Admin</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">You’re not logged in</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Sign in with the admin test account to manage products.
          </div>
          <div className="mt-4">
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="/">
              Go to home →
            </Link>
          </div>
        </Reveal>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal className="rounded-[5px] border border-border/60 bg-card/40 p-6">
          <div className="text-sm text-muted-foreground">Admin</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">Access denied</div>
          <div className="mt-2 text-sm text-muted-foreground">
            You’re signed in as a normal user. Only admins can add products.
          </div>
          <div className="mt-4">
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="/products">
              Browse products →
            </Link>
          </div>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Admin</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <div className="mt-2 text-sm text-muted-foreground">
            Add products (saved locally) and preview inventory.
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="h-10 rounded-[5px] border border-border bg-background px-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Logout
        </button>
      </Reveal>

      <div className="mt-8">
        {active === "add-product" ? (
          <Reveal
            id="add-product"
            className="rounded-[5px] border border-border/60 bg-card/40 p-5 shadow-sm scroll-mt-24"
          >
          <div className="text-sm font-semibold">Add product</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Use image paths like <span className="font-medium text-foreground">/product/images/...</span> or full URLs.
          </div>

          <form
            className="mt-4 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setError(null)
              setSuccess(null)
              const res = addCustomProduct(form)
              if (!res.ok) {
                setError(res.message)
                return
              }
              setSuccess(`Added “${res.product.name}”.`)
              setForm((f) => ({
                ...f,
                name: "",
                tagline: "",
                image1: "",
                image2: "",
                image3: "",
              }))
              refresh()
            }}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Product name"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <input
                value={form.tagline}
                onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                placeholder="Tagline (short description)"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <select
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value as NewProductInput["brand"] }))}
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none"
              >
                {["Samsung", "Apple", "HP", "ASUS", "Lenovo", "Dell", "Acer", "MSI"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as NewProductInput["category"] }))}
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none"
              >
                <option value="laptops">Laptops</option>
                <option value="desktops">Desktops</option>
                <option value="accessories">Accessories</option>
                <option value="gadgets">Gadgets</option>
              </select>
              <input
                value={String(form.price)}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                placeholder="Price"
                inputMode="numeric"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
              />
              <input
                value={form.image1}
                onChange={(e) => setForm((f) => ({ ...f, image1: e.target.value }))}
                placeholder="Image 1 URL/path"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
              />
              <input
                value={form.image2}
                onChange={(e) => setForm((f) => ({ ...f, image2: e.target.value }))}
                placeholder="Image 2 URL/path (optional)"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
              />
              <input
                value={form.image3}
                onChange={(e) => setForm((f) => ({ ...f, image3: e.target.value }))}
                placeholder="Image 3 URL/path (optional)"
                className="h-11 rounded-[5px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground sm:col-span-2"
              />
            </div>

            <div className="mt-2 rounded-[5px] border border-border bg-background/30 p-3">
              <div className="text-sm font-semibold">Detailed info</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Highlights: one per line. Specs: <span className="font-medium text-foreground">Label: Value</span> per line.
              </div>
              <div className="mt-3 grid gap-2">
                <textarea
                  value={form.highlights ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))}
                  placeholder={"Highlights (one per line)\nExample:\nOLED 120Hz\nRTX graphics\nUSB‑C charging"}
                  className="min-h-24 w-full resize-y rounded-[5px] border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <textarea
                  value={form.specs ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, specs: e.target.value }))}
                  placeholder={"Specs (Label: Value per line)\nExample:\nCPU: Intel Core i7\nRAM: 16GB\nStorage: 1TB SSD"}
                  className="min-h-24 w-full resize-y rounded-[5px] border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error ? <div className="text-sm text-red-600" role="alert">{error}</div> : null}
            {success ? <div className="text-sm text-green-700" role="status">{success}</div> : null}

            <button
              type="submit"
              className="h-11 rounded-[5px] bg-foreground px-4 text-sm font-medium text-background"
            >
              Add product
            </button>
          </form>
          </Reveal>
        ) : null}

        {active === "product-list" ? (
          <Reveal
            id="product-list"
            className="rounded-[5px] border border-border/60 bg-card/40 p-5 shadow-sm scroll-mt-24"
          >
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Products</div>
              <div className="mt-1 text-sm text-muted-foreground">{all.length} items (base + admin-added)</div>
            </div>
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="/products">
              View shop →
            </Link>
          </div>
          <div className="mt-3 overflow-hidden rounded-[5px] border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {all.map((p) => (
                  <tr key={p.id} className="border-t border-border/60">
                    <td className="px-4 py-3 font-medium">
                      <Link className="hover:underline" href={`/products/${p.slug}`}>
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${p.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.id.startsWith("c-") ? (
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            deleteCustomProduct(p.id)
                            refresh()
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground/60">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Reveal>
        ) : null}

        {active === "orders" ? (
          <Reveal
            id="orders"
            className="rounded-[5px] border border-border/60 bg-card/40 p-5 shadow-sm scroll-mt-24"
          >
          <div className="text-sm font-semibold">Orders</div>
          <div className="mt-3 overflow-hidden rounded-[5px] border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border/60">
                    <td className="px-4 py-3 font-medium">{o.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.customer}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border/60 bg-background/30 px-2 py-1 text-xs text-muted-foreground">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  )
}

