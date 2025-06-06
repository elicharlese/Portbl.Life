import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Backpacks | Portbl.life",
  description: "Discover our collection of backpacks designed for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getBackpackProducts = () => {
  // Mock product data
  return [
    {
      id: "bp-1",
      handle: "nomad-backpack-pro",
      title: "Nomad Backpack Pro",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel"],
      isBestSeller: true,
    },
    {
      id: "bp-2",
      handle: "ultralight-travel-backpack",
      title: "Ultralight Travel Backpack",
      price: "149.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel"],
      isNew: true,
    },
    {
      id: "bp-3",
      handle: "foldable-daypack",
      title: "Foldable Daypack",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Outdoor"],
      isNew: true,
    },
    {
      id: "bp-4",
      handle: "laptop-backpack",
      title: "Professional Laptop Backpack",
      price: "119.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Work"],
    },
    {
      id: "bp-5",
      handle: "camera-backpack",
      title: "Camera Gear Backpack",
      price: "139.99",
      compareAtPrice: "169.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Photography"],
    },
    {
      id: "bp-6",
      handle: "hiking-backpack",
      title: "Lightweight Hiking Backpack",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Outdoor"],
    },
  ]
}

export default function BackpacksPage() {
  const products = getBackpackProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Backpacks"
        description="Carry your world comfortably with our range of backpacks"
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

