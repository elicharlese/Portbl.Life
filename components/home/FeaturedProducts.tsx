"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useShopify } from "@/lib/shopify/hooks"
import type { Product } from "@/lib/shopify/types"

export default function FeaturedProducts() {
  const { getFeaturedProducts } = useShopify()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const featuredProducts = await getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Error loading featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [getFeaturedProducts])

  // Placeholder products for preview
  const placeholderProducts = [
    {
      id: "1",
      handle: "nomad-backpack",
      title: "Nomad Backpack",
      price: "129.99",
      compareAtPrice: "159.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "2",
      handle: "tech-organizer",
      title: "Tech Organizer",
      price: "49.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "3",
      handle: "packable-jacket",
      title: "Packable Jacket",
      price: "89.99",
      compareAtPrice: "119.99",
      imageSrc: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "4",
      handle: "travel-water-bottle",
      title: "Collapsible Water Bottle",
      price: "24.99",
      compareAtPrice: null,
      imageSrc: "/placeholder.svg?height=600&width=600",
    },
  ]

  const displayProducts = loading || products.length === 0 ? placeholderProducts : products

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
        <p className="text-muted-foreground">Essentials for the modern nomad lifestyle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <Link href={`/products/${product.handle}`} key={product.id} className="group">
            <div className="relative aspect-square overflow-hidden rounded-md mb-4">
              <Image
                src={product.imageSrc || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              {product.compareAtPrice && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                  Sale
                </div>
              )}
            </div>
            <h3 className="font-medium">{product.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-primary font-medium">${product.price}</span>
              {product.compareAtPrice && (
                <span className="ml-2 text-muted-foreground line-through text-sm">${product.compareAtPrice}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/collections/all"
          className="inline-block border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}

