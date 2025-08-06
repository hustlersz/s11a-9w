"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"
import type { Product } from "@/data/products"

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        toast({
          title: "به لیست علاقه مندی‌ها اضافه شد",
          description: `${product.name} به لیست علاقه مندی‌های شما اضافه شد.`,
        })
        return [...prevItems, product]
      }
      return prevItems
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    toast({
      title: "از لیست علاقه مندی‌ها حذف شد",
      description: "کالا از لیست علاقه مندی‌های شما حذف شد.",
    })
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
