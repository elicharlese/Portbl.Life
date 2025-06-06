import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Travel Backpacks | Portbl.life",
  description: "Durable, spacious travel backpacks designed for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getTravelBackpackProducts = () => {
  // Mock product data
  return [
    {
      id: "travel-bp-1",
      handle: "nomad-backpack-pro",
      title: "Nomad Backpack Pro",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks"],
      isBestSeller: true,
    },
    {
      id: "travel-bp-2",
      handle: "ultralight-travel-backpack",
      title: "Ultralight Travel Backpack",
      price: "149.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks"],
      isNew: true,
    },
    {
      id: "travel-bp-3",
      handle: "carry-on-backpack",
      title: "Carry-On Travel Backpack",
      price: "159.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks"],
    },
    {
      id: "travel-bp-4",
      handle: "expandable-travel-backpack",
      title: "Expandable Travel Backpack",
      price: "139.99",
      compareAtPrice: "169.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks"],
      isNew: true,
    },
    {
      id: "travel-bp-5",
      handle: "adventure-travel-backpack",
      title: "Adventure Travel Backpack 40L",
      price: "179.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks", "Outdoor"],
    },
    {
      id: "travel-bp-6",
      handle: "weatherproof-travel-backpack",
      title: "Weatherproof Travel Backpack",
      price: "189.99",
      compareAtPrice: "219.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel Backpacks"],
    },
  ]
}

export default function TravelBackpacksPage() {
  const products = getTravelBackpackProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Travel Backpacks"
        description="Durable, spacious travel backpacks designed for the modern nomad lifestyle"
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

