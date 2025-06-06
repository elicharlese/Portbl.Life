"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 w-full bg-background shadow-lg z-50" onMouseLeave={onClose}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Backpacks & Bags */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Backpacks & Bags</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/backpacks/daypacks"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Daypacks <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/backpacks/travel-backpacks"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Travel Backpacks <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/backpacks/laptop-bags"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Laptop Bags <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/backpacks/packing-cubes"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Packing Cubes <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/backpacks/duffel-bags"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Duffel Bags <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Accessories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Tech Accessories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/tech/chargers"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Chargers & Power Banks <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/tech/adapters"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Travel Adapters <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/tech/organizers"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Cable Organizers <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/tech/headphones"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Headphones <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/tech/laptop-accessories"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Laptop Accessories <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Apparel */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Apparel</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/apparel/tops"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Tops <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/apparel/bottoms"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Bottoms <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/apparel/outerwear"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Outerwear <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/apparel/underwear"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Underwear & Socks <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/apparel/accessories"
                  className="text-foreground hover:text-primary transition flex items-center"
                >
                  Accessories <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Product */}
          <div className="md:border-l md:border-border md:pl-8">
            <h3 className="text-lg font-semibold mb-4 text-primary">Featured</h3>
            <div className="space-y-4">
              <div className="aspect-square relative rounded overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Featured product"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-medium">Ultimate Travel Backpack</h4>
              <p className="text-sm text-muted-foreground">
                The perfect companion for digital nomads. Weatherproof, spacious, and TSA-friendly.
              </p>
              <Link
                href="/products/ultimate-travel-backpack"
                className="inline-block text-primary font-medium hover:underline"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with popular categories */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/collections/travel-essentials"
              className="bg-secondary/5 p-4 text-center hover:bg-secondary/10 transition"
            >
              Travel Essentials
            </Link>
            <Link
              href="/collections/outdoor-gear"
              className="bg-secondary/5 p-4 text-center hover:bg-secondary/10 transition"
            >
              Outdoor Gear
            </Link>
            <Link
              href="/collections/digital-nomad"
              className="bg-secondary/5 p-4 text-center hover:bg-secondary/10 transition"
            >
              Digital Nomad
            </Link>
            <Link
              href="/collections/new-arrivals"
              className="bg-secondary/5 p-4 text-center hover:bg-secondary/10 transition"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

