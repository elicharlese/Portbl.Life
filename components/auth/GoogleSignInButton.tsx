"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth/AuthContext"

export default function GoogleSignInButton() {
  const router = useRouter()
  const { signInWithGoogle, isLoading } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push("/account")
    } catch (error) {
      console.error("Google sign in failed:", error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 bg-background border border-border px-4 py-3 rounded-md font-medium hover:bg-secondary/5 transition disabled:opacity-70"
    >
      <Image src="/placeholder.svg?height=24&width=24" alt="Google" width={24} height={24} />
      <span>Google</span>
    </button>
  )
}

