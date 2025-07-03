import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/contexts/CartContext"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { useAuth } from "@/lib/contexts/AuthContext"
import { ProductGridSkeleton } from "@/components/ui/loading"
import { ErrorDisplay } from "@/components/ui/error"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  slug: string
  title: string
  description?: string
  status: string
  images: Array<{
    id: string
    url: string
    altText?: string
    position: number
  }>
  variants: Array<{
    id: string
    title: string
    price: number
    compareAtPrice?: number
    inventory: number
    options: Record<string, string>
  }>
  averageRating?: number
  reviewCount?: number
  tags?: string[]
}

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  error?: string | null
  onLoadMore?: () => void
  hasMore?: boolean
  onRetry?: () => void
}

export default function ProductGrid({ 
  products, 
  loading = false, 
  error = null, 
  onLoadMore, 
  hasMore = false,
  onRetry 
}: ProductGridProps) {
  const { addItem, loading: cartLoading } = useCart()
  const { toggleWishlist, isInWishlist, loading: wishlistLoading } = useWishlist()
  const { user } = useAuth()
  const { toast } = useToast()
  const [actionLoadingStates, setActionLoadingStates] = useState<Record<string, boolean>>({})

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.variants || product.variants.length === 0) {
      toast({
        title: "Error",
        description: "This product has no available variants",
        variant: "destructive",
      })
      return
    }

    const defaultVariant = product.variants[0]
    if (!defaultVariant || defaultVariant.inventory <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      })
      return
    }

    try {
      setActionLoadingStates(prev => ({ ...prev, [`cart-${product.id}`]: true }))
      await addItem(product.id, defaultVariant.id, 1)
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setActionLoadingStates(prev => ({ ...prev, [`cart-${product.id}`]: false }))
    }
  }

  const handleWishlistToggle = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    try {
      setActionLoadingStates(prev => ({ ...prev, [`wishlist-${product.id}`]: true }))
      await toggleWishlist(product.id)
      toast({
        title: isInWishlist(product.id) ? "Removed from Wishlist" : "Added to Wishlist",
        description: `${product.title} has been ${isInWishlist(product.id) ? 'removed from' : 'added to'} your wishlist`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update wishlist",
        variant: "destructive",
      })
    } finally {
      setActionLoadingStates(prev => ({ ...prev, [`wishlist-${product.id}`]: false }))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const getMainImage = (product: Product) => {
    return product.images.find(img => img.position === 0) || product.images[0]
  }

  const getLowestPrice = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return null
    return Math.min(...product.variants.map(v => v.price))
  }

  const getCompareAtPrice = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return null
    const variantsWithCompare = product.variants.filter(v => v.compareAtPrice && v.compareAtPrice > v.price)
    if (variantsWithCompare.length === 0) return null
    return Math.min(...variantsWithCompare.map(v => v.compareAtPrice!))
  }

  const isOnSale = (product: Product) => {
    return product.variants?.some(v => v.compareAtPrice && v.compareAtPrice > v.price) || false
  }

  const isInStock = (product: Product) => {
    return product.variants?.some(v => v.inventory > 0) || false
  }

  if (loading && products.length === 0) {
    return <ProductGridSkeleton count={8} />
  }

  if (error && products.length === 0) {
    return (
      <ErrorDisplay
        error={error}
        title="Failed to load products"
        onRetry={onRetry}
        className="my-8"
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const mainImage = getMainImage(product)
          const lowestPrice = getLowestPrice(product)
          const compareAtPrice = getCompareAtPrice(product)
          const onSale = isOnSale(product)
          const inStock = isInStock(product)
          const inWishlist = isInWishlist(product.id)

          return (
            <div key={product.id} className="group relative">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
                  {mainImage ? (
                    <Image
                      src={mainImage.url}
                      alt={mainImage.altText || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {onSale && (
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Sale
                      </div>
                    )}
                    {!inStock && (
                      <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant={inWishlist ? "default" : "outline"}
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleWishlistToggle(product, e)}
                      disabled={actionLoadingStates[`wishlist-${product.id}`] || wishlistLoading}
                    >
                      <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Quick add to cart */}
                  {inStock && (
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={actionLoadingStates[`cart-${product.id}`] || cartLoading}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {actionLoadingStates[`cart-${product.id}`] ? 'Adding...' : 'Add to Cart'}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  {product.averageRating && product.reviewCount && (
                    <div className="flex items-center gap-1 text-sm">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.averageRating!)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500">({product.reviewCount})</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {lowestPrice && (
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {formatPrice(lowestPrice)}
                      </span>
                    )}
                    {compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Loading more products */}
      {loading && products.length > 0 && (
        <div className="mt-8">
          <ProductGridSkeleton count={4} />
        </div>
      )}

      {/* Load more button */}
      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <Button onClick={onLoadMore} variant="outline">
            Load More Products
          </Button>
        </div>
      )}

      {/* No products message */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Error at bottom */}
      {error && products.length > 0 && (
        <div className="mt-8">
          <ErrorDisplay
            error={error}
            title="Failed to load more products"
            onRetry={onRetry}
          />
        </div>
      )}
    </div>
  )
}

