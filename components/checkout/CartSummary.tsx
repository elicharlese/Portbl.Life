interface CartSummaryProps {
  subtotal: number
  shipping: number
  total: number
  discount?: number
}

export default function CartSummary({ subtotal, shipping, total, discount = 0 }: CartSummaryProps) {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-medium">Order Summary</h2>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-destructive">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="border-t border-border pt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

