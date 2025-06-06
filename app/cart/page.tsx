"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import CartSummary from "@/components/checkout/CartSummary"

// Mock cart data - in a real app, this would come from Shopify's API
const initialCartItems = [
  {
    id: "cart-1",
    productId: "prod-1",
    title: "Nomad Backpack Pro",
    variant: "Midnight Black",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "cart-2",
    productId: "prod-7",
    title: "Solar Power Bank",
    variant: "Silver",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const estimatedShipping = subtotal > 75 ? 0 : 7.99
  const total = subtotal + estimatedShipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
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
                <h2 className="font-medium">Cart Items ({cartItems.length})</h2>
              </div>

              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 border-b border-border flex flex-col sm:flex-row gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 flex justify-between items-center">
                <Link href="/collections/all" className="text-primary hover:underline flex items-center">
                  Continue Shopping
                </Link>
                <button className="text-destructive hover:underline" onClick={() => setCartItems([])}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} shipping={estimatedShipping} total={total} />

            <div className="mt-6">
              <Link
                href="/checkout"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

