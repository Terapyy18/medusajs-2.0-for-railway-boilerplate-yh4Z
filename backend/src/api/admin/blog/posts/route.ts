import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogService from "../../../../modules/blog/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    const { limit, offset, order, ...filters } = req.query

    const [posts, count] = await blogService.listAndCountPosts(
        filters,
        {
            skip: offset ? Number(offset) : 0,
            take: limit ? Number(limit) : 20,
            order: order ? order as any : { published_at: "DESC" }
        }
    )

    res.json({
        posts,
        count,
        limit: limit ? Number(limit) : 20,
        offset: offset ? Number(offset) : 0,
    })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    const post = await blogService.createPosts(req.body)

    res.json({ post })
}
