"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ShippingForm from "@/components/checkout/ShippingForm"
import PaymentMethod from "@/components/checkout/PaymentMethod"
import OrderReview from "@/components/checkout/OrderReview"
import CartSummary from "@/components/checkout/CartSummary"

// Mock cart data - in a real app, this would come from Shopify's API
const cartItems = [
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

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const estimatedShipping = subtotal > 75 ? 0 : 7.99
const total = subtotal + estimatedShipping

type CheckoutStep = "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveInfo: false,
  })
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "crypto">("stripe")

  const handleShippingSubmit = (data: any) => {
    setShippingInfo(data)
    setCurrentStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (method: "stripe" | "crypto") => {
    setPaymentMethod(method)
    setCurrentStep("review")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to Shopify's API
    router.push("/checkout/confirmation")
  }

  const goBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Steps */}
      <div className="lg:col-span-2">
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          {/* Step Indicator */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep === "shipping" || currentStep === "payment" || currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                } mr-2`}
              >
                1
              </div>
              <span className={currentStep === "shipping" ? "font-medium" : ""}>Shipping</span>

              <div className="h-px bg-border flex-grow mx-4"></div>

              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep === "payment" || currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                } mr-2`}
              >
                2
              </div>
              <span className={currentStep === "payment" ? "font-medium" : ""}>Payment</span>

              <div className="h-px bg-border flex-grow mx-4"></div>

              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                } mr-2`}
              >
                3
              </div>
              <span className={currentStep === "review" ? "font-medium" : ""}>Review</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {currentStep === "shipping" && (
              <ShippingForm initialValues={shippingInfo} onSubmit={handleShippingSubmit} />
            )}

            {currentStep === "payment" && <PaymentMethod onSubmit={handlePaymentSubmit} onBack={goBack} />}

            {currentStep === "review" && (
              <OrderReview
                cartItems={cartItems}
                shippingInfo={shippingInfo}
                paymentMethod={paymentMethod}
                subtotal={subtotal}
                shipping={estimatedShipping}
                total={total}
                onPlaceOrder={handlePlaceOrder}
                onBack={goBack}
              />
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <CartSummary subtotal={subtotal} shipping={estimatedShipping} total={total} />
      </div>
    </div>
  )
}

