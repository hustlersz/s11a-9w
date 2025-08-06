"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { ShoppingCart, Heart, Menu, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { performLogout } from "@/app/actions/auth"
import { products } from "@/data/products"

type HeaderProps = {
  initialAuthStatus: boolean // Add this prop
}

export function Header({ initialAuthStatus }: HeaderProps) {
  // Accept the prop
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(initialAuthStatus) // Initialize with prop

  // Add a useEffect to update loggedIn state if initialAuthStatus changes (e.g., after login/logout)
  useEffect(() => {
    setLoggedIn(initialAuthStatus)
  }, [initialAuthStatus])

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  const handleLinkClick = () => {
    setIsSheetOpen(false)
  }

  const handleLogout = async () => {
    await performLogout()
    setLoggedIn(false) // Update state immediately for UI responsiveness
    handleLinkClick()
  }

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-3 px-4 bg-background border-b border-border">
      <div className="relative w-24 h-12 md:w-32 md:h-16">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-muted-foreground font-semibold">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="/cart" className="hover:text-foreground transition-colors flex items-center gap-1">
          Cart
          {cartItemCount > 0 && (
            <Badge className="ml-1 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Link>
        <Link href="/support" className="hover:text-foreground transition-colors">
          Support
        </Link>
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <Link href="/search" className="hover:text-foreground transition-colors">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </Link>
        {loggedIn ? (
          <Button variant="ghost" onClick={handleLogout} className="hover:text-foreground transition-colors">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        ) : (
          <Link href="/login" className="hover:text-foreground transition-colors">
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Navigation Toggle & Icons */}
      <div className="flex items-center gap-4 md:hidden">
        <Link href="/search" className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </Link>
        <Link href="/cart" className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Link>
        <Link href="/wishlist" className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" />
          </Button>
          {wishlistCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
              {wishlistCount}
            </Badge>
          )}
        </Link>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background text-foreground p-6">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Navigation links and shop categories.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 pt-8">
              <Link
                href="/"
                className="text-lg font-semibold hover:text-foreground transition-colors"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                href="/cart"
                className="text-lg font-semibold hover:text-foreground transition-colors flex items-center gap-2"
                onClick={handleLinkClick}
              >
                Cart
                {cartItemCount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <Link
                href="/support"
                className="text-lg font-semibold hover:text-foreground transition-colors"
                onClick={handleLinkClick}
              >
                Support
              </Link>
              <Link
                href="/products"
                className="text-lg font-semibold hover:text-foreground transition-colors"
                onClick={handleLinkClick}
              >
                Products
              </Link>
              <div className="border-t border-border pt-4 mt-4">
                <h3 className="text-xl font-bold mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="text-lg font-semibold hover:text-foreground transition-colors"
                        onClick={handleLinkClick}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {loggedIn ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-lg font-semibold hover:text-foreground transition-colors justify-start p-0"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="text-lg font-semibold hover:text-foreground transition-colors"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
