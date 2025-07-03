"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Filters {
  category: string
  priceMin: number
  priceMax: number
  tags: string[]
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface CollectionFiltersProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  totalCount: number
}

const categories = [
  { id: "backpacks", name: "Backpacks" },
  { id: "tech", name: "Tech Accessories" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" },
  { id: "organization", name: "Organization" },
]

const availableTags = [
  "Travel", "Outdoor", "Tech", "Organization", "Lightweight", 
  "Waterproof", "Durable", "Compact", "Professional", "Casual"
]

const sortOptions = [
  { value: 'created_at', label: 'Newest First', order: 'desc' },
  { value: 'created_at', label: 'Oldest First', order: 'asc' },
  { value: 'title', label: 'Name A-Z', order: 'asc' },
  { value: 'title', label: 'Name Z-A', order: 'desc' },
  { value: 'price', label: 'Price Low to High', order: 'asc' },
  { value: 'price', label: 'Price High to Low', order: 'desc' },
]

export default function CollectionFilters({ 
  filters, 
  onFilterChange, 
  totalCount 
}: CollectionFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    categories: true,
    price: true,
    tags: false,
  })

  const [localPriceRange, setLocalPriceRange] = useState([filters.priceMin, filters.priceMax])

  useEffect(() => {
    setLocalPriceRange([filters.priceMin, filters.priceMax])
  }, [filters.priceMin, filters.priceMax])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      category: filters.category === categoryId ? '' : categoryId
    })
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked 
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag)
    
    onFilterChange({ tags: newTags })
  }

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange(value)
  }

  const handlePriceCommit = (value: number[]) => {
    onFilterChange({
      priceMin: value[0],
      priceMax: value[1]
    })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-')
    onFilterChange({
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc'
    })
  }

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceMin: 0,
      priceMax: 1000,
      tags: [],
      sortBy: 'created_at',
      sortOrder: 'desc'
    })
  }

  const hasActiveFilters = filters.category || 
    filters.priceMin > 0 || 
    filters.priceMax < 1000 || 
    filters.tags.length > 0

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <button
          onClick={() => toggleSection("sort")}
          className="flex justify-between items-center w-full font-medium mb-3"
        >
          Sort By
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.sort ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.sort && (
          <Select 
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem 
                  key={`${option.value}-${option.order}`} 
                  value={`${option.value}-${option.order}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Categories */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("categories")}
          className="flex justify-between items-center w-full font-medium mb-3"
        >
          Categories
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.categories ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.category === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label 
                  htmlFor={`category-${category.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full font-medium mb-3"
        >
          Price Range
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.price ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={localPriceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceCommit}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => toggleSection("tags")}
          className="flex justify-between items-center w-full font-medium mb-3"
        >
          Tags
          <ChevronDown
            className={`h-5 w-5 transition-transform ${expandedSections.tags ? "transform rotate-180" : ""}`}
          />
        </button>
        {expandedSections.tags && (
          <div className="space-y-3">
            {availableTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                />
                <Label 
                  htmlFor={`tag-${tag}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="text-sm text-muted-foreground">
          {totalCount} products found
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
}

