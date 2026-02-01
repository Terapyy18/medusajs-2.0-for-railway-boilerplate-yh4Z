"use client"

import { usePathname, useRouter, useParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import { clx } from "@medusajs/ui"

type LanguageOption = {
    value: string
    label: string
    countryCode: string
}

const options: LanguageOption[] = [
    { value: "fr", label: "Français", countryCode: "FR" },
    { value: "en", label: "English", countryCode: "GB" },
]

export default function LanguageSelector() {
    const [current, setCurrent] = useState<LanguageOption | undefined>(undefined)
    const pathname = usePathname()
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        // Simple detection based on URL path or default
        // Assuming URL structure is /[locale]/... or handled via middleware rewriting but user sees /[countryCode] maybe?
        // Wait, Medusa usually uses [countryCode]. 
        // The prompt 1.2 set up middleware to redirect /fr or /en.
        // Let's assume the first segment is the locale or countryCode that maps to locale.
        // If the middleware puts locale in URL, we can parse it. 
        // BUT the standard medusa starter uses [countryCode] which is usually 'us', 'fr', 'dk' etc.
        // The prompt asked for "Locale" (Language).
        // If I switch language, I might be staying in the same "Region" (Country) but changing language?
        // Or is CountryCode serving as Locale? 
        // "Mets en place l'architecture d'internationalisation (FR/EN)... redirige vers /fr ou /en"
        // So /fr is France and /en is likely US or UK or generic English.
        // Let's assume the current path start with the locale/countryCode.

        // Check if the current path segment matches one of our options
        const found = options.find((o) => pathname.startsWith(`/${o.value}`))
        if (found) {
            setCurrent(found)
        } else {
            // Default to FR if not found or if at root (though middleware should handle root)
            setCurrent(options[0])
        }
    }, [pathname])

    const handleChange = (option: LanguageOption) => {
        if (!current || option.value === current.value) return

        // Replace the first segment of the path
        const newPath = pathname.replace(`/${current.value}`, `/${option.value}`)

        // In a real app we might want to set a cookie too, but middleware handles detection
        document.cookie = `NEXT_LOCALE=${option.value}; path=/; max-age=31536000; SameSite=Lax`

        router.push(newPath)
        router.refresh()
    }

    if (!current) return null

    return (
        <div className="relative z-50">
            <Listbox value={current} onChange={handleChange}>
                <div className="relative">
                    <Listbox.Button className="flex items-center gap-x-2 text-small-regular text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200">
                        <ReactCountryFlag
                            svg
                            style={{
                                width: "16px",
                                height: "16px",
                            }}
                            countryCode={current.countryCode}
                        />
                        <span className="uppercase">{current.value}</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Listbox.Options className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.value}
                                        value={option}
                                        className={({ active }) =>
                                            clx(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm cursor-pointer"
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <ReactCountryFlag
                                                svg
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                                countryCode={option.countryCode}
                                            />
                                            <span>{option.label}</span>
                                        </div>
                                    </Listbox.Option>
                                ))}
                            </div>
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
