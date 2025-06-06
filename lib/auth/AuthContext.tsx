"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isEmailVerified: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  resetPassword: (email: string) => Promise<void>
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with your backend
        const storedUser = localStorage.getItem("portbl_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your authentication API
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful authentication
      if (email && password) {
        const mockUser: User = {
          id: "123456",
          email,
          name: email.split("@")[0],
          isEmailVerified: true,
        }

        setUser(mockUser)
        localStorage.setItem("portbl_user", JSON.stringify(mockUser))
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to Google OAuth
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful Google authentication
      const mockUser: User = {
        id: "789012",
        email: "user@gmail.com",
        name: "Google User",
        avatar: "/placeholder.svg?height=200&width=200",
        isEmailVerified: true,
      }

      setUser(mockUser)
      localStorage.setItem("portbl_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Google sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your registration API
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      if (email && password && name) {
        const mockUser: User = {
          id: "345678",
          email,
          name,
          isEmailVerified: false,
        }

        setUser(mockUser)
        localStorage.setItem("portbl_user", JSON.stringify(mockUser))
      } else {
        throw new Error("Invalid registration data")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("portbl_user")
  }

  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your password reset API
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful password reset request
      if (!email) {
        throw new Error("Email is required")
      }

      // In a real app, this would send a reset email
    } catch (error) {
      console.error("Password reset error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Update user
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("portbl_user", JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

