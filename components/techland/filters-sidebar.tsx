"use client"

import * as React from "react"
import { SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Filters = {
  brand?: string
  type?: "laptops" | "desktops" | "accessories" | "gadgets"
  minPrice?: number
  maxPrice?: number
  minRating?: 3 | 4 | 4.5
  minRamGb?: 8 | 16 | 32
  gpuTier?: "rtx" | "integrated"
  onSale?: boolean
}

const brands = ["Samsung", "Apple", "HP", "ASUS", "Lenovo", "Dell", "Acer", "MSI"] as const
const types = [
  { id: "laptops", label: "Laptop" },
  { id: "desktops", label: "PC / Desktop" },
  { id: "accessories", label: "Accessory" },
  { id: "gadgets", label: "Gadget" },
] as const

/* ── Collapsible section ── */
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </section>
  )
}

/* ── Styled select ── */
function FilterSelect({
  value,
  onChange,
  label,
  children,
}: {
  value: string
  onChange: (v: string) => void
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-[10px] border border-border bg-background py-2 pl-3 pr-10 text-sm outline-none focus:border-[color:var(--tech-cta)]"
        aria-label={label}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}

/* ── Active chip ── */
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--tech-cta)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--tech-cta)]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:opacity-70"
        aria-label={`Remove ${label} filter`}
      >
        <X className="size-3" />
      </button>
    </span>
  )
}

export function FiltersSidebar({
  value,
  onChange,
  className,
}: {
  value: Filters
  onChange: (next: Filters) => void
  className?: string
}) {
  /* Build active chips */
  const chips: { label: string; clear: () => void }[] = []
  if (value.onSale) chips.push({ label: "On Sale", clear: () => onChange({ ...value, onSale: undefined }) })
  if (value.type) chips.push({ label: value.type, clear: () => onChange({ ...value, type: undefined }) })
  if (value.brand) chips.push({ label: value.brand, clear: () => onChange({ ...value, brand: undefined }) })
  if (value.minRating) chips.push({ label: `${value.minRating}★+`, clear: () => onChange({ ...value, minRating: undefined }) })
  if (value.minRamGb) chips.push({ label: `${value.minRamGb}GB+ RAM`, clear: () => onChange({ ...value, minRamGb: undefined }) })
  if (value.gpuTier) chips.push({ label: value.gpuTier === "rtx" ? "Dedicated GPU" : "Integrated GPU", clear: () => onChange({ ...value, gpuTier: undefined }) })
  if (value.minPrice) chips.push({ label: `Min $${value.minPrice}`, clear: () => onChange({ ...value, minPrice: undefined }) })
  if (value.maxPrice) chips.push({ label: `Max $${value.maxPrice}`, clear: () => onChange({ ...value, maxPrice: undefined }) })

  return (
    <aside className={cn("rounded-[12px] border border-border bg-background p-5 text-foreground", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[color:var(--tech-cta)]" aria-hidden />
          <span className="text-sm font-bold">Filters</span>
        </div>
        {chips.length > 0 && (
          <button
            type="button"
            onClick={() => onChange({})}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <ActiveChip key={c.label} label={c.label} onRemove={c.clear} />
          ))}
        </div>
      )}

      <div className="mt-5 space-y-5 divide-y divide-border">
        {/* Quick picks */}
        <FilterSection title="Quick Picks">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(value.onSale)}
              onChange={(e) => onChange({ ...value, onSale: e.target.checked || undefined })}
              className="size-4 accent-[var(--tech-cta)]"
            />
            <span>On sale only</span>
          </label>
        </FilterSection>

        {/* Device type */}
        <div className="pt-5">
          <FilterSection title="Device Type">
            <FilterSelect
              value={value.type ?? ""}
              onChange={(v) => onChange({ ...value, type: v ? (v as Filters["type"]) : undefined })}
              label="Device type"
            >
              <option value="">All types</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </FilterSelect>
          </FilterSection>
        </div>

        {/* Brand */}
        <div className="pt-5">
          <FilterSection title="Brand">
            <FilterSelect
              value={value.brand ?? ""}
              onChange={(v) => onChange({ ...value, brand: v || undefined })}
              label="Brand"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </FilterSelect>
          </FilterSection>
        </div>

        {/* Rating */}
        <div className="pt-5">
          <FilterSection title="Customer Rating" defaultOpen={false}>
            <FilterSelect
              value={String(value.minRating ?? "")}
              onChange={(v) => onChange({ ...value, minRating: v ? (Number(v) as Filters["minRating"]) : undefined })}
              label="Minimum rating"
            >
              <option value="">Any rating</option>
              <option value="4.5">4.5★ & up</option>
              <option value="4">4.0★ & up</option>
              <option value="3">3.0★ & up</option>
            </FilterSelect>
          </FilterSection>
        </div>

        {/* Performance specs */}
        <div className="pt-5">
          <FilterSection title="Performance" defaultOpen={false}>
            <div className="space-y-2">
              <FilterSelect
                value={String(value.minRamGb ?? "")}
                onChange={(v) => onChange({ ...value, minRamGb: v ? (Number(v) as Filters["minRamGb"]) : undefined })}
                label="Minimum RAM"
              >
                <option value="">Any RAM</option>
                <option value="32">32GB+</option>
                <option value="16">16GB+</option>
                <option value="8">8GB+</option>
              </FilterSelect>
              <FilterSelect
                value={value.gpuTier ?? ""}
                onChange={(v) => onChange({ ...value, gpuTier: v ? (v as Filters["gpuTier"]) : undefined })}
                label="GPU tier"
              >
                <option value="">Any GPU</option>
                <option value="rtx">RTX / Dedicated</option>
                <option value="integrated">Integrated</option>
              </FilterSelect>
            </div>
          </FilterSection>
        </div>

        {/* Price */}
        <div className="pt-5">
          <FilterSection title="Price Range" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-2">
              <input
                inputMode="numeric"
                placeholder="Min $"
                value={value.minPrice ?? ""}
                onChange={(e) => onChange({ ...value, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="h-10 rounded-[10px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-[color:var(--tech-cta)]"
              />
              <input
                inputMode="numeric"
                placeholder="Max $"
                value={value.maxPrice ?? ""}
                onChange={(e) => onChange({ ...value, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="h-10 rounded-[10px] border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-[color:var(--tech-cta)]"
              />
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  )
}
