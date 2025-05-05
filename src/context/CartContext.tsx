"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { IProduct } from "@/components/ProductCard"

interface ICartItem extends IProduct {
  quantity: number
}

interface ICartContext {
  cart: ICartItem[]
  addToCart: (product: IProduct, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  updateQuantity: (productId: number, quantity: number) => void
}

export const CartContext = createContext<ICartContext | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

  const loadCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        return JSON.parse(storedCart)
      }
    }
    return []
  }
  const [cart, setCart] = useState<ICartItem[]>(loadCartFromStorage)

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)) 
    }
    else {
      localStorage.removeItem("cart")
    }
  }, [cart])

  const addToCart = (product: IProduct, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        return [...prev, { ...product, quantity }]
      }
    })
  }
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
