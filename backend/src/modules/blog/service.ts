import { MedusaService } from "@medusajs/framework/utils"
import { Post } from "./models/post"

class BlogService extends MedusaService({
    Post,
}) {
    // Add custom methods here if needed, e.g. for specific theme filtering logic if standard list isn't enough
    // MedusaService provides list, retrieve, create, update, delete by default.
}

export default BlogService
