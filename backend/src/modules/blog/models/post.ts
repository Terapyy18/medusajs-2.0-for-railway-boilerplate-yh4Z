import { model } from "@medusajs/utils"

export const Post = model.define("post", {
    id: model.id().primaryKey(),
    title: model.text(),
    slug: model.text().unique(),
    content: model.text(),
    excerpt: model.text().nullable(),
    main_image: model.text().nullable(),
    theme: model.enum(["egypt", "zombies", "rome", "none"]).default("none"),
    published_at: model.dateTime().nullable(),
})
