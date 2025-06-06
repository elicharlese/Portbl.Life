import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-xl font-bold text-primary">
          Portbl.life
        </Link>
        <div className="text-sm text-muted-foreground">
          <Link href="/cart" className="hover:text-primary">
            Cart
          </Link>
          <ChevronRight className="inline h-4 w-4 mx-1" />
          <span className="text-foreground">Checkout</span>
        </div>
      </div>

      {children}
    </div>
  )
}

