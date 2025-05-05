'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "./ui/quantity-input";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function ProductCard({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Assuming you have a CartContext to manage the cart
  return (
    <Card className="max-w-sm w-full shadow-md overflow-hidden bg-[var(--color-pink-light)] border border-[var(--color-pink-dark)] rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="bg-[var(--color-pink-light)] h-48 flex items-center justify-center text-[var(--color-black)] text-sm">
      <Image
          src={product.image} 
          alt={`Bild på ${product.name}`} 
          width={192} 
          height={192} 
          className="object-cover rounded" 
        />      </div>
      <CardContent className="space-y-2 p-4 text-[var(--color-black)]">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-muted-foreground">Produktbeskrivning</p>
        <p className="text-sm">{product.price} kr</p>
        <QuantityInput value={quantity} onChange={setQuantity} />
        <Button onClick={() => addToCart(product, quantity)} className="font-semibold text-white">Lägg i kundvagn</Button>
      </CardContent>
    </Card>
  );
}
