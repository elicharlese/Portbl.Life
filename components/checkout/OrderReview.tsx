"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import CryptoPayment from "./CryptoPayment"

interface OrderReviewProps {
  cartItems: any[]
  shippingInfo: any
  paymentMethod: "stripe" | "crypto"
  subtotal: number
  shipping: number
  total: number
  onPlaceOrder: () => void
  onBack: () => void
}

export default function OrderReview({
  cartItems,
  shippingInfo,
  paymentMethod,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  onBack,
}: OrderReviewProps) {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Review Your Order</h2>

      <div className="space-y-6">
        {/* Items Summary */}
        <div>
          <h3 className="font-medium mb-3">Items</h3>
          <div className="border border-border rounded-md overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b border-border last:border-b-0 flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.variant}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div>
          <h3 className="font-medium mb-3">Shipping Information</h3>
          <div className="border border-border rounded-md p-4">
            <p className="font-medium">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p>{shippingInfo.address}</p>
            {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </p>
            <p>{shippingInfo.country}</p>
            <p className="mt-2">{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-medium mb-3">Payment Method</h3>
          <div className="border border-border rounded-md p-4">
            {paymentMethod === "stripe" ? (
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=32&width=48"
                  alt="Credit Card"
                  width={48}
                  height={32}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-muted-foreground">Ending in •••• 3456</p>
                </div>
              </div>
            ) : (
              <CryptoPayment cryptoType="bitcoin" amount={total} />
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="border border-border rounded-md p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border border-border rounded-md p-4">
          <p className="text-sm text-muted-foreground">
            By placing your order, you agree to Portbl.life's{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Payment
          </button>

          <button
            type="button"
            onClick={onPlaceOrder}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

