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

import { ThemeProvider } from "@modules/providers/theme-provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(playfair.variable, lato.variable)}>
      <body className="font-sans bg-white text-black dark:bg-neutral-900 dark:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative">{props.children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
