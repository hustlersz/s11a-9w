"use client" // Make this a Client Component to manage state for splash screen

import { useState } from "react"
import "./globals.css"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { CustomCursor } from "@/components/custom-cursor"
import { CartProvider } from "@/contexts/CartContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
// import { Header } from "@/components/header" // Remove direct import
import AuthStatusProvider from "@/app/AuthStatusProvider" // Import the new AuthStatusProvider

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [splashComplete, setSplashComplete] = useState(false)

  const handleSplashComplete = () => {
    setSplashComplete(true)
  }

  return (
    <>
      <SplashScreen onComplete={handleSplashComplete} />
      {splashComplete && ( // Conditionally render content after splash screen
        <>
          <CartProvider>
            <WishlistProvider>
              <AuthStatusProvider>
                {" "}
                {/* Use AuthStatusProvider here */}
                {children}
              </AuthStatusProvider>
            </WishlistProvider>
          </CartProvider>
          <footer className="w-full py-6 px-4 bg-card text-muted-foreground">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Hustlers & Faraz. All rights reserved.</p>
            </div>
          </footer>
          <CustomCursor />
        </>
      )}
    </>
  )
}
