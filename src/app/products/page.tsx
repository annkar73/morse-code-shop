import { ProductCard } from "@/components/ProductCard";
import { products } from "../data/products"; // Importera produkterna från din datafil


export default function ProductsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produkter</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
