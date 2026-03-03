import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, toast, Input, Label, Text } from "@medusajs/ui"
import { useState } from "react"

const OrderSendcloudWidget = ({ data }: { data: any }) => {
    const [loading, setLoading] = useState(false)
    const [weight, setWeight] = useState("1.0")

    const handleCreateParcel = async () => {
        setLoading(true)
        try {
            // In Medusa v2 the dashboard is served at /app, and the backend is at the same origin
            const res = await fetch(`/admin/orders/${data.id}/sendcloud`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ weight_kg: parseFloat(weight) })
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message || "Error creating parcel")
            }

            toast.success("Sendcloud Draft Created!", {
                description: "Review and print the label in your Sendcloud dashboard."
            })
        } catch (err: any) {
            toast.error("Failed to create parcel", {
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="p-4 rounded-xl border border-ui-border-base flex flex-col gap-4">
            <Heading level="h2">Sendcloud Integration</Heading>
            <Text className="text-ui-fg-subtle">
                Ready to ship? Verify the parcel weight and manually send the details to Sendcloud to create a label.
            </Text>

            <div className="flex flex-col gap-2 max-w-[200px]">
                <Label>Weight (kg)</Label>
                <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.1"
                    min="0.1"
                />
            </div>

            <Button onClick={handleCreateParcel} isLoading={loading} className="w-fit" variant="secondary">
                Create Label in Sendcloud
            </Button>
        </Container>
    )
}

export const config = defineWidgetConfig({
    zone: "order.details.side.after", // Displays on the right side-panel of the order details page
})

export default OrderSendcloudWidget
