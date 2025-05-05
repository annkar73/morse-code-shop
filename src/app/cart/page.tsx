'use client';

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  function handleSend() {
    const content = cart
      .map((p) => `${p.name} - ${p.price} kr x ${p.quantity}`)
      .join("\n");
    const mailto = `mailto:din@email.se?subject=Beställning&body=${encodeURIComponent(content)}`;
    window.location.href = mailto;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Din kundvagn</h1>
      <div className="bg-[var(--color-white)] p-6 rounded shadow-md space-y-4">
      {cart.length === 0 && <p>Din kundvagn är tom.</p>}

      {/* Rubriker (dölj på mobil) */}
      <div className="hidden sm:grid grid-cols-4 gap-4 font-semibold mb-2">
        <span>Produkt</span>
        <span className="text-right">Pris</span>
        <span className="text-right">Kvantitet</span>
        <span></span>
      </div>

      {/* Produktinformation */}
      {cart.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border-b py-2"
        >
          {/* Rad 1: Produktnamn */}
          <span className="sm:col-span-1 font-semibold">{p.name}</span>

          {/* Rad 2 (på mobil): Pris, Kvantitet, Knapp */}
          <div className="grid grid-cols-3 gap-2 sm:contents">
            <span className="text-right italic font-semibold">{p.price} kr</span>

            <div className="flex justify-end">
            <QuantityInput
                  value={p.quantity}
                  onChange={(newQuantity) => {
                    if (newQuantity > 0) {
                      updateQuantity(p.id, newQuantity); // Använd updateQuantity från context
                    }
                  }}
                />            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => removeFromCart(p.id)}
                className="bg-[var(--color-pink-sharp)] hover:bg-[var(--color-pink-sharp)]/90 text-black font-semibold py-1 px-4"
              >
                Ta bort
              </Button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-4 space-y-4 space-x-4">
          <p className="font-semibold">Totalt: {total} kr</p>
          <Button onClick={handleSend} className="font-semibold text-white">Skicka beställning via mail</Button>
          <Button
            className="bg-[var(--color-pink-sharp)] hover:bg-[var(--color-pink-sharp)]/90 text-black font-semibold"
            onClick={clearCart}
          >
            Töm kundvagnen
          </Button>
        </div>
      )}
      </div>
    </main>
  );
}
