import Image from "next/image"
import { MapPin, Users, Globe, Leaf } from "lucide-react"

export const metadata = {
  title: "About Us | Portbl.life",
  description: "Learn about our mission to create essential gear for modern nomads.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden rounded-lg mb-16">
        <div className="absolute inset-0 bg-secondary/30 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Portbl.life team"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            Creating essential gear for the modern nomad lifestyle
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-6">
          At Portbl.life, we believe that life is meant to be experienced, not confined to one place. Our mission is to
          create high-quality, thoughtfully designed products that enable the modern nomad lifestyle—whether you're a
          digital nomad working from different countries, a weekend adventurer, or someone who simply values mobility
          and flexibility in their daily life.
        </p>
        <p className="text-lg text-muted-foreground">
          We design every product with three core principles in mind: durability, functionality, and sustainability. Our
          gear is built to last, engineered to serve multiple purposes, and created with respect for our planet.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-secondary/5 py-16 px-4 rounded-lg mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freedom</h3>
              <p className="text-muted-foreground">
                We believe in the freedom to work, live, and explore without being tied to one location.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to creating products that minimize environmental impact and last for years.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We foster a global community of like-minded individuals who share tips and experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adventure</h3>
              <p className="text-muted-foreground">
                We encourage exploration and new experiences, whether across the world or in your own city.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Morgan",
              role: "Founder & CEO",
              bio: "Former digital nomad who traveled to 40+ countries while working remotely before founding Portbl.life.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Jamie Chen",
              role: "Head of Product Design",
              bio: "Industrial designer with a passion for creating functional, beautiful products that solve real problems.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Sam Rodriguez",
              role: "Sustainability Director",
              bio: "Environmental scientist ensuring our products and operations minimize ecological impact.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Taylor Kim",
              role: "Community Manager",
              bio: "Digital nomad and content creator who helps build and nurture our global community.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Jordan Patel",
              role: "Supply Chain Manager",
              bio: "Logistics expert who ensures ethical manufacturing and timely delivery of our products.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Riley Johnson",
              role: "Customer Experience Lead",
              bio: "Former travel guide who ensures every customer interaction exceeds expectations.",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member, index) => (
            <div key={index} className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="text-xl font-bold text-primary">2018</div>
              <div className="h-full w-px bg-border mt-2 md:block hidden"></div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
              <p className="text-muted-foreground">
                Portbl.life was founded by Alex Morgan after experiencing firsthand the challenges of living a nomadic
                lifestyle. The first product—our signature Nomad Backpack—was designed and tested across 5 continents.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="text-xl font-bold text-primary">2019</div>
              <div className="h-full w-px bg-border mt-2 md:block hidden"></div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Expanding Our Range</h3>
              <p className="text-muted-foreground">
                After the success of our backpack, we expanded into tech accessories and travel apparel, all designed
                with the same principles of durability, functionality, and sustainability.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="text-xl font-bold text-primary">2021</div>
              <div className="h-full w-px bg-border mt-2 md:block hidden"></div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-muted-foreground">
                We launched our community platform, connecting nomads worldwide and providing resources for remote work,
                travel tips, and sustainable living practices.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="text-xl font-bold text-primary">2023</div>
              <div className="h-full w-px bg-border mt-2 md:block hidden"></div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Sustainability Commitment</h3>
              <p className="text-muted-foreground">
                We pledged to make all our products from recycled or sustainable materials by 2025 and implemented a
                product take-back program to ensure responsible end-of-life handling.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="text-xl font-bold text-primary">Today</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Looking Forward</h3>
              <p className="text-muted-foreground">
                We continue to innovate and create products that enable freedom, adventure, and sustainability for
                modern nomads around the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for travel tips, product updates, and exclusive offers for the modern nomad
          lifestyle.
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-3 bg-background text-foreground rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

