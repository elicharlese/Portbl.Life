import { Suspense } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"

export const metadata = {
  title: "Laptop Bags | Portbl.life",
  description: "Protective, stylish laptop bags and sleeves for digital nomads and professionals.",
}

// This would normally come from Shopify's API
const getLaptopBagProducts = () => {
  // Mock product data
  return [
    {
      id: "laptop-1",
      handle: "professional-laptop-backpack",
      title: "Professional Laptop Backpack",
      price: "119.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Backpacks", "Laptop Bags", "Work"],
      isBestSeller: true,
    },
    {
      id: "laptop-2",
      handle: "slim-laptop-sleeve",
      title: "Slim Laptop Sleeve",
      price: "39.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Laptop Bags", "Sleeves"],
    },
    {
      id: "laptop-3",
      handle: "laptop-messenger-bag",
      title: "Laptop Messenger Bag",
      price: "89.99",
      compareAtPrice: "109.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Laptop Bags", "Messenger"],
      isNew: true,
    },
    {
      id: "laptop-4",
      handle: "waterproof-laptop-bag",
      title: "Waterproof Laptop Bag",
      price: "99.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Laptop Bags", "Waterproof"],
    },
    {
      id: "laptop-5",
      handle: "leather-laptop-briefcase",
      title: "Leather Laptop Briefcase",
      price: "149.99",
      compareAtPrice: "179.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Laptop Bags", "Briefcase", "Leather"],
      isNew: true,
    },
    {
      id: "laptop-6",
      handle: "padded-laptop-sleeve",
      title: "Padded Laptop Sleeve with Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
      tags: ["Laptop Bags", "Sleeves", "Organization"],
    },
  ]
}

export default function LaptopBagsPage() {
  const products = getLaptopBagProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="Laptop Bags"
        description="Protective, stylish laptop bags and sleeves for digital nomads and professionals"
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

