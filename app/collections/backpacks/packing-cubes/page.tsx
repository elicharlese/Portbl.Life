import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Packing Cubes | Portbl.life",
  description: "Space-saving packing cubes and organizers for efficient travel packing.",
}

// This would normally come from Shopify's API
const getPackingCubeProducts = () => {
  // Mock product data
  return [
    {
      id: "cube-1",
      handle: "packing-cubes-set",
      title: "Packing Cubes (Set of 5)",
      price: "39.99",
      compareAtPrice: "49.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes"],
      isBestSeller: true,
    },
    {
      id: "cube-2",
      handle: "compression-packing-cubes",
      title: "Compression Packing Cubes",
      price: "44.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes"],
      isBestSeller: true,
    },
    {
      id: "cube-3",
      handle: "ultralight-packing-cubes",
      title: "Ultralight Packing Cubes",
      price: "34.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes"],
      isNew: true,
    },
    {
      id: "cube-4",
      handle: "waterproof-packing-cubes",
      title: "Waterproof Packing Cubes",
      price: "49.99",
      compareAtPrice: "59.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes", "Waterproof"],
    },
    {
      id: "cube-5",
      handle: "shoe-packing-cubes",
      title: "Shoe Packing Cubes (Set of 2)",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes"],
    },
    {
      id: "cube-6",
      handle: "garment-folder",
      title: "Travel Garment Folder",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Packing Cubes"],
      isNew: true,
    },
  ]
}

export default function PackingCubesPage() {
  const products = getPackingCubeProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Packing Cubes"
        description="Space-saving packing cubes and organizers for efficient travel packing"
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

