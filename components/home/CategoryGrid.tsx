import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Backpacks",
    description: "Carry your world comfortably",
    image: "/placeholder.svg?height=600&width=600",
    link: "/collections/backpacks",
  },
  {
    name: "Tech",
    description: "Stay connected anywhere",
    image: "/placeholder.svg?height=600&width=600",
    link: "/collections/tech",
  },
  {
    name: "Apparel",
    description: "Versatile clothing for any climate",
    image: "/placeholder.svg?height=600&width=600",
    link: "/collections/apparel",
  },
]

export default function CategoryGrid() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">Find exactly what you need for your journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.name}
            className="group relative overflow-hidden rounded-lg aspect-square"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{category.name}</h3>
              <p className="text-sm text-white/80 mb-2">{category.description}</p>
              <span className="text-sm font-medium group-hover:underline">Shop Now</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

