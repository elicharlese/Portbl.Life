"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Lock, CreditCard } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const { user, updateUser } = useAuth()

  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    phone: "(555) 123-4567",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Update user in auth context
    updateUser({
      name: `${profileData.firstName} ${profileData.lastName}`.trim(),
      email: profileData.email,
    })

    // Show success message (in a real app)
    alert("Profile updated successfully")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>
      </div>

      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "password"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "notifications"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "payment"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Payment Methods
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Change Password</h3>
                  <p className="text-muted-foreground">Update your password to keep your account secure.</p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Notification Preferences</h3>
                  <p className="text-muted-foreground">Manage how and when you receive notifications.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="orderUpdates" className="text-sm text-foreground">
                        Order updates and shipping notifications
                      </label>
                      <input
                        type="checkbox"
                        id="orderUpdates"
                        defaultChecked
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="promotions" className="text-sm text-foreground">
                        Promotions, discounts, and sales
                      </label>
                      <input
                        type="checkbox"
                        id="promotions"
                        defaultChecked
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="newProducts" className="text-sm text-foreground">
                        New product announcements
                      </label>
                      <input
                        type="checkbox"
                        id="newProducts"
                        defaultChecked
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="newsletter" className="text-sm text-foreground">
                        Weekly newsletter
                      </label>
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">SMS Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="smsOrderUpdates" className="text-sm text-foreground">
                        Order status updates
                      </label>
                      <input
                        type="checkbox"
                        id="smsOrderUpdates"
                        defaultChecked
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="smsPromotions" className="text-sm text-foreground">
                        Flash sales and limited-time offers
                      </label>
                      <input
                        type="checkbox"
                        id="smsPromotions"
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Payment Methods</h3>
                  <p className="text-muted-foreground">Manage your saved payment methods.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/5 border border-border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-background p-2 rounded mr-3">
                      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="20" rx="4" fill="#016FD0" />
                        <path d="M14.5 13H17.5V7H14.5V13Z" fill="white" />
                        <path d="M14.5 6C14.5 4.9 15.4 4 16.5 4C17.6 4 18.5 4.9 18.5 6H14.5Z" fill="white" />
                        <path d="M19.5 13H22.5V7H19.5V13Z" fill="white" />
                        <path d="M19.5 6C19.5 4.9 20.4 4 21.5 4C22.6 4 23.5 4.9 23.5 6H19.5Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">American Express</p>
                      <p className="text-sm text-muted-foreground">Ending in 1234 • Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary hover:underline text-sm">Edit</button>
                    <button className="text-destructive hover:underline text-sm">Remove</button>
                  </div>
                </div>

                <div className="bg-secondary/5 border border-border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-background p-2 rounded mr-3">
                      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="20" rx="4" fill="#EB001B" />
                        <circle cx="12" cy="10" r="6" fill="#EB001B" />
                        <circle cx="20" cy="10" r="6" fill="#F79E1B" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 13.8C17.3 12.7 18 11.2 18 9.5C18 7.8 17.3 6.3 16 5.2C14.7 6.3 14 7.8 14 9.5C14 11.2 14.7 12.7 16 13.8Z"
                          fill="#FF5F00"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Mastercard</p>
                      <p className="text-sm text-muted-foreground">Ending in 5678 • Expires 09/24</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary hover:underline text-sm">Edit</button>
                    <button className="text-destructive hover:underline text-sm">Remove</button>
                  </div>
                </div>

                <button className="w-full border border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition">
                  <span className="text-primary font-medium">+ Add Payment Method</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

