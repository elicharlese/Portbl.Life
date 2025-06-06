import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Laptop Accessories | Portbl.life",
  description: "Essential laptop accessories for digital nomads and remote workers.",
}

// This would normally come from Shopify's API
const getLaptopAccessoriesProducts = () => {
  // Mock product data
  return [
    {
      id: "la-1",
      handle: "laptop-stand",
      title: "Portable Laptop Stand",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories"],
      isBestSeller: true,
    },
    {
      id: "la-2",
      handle: "laptop-sleeve",
      title: "Slim Laptop Sleeve",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories", "Protection"],
    },
    {
      id: "la-3",
      handle: "laptop-cooling-pad",
      title: "Laptop Cooling Pad",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories", "Cooling"],
    },
    {
      id: "la-4",
      handle: "usb-c-hub",
      title: "USB-C Hub Adapter",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories", "Adapters"],
      isNew: true,
    },
    {
      id: "la-5",
      handle: "laptop-privacy-screen",
      title: "Laptop Privacy Screen",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories", "Privacy"],
    },
    {
      id: "la-6",
      handle: "foldable-keyboard",
      title: "Foldable Bluetooth Keyboard",
      price: "69.99",
      compareAtPrice: "89.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Laptop Accessories", "Keyboards"],
      isNew: true,
    },
  ]
}

export default function LaptopAccessoriesPage() {
  const products = getLaptopAccessoriesProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Laptop Accessories"
        description="Essential laptop accessories for digital nomads and remote workers"
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

