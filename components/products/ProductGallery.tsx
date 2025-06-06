"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden border border-border rounded-lg">
        <Image src={images[selectedImage] || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-md border ${
              selectedImage === index ? "border-primary" : "border-border"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

