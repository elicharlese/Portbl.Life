import { Truck, RotateCcw, Clock, CreditCard } from "lucide-react"

export const metadata = {
  title: "Shipping & Returns | Portbl.life",
  description: "Information about our shipping policies and return process.",
}

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shipping & Returns</h1>

        {/* Shipping Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Shipping Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Standard Shipping</h3>
                  <p className="text-muted-foreground mb-2">5-7 business days</p>
                  <p className="font-medium">Free on orders over $75</p>
                  <p className="text-muted-foreground">$7.99 for orders under $75</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Expedited Shipping</h3>
                  <p className="text-muted-foreground mb-2">2-3 business days</p>
                  <p className="font-medium">$14.99 flat rate</p>
                  <p className="text-muted-foreground">Available for all orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-6 mb-8">
            <h3 className="font-medium mb-4">International Shipping</h3>
            <p className="mb-4">
              We ship to select countries worldwide. International shipping rates and delivery times vary by location.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Canada: 7-10 business days ($15.99)</li>
              <li>Europe: 10-14 business days ($24.99)</li>
              <li>Australia/New Zealand: 14-21 business days ($29.99)</li>
              <li>Asia: 14-21 business days ($29.99)</li>
            </ul>
            <p className="mt-4 text-sm">
              Please note that international orders may be subject to import duties and taxes, which are the
              responsibility of the recipient.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Shipping Policies</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Orders are processed within 1-2 business days.</li>
              <li>Shipping times are estimates and not guaranteed.</li>
              <li>We ship Monday through Friday, excluding holidays.</li>
              <li>You will receive a shipping confirmation email with tracking information once your order ships.</li>
              <li>We cannot ship to P.O. boxes for expedited shipping.</li>
            </ul>
          </div>
        </div>

        {/* Returns Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary">Returns & Exchanges</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <RotateCcw className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Easy Returns</h3>
                  <p className="text-muted-foreground mb-2">30-day return policy</p>
                  <p className="text-muted-foreground">Return unused items in original packaging</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Refund Process</h3>
                  <p className="text-muted-foreground mb-2">Processed within 5-7 business days</p>
                  <p className="text-muted-foreground">Refunded to original payment method</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Return Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Log into your account and navigate to your order history.</li>
                <li>Select the order and items you wish to return.</li>
                <li>Print the prepaid return shipping label (for U.S. customers only).</li>
                <li>Pack the items in their original packaging with all tags attached.</li>
                <li>Drop off the package at any authorized shipping location.</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium mb-2">Return Policy Details</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Items must be returned within 30 days of delivery.</li>
                <li>Products must be unused, unwashed, and in original condition with all tags attached.</li>
                <li>Return shipping is free for customers in the United States.</li>
                <li>International customers are responsible for return shipping costs.</li>
                <li>Sale items marked as "Final Sale" cannot be returned or exchanged.</li>
                <li>Defective items can be returned at any time for a full refund or replacement.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Exchanges</h3>
              <p className="text-muted-foreground">
                We currently do not offer direct exchanges. If you need a different size or color, please return your
                item for a refund and place a new order for the desired item.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-medium mb-2">Lifetime Warranty</h3>
              <p className="text-muted-foreground mb-4">
                All Portbl.life products are backed by our lifetime warranty against manufacturing defects. If your
                product fails due to a manufacturing defect, we will repair or replace it free of charge.
              </p>
              <p className="text-muted-foreground">
                Please note that our warranty does not cover damage due to normal wear and tear, improper use, or
                accidents. Contact our customer service team to initiate a warranty claim.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Have questions about shipping or returns?</p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

