import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Apparel Accessories | Portbl.life",
  description: "Essential apparel accessories for the modern traveler.",
}

// This would normally come from Shopify's API
const getApparelAccessoriesProducts = () => {
  // Mock product data
  return [
    {
      id: "acc-1",
      handle: "travel-scarf",
      title: "Multi-Pocket Travel Scarf",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Scarves"],
      isNew: true,
    },
    {
      id: "acc-2",
      handle: "packable-hat",
      title: "Packable Sun Hat",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Hats"],
      isBestSeller: true,
    },
    {
      id: "acc-3",
      handle: "travel-belt",
      title: "Hidden Pocket Travel Belt",
      price: "24.99",
      compareAtPrice: "34.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Belts"],
    },
    {
      id: "acc-4",
      handle: "merino-beanie",
      title: "Merino Wool Beanie",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Hats"],
    },
    {
      id: "acc-5",
      handle: "travel-gloves",
      title: "Touchscreen-Compatible Travel Gloves",
      price: "34.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Gloves"],
      isNew: true,
    },
    {
      id: "acc-6",
      handle: "neck-gaiter",
      title: "Multi-Function Neck Gaiter",
      price: "19.99",
      compareAtPrice: "24.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories", "Scarves"],
    },
  ]
}

export default function ApparelAccessoriesPage() {
  const products = getApparelAccessoriesProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Apparel Accessories"
        description="Essential apparel accessories for the modern traveler"
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

