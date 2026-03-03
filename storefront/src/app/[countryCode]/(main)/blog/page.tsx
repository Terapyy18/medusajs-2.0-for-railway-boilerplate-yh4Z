import { Metadata } from "next"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
    title: "Blog | TeraPrint Studio",
    description: "Actualités et Histoires de l'atelier.",
}

// Fetch posts from backend
const getPosts = async () => {
    try {
        const res = await fetch("http://localhost:9000/store/blog?limit=10", {
            next: { revalidate: 3600 }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch posts")
        }

        return res.json()
    } catch (error) {
        console.error(error)
        return { posts: [] }
    }
}

export default async function BlogPage() {
    const { posts } = await getPosts()

    if (!posts) {
        return notFound()
    }

    return (
        <div className="w-full bg-paper min-h-screen py-12">
            <div className="content-container">
                <h1 className="text-4xl font-serif text-primary mb-12 text-center">Journal de l'Atelier</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <div key={post.id} className="flex flex-col gap-4 group cursor-pointer">
                            <LocalizedClientLink href={`/blog/${post.slug}`}>
                                <div className="bg-ui-bg-subtle aspect-[4/3] w-full rounded-lg overflow-hidden relative">
                                    {/* Placeholder for Main Image */}
                                    {post.main_image ? (
                                        <img src={post.main_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    {post.theme && post.theme !== 'none' && (
                                        <div className="absolute top-4 left-4 bg-primary text-accent-gold text-xs font-bold uppercase py-1 px-3 rounded-full">
                                            {post.theme}
                                        </div>
                                    )}
                                </div>
                            </LocalizedClientLink>

                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-ui-fg-muted uppercase tracking-wider">
                                    {new Date(post.published_at).toLocaleDateString()}
                                </span>
                                <LocalizedClientLink href={`/blog/${post.slug}`}>
                                    <h2 className="text-2xl font-serif text-primary group-hover:text-accent-gold transition-colors">
                                        {post.title}
                                    </h2>
                                </LocalizedClientLink>
                                <p className="text-ui-fg-subtle line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <LocalizedClientLink href={`/blog/${post.slug}`} className="text-sm font-bold text-primary underline mt-2">
                                    Lire la suite
                                </LocalizedClientLink>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Aucun article pour le moment.
                    </div>
                )}
            </div>
        </div>
    )
}
