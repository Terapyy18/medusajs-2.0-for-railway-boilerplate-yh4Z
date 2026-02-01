import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { getDictionary } from "@lib/dictionary"

export default function FeaturedCollections({
    collections,
    countryCode
}: {
    collections: HttpTypes.StoreCollection[]
    countryCode: string
}) {
    // We need at least 3 collections for the full layout, but we'll adapt if fewer.
    // For the prompt's specific "Bento Box" layout, we focus on the first 3.
    const featuredCollections = collections.slice(0, 3)
    const dictionary = getDictionary(countryCode)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[800px] w-full p-4">
            {featuredCollections.map((collection, index) => {
                // First item is the "Hero" collection
                const isHero = index === 0

                // Grid span classes
                const spanClasses = isHero
                    ? "md:col-span-2 md:row-span-2"
                    : "md:col-span-1 md:row-span-1"

                return (
                    <LocalizedClientLink
                        key={collection.id}
                        href={`/collections/${collection.handle}`}
                        className={`relative group overflow-hidden w-full h-full rounded-lg ${spanClasses}`}
                    >
                        {/* Image */}
                        <div className="absolute inset-0 w-full h-full">
                            {/* 
                  Using a placeholder if no metadata/image is strictly available on the collection object 
                  (Standard Medusa collection might not have an image URL directly on the root without custom metadata or relation, 
                   but we will assume valid images for now or use a placeholder)
               */}
                            <Image
                                src={collection.metadata?.image as string || "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop"}
                                alt={collection.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        {/* Label */}
                        <div className="absolute bottom-8 left-8 flex flex-col items-start text-white">
                            <span className="font-serif text-3xl font-medium mb-2">
                                {collection.title}
                            </span>
                            <span className="opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-sm font-medium tracking-wider uppercase">
                                {dictionary.featured_collections.explore}
                            </span>
                        </div>
                    </LocalizedClientLink>
                )
            })}
        </div>
    )
}
