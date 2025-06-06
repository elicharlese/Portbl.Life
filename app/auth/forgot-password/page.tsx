"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading } = useAuth()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email and we'll send you a link to reset your password
          </p>
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
              <h2 className="text-xl font-medium mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/auth/sign-in" className="text-primary hover:underline flex items-center justify-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>

              <div className="text-center mt-4">
                <Link href="/auth/sign-in" className="text-primary hover:underline text-sm">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

