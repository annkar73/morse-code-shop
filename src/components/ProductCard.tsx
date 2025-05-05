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
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <Card className="max-w-sm w-full shadow-md overflow-hidden bg-[var(--color-pink-light)] border-2 border-[var(--color-pink-dark)] rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="bg-[var(--color-pink-light)] h-48 flex items-center justify-center text-[var(--color-black)] text-sm">
          <Image
            src={product.image}
            alt={`Bild på ${product.name}`}
            width={192}
            height={192}
            className="object-cover rounded cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </div>
        <CardContent className="space-y-2 p-4 text-[var(--color-black)]">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">Produktbeskrivning</p>
          <p className="text-sm">{product.price} kr</p>
          <QuantityInput value={quantity} onChange={setQuantity} />
          <Button
            onClick={() => addToCart(product, quantity)}
            className="font-semibold text-white"
          >
            Lägg i kundvagn
          </Button>
        </CardContent>
      </Card>

      {/* Modal for image preview */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            <Button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-black text-xl font-bold bg-white bg-opacity-60 rounded-full px-3 py-1 hover:bg-opacity-80"
            >
              ✕
            </Button>
            <Image
              src={product.image}
              alt={`Stor bild på ${product.name}`}
              width={600}
              height={600}
              className="object-contain rounded-lg max-w-full max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}
