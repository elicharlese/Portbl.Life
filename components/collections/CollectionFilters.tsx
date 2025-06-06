"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const categories = [
  { id: "backpacks", name: "Backpacks", count: 12 },
  { id: "tech", name: "Tech Accessories", count: 18 },
  { id: "apparel", name: "Apparel", count: 24 },
  { id: "accessories", name: "Accessories", count: 15 },
  { id: "organization", name: "Organization", count: 9 },
]

const priceRanges = [
  { id: "under-25", name: "Under $25", count: 8 },
  { id: "25-50", name: "$25 to $50", count: 15 },
  { id: "50-100", name: "$50 to $100", count: 22 },
  { id: "100-200", name: "$100 to $200", count: 12 },
  { id: "over-200", name: "Over $200", count: 5 },
]

export default function CollectionFilters() {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    color: false,
    size: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => toggleSection("categories")}
          className="flex justify-between items-center w-full font-medium mb-2"
        >
          Categories
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.categories ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.categories && (
          <div className="space-y-2 ml-1">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-foreground flex-grow">
                  {category.name}
                </label>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full font-medium mb-2"
        >
          Price Range
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.price ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2 ml-1">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${range.id}`}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor={`price-${range.id}`} className="ml-2 text-sm text-foreground flex-grow">
                  {range.name}
                </label>
                <span className="text-xs text-muted-foreground">({range.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("color")}
          className="flex justify-between items-center w-full font-medium mb-2"
        >
          Color
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.color ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.color && (
          <div className="space-y-3 ml-1">
            <div className="flex flex-wrap gap-2">
              {["Black", "Navy", "Gray", "Green", "Brown", "Red"].map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${color.toLowerCase()}`}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor={`color-${color.toLowerCase()}`} className="ml-2 text-sm text-foreground">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex justify-between items-center w-full font-medium mb-2"
        >
          Size
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.size ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.size && (
          <div className="space-y-2 ml-1">
            {["Small", "Medium", "Large", "X-Large"].map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={`size-${size.toLowerCase()}`}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor={`size-${size.toLowerCase()}`} className="ml-2 text-sm text-foreground">
                  {size}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition w-full">
          Apply Filters
        </button>
        <button className="mt-2 text-primary hover:underline text-sm w-full text-center">Clear All Filters</button>
      </div>
    </div>
  )
}

