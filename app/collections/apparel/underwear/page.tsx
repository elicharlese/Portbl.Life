import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Underwear & Socks | Portbl.life",
  description: "Quick-drying, odor-resistant underwear and socks for extended travel.",
}

// This would normally come from Shopify's API
const getUnderwearProducts = () => {
  // Mock product data
  return [
    {
      id: "under-1",
      handle: "merino-wool-socks",
      title: "Merino Wool Travel Socks (3 Pack)",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Socks"],
      isBestSeller: true,
    },
    {
      id: "under-2",
      handle: "compression-socks",
      title: "Travel Compression Socks",
      price: "14.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Socks"],
    },
    {
      id: "under-3",
      handle: "travel-boxer-briefs",
      title: "Quick-Dry Travel Boxer Briefs (2 Pack)",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Boxers"],
      isNew: true,
    },
    {
      id: "under-4",
      handle: "merino-underwear",
      title: "Merino Wool Underwear",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Merino"],
    },
    {
      id: "under-5",
      handle: "no-show-socks",
      title: "Anti-Blister No-Show Socks (5 Pack)",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Socks"],
      isNew: true,
    },
    {
      id: "under-6",
      handle: "hiking-socks",
      title: "Cushioned Hiking Socks (2 Pack)",
      price: "19.99",
      compareAtPrice: "24.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Underwear", "Socks"],
    },
  ]
}

export default function UnderwearPage() {
  const products = getUnderwearProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Underwear & Socks"
        description="Quick-drying, odor-resistant underwear and socks for extended travel"
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

