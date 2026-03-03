import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    // Manual CORS handling since this is outside /store
    const origin = req.headers.origin || "*"
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

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

export const OPTIONS = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const origin = req.headers.origin || "*"
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.sendStatus(204)
}

// No authentication required
export const AUTHENTICATE = false
