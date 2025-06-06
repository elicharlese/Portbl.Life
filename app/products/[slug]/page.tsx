import { Suspense } from "react"
import ProductGallery from "@/components/products/ProductGallery"
import ProductInfo from "@/components/products/ProductInfo"
import ProductUpsells from "@/components/products/ProductUpsells"
import SuggestedProducts from "@/components/products/SuggestedProducts"
import ProductTabs from "@/components/products/ProductTabs"

// This would normally come from Shopify's API
const getProductBySlug = (slug: string) => {
  // Mock product data
  return {
    id: "prod-1",
    title: "Nomad Backpack Pro",
    slug: "nomad-backpack-pro",
    price: "129.99",
    compareAtPrice: "159.99",
    description:
      "The ultimate backpack for digital nomads. Designed with multiple compartments for your laptop, tech accessories, and travel essentials. Water-resistant material and ergonomic design for all-day comfort.",
    features: [
      "Water-resistant ripstop nylon",
      'Padded laptop sleeve (fits up to 16")',
      "Hidden anti-theft pocket",
      "Ergonomic shoulder straps",
      "Luggage pass-through sleeve",
      "Capacity: 28L",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      {
        id: "var-1",
        title: "Midnight Black",
        price: "129.99",
        available: true,
      },
      {
        id: "var-2",
        title: "Navy Blue",
        price: "129.99",
        available: true,
      },
      {
        id: "var-3",
        title: "Forest Green",
        price: "129.99",
        available: false,
      },
    ],
    specifications: {
      dimensions: '18" x 12" x 8"',
      weight: "2.2 lbs",
      material: "Ripstop Nylon, YKK Zippers",
      warranty: "Lifetime warranty against manufacturing defects",
    },
    care: "Spot clean with mild detergent and water. Do not machine wash. Air dry only.",
    shipping: "Free standard shipping on orders over $75. Expedited shipping available at checkout.",
    reviews: {
      average: 4.8,
      count: 124,
    },
  }
}

// This would normally come from Shopify's API
const getUpsellProducts = () => {
  return [
    {
      id: "ups-1",
      title: "Tech Organizer",
      price: "29.99",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "ups-2",
      title: "Water Bottle Holder",
      price: "14.99",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]
}

// This would normally come from Shopify's API
const getSuggestedProducts = () => {
  return [
    {
      id: "sug-1",
      title: "Travel Packing Cubes (Set of 5)",
      price: "34.99",
      compareAtPrice: "44.99",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "sug-2",
      title: "Portable Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "sug-3",
      title: "Collapsible Water Bottle",
      price: "24.99",
      compareAtPrice: null,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "sug-4",
      title: "Travel Adapter",
      price: "39.99",
      compareAtPrice: "49.99",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  const upsellProducts = getUpsellProducts()
  const suggestedProducts = getSuggestedProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Gallery */}
        <Suspense fallback={<div>Loading gallery...</div>}>
          <ProductGallery images={product.images} title={product.title} />
        </Suspense>

        {/* Product Info and Upsells */}
        <div>
          <Suspense fallback={<div>Loading product info...</div>}>
            <ProductInfo product={product} />
          </Suspense>

          <div className="mt-8">
            <Suspense fallback={<div>Loading upsells...</div>}>
              <ProductUpsells products={upsellProducts} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Product Tabs (Description, Specifications, Reviews) */}
      <div className="mb-16">
        <Suspense fallback={<div>Loading product details...</div>}>
          <ProductTabs product={product} />
        </Suspense>
      </div>

      {/* Suggested Products */}
      <div>
        <Suspense fallback={<div>Loading suggested products...</div>}>
          <SuggestedProducts products={suggestedProducts} />
        </Suspense>
      </div>
    </div>
  )
}

