import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../modules/blog"
import BlogService from "../../../modules/blog/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    const { theme, offset, limit } = req.query

    const filters: any = {}
    if (theme) {
        filters.theme = theme
    }

    const [posts, count] = await blogService.listAndCountPosts(
        filters,
        {
            skip: offset ? Number(offset) : 0,
            take: limit ? Number(limit) : 10,
            order: { published_at: "DESC" }
        }
    )

    res.json({
        posts,
        count,
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : 10,
    })
}
