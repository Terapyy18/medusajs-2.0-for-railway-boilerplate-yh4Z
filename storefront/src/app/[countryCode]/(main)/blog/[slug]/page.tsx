import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost } from "@lib/data/blog"
import Reassurance from "@modules/home/components/reassurance"
import Newsletter from "@modules/home/components/newsletter"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Text, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
    params: Promise<{
        slug: string
        countryCode: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const data = await getBlogPost(slug)
    if (!data?.post) return { title: "Article not found" }

    return {
        title: `${data.post.title} | TeraPrint Studio`,
        description: data.post.excerpt,
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, countryCode } = await params
    const data = await getBlogPost(slug)

    if (!data || !data.post) {
        return notFound()
    }

    const { post } = data

    // Fetch products for suggestion
    const region = await getRegion(countryCode)
    const { response: { products } } = await getProductsList({
        countryCode,
        queryParams: { limit: 4 }
    })

    return (
        <article className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-200">
            {/* Header / Hero */}
            <div className="w-full relative h-[60vh] md:h-[70vh] mb-12">
                {post.main_image ? (
                    <div className="absolute inset-0">
                        <img
                            src={post.main_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-neutral-900" />
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="content-container max-w-4xl mx-auto text-center px-4 text-white">
                        {post.theme && post.theme !== 'none' && (
                            <span className="text-accent-gold text-sm font-bold uppercase tracking-widest mb-6 inline-block border border-accent-gold px-3 py-1 bg-black/50 backdrop-blur-sm">
                                {post.theme}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight drop-shadow-lg">
                            {post.title}
                        </h1>
                        <p className="text-gray-200 italic font-light text-lg">
                            {new Date(post.published_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="content-container max-w-2xl mx-auto mb-20 px-4">
                {post.excerpt && (
                    <div className="text-xl md:text-2xl font-serif text-gray-700 dark:text-gray-200 mb-12 italic border-l-4 border-accent-gold pl-6 leading-relaxed">
                        {post.excerpt}
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert font-sans text-gray-600 dark:text-gray-300 max-w-none text-opacity-90 prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-accent-gold hover:prose-a:text-accent-gold/80 prose-img:rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>

            {/* Section Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 mb-20" />

            {/* Product Suggestions */}
            {products && products.length > 0 && region && (
                <div className="content-container max-w-6xl mx-auto mb-24 px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-sm font-bold uppercase tracking-widest text-accent-gold mb-3">Shop</span>
                        <Heading level="h2" className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white">
                            Featured Creations
                        </Heading>
                    </div>

                    <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <li key={product.id}>
                                <ProductPreview region={region} product={product} />
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 text-center">
                        <LocalizedClientLink
                            href="/store"
                            className="inline-block px-8 py-3 bg-primary text-white font-sans uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
                        >
                            View All Collection
                        </LocalizedClientLink>
                    </div>
                </div>
            )}

            {/* Reassurance */}
            <Reassurance countryCode={countryCode} />

            {/* Newsletter */}
            <Newsletter />
        </article>
    )
}
