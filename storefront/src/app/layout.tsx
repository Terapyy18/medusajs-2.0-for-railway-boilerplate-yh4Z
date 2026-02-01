import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Playfair_Display, Lato } from "next/font/google"
import { cn } from "@lib/util/cn"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={cn(playfair.variable, lato.variable)}>
      <body className="font-sans text-luxury-black bg-paper">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
