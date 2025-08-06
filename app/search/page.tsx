"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import { products, type Product } from "@/data/products"
import { SearchIcon } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery),
    )
    setFilteredProducts(results)
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">Product Search</h1>
      <div className="relative mb-12 max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search by name, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-input border-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-muted-foreground text-xl">No products found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
