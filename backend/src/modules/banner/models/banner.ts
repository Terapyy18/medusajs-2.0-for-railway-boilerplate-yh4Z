import { model } from "@medusajs/framework/utils"

export const Banner = model.define("banner", {
    id: model.id().primaryKey(),
    title: model.text(),
    subtitle: model.text().nullable(),
    image_url: model.text().nullable(),
    link_url: model.text(),
    link_text: model.text(),
    badge_text: model.text().nullable(),
    badge_color: model.text().nullable(),
    background_color: model.text().nullable(),
    text_color: model.text().default("#FFFFFF"),
    button_variant: model.text().default("secondary"),
    position: model.number().default(0),
    is_active: model.boolean().default(true),
})
