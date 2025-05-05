import { MainNav } from "@/components/MainNav"
import "./globals.css"
import { CartProvider } from "context/CartContext"
import Head from "next/head"

export const metadata = {
  title: "Signalarmband - Pärlor med mening",
  description: "Pärlor med attityd – signalarmband som säger mer än ord. Lekfullt. Handgjort. Med mening.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-background text-foreground">
        {/* hantera meta-taggar */}
        <Head>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content="signalarmband, armband, pärlor, handgjort, accessoarer, morse, morsekod" />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
          <title>{metadata.title}</title>
        </Head>
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
