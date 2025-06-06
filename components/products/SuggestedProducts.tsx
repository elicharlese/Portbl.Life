import Link from "next/link"
import Image from "next/image"

interface SuggestedProductsProps {
  products: any[]
}

export default function SuggestedProducts({ products }: SuggestedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <div className="relative aspect-square overflow-hidden rounded-md mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
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
    </div>
  )
}

