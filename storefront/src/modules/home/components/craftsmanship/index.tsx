import Image from "next/image"
import { getDictionary } from "@lib/dictionary"

export default function Craftsmanship({ countryCode }: { countryCode: string }) {
    const dictionary = getDictionary(countryCode)

    return (
        <section className="py-24 bg-[#F9F9F9] text-luxury-black">
            <div className="content-container">
                {/* Block 1: The Knight */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden">
                        <Image
                            src="/knight-carving.png"
                            alt="Craftsmanship process"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-10">
                        <h2 className="font-serif text-4xl mb-6">{dictionary.craftsmanship.block1.title}</h2>
                        <p className="font-sans text-lg leading-relaxed text-gray-700">
                            {dictionary.craftsmanship.block1.text}
                        </p>
                    </div>
                </div>

                {/* Block 2: The Weight */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden">
                        <Image
                            src="/weight-base.png"
                            alt="Weighted base detail"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-10">
                        <h2 className="font-serif text-4xl mb-6">{dictionary.craftsmanship.block2.title}</h2>
                        <p className="font-sans text-lg leading-relaxed text-gray-700">
                            {dictionary.craftsmanship.block2.text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
