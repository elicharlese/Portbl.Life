"use client"

import type React from "react"

import { useState } from "react"
import { Star, ShoppingBag, Heart, Share2 } from "lucide-react"

interface ProductInfoProps {
  product: any
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number.parseInt(e.target.value))
  }

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v: any) => v.id === variantId)
    if (variant) {
      setSelectedVariant(variant)
    }
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Reviews */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.reviews.average)
                    ? "fill-primary text-primary"
                    : "fill-muted stroke-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {product.reviews.average} ({product.reviews.count} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center">
        <span className="text-2xl font-bold">${selectedVariant.price}</span>
        {product.compareAtPrice && (
          <span className="ml-2 text-lg text-muted-foreground line-through">${product.compareAtPrice}</span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-muted-foreground">{product.description}</p>

      {/* Variants */}
      {product.variants.length > 1 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant: any) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant.id)}
                disabled={!variant.available}
                className={`px-4 py-2 rounded-md border ${
                  selectedVariant.id === variant.id ? "border-primary bg-primary/5" : "border-border"
                } ${!variant.available ? "opacity-50 cursor-not-allowed" : "hover:border-primary"}`}
              >
                {variant.title}
                {!variant.available && " (Out of Stock)"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quantity</h3>
        <select
          value={quantity}
          onChange={handleQuantityChange}
          className="w-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Features List */}
      <div>
        <h3 className="text-sm font-medium mb-3">Features</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {product.features.map((feature: string, index: number) => (
            <li key={index} className="text-muted-foreground">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Add to Cart and Actions */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <button
            disabled={!selectedVariant.available}
            className={`flex-1 flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium ${
              !selectedVariant.available ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
            } transition`}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            {selectedVariant.available ? "Add to Cart" : "Out of Stock"}
          </button>
          <button
            className="p-3 border border-border rounded-md hover:border-primary transition"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-3 border border-border rounded-md hover:border-primary transition"
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

