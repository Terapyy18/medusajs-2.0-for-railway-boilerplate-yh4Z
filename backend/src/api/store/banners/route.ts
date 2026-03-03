import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const bannerModuleService = req.scope.resolve("banner")

    const banners = await bannerModuleService.listBanners({
        is_active: true
    }, {
        select: ["id", "title", "subtitle", "image_url", "link_url", "link_text", "badge_text", "badge_color", "background_color", "text_color", "button_variant", "position"],
        order: { position: "ASC" }
    })

    // Return only top 2 active banners
    res.json({ banners: banners.slice(0, 2) })
}

// Allow unauthenticated access to this endpoint
export const AUTHENTICATE = false
