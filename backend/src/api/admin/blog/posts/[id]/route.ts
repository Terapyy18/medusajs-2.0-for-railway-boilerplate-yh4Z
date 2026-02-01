import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../../modules/blog"
import BlogService from "../../../../../modules/blog/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    const post = await blogService.retrievePost(req.params.id)

    res.json({ post })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    const post = await blogService.updatePosts({
        id: req.params.id,
        ...req.body as any
    })

    res.json({ post })
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)

    await blogService.deletePosts(req.params.id)

    res.json({
        id: req.params.id,
        object: "post",
        deleted: true,
    })
}
