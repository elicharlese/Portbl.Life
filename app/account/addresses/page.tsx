"use client"

import { useState } from "react"
import { Plus, Edit, Trash } from "lucide-react"

// Mock address data - in a real app, this would come from Shopify's API
const initialAddresses = [
  {
    id: "1",
    name: "Alex Morgan",
    line1: "123 Nomad Street",
    line2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
    country: "United States",
    phone: "(555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "Alex Morgan",
    line1: "456 Traveler Avenue",
    line2: "",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "(555) 987-6543",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)

  const handleAddAddress = () => {
    setIsAddingAddress(true)
    setEditingAddressId(null)
  }

  const handleEditAddress = (id: string) => {
    setIsAddingAddress(false)
    setEditingAddressId(id)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button
          onClick={handleAddAddress}
          className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </button>
      </div>

      {isAddingAddress && (
        <div className="bg-background border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
          <AddressForm />
        </div>
      )}

      {editingAddressId && (
        <div className="bg-background border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
          <AddressForm
            address={addresses.find((a) => a.id === editingAddressId)}
            onCancel={() => setEditingAddressId(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-background border rounded-lg p-6 relative ${
              address.isDefault ? "border-primary" : "border-border"
            }`}
          >
            {address.isDefault && (
              <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                Default
              </span>
            )}
            <div className="space-y-1 mb-4">
              <p className="font-medium">{address.name}</p>
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditAddress(address.id)}
                className="text-primary hover:underline flex items-center"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-destructive hover:underline flex items-center"
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </button>
              {!address.isDefault && (
                <button onClick={() => handleSetDefault(address.id)} className="text-foreground hover:underline">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AddressForm({ address, onCancel }: { address?: any; onCancel?: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={address?.name || ""}
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
            defaultValue={address?.phone || ""}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="line1" className="block text-sm font-medium text-foreground mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          id="line1"
          defaultValue={address?.line1 || ""}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="line2" className="block text-sm font-medium text-foreground mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          id="line2"
          defaultValue={address?.line2 || ""}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            defaultValue={address?.city || ""}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            defaultValue={address?.state || ""}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-foreground mb-1">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            defaultValue={address?.postalCode || ""}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
          Country
        </label>
        <select
          id="country"
          defaultValue={address?.country || "United States"}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          defaultChecked={address?.isDefault || false}
          className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-foreground">
          Set as default address
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-border rounded-md hover:bg-secondary/5 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition"
        >
          {address ? "Update Address" : "Save Address"}
        </button>
      </div>
    </form>
  )
}

