import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Bottoms | Portbl.life",
  description: "Comfortable, durable bottoms designed for travel and adventure.",
}

// This would normally come from Shopify's API
const getBottomsProducts = () => {
  // Mock product data
  return [
    {
      id: "bottom-1",
      handle: "travel-pants",
      title: "Convertible Travel Pants",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Pants"],
      isBestSeller: true,
    },
    {
      id: "bottom-2",
      handle: "tech-chinos",
      title: "Technical Chino Pants",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Pants"],
      isNew: true,
    },
    {
      id: "bottom-3",
      handle: "hiking-shorts",
      title: "Quick-Dry Hiking Shorts",
      price: "49.99",
      compareAtPrice: "59.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Shorts"],
    },
    {
      id: "bottom-4",
      handle: "travel-jeans",
      title: "Stretch Travel Jeans",
      price: "99.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Jeans"],
    },
    {
      id: "bottom-5",
      handle: "jogger-pants",
      title: "Lightweight Travel Joggers",
      price: "69.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Joggers"],
      isNew: true,
    },
    {
      id: "bottom-6",
      handle: "hybrid-shorts",
      title: "Hybrid Swim/Walk Shorts",
      price: "59.99",
      compareAtPrice: "69.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms", "Shorts"],
    },
  ]
}

export default function BottomsPage() {
  const products = getBottomsProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Bottoms"
        description="Comfortable, durable bottoms designed for travel and adventure"
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

