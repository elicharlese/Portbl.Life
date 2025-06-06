import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Outerwear | Portbl.life",
  description: "Packable, versatile outerwear for changing climates and weather conditions.",
}

// This would normally come from Shopify's API
const getOuterwearProducts = () => {
  // Mock product data
  return [
    {
      id: "outer-1",
      handle: "packable-rain-jacket",
      title: "Packable Rain Jacket",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Jackets"],
      isNew: true,
    },
    {
      id: "outer-2",
      handle: "lightweight-down-jacket",
      title: "Ultralight Down Jacket",
      price: "149.99",
      compareAtPrice: "179.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Jackets"],
      isBestSeller: true,
    },
    {
      id: "outer-3",
      handle: "travel-vest",
      title: "Insulated Travel Vest",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Vests"],
    },
    {
      id: "outer-4",
      handle: "windbreaker",
      title: "Packable Windbreaker",
      price: "69.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Jackets"],
    },
    {
      id: "outer-5",
      handle: "softshell-jacket",
      title: "All-Weather Softshell Jacket",
      price: "129.99",
      compareAtPrice: "149.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Jackets"],
      isNew: true,
    },
    {
      id: "outer-6",
      handle: "fleece-pullover",
      title: "Lightweight Fleece Pullover",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear", "Fleece"],
    },
  ]
}

export default function OuterwearPage() {
  const products = getOuterwearProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Outerwear"
        description="Packable, versatile outerwear for changing climates and weather conditions"
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

