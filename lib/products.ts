export type ProductCategory = "laptops" | "desktops" | "accessories" | "gadgets"

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  tagline: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  brand: "Samsung" | "Apple" | "HP" | "ASUS" | "Lenovo" | "Dell" | "Acer" | "MSI"
  images: { src: string; alt: string }[]
  highlights: string[]
  specs: ProductSpec[]
}

import productsData from "@/lib/products-data.json"

export const products = productsData as Product[]

export const categories: { id: ProductCategory; title: string; desc: string }[] = [
  { id: "laptops", title: "Laptops", desc: "OLED displays, RTX power, silent thermals." },
  { id: "desktops", title: "Desktops", desc: "Creator-grade towers with tuned airflow." },
  { id: "accessories", title: "Accessories", desc: "Precision peripherals built for speed." },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(value: number) {
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value)
  return `${amount} Birr`
}

export type LegacyProduct = {
  slug: string;
  brand: string;
  model: string;
  name: string;
  subtitle: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    screen?: string;
    os?: string;
    warranty?: string;
  };
};

export const legacyProducts: LegacyProduct[] = [
  {
    slug: "hp-probook-450-g7",
    brand: "HP",
    model: "ProBook 450 G7",
    name: "HP ProBook 450 G7",
    subtitle: 'A practical 15" business laptop for everyday work.',
    price: 899,
    image: {
      src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
      alt: "Silver laptop on a desk",
    },
    specs: {
      cpu: "Intel Core i5-10210U",
      ram: "8GB",
      storage: "512GB SSD",
      screen: '15.6" FHD',
      os: "Windows 11 Pro",
      warranty: "1-year limited warranty",
    },
  },
  {
    slug: "dell-xps-13-9310",
    brand: "Dell",
    model: "XPS 13 9310",
    name: "Dell XPS 13 9310",
    subtitle: "Compact premium ultrabook with a sharp display.",
    price: 1199,
    image: {
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1600&q=80",
      alt: "Laptop with a bright screen on a wooden table",
    },
    specs: {
      cpu: "Intel Core i7-1165G7",
      ram: "16GB",
      storage: "512GB SSD",
      screen: '13.4" FHD+',
      os: "Windows 11 Home",
      warranty: "1-year limited warranty",
    },
  },
  {
    slug: "lenovo-thinkpad-x1-carbon-gen9",
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon Gen 9",
    name: "Lenovo ThinkPad X1 Carbon Gen 9",
    subtitle: "Lightweight business laptop with excellent keyboard feel.",
    price: 1399,
    image: {
      src: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1600&q=80",
      alt: "Black laptop on a dark desk",
    },
    specs: {
      cpu: "Intel Core i7-1185G7",
      ram: "16GB",
      storage: "1TB SSD",
      screen: '14" WUXGA',
      os: "Windows 11 Pro",
      warranty: "3-year depot support",
    },
  },
  {
    slug: "apple-macbook-air-m2",
    brand: "Apple",
    model: "MacBook Air (M2)",
    name: "MacBook Air (M2)",
    subtitle: "Silent, thin, and fast for daily productivity.",
    price: 1099,
    image: {
      src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1600&q=80",
      alt: "MacBook on a minimal workspace",
    },
    specs: {
      cpu: "Apple M2",
      ram: "8GB",
      storage: "256GB SSD",
      screen: '13.6" Liquid Retina',
      os: "macOS",
      warranty: "1-year limited warranty",
    },
  },
  {
    slug: "apple-imac-24-m3",
    brand: "Apple",
    model: 'iMac 24" (M3)',
    name: 'iMac 24" (M3)',
    subtitle: "All‑in‑one desktop with a bright 4.5K display.",
    price: 1599,
    image: {
      src: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern desktop setup with monitor",
    },
    specs: {
      cpu: "Apple M3",
      ram: "8GB",
      storage: "256GB SSD",
      screen: '24" 4.5K Retina',
      os: "macOS",
      warranty: "1-year limited warranty",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

