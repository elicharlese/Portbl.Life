"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, MapPin, Heart, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"

export default function AccountPage() {
  const { user } = useAuth()

  // Mock user data - in a real app, this would come from Shopify's API
  const userData = {
    joinDate: "January 2023",
    recentOrders: 3,
    savedAddresses: 2,
    wishlistItems: 5,
  }

  return (
    <div className="space-y-8">
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden bg-secondary/10">
            {user?.avatar ? (
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            ) : (
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Member since {userData.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/account/orders"
          className="bg-background border border-border rounded-lg p-6 hover:border-primary transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-muted-foreground">You have {userData.recentOrders} recent orders</p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-background border border-border rounded-lg p-6 hover:border-primary transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Addresses</h3>
              <p className="text-muted-foreground">You have {userData.savedAddresses} saved addresses</p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="bg-background border border-border rounded-lg p-6 hover:border-primary transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Wishlist</h3>
              <p className="text-muted-foreground">You have {userData.wishlistItems} items in your wishlist</p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/settings"
          className="bg-background border border-border rounded-lg p-6 hover:border-primary transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-muted-foreground">Nomad Backpack, Tech Organizer</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$179.98</p>
              <p className="text-sm text-muted-foreground">March 15, 2023</p>
            </div>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div>
              <p className="font-medium">Order #12344</p>
              <p className="text-sm text-muted-foreground">Packable Jacket</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$89.99</p>
              <p className="text-sm text-muted-foreground">February 28, 2023</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Added to Wishlist</p>
              <p className="text-sm text-muted-foreground">Travel Water Bottle</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">February 20, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

