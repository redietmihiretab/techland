import { CategoryCards } from "@/components/techland/category-cards"
import { FeaturedProducts } from "@/components/techland/featured-products"
import { HomeHero } from "@/components/techland/home-hero"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <HomeHero />
      <FeaturedProducts />
      <CategoryCards />
    </div>
  );
}
