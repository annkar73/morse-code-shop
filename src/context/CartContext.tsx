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

  // Vi använder en state för att hålla koll på om vi är på klienten eller inte
  const [isClient, setIsClient] = useState(false)
  const [cart, setCart] = useState<ICartItem[]>([])

  // Sätt isClient till true när komponenten är mounted på klienten
  useEffect(() => {
    setIsClient(true)
  }, [])

  // När vi är på klienten, ladda cart från localStorage
  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }
  }, [isClient]) // Kör denna effect när isClient blir true

  // Spara cart till localStorage när den förändras
  useEffect(() => {
    if (isClient && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    } else if (isClient && cart.length === 0) {
      localStorage.removeItem("cart")
    }
  }, [cart, isClient]) // Kör när cart eller isClient förändras

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
    )
  }

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
