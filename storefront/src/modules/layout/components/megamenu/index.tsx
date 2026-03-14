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
                        "text-gray-900 dark:text-ui-fg-subtle hover:text-accent-gold dark:hover:text-ui-fg-base": !isOpen,
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
                <div className="absolute top-full left-0 z-50 mt-0 w-64">
                    <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-white  dark:bg-primary border border-gray-200 dark:border-white/10">
                        <div className="py-2">
                            {collections.slice(0, 6).map((collection) => (
                                <LocalizedClientLink
                                    key={collection.id}
                                    href={`/collections/${collection.handle}`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-150"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <p className="text-sm font-serif dark:text-black hover:text-accent-gold dark:hover:text-accent-gold transition-colors">
                                        {collection.title}
                                    </p>
                                </LocalizedClientLink>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <LocalizedClientLink
                                href="/store"
                                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-150"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-accent-gold dark:text-black">
                                        {dictionary.view_all}
                                    </span>
                                </span>
                            </LocalizedClientLink>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
}
