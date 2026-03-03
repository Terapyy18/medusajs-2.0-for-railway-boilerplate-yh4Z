import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BannerModuleService from "../../../../modules/banner/service"

// GET a single banner
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const bannerModuleService = req.scope.resolve<BannerModuleService>("banner")
    const { id } = req.params

    const banner = await bannerModuleService.retrieveBanner(id)

    res.json({ banner })
}

// POST update a banner
export const POST = async (
    req: MedusaRequest<{
        title?: string
        subtitle?: string
        image_url?: string
        link_url?: string
        link_text?: string
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
    const bannerModuleService = req.scope.resolve<BannerModuleService>("banner")
    const { id } = req.params

    const banner = await bannerModuleService.updateBanners({
        id,
        ...req.body
    })

    res.json({ banner })
}

// DELETE a banner
export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const bannerModuleService = req.scope.resolve<BannerModuleService>("banner")
    const { id } = req.params

    await bannerModuleService.deleteBanners(id)

    res.json({
        id,
        deleted: true
    })
}
