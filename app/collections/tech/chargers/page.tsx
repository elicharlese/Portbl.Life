import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Chargers & Power Banks | Portbl.life",
  description: "Stay powered up anywhere with our range of portable chargers and power banks.",
}

// This would normally come from Shopify's API
const getChargersProducts = () => {
  // Mock product data
  return [
    {
      id: "charger-1",
      handle: "portable-power-bank",
      title: "20,000mAh Portable Power Bank",
      price: "59.99",
      compareAtPrice: "79.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Power Banks"],
      isBestSeller: true,
    },
    {
      id: "charger-2",
      handle: "slim-portable-charger",
      title: "Slim 10,000mAh Portable Charger",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Power Banks"],
    },
    {
      id: "charger-3",
      handle: "solar-power-bank",
      title: "Solar Power Bank 25,000mAh",
      price: "79.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Power Banks", "Solar"],
      isNew: true,
    },
    {
      id: "charger-4",
      handle: "wireless-power-bank",
      title: "Wireless Charging Power Bank",
      price: "49.99",
      compareAtPrice: "69.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Power Banks", "Wireless"],
    },
    {
      id: "charger-5",
      handle: "gan-wall-charger",
      title: "65W GaN Wall Charger",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Wall Chargers"],
      isNew: true,
    },
    {
      id: "charger-6",
      handle: "multi-port-charger",
      title: "4-Port USB Travel Charger",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Chargers", "Wall Chargers"],
    },
  ]
}

export default function ChargersPage() {
  const products = getChargersProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Chargers & Power Banks"
        description="Stay powered up anywhere with our range of portable chargers and power banks"
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

