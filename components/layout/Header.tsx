"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, Search, User, ChevronDown, LogOut } from "lucide-react"
import { useCart } from "@/lib/shopify/hooks"
import { useAuth } from "@/lib/auth/AuthContext"
import MegaMenu from "./MegaMenu"
import SearchModal from "@/components/search/SearchModal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { totalQuantity } = useCart()
  const { user, isAuthenticated, signOut } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const openMegaMenu = () => setIsMegaMenuOpen(true)
  const closeMegaMenu = () => setIsMegaMenuOpen(false)
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <header className="bg-background border-b border-border relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button className="md:hidden text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Portbl.life</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative" onMouseEnter={openMegaMenu}>
              <button
                className="text-foreground hover:text-primary transition flex items-center"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                Shop <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <Link href="/collections/new-arrivals" className="text-foreground hover:text-primary transition">
              New Arrivals
            </Link>
            <Link href="/collections/best-sellers" className="text-foreground hover:text-primary transition">
              Best Sellers
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              aria-label="Search"
              className="text-foreground hover:text-primary transition"
              onClick={toggleSearch}
            >
              <Search size={20} />
            </button>

            {/* User Profile */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="text-foreground hover:text-primary transition flex items-center"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    {user?.avatar ? (
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <User size={20} />
                    )}
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                      <div className="p-2 border-b border-border">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-sm hover:bg-secondary/5"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block px-4 py-2 text-sm hover:bg-secondary/5"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Orders
                        </Link>
                        <Link
                          href="/account/wishlist"
                          className="block px-4 py-2 text-sm hover:bg-secondary/5"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setIsProfileMenuOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/5"
                        >
                          <div className="flex items-center">
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/sign-in" className="text-foreground hover:text-primary transition">
                  <User size={20} />
                </Link>
              )}
            </div>

            <Link href="/cart" className="relative text-foreground hover:text-primary transition">
              <ShoppingBag size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link href="/collections/all" className="text-foreground hover:text-primary transition">
                Shop All
              </Link>
              <Link href="/collections/backpacks" className="text-foreground hover:text-primary transition">
                Backpacks
              </Link>
              <Link href="/collections/tech" className="text-foreground hover:text-primary transition">
                Tech
              </Link>
              <Link href="/collections/apparel" className="text-foreground hover:text-primary transition">
                Apparel
              </Link>
              <Link href="/collections/new-arrivals" className="text-foreground hover:text-primary transition">
                New Arrivals
              </Link>
              <Link href="/collections/best-sellers" className="text-foreground hover:text-primary transition">
                Best Sellers
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition">
                About
              </Link>

              {!isAuthenticated && (
                <>
                  <div className="border-t border-border pt-4 mt-2"></div>
                  <Link href="/auth/sign-in" className="text-foreground hover:text-primary transition">
                    Sign In
                  </Link>
                  <Link href="/auth/sign-up" className="text-foreground hover:text-primary transition">
                    Create Account
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mega Menu */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
    </header>
  )
}

