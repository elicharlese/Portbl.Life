import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Cable Organizers | Portbl.life",
  description: "Keep your cables tangle-free with our range of cable organizers and management solutions.",
}

// This would normally come from Shopify's API
const getOrganizersProducts = () => {
  // Mock product data
  return [
    {
      id: "org-1",
      handle: "tech-organizer",
      title: "Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers"],
      isBestSeller: true,
    },
    {
      id: "org-2",
      handle: "cable-organizer",
      title: "Magnetic Cable Organizer",
      price: "19.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers", "Cables"],
    },
    {
      id: "org-3",
      handle: "cable-ties",
      title: "Reusable Cable Ties (Pack of 10)",
      price: "12.99",
      compareAtPrice: "16.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers", "Cables"],
    },
    {
      id: "org-4",
      handle: "travel-cable-case",
      title: "Travel Cable Case",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers", "Cases"],
      isNew: true,
    },
    {
      id: "org-5",
      handle: "roll-up-organizer",
      title: "Roll-Up Cable Organizer",
      price: "29.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers", "Roll-Up"],
    },
    {
      id: "org-6",
      handle: "tech-pouch",
      title: "Compact Tech Pouch",
      price: "34.99",
      compareAtPrice: "44.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Tech", "Organizers", "Pouches"],
      isNew: true,
    },
  ]
}

export default function OrganizersPage() {
  const products = getOrganizersProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Cable Organizers"
        description="Keep your cables tangle-free with our range of cable organizers and management solutions"
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

