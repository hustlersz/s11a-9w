import ProductCard from "@/components/product-card"
import { products } from "@/data/products"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
