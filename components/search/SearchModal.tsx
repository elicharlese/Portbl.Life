"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, X, ChevronRight, ArrowRight } from "lucide-react"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input when the modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  // Mock search function - in a real app, this would call your API
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)

    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results based on query
      const mockResults = [
        {
          id: "1",
          title: "Nomad Backpack Pro",
          category: "Backpacks",
          url: "/products/nomad-backpack-pro",
        },
        {
          id: "2",
          title: "Tech Organizer",
          category: "Tech Accessories",
          url: "/products/tech-organizer",
        },
        {
          id: "3",
          title: "Packable Rain Jacket",
          category: "Apparel",
          url: "/products/packable-rain-jacket",
        },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setResults(mockResults)
      setIsLoading(false)
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border rounded-lg shadow-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex items-center border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="ml-2 text-muted-foreground hover:text-foreground transition"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {query ? (
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Search Results</h3>
                <ul className="space-y-2">
                  {results.map((result) => (
                    <li key={result.id}>
                      <Link
                        href={result.url}
                        className="flex items-center p-2 hover:bg-secondary/5 rounded-md transition"
                        onClick={onClose}
                      >
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-muted-foreground">{result.category}</p>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="flex items-center justify-center mt-4 text-primary hover:underline"
                  onClick={onClose}
                >
                  View all results
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different search term or browse our categories below.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="p-4">
              <h3 className="font-medium mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/collections/backpacks"
                  className="px-3 py-1 bg-secondary/5 hover:bg-secondary/10 rounded-md text-sm transition"
                  onClick={onClose}
                >
                  Backpacks
                </Link>
                <Link
                  href="/collections/tech/chargers"
                  className="px-3 py-1 bg-secondary/5 hover:bg-secondary/10 rounded-md text-sm transition"
                  onClick={onClose}
                >
                  Power Banks
                </Link>
                <Link
                  href="/collections/apparel/tops"
                  className="px-3 py-1 bg-secondary/5 hover:bg-secondary/10 rounded-md text-sm transition"
                  onClick={onClose}
                >
                  Travel Clothing
                </Link>
                <Link
                  href="/collections/tech/adapters"
                  className="px-3 py-1 bg-secondary/5 hover:bg-secondary/10 rounded-md text-sm transition"
                  onClick={onClose}
                >
                  Travel Adapters
                </Link>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/collections/backpacks"
                  className="flex items-center p-2 hover:bg-secondary/5 rounded-md transition"
                  onClick={onClose}
                >
                  <span className="text-sm">Backpacks & Bags</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/collections/tech"
                  className="flex items-center p-2 hover:bg-secondary/5 rounded-md transition"
                  onClick={onClose}
                >
                  <span className="text-sm">Tech Accessories</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/collections/apparel"
                  className="flex items-center p-2 hover:bg-secondary/5 rounded-md transition"
                  onClick={onClose}
                >
                  <span className="text-sm">Apparel</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/collections/all"
                  className="flex items-center p-2 hover:bg-secondary/5 rounded-md transition"
                  onClick={onClose}
                >
                  <span className="text-sm">All Products</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

