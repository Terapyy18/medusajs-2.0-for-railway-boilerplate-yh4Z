import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components"
import { OrderDTO } from "@medusajs/framework/types"
import * as React from "react"

interface OrderDeliveredTemplateProps {
    order: OrderDTO
    preview?: string
    locale?: 'fr' | 'en'
    storeUrl?: string
}

export const ORDER_DELIVERED = 'order-delivered'

export const isOrderDeliveredTemplateData = (data: any): data is OrderDeliveredTemplateProps =>
    typeof data.order === 'object'

const translations = {
    en: {
        title: 'Your Order Has Been Delivered!',
        greeting: 'Hi',
        message: 'Your order has been delivered successfully. We hope you enjoy your purchase!',
        footer: 'Thank you for shopping with TeraPrintStudio!',
        rights: 'All rights reserved.',
    },
    fr: {
        title: 'Votre commande a été livrée !',
        greeting: 'Bonjour',
        message: 'Votre commande a été livrée avec succès. Nous espérons que vous apprécierez votre achat !',
        footer: 'Merci d\'avoir commandé chez TeraPrintStudio !',
        rights: 'Tous droits réservés.',
    }
}

export const OrderDeliveredTemplate = ({
    order,
    preview = "Your order has arrived!",
    locale = 'en',
    storeUrl = 'http://localhost:8000',
}: OrderDeliveredTemplateProps) => {
    const t = translations[locale] || translations.en
    const logoUrl = `${storeUrl}/logo.PNG`

    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans text-gray-900 antialiased">
                    <Container className="mx-auto my-0 pb-12 w-full max-w-xl">
                        <Section className="px-10 py-6 text-center">
                            <Img
                                src={logoUrl}
                                alt="TeraPrintStudio"
                                height="60"
                                className="mx-auto mb-4 object-contain"
                            />
                            <Hr className="border-gray-200 my-6" />
                        </Section>

                        <Section className="px-10">
                            <Heading className="text-2xl font-bold text-center text-gray-800 mb-4">
                                {t.title}
                            </Heading>

                            <Text className="text-base leading-6 text-gray-700 mb-4">
                                {t.greeting} {order?.shipping_address?.first_name},
                            </Text>

                            <Text className="text-base leading-6 text-gray-700 mb-6">
                                {t.message}
                            </Text>

                            <Text className="text-sm text-gray-500 mt-8 text-center">
                                Order #{order?.display_id}
                            </Text>
                        </Section>

                        <Section className="px-10 py-6 mt-8 border-t border-gray-100 text-center">
                            <Text className="text-xs text-gray-400 mb-2">
                                {t.footer}
                            </Text>
                            <Text className="text-xs text-gray-400">
                                © {new Date().getFullYear()} TeraPrintStudio. {t.rights}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default OrderDeliveredTemplate
