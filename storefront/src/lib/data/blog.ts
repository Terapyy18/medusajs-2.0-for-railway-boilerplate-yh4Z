import { sdk } from "@lib/config"

export async function getBlogPosts() {
    // Medusa 2.0 Client usually allows .fetch or we use standard fetch
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

    const response = await fetch(`${backendUrl}/store/blog`, {
        headers: {
            "x-publishable-api-key": publishableKey
        },
        next: { tags: ["posts"] }
    })
    const { posts } = await response.json()
    return posts
}

export async function getBlogPost(slug: string) {
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

    const response = await fetch(`${backendUrl}/store/blog/${slug}`, {
        headers: {
            "x-publishable-api-key": publishableKey
        },
        next: { revalidate: 3600 }
    })

    if (!response.ok) {
        return null
    }

    return response.json()
}
