import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    // This route exists to satisfy the Sendcloud Integration requirement for a Webhook URL.
    // It is placed in /sendcloud/webhook so it is not caught by the Medusa Admin authentication middleware.

    try {
        console.log("Received Sendcloud Webhook POST event");
        return res.status(200).json({ received: true })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    // Some webhooks send a GET request to verify the endpoint is alive
    try {
        console.log("Received Sendcloud Webhook GET event");
        return res.status(200).json({ received: true })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
}
