import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Best Sellers | Portbl.life",
  description: "Our most popular products for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getBestSellersProducts = () => {
  // Mock product data
  return [
    {
      id: "best-1",
      handle: "nomad-backpack-pro",
      title: "Nomad Backpack Pro",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel"],
      isBestSeller: true,
    },
    {
      id: "best-2",
      handle: "tech-organizer",
      title: "Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organization"],
      isBestSeller: true,
    },
    {
      id: "best-3",
      handle: "packing-cubes-set",
      title: "Packing Cubes (Set of 5)",
      price: "39.99",
      compareAtPrice: "49.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Travel"],
      isBestSeller: true,
    },
    {
      id: "best-4",
      handle: "collapsible-water-bottle",
      title: "Collapsible Water Bottle",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Outdoor"],
      isBestSeller: true,
    },
    {
      id: "best-5",
      handle: "travel-adapter",
      title: "Universal Travel Adapter",
      price: "34.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Travel"],
      isBestSeller: true,
    },
    {
      id: "best-6",
      handle: "merino-wool-socks",
      title: "Merino Wool Travel Socks (3 Pack)",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories"],
      isBestSeller: true,
    },
    {
      id: "best-7",
      handle: "portable-power-bank",
      title: "20,000mAh Portable Power Bank",
      price: "59.99",
      compareAtPrice: "79.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Charging"],
      isBestSeller: true,
    },
    {
      id: "best-8",
      handle: "compression-packing-cubes",
      title: "Compression Packing Cubes",
      price: "44.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Travel"],
      isBestSeller: true,
    },
  ]
}

export default function BestSellersPage() {
  const products = getBestSellersProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Best Sellers"
        description="Our most popular products for the modern nomad lifestyle"
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

