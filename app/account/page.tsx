"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, MapPin, Heart, Settings } from "lucide-react"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useOrders } from "@/lib/hooks/useOrders"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { LoadingSpinner } from "@/components/ui/loading"

export default function AccountPage() {
  const { user } = useAuth()
  const { orders, loading: ordersLoading, refresh: refreshOrders } = useOrders()
  const { items: wishlist, loading: wishlistLoading, refresh: refreshWishlist } = useWishlist()
  const [userStats, setUserStats] = useState({
    recentOrders: 0,
    wishlistItems: 0,
    joinDate: '',
  })

  useEffect(() => {
    if (user) {
      refreshOrders()
      refreshWishlist()
    }
  }, [user, refreshOrders, refreshWishlist])

  useEffect(() => {
    if (user) {
      const joinDate = new Date(user.created_at || '').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })

      setUserStats({
        recentOrders: orders.length,
        wishlistItems: wishlist.length,
        joinDate,
      })
    }
  }, [user, orders.length, wishlist.length])

  if (!user) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden bg-secondary/10">
            {user?.user_metadata?.avatar_url ? (
              <Image 
                src={user.user_metadata.avatar_url} 
                alt={user.user_metadata?.full_name || 'User'} 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary text-2xl font-semibold">
                {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {user.user_metadata?.full_name || 'Welcome'}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since {userStats.joinDate}
            </p>
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
              <p className="text-muted-foreground">
                {ordersLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `You have ${userStats.recentOrders} recent orders`
                )}
              </p>
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
              <p className="text-muted-foreground">Manage your saved addresses</p>
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
              <p className="text-muted-foreground">
                {wishlistLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `You have ${userStats.wishlistItems} items in your wishlist`
                )}
              </p>
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
        {ordersLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex justify-between items-center pb-4 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium">Order #{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No recent orders to display
          </p>
        )}
      </div>
    </div>
  )
}

