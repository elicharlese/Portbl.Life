import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Apparel | Portbl.life",
  description: "Discover our collection of versatile apparel designed for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getApparelProducts = () => {
  // Mock product data
  return [
    {
      id: "app-1",
      handle: "merino-travel-hoodie",
      title: "Merino Travel Hoodie",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops"],
      isNew: true,
    },
    {
      id: "app-2",
      handle: "packable-rain-jacket",
      title: "Packable Rain Jacket",
      price: "89.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Outerwear"],
      isNew: true,
    },
    {
      id: "app-3",
      handle: "merino-wool-socks",
      title: "Merino Wool Travel Socks (3 Pack)",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories"],
      isBestSeller: true,
    },
    {
      id: "app-4",
      handle: "travel-pants",
      title: "Convertible Travel Pants",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Bottoms"],
    },
    {
      id: "app-5",
      handle: "compression-socks",
      title: "Travel Compression Socks",
      price: "14.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories"],
    },
    {
      id: "app-6",
      handle: "quick-dry-tshirt",
      title: "Quick-Dry Travel T-Shirt",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Tops"],
    },
  ]
}

export default function ApparelPage() {
  const products = getApparelProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Apparel"
        description="Versatile clothing for any climate or adventure"
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

