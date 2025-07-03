"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import CartSummary from "@/components/checkout/CartSummary"
import { useCart } from "@/lib/contexts/CartContext"
import { useAuth } from "@/lib/contexts/AuthContext"
import { LoadingSpinner } from "@/components/ui/loading"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart,
    loading,
    subtotal,
    itemCount
  } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>({})

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      setUpdatingItems(prev => ({ ...prev, [itemId]: true }))
      await updateQuantity(itemId, newQuantity)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update quantity",
        variant: "destructive",
      })
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }))
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem(itemId)
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item",
        variant: "destructive",
      })
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to clear cart",
        variant: "destructive",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  // Calculate shipping
  const estimatedShipping = subtotal > 75 ? 0 : 7.99
  const finalTotal = subtotal + estimatedShipping

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-background border border-border rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/collections/all"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-medium">Cart Items ({itemCount})</h2>
              </div>

              <div>
                {items.map((item) => (
                  <div key={item.id} className="p-6 border-b border-border flex flex-col sm:flex-row gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <Image 
                        src={item.product.image || "/placeholder.svg"} 
                        alt={item.product.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">
                            <Link 
                              href={`/products/${item.product.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                          <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingItems[item.id] || item.quantity <= 1}
                            className="h-8 w-8 p-0"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-1 min-w-[3rem] text-center">
                            {updatingItems[item.id] ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItems[item.id]}
                            className="h-8 w-8 p-0"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 flex justify-between items-center">
                <Link href="/collections/all" className="text-primary hover:underline flex items-center">
                  Continue Shopping
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary 
              subtotal={subtotal} 
              shipping={estimatedShipping} 
              total={finalTotal} 
            />

            <div className="mt-6">
              <Link
                href={user ? "/checkout" : "/auth/sign-in?redirect=/checkout"}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition flex items-center justify-center"
              >
                {user ? 'Proceed to Checkout' : 'Sign In to Checkout'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {subtotal > 0 && subtotal < 75 && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Add {formatPrice(75 - subtotal)} more to get free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

