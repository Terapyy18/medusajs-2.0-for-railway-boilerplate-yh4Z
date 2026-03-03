"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { getDictionary } from "@lib/dictionary"

export default function NotFound() {
  const params = useParams()
  const countryCode = params?.countryCode as string
  const dictionary = getDictionary(countryCode)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-luxury-black text-white px-4 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-luxury-black to-black opacity-50 z-0" />

      <div className="z-10 flex flex-col items-center gap-8 max-w-lg text-center animate-fade-in-top">
        <div className="relative w-64 h-32 mb-4 opacity-90 transition-opacity duration-700 hover:opacity-100">
          <Image
            src="/logo.png"
            alt="TeraPrint Studio"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-serif text-white tracking-tighter">404</h1>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-luxury-gold">
            {dictionary.notFound.title}
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            {dictionary.notFound.subtitle}
          </p>
        </div>

        <Link
          href="/"
          className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all duration-500 border border-white/20 hover:border-white hover:bg-white/5 mt-8"
        >
          <span className="tracking-widest uppercase">{dictionary.notFound.cta}</span>
        </Link>
      </div>
    </div>
  )
}
