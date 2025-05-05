import { MainNav } from "@/components/MainNav"
import "./globals.css"
import { CartProvider } from "context/CartContext"

export const metadata = {
  title: "Signalarmband - Pärlor med mening",
  description: "En enkel webshop byggd med Next.js och shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-background text-foreground">
      <CartProvider>

        <header className="w-full bg-[var(--color-green-dark)] text-[var(--color-white)]">
          <MainNav />
        </header>

        <main className="container mx-auto py-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
