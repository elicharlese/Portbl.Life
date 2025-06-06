"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

export default function LogoutPage() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
    router.push("/")
  }, [router, signOut])

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Signing out...</p>
      </div>
    </div>
  )
}

