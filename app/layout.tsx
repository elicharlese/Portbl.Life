import type React from "react"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ShopifyProvider } from "@/lib/shopify/provider"
import { AuthProvider } from "@/lib/auth/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portbl.life - Essentials for Modern Nomads",
  description: "Everything a modern-day nomad needs for life on the move.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShopifyProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Suspense fallback={<div className="container mx-auto p-4">Loading...</div>}>{children}</Suspense>
              </main>
              <Footer />
            </div>
          </ShopifyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

