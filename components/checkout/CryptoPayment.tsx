"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Copy, Check } from "lucide-react"

interface CryptoPaymentProps {
  cryptoType: string
  amount: number
}

export default function CryptoPayment({ cryptoType, amount }: CryptoPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Mock wallet addresses
  const walletAddresses = {
    bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    usdc: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    solana: "5Yd4tanS4tRwZV6VVJ1KvgH2fUhh5XkY1Z6WEnkgJse1",
  }

  // Mock crypto amounts
  const cryptoAmounts = {
    bitcoin: (amount / 50000).toFixed(6),
    ethereum: (amount / 3000).toFixed(6),
    usdc: amount.toFixed(2),
    solana: (amount / 100).toFixed(4),
  }

  const walletAddress = walletAddresses[cryptoType as keyof typeof walletAddresses]
  const cryptoAmount = cryptoAmounts[cryptoType as keyof typeof cryptoAmounts]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="font-medium mb-2">Send Payment</h3>
        <p className="text-sm text-muted-foreground">
          Send exactly{" "}
          <span className="font-medium">
            {cryptoAmount} {cryptoType.toUpperCase()}
          </span>{" "}
          to the address below
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-white p-2 rounded-lg">
          <Image src="/placeholder.svg?height=200&width=200" alt="QR Code" width={200} height={200} />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-1">Wallet Address</label>
        <div className="flex">
          <input
            type="text"
            value={walletAddress}
            readOnly
            className="flex-grow px-3 py-2 border border-r-0 border-border rounded-l-md focus:outline-none bg-secondary/5"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 border border-border rounded-r-md bg-secondary/10 hover:bg-secondary/20 transition"
          >
            {copied ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="bg-secondary/5 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Time remaining:</span>
          <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${(timeLeft / 900) * 100}%` }}></div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground space-y-2">
        <p>• Send only {cryptoType.toUpperCase()} to this address</p>
        <p>• Transaction may take 10-30 minutes to confirm</p>
        <p>• You will receive an email confirmation once payment is received</p>
      </div>
    </div>
  )
}

