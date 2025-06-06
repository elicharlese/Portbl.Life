import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ApparelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = [
    { name: "All Apparel", href: "/collections/apparel" },
    { name: "Tops", href: "/collections/apparel/tops" },
    { name: "Bottoms", href: "/collections/apparel/bottoms" },
    { name: "Outerwear", href: "/collections/apparel/outerwear" },
    { name: "Underwear & Socks", href: "/collections/apparel/underwear" },
    { name: "Accessories", href: "/collections/apparel/accessories" },
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
          <span className="text-foreground">Apparel</span>
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

