import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Tops | Portbl.life",
  description: "Versatile, travel-friendly tops for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getTopsProducts = () => {
  // Mock product data
  return [
    {
      id: "top-1",
      handle: "merino-travel-hoodie",
      title: "Merino Travel Hoodie",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "Merino"],
      isNew: true,
    },
    {
      id: "top-2",
      handle: "quick-dry-tshirt",
      title: "Quick-Dry Travel T-Shirt",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "T-Shirts"],
    },
    {
      id: "top-3",
      handle: "long-sleeve-henley",
      title: "Merino Wool Long Sleeve Henley",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "Merino"],
      isBestSeller: true,
    },
    {
      id: "top-4",
      handle: "performance-polo",
      title: "Performance Travel Polo",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "Polos"],
    },
    {
      id: "top-5",
      handle: "button-down-shirt",
      title: "Wrinkle-Resistant Button-Down Shirt",
      price: "69.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "Shirts"],
      isNew: true,
    },
    {
      id: "top-6",
      handle: "lightweight-sweater",
      title: "Lightweight Travel Sweater",
      price: "89.99",
      compareAtPrice: "109.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops", "Sweaters"],
    },
  ]
}

export default function TopsPage() {
  const products = getTopsProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Tops"
        description="Versatile, travel-friendly tops for the modern nomad lifestyle"
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

