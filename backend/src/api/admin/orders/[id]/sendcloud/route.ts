import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const { id } = req.params

        const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

        // fetch order details with Query API in Medusa v2
        const { data: [order] } = await query.graph({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "email",
                "shipping_address.*",
                "customer.*",
                "items.*",
                "items.variant.*"
            ],
            filters: {
                id: id,
            }
        })

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        if (!order.shipping_address) {
            return res.status(400).json({ message: "Order has no shipping address" })
        }

        // get user inputted data from req.body (e.g. weight)
        const { weight_kg } = req.body as { weight_kg?: number }

        // extract env vars
        const SENDCLOUD_PUBLIC_KEY = process.env.SENDCLOUD_PUBLIC_KEY
        const SENDCLOUD_SECRET_KEY = process.env.SENDCLOUD_SECRET_KEY

        if (!SENDCLOUD_PUBLIC_KEY || !SENDCLOUD_SECRET_KEY) {
            return res.status(500).json({ message: "Sendcloud API keys are not configured on the server." })
        }

        // Map Medusa order items to Sendcloud parcel items
        const parcelItems = (order.items || []).map((item: any) => {
            return {
                description: item.title ? String(item.title).substring(0, 50) : "Item",
                quantity: item.quantity || 1,
                weight: item.variant?.weight ? String(Number(item.variant.weight)) : "1", // Default to 1kg if unknown
                sku: item.variant?.sku || item.variant_sku || "",
                value: item.unit_price ? String((Number(item.unit_price)).toFixed(2)) : "1.00", // Medusa stores in cents generally
                hs_code: item.variant?.hs_code || "",
                origin_country: item.variant?.origin_country || "FR"
            }
        })

        // Prepare Sendcloud payload
        const parcelPayload = {
            parcel: {
                name: `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim() || "Customer",
                company_name: order.shipping_address.company || "",
                address: order.shipping_address.address_1 || "Incomplete Address",
                address_2: order.shipping_address.address_2 || "",
                city: order.shipping_address.city || "City",
                postal_code: order.shipping_address.postal_code || "00000",
                telephone: order.shipping_address.phone || "",
                request_label: false, // Must be false to create a draft without a hardcoded shipping_method ID
                email: order.email || "no-email@example.com",
                country: order.shipping_address.country_code?.toUpperCase() || "FR",
                weight: weight_kg ? String(weight_kg) : "1.000",
                order_number: order.display_id ? String(order.display_id) : id,
                parcel_items: parcelItems,
            }
        }

        const response = await fetch("https://panel.sendcloud.sc/api/v2/parcels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(`${SENDCLOUD_PUBLIC_KEY}:${SENDCLOUD_SECRET_KEY}`).toString("base64")
            },
            body: JSON.stringify(parcelPayload)
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("Sendcloud API error:", data)
            return res.status(response.status).json({ message: "Sendcloud API error", details: data })
        }

        return res.status(200).json({ parcel: data.parcel })
    } catch (error: any) {
        console.error("Sendcloud integration error:", error)
        return res.status(500).json({ message: "Internal Server Error syncing with Sendcloud", error: error.message })
    }
}
