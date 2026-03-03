import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogService from "../../../../modules/blog/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const blogService: BlogService = req.scope.resolve(BLOG_MODULE)
    const { slug } = req.params
    const posts = await blogService.listPosts({
        slug: slug,
    }, {
        take: 1
    })

    if (!posts || posts.length === 0) {
        res.status(404).json({ message: "Post not found" })
        return
    }

    res.json({
        post: posts[0],
    })
}
