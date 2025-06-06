"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import Link from "next/link"

// FAQ categories and questions
const faqData = [
  {
    category: "Products",
    questions: [
      {
        question: "Are your products waterproof?",
        answer:
          "Many of our products are water-resistant, which means they can withstand light rain and splashes. Our backpacks feature water-resistant materials and zippers to keep your belongings dry in most conditions. For products that are fully waterproof, this will be clearly stated in the product description.",
      },
      {
        question: "What materials do you use in your products?",
        answer:
          "We use a variety of high-quality, durable materials in our products, including ripstop nylon, recycled polyester, merino wool, and YKK zippers. We prioritize materials that are lightweight, durable, and environmentally responsible. Each product page lists the specific materials used.",
      },
      {
        question: "Do your products come with a warranty?",
        answer:
          "Yes, all Portbl.life products come with a lifetime warranty against manufacturing defects. If your product fails due to a manufacturing defect, we will repair or replace it free of charge. Normal wear and tear, improper use, or accidents are not covered under the warranty.",
      },
      {
        question: "How do I care for my Portbl.life products?",
        answer:
          "Care instructions vary by product and material. Generally, we recommend spot cleaning with mild detergent and water. For specific care instructions, please refer to the care label on your product or the product page on our website. Proper care will extend the life of your products.",
      },
      {
        question: "Are your products sustainable?",
        answer:
          "Sustainability is a core value at Portbl.life. We use recycled and sustainable materials whenever possible, design products to be durable and long-lasting, and are working toward plastic-free packaging. We're committed to reducing our environmental impact and have pledged to make all our products from recycled or sustainable materials by 2025.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long will it take to receive my order?",
        answer:
          "Standard shipping within the United States takes 5-7 business days. Expedited shipping takes 2-3 business days. International shipping times vary by location, ranging from 7-21 business days. Please note that these are estimates and not guaranteed delivery times.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to select countries worldwide. International shipping rates and delivery times vary by location. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "We process orders quickly to ensure fast shipping. If you need to modify or cancel your order, please contact us immediately at support@portbl.life. We'll do our best to accommodate your request, but we cannot guarantee changes once an order has been placed.",
      },
      {
        question: "Is free shipping available?",
        answer:
          "Yes, we offer free standard shipping on all U.S. orders over $75. Orders under $75 have a flat shipping rate of $7.99. International shipping and expedited shipping options are available at an additional cost.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a shipping confirmation email with tracking information. You can also log into your account on our website to view your order status and tracking information.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy on all unused items in their original packaging with tags attached. Return shipping is free for customers in the United States. International customers are responsible for return shipping costs. Sale items marked as 'Final Sale' cannot be returned or exchanged.",
      },
      {
        question: "How do I return an item?",
        answer:
          "To return an item, log into your account, navigate to your order history, and select the items you wish to return. Print the prepaid return shipping label (for U.S. customers only), pack the items in their original packaging with all tags attached, and drop off the package at any authorized shipping location.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to the original payment method used for the purchase. Please note that it may take additional time for the refund to appear on your account, depending on your financial institution.",
      },
      {
        question: "Can I exchange an item for a different size or color?",
        answer:
          "We currently do not offer direct exchanges. If you need a different size or color, please return your item for a refund and place a new order for the desired item. This helps us process your request more quickly and ensures you get exactly what you need.",
      },
      {
        question: "What if I received a defective item?",
        answer:
          "If you received a defective item, please contact our customer service team immediately at support@portbl.life. We'll provide instructions for returning the item and will send a replacement or issue a full refund, including shipping costs.",
      },
    ],
  },
  {
    category: "Account & Orders",
    questions: [
      {
        question: "Do I need to create an account to make a purchase?",
        answer:
          "No, you can check out as a guest without creating an account. However, creating an account allows you to track your orders, save your shipping information for future purchases, and manage your wishlist.",
      },
      {
        question: "How can I check the status of my order?",
        answer:
          "If you have an account, you can log in and view your order history to check the status of your order. If you checked out as a guest, you can use the order tracking link provided in your order confirmation email.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "We process orders quickly to ensure fast shipping. If you need to change your shipping address, please contact us immediately at support@portbl.life. We'll do our best to accommodate your request, but we cannot guarantee changes once an order has been processed.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and select cryptocurrencies. All payments are securely processed and encrypted.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we take data security very seriously. Our website uses SSL encryption to protect your personal and payment information. We never store your full credit card details on our servers. For more information, please review our Privacy Policy.",
      },
    ],
  },
]

