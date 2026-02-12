"use client"

import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

export default function Megamenu({
    collections,
    dictionary
}: {
    collections: HttpTypes.StoreCollection[]
    dictionary: {
        title: string
        explore_collection: string
        view_all: string
        discover_range: string
    }
}) {
    const [isOpen, setIsOpen] = useState(false)

    if (!collections || collections.length === 0) {
        return null
    }

    const getThemeImage = (handle: string) => {
        if (handle.includes("egypt")) return "/images/themes/egypt-thumb.jpg"
        if (handle.includes("zombie")) return "/images/themes/zombie-thumb.jpg"
        if (handle.includes("rome")) return "/images/themes/rome-thumb.jpg"
        return null
    }

    return (
        <div
            className="relative h-full"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div
                className={clx(
                    "relative h-full flex items-center transition-colors duration-200 outline-none uppercase cursor-pointer",
                    {
                        "text-accent-gold": isOpen,
                        "text-ui-fg-subtle hover:text-ui-fg-base": !isOpen,
                    }
                )}
            >
                {dictionary.title}
            </div>

            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-0 w-screen max-w-4xl px-4 sm:px-0">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-primary p-7 lg:grid-cols-3">
                            {collections.slice(0, 3).map((collection) => {
                                // const img = getThemeImage(collection.handle)
                                return (
                                    <LocalizedClientLink
                                        key={collection.id}
                                        href={`/collections/${collection.handle}`}
                                        className="-m-3 flex flex-col rounded-lg p-3 transition duration-150 ease-in-out hover:bg-white/5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="relative h-32 w-full overflow-hidden rounded-md mb-3 bg-gray-800">
                                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif text-2xl">
                                                {collection.title.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-0">
                                            <p className="text-base font-serif font-medium text-accent-gold">
                                                {collection.title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-400">
                                                {dictionary.explore_collection.replace("{title}", collection.title)}
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
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center">
                                    <span className="text-sm font-medium text-white">
                                        {dictionary.view_all}
                                    </span>
                                </span>
                                <span className="block text-sm text-gray-400">
                                    {dictionary.discover_range}
                                </span>
                            </LocalizedClientLink>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
}
