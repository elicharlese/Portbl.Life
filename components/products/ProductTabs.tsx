"use client"

import { useState } from "react"
import ProductReviews from "./ProductReviews"

interface ProductTabsProps {
  product: any
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div>
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "description"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "specifications"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "shipping"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews ({product.reviews.count})
          </button>
        </div>
      </div>

      <div className="py-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p>
              The Nomad Backpack Pro is designed for the modern traveler who needs to carry their office with them.
              Whether you're working from a café in Bali, a co-working space in Barcelona, or a cabin in the mountains,
              this backpack keeps all your essentials organized and protected.
            </p>
            <p className="mt-4">
              With a dedicated padded laptop compartment that fits devices up to 16 inches, multiple internal pockets
              for cables and accessories, and a hidden anti-theft pocket for your passport and valuables, the Nomad
              Backpack Pro is the ultimate companion for digital nomads.
            </p>
            <p className="mt-4">
              The water-resistant ripstop nylon exterior protects your gear from the elements, while the ergonomic
              shoulder straps and breathable back panel ensure all-day comfort, even when fully packed.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Dimensions</h3>
              <p className="text-muted-foreground">{product.specifications.dimensions}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Weight</h3>
              <p className="text-muted-foreground">{product.specifications.weight}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Materials</h3>
              <p className="text-muted-foreground">{product.specifications.material}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Care Instructions</h3>
              <p className="text-muted-foreground">{product.care}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Warranty</h3>
              <p className="text-muted-foreground">{product.specifications.warranty}</p>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Shipping</h3>
              <p className="text-muted-foreground">{product.shipping}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Standard Shipping (5-7 business days): Free on orders over $75, $7.99 otherwise</li>
                <li>Expedited Shipping (2-3 business days): $14.99</li>
                <li>International Shipping: Available to select countries</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Returns</h3>
              <p className="text-muted-foreground">
                We offer a 30-day return policy on all unused items in their original packaging. Return shipping is free
                for customers in the United States.
              </p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && <ProductReviews product={product} />}
      </div>
    </div>
  )
}

