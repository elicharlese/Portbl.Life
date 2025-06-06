interface CollectionHeaderProps {
  title: string
  description: string
  productCount: number
}

export default function CollectionHeader({ title, description, productCount }: CollectionHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground mt-2 sm:mt-0">{productCount} products</p>
      </div>
    </div>
  )
}

