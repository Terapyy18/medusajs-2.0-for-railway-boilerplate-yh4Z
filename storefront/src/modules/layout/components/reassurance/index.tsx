import { ShieldCheck, Truck, Hammer, MapPin } from "lucide-react"
import { getDictionary } from "@lib/dictionary"

export default function Reassurance({ countryCode }: { countryCode: string }) {
    const dictionary = getDictionary(countryCode)
    const items = [
        {
            title: dictionary.footer_reassurance.craft.title,
            description: dictionary.footer_reassurance.craft.description,
            icon: Hammer,
        },
        {
            title: dictionary.footer_reassurance.france.title,
            description: dictionary.footer_reassurance.france.description,
            icon: MapPin,
        },
        {
            title: dictionary.footer_reassurance.shipping.title,
            description: dictionary.footer_reassurance.shipping.description,
            icon: Truck,
        },
        {
            title: dictionary.footer_reassurance.payment.title,
            description: dictionary.footer_reassurance.payment.description,
            icon: ShieldCheck,
        },
    ]

    return (
        <div className="dark:bg-neutral-900 text-gray-900 dark:text-white white:text-gray-900 white:bg-white transition-colors duration-200">
            <div className="content-container py-12">
                <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
                    {items.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-luxury-gold">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-serif font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
