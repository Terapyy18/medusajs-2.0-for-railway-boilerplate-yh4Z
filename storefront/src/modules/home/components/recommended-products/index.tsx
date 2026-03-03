import { HttpTypes } from "@medusajs/types"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { getDictionary } from "@lib/dictionary"

export default async function RecommendedProducts({ countryCode }: { countryCode: string }) {
    const dictionary = getDictionary(countryCode)
    const region = await getRegion(countryCode)

    if (!region) {
        return null
    }

    // Fetch first 4 products
    const { response } = await getProductsList({
        queryParams: { limit: 4, region_id: region.id },
        countryCode,
    })

    const products = response.products

    if (!products || products.length === 0) {
        return null
    }

    return (
        <div className="w-full py-16 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-200">
            <div className="content-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">
                        {dictionary.recommended_products.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {dictionary.recommended_products.subtitle}
                    </p>
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <li key={product.id}>
                            {/* @ts-ignore */}
                            <ProductPreview product={product} region={region} isFeatured />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
