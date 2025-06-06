import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = [
    { name: "All Tech", href: "/collections/tech" },
    { name: "Chargers & Power Banks", href: "/collections/tech/chargers" },
    { name: "Travel Adapters", href: "/collections/tech/adapters" },
    { name: "Cable Organizers", href: "/collections/tech/organizers" },
    { name: "Headphones", href: "/collections/tech/headphones" },
    { name: "Laptop Accessories", href: "/collections/tech/laptop-accessories" },
  ]

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/collections/all" className="hover:text-primary">
            Collections
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">Tech Accessories</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="px-3 py-1 text-sm bg-secondary/5 hover:bg-secondary/10 rounded-md transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

