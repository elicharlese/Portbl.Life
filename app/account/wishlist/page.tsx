"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react"

// Mock wishlist data - in a real app, this would come from Shopify's API
const initialWishlistItems = [
  {
    id: "prod-1",
    name: "Nomad Backpack",
    price: "$129.99",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Solar Power Bank",
    price: "$59.99",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "prod-8",
    name: "Merino Wool Travel Hoodie",
    price: "$149.99",
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
  },
  {
    id: "prod-9",
    name: "Ultralight Travel Pillow",
    price: "$29.99",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "prod-10",
    name: "Noise-Cancelling Earbuds",
    price: "$99.99",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <p className="text-muted-foreground">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-background border border-border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later.</p>
          <Link
            href="/collections/all"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition inline-block"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-background border border-border rounded-lg overflow-hidden group">
              <div className="relative">
                <Link href={`/products/${item.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full hover:bg-background transition"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium mb-1 hover:text-primary transition">{item.name}</h3>
                </Link>
                <p className="text-primary font-medium mb-3">{item.price}</p>
                {item.inStock ? (
                  <button className="w-full flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center bg-muted text-muted-foreground px-4 py-2 rounded-md cursor-not-allowed"
                    disabled
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

