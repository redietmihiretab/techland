import { ProductListing } from "@/components/techland/product-listing"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const sp = await searchParams
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <ProductListing initialCategory={sp.category} initialSort={sp.sort} />
    </div>
  )
}
