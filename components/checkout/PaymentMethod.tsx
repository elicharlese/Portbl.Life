"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Bitcoin, ArrowLeft } from "lucide-react"

interface PaymentMethodProps {
  onSubmit: (method: "stripe" | "crypto") => void
  onBack: () => void
}

export default function PaymentMethod({ onSubmit, onBack }: PaymentMethodProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "crypto">("stripe")
  const [stripeCardInfo, setStripeCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })
  const [cryptoType, setCryptoType] = useState("bitcoin")

  const handleStripeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStripeCardInfo({
      ...stripeCardInfo,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(paymentMethod)
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Payment Method</h2>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod("stripe")}
            className={`flex-1 p-4 border rounded-md flex flex-col items-center transition ${
              paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
            }`}
          >
            <CreditCard className="h-6 w-6 mb-2" />
            <span className="font-medium">Credit Card</span>
            <div className="flex items-center mt-2 space-x-2">
              <Image src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
              <Image src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
              <Image src="/placeholder.svg?height=24&width=36" alt="Amex" width={36} height={24} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("crypto")}
            className={`flex-1 p-4 border rounded-md flex flex-col items-center transition ${
              paymentMethod === "crypto" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
            }`}
          >
            <Bitcoin className="h-6 w-6 mb-2" />
            <span className="font-medium">Cryptocurrency</span>
            <div className="flex items-center mt-2 space-x-2">
              <Image src="/placeholder.svg?height=24&width=24" alt="Bitcoin" width={24} height={24} />
              <Image src="/placeholder.svg?height=24&width=24" alt="Ethereum" width={24} height={24} />
              <Image src="/placeholder.svg?height=24&width=24" alt="USDC" width={24} height={24} />
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "stripe" && (
            <div className="space-y-4 border border-border rounded-md p-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={stripeCardInfo.cardNumber}
                  onChange={handleStripeChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-foreground mb-1">
                  Name on Card *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={stripeCardInfo.cardName}
                  onChange={handleStripeChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-foreground mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={stripeCardInfo.expiry}
                    onChange={handleStripeChange}
                    placeholder="MM/YY"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-foreground mb-1">
                    CVC *
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={stripeCardInfo.cvc}
                    onChange={handleStripeChange}
                    placeholder="123"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "crypto" && (
            <div className="space-y-4 border border-border rounded-md p-4">
              <div>
                <label htmlFor="cryptoType" className="block text-sm font-medium text-foreground mb-1">
                  Select Cryptocurrency
                </label>
                <select
                  id="cryptoType"
                  value={cryptoType}
                  onChange={(e) => setCryptoType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="usdc">USD Coin (USDC)</option>
                  <option value="solana">Solana (SOL)</option>
                </select>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-2">Payment Instructions</p>
                <div className="bg-secondary/5 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">
                    After clicking "Continue to Review", you will be shown a wallet address to send your payment.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be processed once the transaction is confirmed on the blockchain.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="flex items-center text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Shipping
            </button>

            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

