"use client"

import { useState, useEffect } from "react"
import ProductGrid from "@/components/collections/ProductGrid"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilters from "@/components/collections/CollectionFilters"
import { useProducts } from "@/lib/hooks/useProducts"
import { useSearchParams } from "next/navigation"

export default function AllProductsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceMin: 0,
    priceMax: 1000,
    tags: [] as string[],
    sortBy: 'created_at',
    sortOrder: 'desc' as 'asc' | 'desc',
  })

  const { 
    products, 
    loading, 
    error, 
    hasMore, 
    total, 
    loadMore, 
    refresh,
    clearError 
  } = useProducts({
    category: filters.category || undefined,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    tags: filters.tags.length > 0 ? filters.tags : undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    limit: 12,
  })

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMore()
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleRetry = () => {
    clearError()
    refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader
        title="All Products"
        description="Essential gear for the modern nomad lifestyle"
        productCount={total}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <aside className="lg:col-span-1">
          <CollectionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            totalCount={total}
          />
        </aside>

        <main className="lg:col-span-3">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            onRetry={handleRetry}
          />
        </main>
      </div>
    </div>
  )
}

