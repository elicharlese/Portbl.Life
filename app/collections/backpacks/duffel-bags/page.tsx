import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Duffel Bags | Portbl.life",
  description: "Versatile duffel bags for weekend getaways and gym sessions.",
}

// This would normally come from Shopify's API
const getDuffelBagProducts = () => {
  // Mock product data
  return [
    {
      id: "duffel-1",
      handle: "convertible-duffel-backpack",
      title: "Convertible Duffel Backpack",
      price: "99.99",
      compareAtPrice: "129.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Convertible"],
      isBestSeller: true,
    },
    {
      id: "duffel-2",
      handle: "weekender-duffel",
      title: "Weekender Duffel Bag",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Weekend"],
    },
    {
      id: "duffel-3",
      handle: "packable-duffel",
      title: "Packable Duffel Bag",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Packable"],
      isNew: true,
    },
    {
      id: "duffel-4",
      handle: "waterproof-duffel",
      title: "Waterproof Adventure Duffel",
      price: "119.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Waterproof", "Outdoor"],
    },
    {
      id: "duffel-5",
      handle: "gym-duffel",
      title: "Sport & Gym Duffel Bag",
      price: "69.99",
      compareAtPrice: "79.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Sport"],
    },
    {
      id: "duffel-6",
      handle: "leather-duffel",
      title: "Premium Leather Duffel",
      price: "199.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Duffel Bags", "Leather", "Premium"],
      isNew: true,
    },
  ]
}

export default function DuffelBagsPage() {
  const products = getDuffelBagProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Duffel Bags"
        description="Versatile duffel bags for weekend getaways and gym sessions"
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

