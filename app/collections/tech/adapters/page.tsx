import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Travel Adapters | Portbl.life",
  description: "Universal travel adapters and converters for worldwide connectivity.",
}

// This would normally come from Shopify's API
const getAdaptersProducts = () => {
  // Mock product data
  return [
    {
      id: "adapter-1",
      handle: "universal-travel-adapter",
      title: "Universal Travel Adapter",
      price: "34.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters"],
      isBestSeller: true,
    },
    {
      id: "adapter-2",
      handle: "all-in-one-travel-adapter",
      title: "All-in-One Travel Adapter with USB-C",
      price: "44.99",
      compareAtPrice: "54.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters"],
      isNew: true,
    },
    {
      id: "adapter-3",
      handle: "compact-travel-adapter",
      title: "Compact Travel Adapter",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters", "Compact"],
    },
    {
      id: "adapter-4",
      handle: "voltage-converter",
      title: "Voltage Converter & Adapter",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters", "Converters"],
    },
    {
      id: "adapter-5",
      handle: "usb-travel-adapter",
      title: "USB Travel Adapter with 4 Ports",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters", "USB"],
      isNew: true,
    },
    {
      id: "adapter-6",
      handle: "country-specific-adapter",
      title: "Country-Specific Adapter Set",
      price: "29.99",
      compareAtPrice: "39.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Adapters", "Sets"],
    },
  ]
}

export default function AdaptersPage() {
  const products = getAdaptersProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Travel Adapters"
        description="Universal travel adapters and converters for worldwide connectivity"
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

