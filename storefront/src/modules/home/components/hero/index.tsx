"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getDictionary } from "@lib/dictionary"
import { useParams } from "next/navigation"

const Hero = () => {
  const { countryCode } = useParams()
  const dictionary = getDictionary(countryCode as string)

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Video */}
      {/* Background Images - Theme Aware */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dark Theme Image (bg1.jpg) - Shown only in dark mode */}
        <img
          src="/bg1.jpg"
          alt="Hero Background Dark"
          className="hidden dark:block w-full h-full object-cover"
        />
        {/* Light Theme Image (BG2.jpg) - Shown only in light mode */}
        <img
          src="/BG2.jpg"
          alt="Hero Background Light"
          className="block dark:hidden w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 gap-8">
        <div className="space-y-4">
          <Heading
            level="h1"
            className="text-5xl md:text-6xl lg:text-7xl leading-tight text-white font-serif font-medium tracking-tight"
          >
            {dictionary.hero.title}
          </Heading>

          <Heading
            level="h2"
            className="text-sm md:text-base text-gray-300 font-sans tracking-[0.2em] uppercase"
          >
            {dictionary.hero.subtitle}
          </Heading>
        </div>

        <LocalizedClientLink
          href="/store"
          className="group inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all duration-500 border border-white hover:bg-white hover:text-black"
        >
          {dictionary.hero.cta}
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
