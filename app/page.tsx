"use client" // Make this a Client Component

import ProductCard from "@/components/product-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { products } from "@/data/products"
// Removed CartProvider and WishlistProvider imports as they are now in layout.tsx

export default function Home() {
  return (
    // Removed CartProvider and WishlistProvider wrappers here
    <main className="flex min-h-screen flex-col items-center justify-between pt-20">
      {/* Full-screen Auto-sliding Banner */}
      <AutoSliderBanner />

      {/* Product Section */}
      <section id="product-section" className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white text-center">Latest Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