// Function to highlight matched text
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, '<mark class="bg-primary/20 text-foreground px-1 rounded">$1</mark>')
}

export default function FAQClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Products")
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({})
  const [searchResults, setSearchResults] = useState<{
    totalResults: number
    categories: typeof faqData
  }>({ totalResults: 0, categories: faqData })
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter FAQs based on search query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults({ totalResults: 0, categories: faqData })
      return
    }

    const filteredCategories = faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(debouncedQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    const totalResults = filteredCategories.reduce((total, category) => total + category.questions.length, 0)

    setSearchResults({ totalResults, categories: filteredCategories })

    // Auto-expand questions that match search
    if (debouncedQuery) {
      const newExpandedQuestions = { ...expandedQuestions }
      filteredCategories.forEach((category, categoryIndex) => {
        category.questions.forEach((_, questionIndex) => {
          const key = `${categoryIndex}-${questionIndex}`
          newExpandedQuestions[key] = true
        })
      })
      setExpandedQuestions(newExpandedQuestions)
    }
  }, [debouncedQuery, expandedQuestions])

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setExpandedQuestions({
      ...expandedQuestions,
      [key]: !expandedQuestions[key],
    })
  }

  const clearSearch = () => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      clearSearch()
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pl-10 pr-10 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              aria-label="Search FAQs"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {debouncedQuery && (
            <div className="mt-2 text-sm text-muted-foreground">
              {searchResults.totalResults > 0
                ? `Found ${searchResults.totalResults} result${searchResults.totalResults !== 1 ? "s" : ""} for "${debouncedQuery}"`
                : `No results found for "${debouncedQuery}"`}
            </div>
          )}
        </div>

        {/* FAQ Categories */}
        {!debouncedQuery && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {faqData.map((category, index) => (
              <button
                key={index}
                onClick={() => toggleCategory(category.category)}
                className={`p-3 text-center rounded-md transition ${
                  expandedCategory === category.category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/5 hover:bg-secondary/10"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Content */}
        <div className="space-y-6">
          {(debouncedQuery ? searchResults.categories : faqData).map(
            (category, categoryIndex) =>
              (expandedCategory === category.category || debouncedQuery) && (
                <div key={categoryIndex} className="border border-border rounded-lg overflow-hidden shadow-sm">
                  <h2 className="font-semibold text-lg p-4 bg-secondary/5 border-b border-border">
                    {category.category}
                  </h2>
                  <div className="divide-y divide-border">
                    {category.questions.map((faq, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`
                      const isExpanded = expandedQuestions[key] || false

                      return (
                        <div key={questionIndex}>
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full text-left p-4 flex justify-between items-center hover:bg-secondary/5 transition"
                            aria-expanded={isExpanded}
                          >
                            <span
                              className="font-medium pr-4"
                              dangerouslySetInnerHTML={{
                                __html: debouncedQuery ? highlightText(faq.question, debouncedQuery) : faq.question,
                              }}
                            />
                            <ChevronDown
                              className={`h-5 w-5 flex-shrink-0 transition-transform ${isExpanded ? "transform rotate-180" : ""}`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="p-4 pt-0 text-muted-foreground bg-secondary/5">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: debouncedQuery ? highlightText(faq.answer, debouncedQuery) : faq.answer,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ),
          )}
        </div>

        {/* No Results Message */}
        {debouncedQuery && searchResults.totalResults === 0 && (
          <div className="text-center py-12 bg-background border border-border rounded-lg">
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any answers matching "{debouncedQuery}". Try a different search term or browse the
              categories.
            </p>
            <button
              onClick={clearSearch}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition inline-block"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-primary/5 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the answer to your question, our customer support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

