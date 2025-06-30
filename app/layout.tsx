import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Briskon Auctions - Premium Online Auction Platform",
  description:
    "Experience the ultimate auction platform with live bidding, VIP access, and premium auction houses. Join Briskon for exclusive auctions and unparalleled service.",
  keywords: "online auctions, live bidding, auction houses, collectibles, art auctions, premium auctions, VIP auctions",
  authors: [{ name: "Briskon Technologies" }],
  openGraph: {
    title: "Briskon Auctions - Premium Online Auction Platform",
    description: "Experience the ultimate auction platform with live bidding and VIP access",
    url: "https://briskon-auctions.com",
    siteName: "Briskon Auctions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Briskon Auctions - Premium Online Auction Platform",
    description: "Experience the ultimate auction platform with live bidding and VIP access",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="briskon-theme"
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
