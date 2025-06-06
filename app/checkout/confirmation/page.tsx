import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export default function ConfirmationPage() {
  // Mock order data - in a real app, this would come from Shopify's API
  const orderNumber = "12345678"
  const orderDate = "March 17, 2023"
  const estimatedDelivery = "March 24-26, 2023"

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-muted-foreground">Your order has been received and is being processed.</p>
      </div>

      <div className="bg-background border border-border rounded-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="font-medium">Order Details</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Date:</span>
            <span>{orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Delivery:</span>
            <span>{estimatedDelivery}</span>
          </div>

          {/* Payment Method */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>Credit Card</span>
            </div>
          </div>

          {/* Order Total */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between font-medium">
              <span>Order Total:</span>
              <span>$189.98</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/5 border border-border rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <Package className="h-6 w-6 text-primary mr-4 mt-1" />
          <div>
            <h3 className="font-medium mb-1">What's Next?</h3>
            <p className="text-sm text-muted-foreground mb-2">
              You will receive an order confirmation email with details of your order. Once your order ships, we will
              send you tracking information.
            </p>
            <p className="text-sm text-muted-foreground">
              If you have any questions about your order, please contact our customer support team.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/account/orders" className="text-primary hover:underline flex items-center">
          View Order History
        </Link>

        <Link
          href="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition flex items-center"
        >
          Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

