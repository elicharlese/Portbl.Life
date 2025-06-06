import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Daypacks | Portbl.life",
  description: "Lightweight, versatile daypacks for everyday adventures and short trips.",
}

// This would normally come from Shopify's API
const getDaypackProducts = () => {
  // Mock product data
  return [
    {
      id: "daypack-1",
      handle: "foldable-daypack",
      title: "Foldable Daypack",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks"],
      isNew: true,
    },
    {
      id: "daypack-2",
      handle: "urban-daypack",
      title: "Urban Explorer Daypack",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks"],
    },
    {
      id: "daypack-3",
      handle: "packable-daypack",
      title: "Packable Ultralight Daypack",
      price: "49.99",
      compareAtPrice: "69.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks"],
      isBestSeller: true,
    },
    {
      id: "daypack-4",
      handle: "hiking-daypack",
      title: "Trail Hiking Daypack",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks", "Outdoor"],
    },
    {
      id: "daypack-5",
      handle: "city-daypack",
      title: "City Commuter Daypack",
      price: "69.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks"],
    },
    {
      id: "daypack-6",
      handle: "waterproof-daypack",
      title: "Waterproof Adventure Daypack",
      price: "99.99",
      compareAtPrice: "119.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Daypacks", "Outdoor"],
      isNew: true,
    },
  ]
}

export default function DaypacksPage() {
  const products = getDaypackProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Daypacks"
        description="Lightweight, versatile daypacks for everyday adventures and short trips"
        productCount={products.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <aside className="lg:col-span-1">
          <Suspense fallback={<div>Loading filters...</div>}>
            <CollectionFilters />
          </Suspense>
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

