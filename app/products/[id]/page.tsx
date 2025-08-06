import { notFound } from "next/navigation"
import { products } from "@/data/products"
import ProductDetailPageClient from "./ProductDetailPageClient"

// This function generates static paths for pre-rendering
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetailPageClient params={params} />
}
