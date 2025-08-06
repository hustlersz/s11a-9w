import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"
import "../styles/globals.css" // Import globals.css

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chrome Hearts - Premium Streetwear",
  description: "Official Chrome Hearts store for premium streetwear and accessories.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body className={`${inter.className}`}>
        {" "}
        {/* Removed hardcoded background and text colors */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
