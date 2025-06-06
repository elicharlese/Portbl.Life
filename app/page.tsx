import Hero from "@/components/home/Hero"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategoryGrid from "@/components/home/CategoryGrid"
import ValueProposition from "@/components/home/ValueProposition"

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <ValueProposition />
    </div>
  )
}

