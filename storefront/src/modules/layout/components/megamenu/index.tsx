"use client"

import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"

export default function Megamenu({
    collections,
}: {
    collections: HttpTypes.StoreCollection[]
}) {
    if (!collections || collections.length === 0) {
        return null
    }

    // Filter for specific visual themes if needed, or just show first 3
    // Prompt mentioned: Egypt, Zombies, Rome.
    // We try to find them, or fallback to showing what we have.
    // Since user said "they come from DB, if empty put empty", we just render what we get.
    // We can map specific handles to images if we want hardcoded visuals for these themes ONE DAY,
    // but for now we might rely on collection metadata or just a placeholder if no image?
    // Actually, collections usually don't have images in standard medusa without metadata.
    // I will use a placeholder or check if metadata exists (standard starter might not have it).
    // I'll stick to a clean list with "visual placeholders" or just text if no image.

    // For the "Wow" factor, let's assume we can map handles to static assets IF they match the known themes, 
    // otherwise use a generic pattern.

    const getThemeImage = (handle: string) => {
        // Return local static paths if we had them, or placeholders
        if (handle.includes("egypt")) return "/images/themes/egypt-thumb.jpg"
        if (handle.includes("zombie")) return "/images/themes/zombie-thumb.jpg"
        if (handle.includes("rome")) return "/images/themes/rome-thumb.jpg"
        return null
    }

    return (
        <Popover className="relative h-full">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={clx(
                            "relative h-full flex items-center transition-colors duration-200 outline-none uppercase",
                            {
                                "text-accent-gold": open,
                                "text-ui-fg-subtle hover:text-ui-fg-base": !open,
                            }
                        )}
                    >
                        Collections
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-0 w-screen max-w-4xl px-4 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-8 bg-primary p-7 lg:grid-cols-3">
                                    {collections.slice(0, 3).map((collection) => {
                                        const img = getThemeImage(collection.handle)
                                        return (
                                            <LocalizedClientLink
                                                key={collection.id}
                                                href={`/collections/${collection.handle}`}
                                                className="-m-3 flex flex-col rounded-lg p-3 transition duration-150 ease-in-out hover:bg-white/5"
                                            >
                                                <div className="relative h-32 w-full overflow-hidden rounded-md mb-3 bg-gray-800">
                                                    {/* If we had real images we would use next/image here */}
                                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif text-2xl">
                                                        {collection.title.charAt(0)}
                                                    </div>
                                                    {/* Placeholder for "Visual" requirement */}
                                                </div>
                                                <div className="ml-0">
                                                    <p className="text-base font-serif font-medium text-accent-gold">
                                                        {collection.title}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-400">
                                                        Explore the {collection.title} collection
                                                    </p>
                                                </div>
                                            </LocalizedClientLink>
                                        )
                                    })}
                                </div>
                                <div className="bg-gray-900 p-4">
                                    <LocalizedClientLink
                                        href="/store"
                                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-white/5"
                                    >
                                        <span className="flex items-center">
                                            <span className="text-sm font-medium text-white">
                                                View All Collections
                                            </span>
                                        </span>
                                        <span className="block text-sm text-gray-400">
                                            Discover our full range of 3D printed art.
                                        </span>
                                    </LocalizedClientLink>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
