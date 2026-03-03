import { HttpTypes } from "@medusajs/types"

type StructuredDataProps = {
    product: HttpTypes.StoreProduct
}

export default function StructuredData({ product }: StructuredDataProps) {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        image: product.thumbnail,
        description: product.description,
        sku: product.variants?.[0]?.sku || "",
        brand: {
            "@type": "Brand",
            name: "TeraPrint Studio",
        },
        material: "Resin",
        productionMethod: "Hand-painted",
        countryOfOrigin: "France",
        offers: {
            "@type": "Offer",
            url: typeof window !== "undefined" ? window.location.href : "", // This might need server-side handling or be acceptable as is
            priceCurrency: "EUR", // Assuming EUR for now, or dynamic if accessible
            price: product.variants?.[0]?.calculated_price?.calculated_amount, // Ideally formatted
            availability: "https://schema.org/InStock", // Dynamic check needed in real app
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
