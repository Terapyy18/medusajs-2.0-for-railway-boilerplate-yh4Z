import Image from "next/image"
import { getDictionary } from "@lib/dictionary"
import Reassurance from "@modules/home/components/reassurance"

export default function Craftsmanship({ countryCode }: { countryCode: string }) {
    const dictionary = getDictionary(countryCode)

    return (
        <section className="py-24 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-200">
            <div className="content-container">
                {/* Block 1: The Knight */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden">
                        <Image
                            src="/Egypt_view.jpg"
                            alt="Craftsmanship process"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-10">
                        <h2 className="font-serif text-4xl mb-6">{dictionary.craftsmanship.block1.title}</h2>
                        <p className="font-sans text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            {dictionary.craftsmanship.block1.text}
                        </p>
                    </div>
                </div>
            </div>

            <div className="content-container">
                {/* Block 2: The Weight */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 mt-24">
                    <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden">
                        <Image
                            src="/Rome_view.jpg"
                            alt="Weighted base detail"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-10">
                        <h2 className="font-serif text-4xl mb-6">{dictionary.craftsmanship.block2.title}</h2>
                        <p className="font-sans text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            {dictionary.craftsmanship.block2.text}
                        </p>
                    </div>
                </div>
            </div>
            <Reassurance countryCode={countryCode} />
        </section>
    )
}
