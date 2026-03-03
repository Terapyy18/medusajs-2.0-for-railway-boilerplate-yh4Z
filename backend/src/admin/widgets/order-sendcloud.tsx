import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, toast, Input, Label, Text } from "@medusajs/ui"
import { useState } from "react"

// ---------------------------------------------------------------------------
// Dictionnaire i18n local — même structure que le dictionnaire du storefront
// ---------------------------------------------------------------------------
const sendcloudDict = {
    en: {
        heading: "Sendcloud Integration",
        description: "Ready to ship? Verify the parcel weight and manually send the details to Sendcloud to create a label.",
        weight_label: "Weight (kg)",
        button: "Create Label in Sendcloud",
        toast: {
            success_title: "Sendcloud Draft Created!",
            success_description: "Review and print the label in your Sendcloud dashboard.",
            error_title: "Failed to create parcel",
            error_fallback: "Error creating parcel",
        },
    },
    fr: {
        heading: "Intégration Sendcloud",
        description: "Prêt à expédier ? Vérifiez le poids du colis et envoyez manuellement les détails à Sendcloud pour créer une étiquette.",
        weight_label: "Poids (kg)",
        button: "Créer l'étiquette dans Sendcloud",
        toast: {
            success_title: "Brouillon Sendcloud créé !",
            success_description: "Vérifiez et imprimez l'étiquette depuis votre tableau de bord Sendcloud.",
            error_title: "Échec de la création du colis",
            error_fallback: "Erreur lors de la création du colis",
        },
    },
} as const

type Lang = keyof typeof sendcloudDict

/** Détecte la langue du navigateur et retourne "fr" ou "en" (défaut). */
function useLang(): Lang {
    const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase()
    return (browserLang in sendcloudDict ? browserLang : "en") as Lang
}

// ---------------------------------------------------------------------------

const OrderSendcloudWidget = ({ data }: { data: any }) => {
    const t = sendcloudDict[useLang()]
    const [loading, setLoading] = useState(false)
    const [weight, setWeight] = useState("1.0")

    const handleCreateParcel = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/admin/orders/${data.id}/sendcloud`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ weight_kg: parseFloat(weight) }),
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message || t.toast.error_fallback)
            }

            toast.success(t.toast.success_title, {
                description: t.toast.success_description,
            })
        } catch (err: any) {
            toast.error(t.toast.error_title, {
                description: err.message,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="p-4 rounded-xl border border-ui-border-base flex flex-col gap-4">
            <Heading level="h2">{t.heading}</Heading>
            <Text className="text-ui-fg-subtle">
                {t.description}{" "}
                <a href="https://app.sendcloud.com/v2/shipping/list/orders">
                    https://app.sendcloud.com/v2/shipping/list/orders
                </a>
            </Text>

            <div className="flex flex-col gap-2 max-w-[200px]">
                <Label>{t.weight_label}</Label>
                <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.1"
                    min="0.1"
                />
            </div>

            <Button onClick={handleCreateParcel} isLoading={loading} className="w-fit" variant="secondary">
                {t.button}
            </Button>
        </Container>
    )
}

export const config = defineWidgetConfig({
    zone: "order.details.side.after",
})

export default OrderSendcloudWidget
