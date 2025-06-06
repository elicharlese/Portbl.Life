import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "New Arrivals | Portbl.life",
  description: "Discover our latest products for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getNewArrivalsProducts = () => {
  // Mock product data
  return [
    {
      id: "new-1",
      handle: "ultralight-travel-backpack",
      title: "Ultralight Travel Backpack",
      price: "149.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel"],
      isNew: true,
    },
    {
      id: "new-2",
      handle: "foldable-daypack",
      title: "Foldable Daypack",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Outdoor"],
      isNew: true,
    },
    {
      id: "new-3",
      handle: "merino-travel-hoodie",
      title: "Merino Travel Hoodie",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops"],
      isNew: true,
    },
    {
      id: "new-4",
      handle: "quick-dry-travel-towel",
      title: "Quick-Dry Travel Towel",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Outdoor"],
      isNew: true,
    },
    {
      id: "new-5",
      handle: "compact-travel-pillow",
      title: "Compact Travel Pillow",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Travel"],
      isNew: true,
    },
    {
      id: "new-6",
      handle: "wireless-earbuds",
      title: "Noise-Cancelling Wireless Earbuds",
      price: "129.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Audio"],
      isNew: true,
    },
    {
      id: "new-7",
      handle: "packable-rain-jacket",
      title: "Packable Rain Jacket",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear"],
      isNew: true,
    },
    {
      id: "new-8",
      handle: "travel-document-organizer",
      title: "Travel Document Organizer",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Organization"],
      isNew: true,
    },
  ]
}

export default function NewArrivalsPage() {
  const products = getNewArrivalsProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="New Arrivals"
        description="Our latest products for the modern nomad lifestyle"
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

