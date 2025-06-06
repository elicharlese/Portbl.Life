import { Star } from "lucide-react"

interface ProductReviewsProps {
  product: any
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  // Mock reviews data
  const reviews = [
    {
      id: "rev-1",
      author: "Sarah T.",
      rating: 5,
      date: "March 15, 2023",
      title: "Perfect for my digital nomad lifestyle",
      content:
        "I've been using this backpack for 3 months now while traveling through Southeast Asia. It fits my 16\" MacBook Pro, iPad, camera, and all my other essentials perfectly. The hidden pocket is great for keeping my passport secure. Highly recommend!",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Michael R.",
      rating: 4,
      date: "February 28, 2023",
      title: "Great quality, slightly smaller than expected",
      content:
        "The quality of this backpack is excellent. The materials feel premium and the zippers are smooth. My only complaint is that it's slightly smaller than I expected. Still fits my 15\" laptop but gets tight when I pack for more than a day trip.",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Jamie L.",
      rating: 5,
      date: "January 12, 2023",
      title: "Survived a downpour!",
      content:
        "Got caught in a heavy rain in London and was worried about my laptop, but everything stayed completely dry! The water-resistant material really works. The comfort level is also top-notch, even when carrying heavy loads.",
      verified: true,
    },
  ]

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingDistribution[5 - review.rating]++
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="md:col-span-1">
          <div className="bg-secondary/5 p-6 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold">{product.reviews.average}</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.reviews.average)
                        ? "fill-primary text-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Based on {product.reviews.count} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[5 - rating]
                const percentage = (count / reviews.length) * 100

                return (
                  <div key={rating} className="flex items-center text-sm">
                    <div className="w-12">{rating} stars</div>
                    <div className="flex-1 mx-3 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <div className="w-8 text-right text-muted-foreground">{count}</div>
                  </div>
                )
              })}
            </div>

            <button className="w-full mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{review.title}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="ml-2 text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-medium">{review.author}</span>
                </div>
              </div>
            ))}

            <button className="text-primary hover:underline text-sm font-medium">Load More Reviews</button>
          </div>
        </div>
      </div>
    </div>
  )
}

