import { MapPin, Shield, Truck, Clock } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Built to Last",
    description: "All products are tested for durability and backed by our lifetime warranty.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Free Shipping",
    description: "Free standard shipping on all orders over $75.",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for a full refund.",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Nomad Approved",
    description: "Designed by and for digital nomads and tested in real-world conditions.",
  },
]

export default function ValueProposition() {
  return (
    <div className="bg-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose Portbl.life</h2>
          <p className="text-muted-foreground">We're committed to supporting your nomadic lifestyle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

