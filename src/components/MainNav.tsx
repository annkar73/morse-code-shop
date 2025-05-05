"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useEffect, useState } from "react";

export function MainNav() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // const [isBouncing, setIsBouncing] = useState(false);
  const [prevCount, setPrevCount] = useState(itemCount);

  useEffect(() => {
    if (itemCount !== prevCount) {
      setPrevCount(itemCount); // Uppdatera prevCount när itemCount ändras
    }
  }, [itemCount, prevCount]);

  return (
    <>
      <NavigationMenu className="px-4 py-2">
        <NavigationMenuList className="w-full flex justify-between gap-4">
          <NavigationMenuItem>
            <Link href="/" className="font-medium text-2xl">
              Hem
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products" className="font-medium text-2xl">
              Produkter
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/cart" className="font-medium text-2xl relative">
              Kundvagn
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className={`absolute -top-2 -right-5 text-sm text-white rounded-full px-2 py-0.5 bg-[var(--color-pink-sharp)] animate-scale-bounce`}
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
