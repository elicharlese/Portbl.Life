export interface Product {
  id: string
  handle: string
  title: string
  description?: string
  price: string
  compareAtPrice: string | null
  imageSrc: string
  images?: string[]
  variants?: ProductVariant[]
  options?: ProductOption[]
}

export interface ProductVariant {
  id: string
  title: string
  price: string
  available: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface ProductOption {
  name: string
  values: string[]
}

export interface Collection {
  id: string
  handle: string
  title: string
  description?: string
  imageSrc?: string
  products: Product[]
}

export interface CartItem {
  id: string
  productId: string
  variantId: string
  title: string
  variantTitle?: string
  price: string
  quantity: number
  imageSrc?: string
}

export interface Cart {
  id: string
  items: CartItem[]
  totalQuantity: number
  subtotalPrice: string
}

