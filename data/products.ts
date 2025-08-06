export interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  category: string
  rating: number
  isNew?: boolean
  isLimited?: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chrome Hearts Leather Cross Patch Sweatpants",
    description:
      "Premium black sweatpants featuring iconic leather cross patches. Crafted for comfort and a distinctive streetwear aesthetic.",
    price: 899.99,
    images: ["/products/ch-leather-cross-patch-sweatpants-1.png"],
    category: "Sweatpants",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Chrome Hearts Multi-Color Cross T-Shirt",
    description:
      "A classic black t-shirt adorned with vibrant multi-color Chrome Hearts crosses. Perfect for a bold and casual statement.",
    price: 399.99,
    images: ["/products/ch-leather-cross-patch-tshirt-1.jpg"],
    category: "T-Shirt",
    rating: 4.7,
    isLimited: true,
  },
  {
    id: 3,
    name: "Chrome Hearts Leather Cross Patch Sweatshirt",
    description:
      "Luxurious black sweatshirt with meticulously applied leather cross patches. Combines comfort with an unmistakable high-fashion edge.",
    price: 999.99,
    images: ["/products/ch-leather-cross-patch-sweatshirt-1.png"],
    category: "Sweatshirt",
    rating: 4.8,
    isNew: true,
  },
]
