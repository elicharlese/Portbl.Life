import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  handle: string
  title: string
  price: string
  compareAtPrice: string | null
  imageSrc: string
  tags?: string[]
  isNew?: boolean
  isBestSeller?: boolean
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
              {product.isNew && !product.compareAtPrice && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  New
                </div>
              )}
              {product.isBestSeller && !product.compareAtPrice && !product.isNew && (
                <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                  Best Seller
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
            {product.tags && (
              <div className="mt-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}

