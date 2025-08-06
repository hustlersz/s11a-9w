"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-muted-foreground text-xl">
          Your cart is empty.
          <br />
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Return to Homepage
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center bg-card border-border p-4">
                <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden mr-4">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                  <p className="text-muted-foreground mb-2">{item.price.toLocaleString()} تومان</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center bg-input border-input text-foreground"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border"
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full bg-card text-foreground hover:bg-card/80 border-border mt-6"
            >
              Clear Cart
            </Button>
          </div>

          <Card className="bg-card border-border p-6 h-fit">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>{cartTotal.toLocaleString()} تومان</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span>Free</span> {/* Placeholder */}
              </div>
              <div className="flex justify-between text-2xl font-bold border-t border-border pt-4 mt-4">
                <span>Total:</span>
                <span>{cartTotal.toLocaleString()} تومان</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
