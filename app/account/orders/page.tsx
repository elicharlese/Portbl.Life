import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

// Mock order data - in a real app, this would come from Shopify's API
const orders = [
  {
    id: "12345",
    date: "March 15, 2023",
    status: "Delivered",
    total: "$179.98",
    items: [
      {
        id: "prod-1",
        name: "Nomad Backpack",
        price: "$129.99",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "prod-2",
        name: "Tech Organizer",
        price: "$49.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "12344",
    date: "February 28, 2023",
    status: "Delivered",
    total: "$89.99",
    items: [
      {
        id: "prod-3",
        name: "Packable Jacket",
        price: "$89.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "12343",
    date: "January 15, 2023",
    status: "Delivered",
    total: "$154.97",
    items: [
      {
        id: "prod-4",
        name: "Travel Water Bottle",
        price: "$24.99",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "prod-5",
        name: "Packing Cubes (Set of 3)",
        price: "$34.99",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "prod-6",
        name: "Travel Adapter",
        price: "$94.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

export default function OrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-border bg-secondary/5">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{order.total}</p>
                <p className="text-sm text-primary">{order.status}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Link href={`/products/${item.id}`} className="text-primary hover:underline flex items-center">
                      Buy Again <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-border bg-secondary/5">
              <Link href={`/account/orders/${order.id}`} className="text-primary hover:underline">
                View Order Details
              </Link>
              <Link href={`/account/orders/${order.id}/track`} className="text-primary hover:underline">
                Track Package
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

