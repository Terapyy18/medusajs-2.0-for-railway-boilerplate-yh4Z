import React from "react"
import { Hammer, Gem, ShieldCheck, Fingerprint } from "lucide-react"
import { getDictionary } from "@lib/dictionary"

const Reassurance = ({ countryCode }: { countryCode: string }) => {
    const dictionary = getDictionary(countryCode)
    const content = [
        {
            icon: Hammer,
            title: dictionary.reassurance.craftsmanship.title,
            description: dictionary.reassurance.craftsmanship.description,
        },
        {
            icon: Gem,
            title: dictionary.reassurance.materials.title,
            description: dictionary.reassurance.materials.description,
        },
        {
            icon: ShieldCheck,
            title: dictionary.reassurance.box.title,
            description: dictionary.reassurance.box.description,
        },
        {
            icon: Fingerprint,
            title: dictionary.reassurance.origin.title,
            description: dictionary.reassurance.origin.description,
        },
    ]

    return (
        <div className="w-full py-16 bg-neutral-900 text-white">
            <div className="content-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {content.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div key={index} className="flex flex-col items-center text-center">
                            <Icon
                                size={32}
                                strokeWidth={1}
                                className="text-amber-100 mb-4"
                            />
                            <h3 className="text-lg font-serif tracking-wide">{item.title}</h3>
                            <p className="mt-2 text-xs text-gray-400 font-sans max-w-[200px]">
                                {item.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reassurance
