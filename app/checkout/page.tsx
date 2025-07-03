"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/contexts/CartContext"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useCheckout } from "@/lib/hooks/useCheckout"
import ShippingForm from "@/components/checkout/ShippingForm"
import PaymentMethod from "@/components/checkout/PaymentMethod"
import OrderReview from "@/components/checkout/OrderReview"
import CartSummary from "@/components/checkout/CartSummary"
import { LoadingSpinner } from "@/components/ui/loading"
import { useToast } from "@/hooks/use-toast"

type CheckoutStep = "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, subtotal, loading: cartLoading, itemCount } = useCart()
  const { 
    createStripePaymentIntent,
    createSolanaPayment,
    confirmOrder,
    loading,
    error 
  } = useCheckout()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
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
  const [paymentData, setPaymentData] = useState<any>(null)
  const [processingOrder, setProcessingOrder] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, cartLoading, router])

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in?redirect=/checkout")
    }
  }, [user, router])

  const estimatedShipping = subtotal > 75 ? 0 : 7.99
  const finalTotal = subtotal + estimatedShipping

  const handleShippingSubmit = (data: any) => {
    setShippingInfo(data)
    setCurrentStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = async (method: "stripe" | "crypto", data?: any) => {
    setPaymentMethod(method)
    setPaymentData(data)
    setCurrentStep("review")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place your order",
        variant: "destructive",
      })
      return
    }

    try {
      setProcessingOrder(true)

      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: shippingInfo,
        paymentMethod,
        subtotal,
        shipping: estimatedShipping,
        total: finalTotal,
      }

      let paymentResult

      if (paymentMethod === "stripe") {
        paymentResult = await createStripePaymentIntent(finalTotal, orderData)
      } else {
        paymentResult = await createSolanaPayment(finalTotal, orderData)
      }

      if (paymentResult.success) {
        const orderId = await confirmOrder({
          ...orderData,
          paymentIntentId: paymentResult.paymentIntentId || paymentResult.transactionId || '',
        })

        toast({
          title: "Order Placed Successfully!",
          description: "You will receive a confirmation email shortly.",
        })

        router.push(`/checkout/confirmation?orderId=${orderId}`)
      } else {
        throw new Error(paymentResult.error || "Payment failed")
      }
    } catch (error: any) {
      console.error("Order placement failed:", error)
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingOrder(false)
    }
  }

  const goBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
    window.scrollTo(0, 0)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
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
                <ShippingForm 
                  initialValues={shippingInfo} 
                  onSubmit={handleShippingSubmit} 
                />
              )}

              {currentStep === "payment" && (
                <PaymentMethod 
                  onSubmit={handlePaymentSubmit} 
                  onBack={goBack}
                />
              )}

              {currentStep === "review" && (
                <OrderReview
                  cartItems={items.map(item => ({
                    id: item.id,
                    productId: item.productId,
                    title: item.product.title,
                    variant: item.variant.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.product.image,
                  }))}
                  shippingInfo={shippingInfo}
                  paymentMethod={paymentMethod}
                  subtotal={subtotal}
                  shipping={estimatedShipping}
                  total={finalTotal}
                  onPlaceOrder={handlePlaceOrder}
                  onBack={goBack}
                />
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary 
            subtotal={subtotal} 
            shipping={estimatedShipping} 
            total={finalTotal}
          />
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

