import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { User, Package, MapPin, Heart, Settings } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1">
            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center px-4 py-3 text-foreground hover:bg-secondary/5 rounded-md"
              >
                <User className="mr-3 h-5 w-5 text-primary" />
                Profile
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center px-4 py-3 text-foreground hover:bg-secondary/5 rounded-md"
              >
                <Package className="mr-3 h-5 w-5 text-primary" />
                Orders
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center px-4 py-3 text-foreground hover:bg-secondary/5 rounded-md"
              >
                <MapPin className="mr-3 h-5 w-5 text-primary" />
                Addresses
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center px-4 py-3 text-foreground hover:bg-secondary/5 rounded-md"
              >
                <Heart className="mr-3 h-5 w-5 text-primary" />
                Wishlist
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center px-4 py-3 text-foreground hover:bg-secondary/5 rounded-md"
              >
                <Settings className="mr-3 h-5 w-5 text-primary" />
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

