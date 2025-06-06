import Link from "next/link"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Portbl.life</h3>
            <p className="text-sm">Everything a modern-day nomad needs for life on the move.</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-secondary-foreground hover:text-primary transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-secondary-foreground hover:text-primary transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-secondary-foreground hover:text-primary transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:hello@portbl.life"
                aria-label="Email"
                className="text-secondary-foreground hover:text-primary transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/all" className="hover:text-primary transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/backpacks" className="hover:text-primary transition">
                  Backpacks
                </Link>
              </li>
              <li>
                <Link href="/collections/tech" className="hover:text-primary transition">
                  Tech Accessories
                </Link>
              </li>
              <li>
                <Link href="/collections/apparel" className="hover:text-primary transition">
                  Apparel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and travel tips.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-background text-foreground rounded-l-md w-full focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} Portbl.life. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

