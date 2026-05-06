import { products, type Product, type ProductCategory } from "@/lib/products"

const STORAGE_KEY = "techland-custom-products-v1"

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function isProductCategory(value: string): value is ProductCategory {
  return value === "laptops" || value === "desktops" || value === "accessories" || value === "gadgets"
}

function isCustomProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false
  const v = value as Partial<Product>
  return (
    typeof v.id === "string" &&
    typeof v.slug === "string" &&
    typeof v.name === "string" &&
    typeof v.tagline === "string" &&
    typeof v.price === "number" &&
    typeof v.rating === "number" &&
    typeof v.reviewCount === "number" &&
    typeof v.category === "string" &&
    isProductCategory(v.category) &&
    Array.isArray(v.images) &&
    Array.isArray(v.highlights) &&
    Array.isArray(v.specs)
  )
}

function readCustomProducts(): Product[] {
  if (typeof window === "undefined") return []
  const parsed = safeJsonParse<unknown>(window.localStorage.getItem(STORAGE_KEY))
  if (!Array.isArray(parsed)) return []
  return parsed.filter(isCustomProduct)
}

function writeCustomProducts(next: Product[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function getAllProductsClient(): Product[] {
  const custom = readCustomProducts()
  const bySlug = new Set(products.map((p) => p.slug))
  const dedupedCustom = custom.filter((p) => !bySlug.has(p.slug))
  return [...dedupedCustom, ...products]
}

export function getProductBySlugClient(slug: string): Product | null {
  return getAllProductsClient().find((p) => p.slug === slug) ?? null
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

function uniqueSlug(base: string, taken: Set<string>) {
  if (!taken.has(base)) return base
  let i = 2
  while (taken.has(`${base}-${i}`)) i++
  return `${base}-${i}`
}

export type NewProductInput = {
  name: string
  brand: Product["brand"]
  category: ProductCategory
  tagline: string
  price: number
  image1: string
  image2: string
  image3: string
  highlights?: string
  specs?: string
}

function parseHighlights(raw: string | undefined) {
  const list = (raw ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  return list.length
    ? list.slice(0, 8)
    : ["Clear specs you can scan fast", "Reliable performance you can trust", "Safe checkout, fast fulfillment"]
}

function parseSpecs(raw: string | undefined): Product["specs"] {
  const lines = (raw ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  const specs = lines
    .map((line) => {
      const idx = line.indexOf(":")
      if (idx <= 0) return null
      const label = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      if (!label || !value) return null
      return { label, value }
    })
    .filter(Boolean) as Product["specs"]

  return specs.length
    ? specs.slice(0, 12)
    : [
        { label: "Condition", value: "New" },
        { label: "Warranty", value: "2-year coverage" },
        { label: "Shipping", value: "Tracked" },
      ]
}

export function addCustomProduct(input: NewProductInput): { ok: true; product: Product } | { ok: false; message: string } {
  if (typeof window === "undefined") return { ok: false, message: "This action must run in the browser." }

  const name = input.name.trim()
  const tagline = input.tagline.trim()
  if (!name) return { ok: false, message: "Product name is required." }
  if (!tagline) return { ok: false, message: "Tagline is required." }
  if (!Number.isFinite(input.price) || input.price <= 0) return { ok: false, message: "Price must be a positive number." }

  const taken = new Set(getAllProductsClient().map((p) => p.slug))
  const baseSlug = slugify(name)
  const slug = uniqueSlug(baseSlug || `product-${Date.now()}`, taken)

  const now = Date.now()
  const product: Product = {
    id: `c-${now}`,
    slug,
    name,
    category: input.category,
    tagline,
    price: Math.round(input.price),
    rating: 4.7,
    reviewCount: 24,
    brand: input.brand,
    images: [
      { src: input.image1.trim(), alt: `${name} angle 1` },
      { src: input.image2.trim(), alt: `${name} angle 2` },
      { src: input.image3.trim(), alt: `${name} angle 3` },
    ].filter((i) => i.src) as Product["images"],
    highlights: parseHighlights(input.highlights),
    specs: parseSpecs(input.specs),
  }

  if (product.images.length < 1) return { ok: false, message: "At least 1 image URL/path is required." }

  const custom = readCustomProducts()
  writeCustomProducts([product, ...custom])
  return { ok: true, product }
}

export function deleteCustomProduct(id: string) {
  const custom = readCustomProducts()
  writeCustomProducts(custom.filter((p) => p.id !== id))
}

