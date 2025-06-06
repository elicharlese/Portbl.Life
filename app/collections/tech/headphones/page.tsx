import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Headphones | Portbl.life",
  description: "Premium headphones and earbuds for immersive audio on the go.",
}

// This would normally come from Shopify's API
const getHeadphonesProducts = () => {
  // Mock product data
  return [
    {
      id: "hp-1",
      handle: "wireless-earbuds",
      title: "Noise-Cancelling Wireless Earbuds",
      price: "129.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Earbuds"],
      isNew: true,
    },
    {
      id: "hp-2",
      handle: "over-ear-headphones",
      title: "Premium Over-Ear Headphones",
      price: "199.99",
      compareAtPrice: "249.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Over-Ear"],
      isBestSeller: true,
    },
    {
      id: "hp-3",
      handle: "travel-headphones",
      title: "Foldable Travel Headphones",
      price: "149.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Travel"],
    },
    {
      id: "hp-4",
      handle: "sleep-headphones",
      title: "Sleep Headphones Headband",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Sleep"],
      isNew: true,
    },
    {
      id: "hp-5",
      handle: "sport-earbuds",
      title: "Waterproof Sport Earbuds",
      price: "89.99",
      compareAtPrice: "109.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Earbuds", "Sport"],
    },
    {
      id: "hp-6",
      handle: "wired-earbuds",
      title: "High-Fidelity Wired Earbuds",
      price: "59.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Headphones", "Earbuds", "Wired"],
    },
  ]
}

export default function HeadphonesPage() {
  const products = getHeadphonesProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Headphones"
        description="Premium headphones and earbuds for immersive audio on the go"
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

