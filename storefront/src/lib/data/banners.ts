import { cache } from "react"

export type Banner = {
    id: string
    title: string
    subtitle?: string
    image_url?: string
    link_url: string
    link_text: string
    badge_text?: string
    badge_color?: string
    background_color?: string
    text_color?: string
    button_variant?: string
    position: number
}

export const getBanners = cache(async function (): Promise<Banner[]> {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

    try {
        // Use /public/banners to bypass Store API authentication/PK requirements
        const response = await fetch(`${baseUrl}/public/banners`, {
            next: {
                tags: ["banners"],
                revalidate: 60 // Revalidate every 60 seconds
            },
        })

        if (!response.ok) {
            console.error("Failed to fetch banners:", response.status, response.statusText)
            return []
        }

        const { banners } = await response.json()
        return banners || []
    } catch (error) {
        console.error("Error fetching banners:", error)
        return []
    }
})
