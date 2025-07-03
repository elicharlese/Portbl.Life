"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import ProductGallery from "@/components/products/ProductGallery"
import ProductInfo from "@/components/products/ProductInfo"
import ProductUpsells from "@/components/products/ProductUpsells"
import SuggestedProducts from "@/components/products/SuggestedProducts"
import ProductTabs from "@/components/products/ProductTabs"
import { useProduct, useProducts } from "@/lib/hooks/useProducts"
import { ProductDetailSkeleton } from "@/components/ui/loading"
import { ErrorDisplay } from "@/components/ui/error"

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { product, loading, error, refresh } = useProduct(params.slug)
  const { 
    products: suggestedProducts, 
    loading: suggestedLoading,
    error: suggestedError,
    refresh: refreshSuggested
  } = useProducts({ 
    limit: 4,
    initialLoad: false
  })

  useEffect(() => {
    // Load suggested products when we have the main product
    if (product && !suggestedLoading && suggestedProducts.length === 0) {
      refreshSuggested()
    }
  }, [product, suggestedLoading, suggestedProducts.length, refreshSuggested])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay
          error={error}
          title="Failed to load product"
          onRetry={refresh}
        />
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  // Get upsell products based on product tags or category
  const getUpsellProducts = () => {
    const relatedProducts = suggestedProducts
      .filter(p => 
        p.id !== product.id && 
        p.tags.some(tag => product.tags.includes(tag))
      )
      .slice(0, 2)
      .map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        price: p.variants[0]?.price || 0,
        image: p.images[0]?.url || '',
        variant: p.variants[0]
      }))

    return relatedProducts
  }

  const formatProductForTabs = (product: any) => ({
    description: product.description || '',
    features: extractFeatures(product.description || ''),
    specifications: {
      vendor: product.vendor || 'Portbl',
      productType: product.productType || 'Product',
      tags: product.tags.join(', '),
      createdAt: new Date(product.createdAt).toLocaleDateString(),
      sku: product.variants[0]?.sku || 'N/A',
      weight: product.variants[0]?.weight ? `${product.variants[0].weight} ${product.variants[0].weightUnit}` : 'N/A',
    },
    care: "Spot clean with mild detergent and water. Do not machine wash. Air dry only.",
    shipping: "Free standard shipping on orders over $75. Expedited shipping available at checkout.",
    reviews: {
      average: product.averageRating || 0,
      count: product.reviewCount || 0,
    },
  })

  const extractFeatures = (description: string): string[] => {
    // Simple feature extraction from description
    const sentences = description.split('.').filter(s => s.trim().length > 0)
    return sentences.slice(0, 5).map(s => s.trim())
  }

  const formatProductForInfo = (product: any) => ({
    ...product,
    price: product.variants[0]?.price?.toString() || '0',
    compareAtPrice: product.variants[0]?.compareAtPrice?.toString() || null,
    variants: product.variants.map((v: any) => ({
      id: v.id,
      title: v.title,
      price: v.price.toString(),
      available: v.inventory > 0,
      inventory: v.inventory,
      options: v.options
    })),
    reviews: {
      average: product.averageRating || 0,
      count: product.reviewCount || 0,
    }
  })

  const upsellProducts = getUpsellProducts()
  const formattedProduct = formatProductForInfo(product)
  const productForTabs = formatProductForTabs(product)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Gallery */}
        <ProductGallery 
          images={product.images.map(img => img.url)} 
          title={product.title} 
        />

        {/* Product Info and Upsells */}
        <div>
          <ProductInfo product={formattedProduct} />

          {upsellProducts.length > 0 && (
            <div className="mt-8">
              <ProductUpsells products={upsellProducts} />
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs (Description, Specifications, Reviews) */}
      <div className="mb-16">
        <ProductTabs product={productForTabs} />
      </div>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div>
          <SuggestedProducts 
            products={suggestedProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(p => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                price: p.variants[0]?.price?.toString() || '0',
                compareAtPrice: p.variants[0]?.compareAtPrice?.toString() || null,
                image: p.images[0]?.url || '',
              }))
            }
          />
        </div>
      )}

      {suggestedError && (
        <div className="mt-8">
          <ErrorDisplay
            error={suggestedError}
            title="Failed to load suggested products"
            onRetry={refreshSuggested}
          />
        </div>
      )}
    </div>
  )
}

