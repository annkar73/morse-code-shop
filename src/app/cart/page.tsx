"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";

const SHIPPING_COST = 29; // fast frakt

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalWithShipping = cart.length > 0 ? total + SHIPPING_COST : 0;

  function handleSend() {
    const content =
      cart.map((p) => `${p.name} - ${p.price} kr x ${p.quantity}`).join("\n") +
      `\n\nFrakt: ${SHIPPING_COST} kr\nTotalt: ${totalWithShipping} kr`;

    const mailto = `mailto:karlsen1973@outlook.com?subject=Beställning&body=${encodeURIComponent(
      content
    )}`;
    window.location.href = mailto;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Din kundvagn</h1>
      <div className="bg-[var(--color-white)] p-6 rounded shadow-md space-y-4">
        {cart.length === 0 && <p>Din kundvagn är tom.</p>}

        <div className="hidden sm:grid grid-cols-4 gap-4 font-semibold mb-2">
          <span>Produkt</span>
          <span className="text-right">Pris</span>
          <span className="text-right">Kvantitet</span>
          <span></span>
        </div>

        {cart.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border-b py-2"
          >
            <span className="sm:col-span-1 font-semibold">{p.name}</span>

            <div className="grid grid-cols-3 gap-2 sm:contents">
              <span className="text-right italic font-semibold">
                {p.price} kr
              </span>

              <div className="flex justify-end">
                <QuantityInput
                  value={p.quantity}
                  onChange={(newQuantity) => {
                    if (newQuantity > 0) {
                      updateQuantity(p.id, newQuantity);
                    }
                  }}
                />
              </div>

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
          <div className="mt-6 space-y-3 space-x-4 text-right text-lg">
            <p>Varor: {total} kr</p>
            <p>Frakt: {SHIPPING_COST} kr</p>
            <p className="font-bold text-xl">Totalt: {totalWithShipping} kr</p>

            <div className="mt-4 flex flex-col items-end space-y-3 md:flex-row md:justify-end md:space-x-4 md:space-y-0">
              <Button onClick={handleSend} className="font-semibold text-white">
                Skicka beställning
              </Button>
              <Button
                className="bg-[var(--color-pink-sharp)] hover:bg-[var(--color-pink-sharp)]/90 text-black font-semibold"
                onClick={clearCart}
              >
                Töm kundvagnen
              </Button>
            </div>
            <div className="mt-6 border-t pt-4 text-left">
              <h2 className="text-md font-semibold mb-2 text-[var(--color-green-dark)]">
                Beställningsinformation
              </h2>
              <p className="text-sm text-[var(--color-black)] italic">
                Din beställning skickas in via e-post när du klickar på knappen, och du betalar enkelt med
                Swish. Fraktkostnad på 29 kr tillkommer. Betalningsinformation med QR-kod
                skickas i bekräftelsemailet.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
