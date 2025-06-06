"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would submit to an API
    // Simulating API call with timeout
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! Our team will get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        orderNumber: "",
        subject: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-background border border-border rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">support@portbl.life</p>
                    <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-5pm PT</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Nomad Street</p>
                    <p className="text-muted-foreground">San Francisco, CA 94107</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Available on our website</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-5pm PT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    className="p-2 bg-secondary/5 rounded-full hover:bg-secondary/10 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    className="p-2 bg-secondary/5 rounded-full hover:bg-secondary/10 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    className="p-2 bg-secondary/5 rounded-full hover:bg-secondary/10 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="p-2 bg-secondary/5 rounded-full hover:bg-secondary/10 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

              {formStatus?.submitted ? (
                <div
                  className={`p-4 rounded-md ${formStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                >
                  <p>{formStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-foreground mb-1">
                        Order Number (if applicable)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="return">Return/Exchange</option>
                        <option value="warranty">Warranty Claim</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="bg-secondary/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Find quick answers to common questions about our products, shipping, returns, and more.
            </p>
            <a
              href="/faq"
              className="inline-block bg-background border border-border px-6 py-3 rounded-md font-medium hover:bg-secondary/5 transition"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

