import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Tech Accessories | Portbl.life",
  description: "Discover our collection of tech accessories designed for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getTechProducts = () => {
  // Mock product data
  return [
    {
      id: "tech-1",
      handle: "tech-organizer",
      title: "Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organization"],
      isBestSeller: true,
    },
    {
      id: "tech-2",
      handle: "wireless-earbuds",
      title: "Noise-Cancelling Wireless Earbuds",
      price: "129.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Audio"],
      isNew: true,
    },
    {
      id: "tech-3",
      handle: "portable-charger",
      title: "Slim Portable Charger",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Charging"],
    },
    {
      id: "tech-4",
      handle: "travel-adapter",
      title: "Universal Travel Adapter",
      price: "34.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Travel"],
      isBestSeller: true,
    },
    {
      id: "tech-5",
      handle: "portable-power-bank",
      title: "20,000mAh Portable Power Bank",
      price: "59.99",
      compareAtPrice: "79.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Charging"],
      isBestSeller: true,
    },
    {
      id: "tech-6",
      handle: "cable-organizer",
      title: "Magnetic Cable Organizer",
      price: "19.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organization"],
    },
  ]
}

export default function TechPage() {
  const products = getTechProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Tech Accessories"
        description="Stay connected anywhere with our tech essentials"
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

