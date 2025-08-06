"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState } from "react"

export default function ProductDetailPageClient({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const product = products.find((p) => p.id.toString() === params.id)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 min-h-screen flex flex-col lg:flex-row items-center lg:items-start gap-8 bg-background text-foreground">
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-card border-border">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent className="-ml-2">
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/4 pl-2">
                  <div
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                      index === selectedImage ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        )}
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-bold text-foreground">{product.price.toLocaleString()} تومان</span>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xl">★</span>
            <span className="text-lg text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 text-lg"
        >
          Add to Cart
        </Button>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Product Details</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Category: {product.category}</li>
            {product.isNew && <li>Status: New Arrival</li>}
            {product.isLimited && <li>Availability: Limited Edition</li>}
            {/* Add more details as needed */}
          </ul>
        </div>
      </div>
    </div>
  )
}
