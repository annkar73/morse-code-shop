'use client'

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export function MainNav() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                <span className="text-sm bg-[var(--color-pink-sharp)] text-white rounded-full px-2 py-0.5 absolute -top-2 -right-5">
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
