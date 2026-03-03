import { Metadata } from "next"
import CraftsmanshipSection from "@modules/home/components/craftsmanship"
import RecommendedProducts from "@modules/home/components/recommended-products"
import { getDictionary } from "@lib/dictionary"

export const metadata: Metadata = {
    title: "Savoir-faire | TeraPrint Studio",
    description: "Découvrez nos secrets de fabrication artisanale.",
}

type Props = {
    params: Promise<{ countryCode: string }>
}

export default async function CraftsmanshipPage({ params }: Props) {
    const { countryCode } = await params
    const dictionary = getDictionary(countryCode)

    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white pt-24 transition-colors duration-200">
            <div className="content-container max-w-4xl mx-auto text-center mb-16 px-4">
                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white">
                    {dictionary.craftsmanship_page.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto font-light">
                    {dictionary.craftsmanship_page.subtitle}
                </p>
            </div>

            <CraftsmanshipSection countryCode={countryCode} />
            <RecommendedProducts countryCode={countryCode} />
        </div>
    )
}
