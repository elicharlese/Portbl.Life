import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "All Products | Portbl.life",
  description: "Browse our complete collection of essentials for the modern nomad lifestyle.",
}

// This would normally come from Shopify's API
const getAllProducts = () => {
  // Combine products from other collections
  const newArrivalsProducts = [
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
  ]

  const bestSellersProducts = [
    {
      id: "best-1",
      handle: "nomad-backpack-pro",
      title: "Nomad Backpack Pro",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Travel"],
      isBestSeller: true,
    },
    {
      id: "best-2",
      handle: "tech-organizer",
      title: "Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organization"],
      isBestSeller: true,
    },
    {
      id: "best-3",
      handle: "packing-cubes-set",
      title: "Packing Cubes (Set of 5)",
      price: "39.99",
      compareAtPrice: "49.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Organization", "Travel"],
      isBestSeller: true,
    },
    {
      id: "best-4",
      handle: "collapsible-water-bottle",
      title: "Collapsible Water Bottle",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Outdoor"],
      isBestSeller: true,
    },
  ]

  const otherProducts = [
    {
      id: "other-1",
      handle: "travel-sleep-mask",
      title: "Premium Travel Sleep Mask",
      price: "19.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Travel"],
    },
    {
      id: "other-2",
      handle: "compression-socks",
      title: "Travel Compression Socks",
      price: "14.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Apparel", "Accessories"],
    },
    {
      id: "other-3",
      handle: "travel-wallet",
      title: "RFID-Blocking Travel Wallet",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Accessories", "Organization"],
    },
    {
      id: "other-4",
      handle: "portable-charger",
      title: "Slim Portable Charger",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Charging"],
    },
  ]

  return [...newArrivalsProducts, ...bestSellersProducts, ...otherProducts]
}

export default function AllProductsPage() {
  const products = getAllProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="All Products"
        description="Essential gear for the modern nomad lifestyle"
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

