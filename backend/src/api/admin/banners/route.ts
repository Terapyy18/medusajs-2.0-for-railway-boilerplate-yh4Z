import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// GET all banners (admin)
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const bannerModuleService = req.scope.resolve("banner")

    const banners = await bannerModuleService.listBanners({}, {
        order: { position: "ASC" }
    })

    res.json({ banners })
}

// POST create a new banner
export const POST = async (
    req: MedusaRequest<{
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
        position?: number
        is_active?: boolean
    }>,
    res: MedusaResponse
) => {
    const bannerModuleService = req.scope.resolve("banner")

    const banner = await bannerModuleService.createBanners(req.body)

    res.json({ banner })
}
