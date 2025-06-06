import Image from "next/image"
import { Plus } from "lucide-react"

interface ProductUpsellsProps {
  products: any[]
}

export default function ProductUpsells({ products }: ProductUpsellsProps) {
  return (
    <div className="border border-border rounded-lg p-4">
      <h3 className="font-medium mb-4">Frequently Bought Together</h3>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-sm">{product.title}</h4>
              <p className="text-primary text-sm">${product.price}</p>
            </div>
            <button className="flex-shrink-0 bg-secondary/10 hover:bg-secondary/20 text-secondary p-1.5 rounded-full transition">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm">Bundle Price:</span>
          <span className="font-medium">$174.97</span>
        </div>
        <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition">
          Add Bundle to Cart
        </button>
      </div>
    </div>
  )
}

