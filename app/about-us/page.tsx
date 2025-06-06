import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Globe, Leaf, Award, Heart } from "lucide-react"

export const metadata = {
  title: "About Us | Portbl.life",
  description: "Learn about our mission, values, and the team behind Portbl.life.",
}

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Portbl.life</h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            Creating essential gear for the modern nomad lifestyle
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-4">
              Portbl.life was born out of necessity. Our founder, Alex Morgan, spent years as a digital nomad, working
              from coffee shops in Bali, co-working spaces in Barcelona, and cabins in the mountains.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Throughout these travels, Alex faced a consistent challenge: finding gear that was truly designed for the
              modern nomadic lifestyle—durable enough for constant movement, functional enough to serve multiple
              purposes, and stylish enough to transition from a business meeting to a hiking trail.
            </p>
            <p className="text-lg text-muted-foreground">
              In 2018, after sketching designs on napkins in airports around the world, Portbl.life was launched with a
              single product: the Nomad Backpack. Today, we've expanded to a full range of products designed to support
              life on the move.
            </p>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Founder working remotely"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-secondary/5 py-16 px-4 rounded-lg mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Portbl.life, our mission is to create high-quality, thoughtfully designed products that enable the
                modern nomad lifestyle—whether you're a digital nomad working from different countries, a weekend
                adventurer, or someone who simply values mobility and flexibility in their daily life.
              </p>
              <p className="text-muted-foreground">
                We believe that life is meant to be experienced, not confined to one place. Our products are designed to
                remove barriers to mobility and make life on the move more comfortable, organized, and enjoyable.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
                We envision a world where people have the freedom to work, live, and explore without being tied to one
                location—a world where your gear supports your lifestyle rather than limiting it.
              </p>
              <p className="text-muted-foreground">
                Beyond creating products, we aim to foster a global community of modern nomads who share knowledge,
                experiences, and a passion for exploration. We believe that mobility and connection to different
                cultures and environments leads to personal growth, creativity, and a more sustainable relationship with
                our planet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Freedom</h3>
            <p className="text-muted-foreground">
              We believe in the freedom to work, live, and explore without being tied to one location. Our products are
              designed to enable this freedom by being portable, versatile, and reliable.
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to creating products that minimize environmental impact and last for years. We use
              recycled and sustainable materials whenever possible and design for durability to reduce waste.
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We foster a global community of like-minded individuals who share tips, experiences, and a passion for the
              nomadic lifestyle. We believe in the power of connection and shared knowledge.
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adventure</h3>
            <p className="text-muted-foreground">
              We encourage exploration and new experiences, whether across the world or in your own city. Our products
              are designed to be companions on your adventures, big and small.
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We never compromise on quality. Our products are built to withstand the rigors of constant movement and
              changing environments, using premium materials and meticulous craftsmanship.
            </p>
          </div>
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thoughtful Design</h3>
            <p className="text-muted-foreground">
              We believe in the power of thoughtful design to solve real problems. Every feature of our products is
              intentional, addressing specific needs of the modern nomad lifestyle.
            </p>
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

      {/* Sustainability Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Sustainability Commitment</h2>
        <div className="bg-primary/5 rounded-lg p-8">
          <p className="text-lg mb-4">
            At Portbl.life, sustainability isn't just a buzzword—it's a core value that guides every decision we make.
            We believe that products designed for exploration should also protect the places we love to explore.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Materials</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Recycled fabrics from post-consumer plastic</li>
                <li>Organic and responsibly-sourced natural materials</li>
                <li>Bluesign®-certified dyes and finishes</li>
                <li>PFC-free water repellent treatments</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Manufacturing</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Fair labor practices and ethical manufacturing</li>
                <li>Reduced carbon footprint in production</li>
                <li>Minimal waste manufacturing processes</li>
                <li>Regular factory audits for compliance</li>
              </ul>
            </div>
          </div>
          <p className="text-lg mb-4">
            By 2025, we've pledged that 100% of our products will be made from recycled, organic, or responsibly sourced
            materials. We're also working toward plastic-free packaging and carbon-neutral shipping.
          </p>
          <p className="text-lg">
            Our product take-back program ensures that when your Portbl.life gear reaches the end of its life, it can be
            returned to us for responsible recycling or upcycling—never landfill.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Subscribe to our newsletter for travel tips, product updates, and exclusive offers for the modern nomad
          lifestyle.
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-3 bg-background border border-border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block bg-secondary/5 px-6 py-3 rounded-md font-medium hover:bg-secondary/10 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

