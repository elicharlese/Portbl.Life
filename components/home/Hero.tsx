import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-secondary/20 z-10"></div>
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Modern nomad lifestyle"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Freedom to Roam, <br />
            Tools to Thrive
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Essential gear for the modern nomad. Designed for life on the move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/collections/all"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition text-center"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="bg-background text-foreground px-6 py-3 rounded-md font-medium hover:bg-background/90 transition text-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

