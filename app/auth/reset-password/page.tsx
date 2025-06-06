"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, AlertCircle, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call your API to reset the password
      // using the token from the URL
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 3000)
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // If no token is provided, show an error
  if (!token) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-background border border-border rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-medium mb-2">Invalid or expired link</h2>
            <p className="text-muted-foreground mb-6">The password reset link is invalid or has expired.</p>
            <Link
              href="/auth/forgot-password"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition inline-block"
            >
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Set New Password</h1>
          <p className="text-muted-foreground mt-2">Create a new password for your account</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">Password reset successful</h2>
              <p className="text-muted-foreground mb-2">Your password has been reset successfully.</p>
              <p className="text-muted-foreground mb-6">You will be redirected to the sign in page shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition disabled:opacity-70"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

