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
    Link,
} from "@react-email/components"
import { OrderDTO } from "@medusajs/framework/types"
import * as React from "react"

interface OrderShippedTemplateProps {
    order: OrderDTO
    trackingNumber?: string
    trackingUrl?: string
    shippingProvider?: string
    preview?: string
    locale?: 'fr' | 'en'
    storeUrl?: string
}

export const ORDER_SHIPPED = 'order-shipped'

export const isOrderShippedTemplateData = (data: any): data is OrderShippedTemplateProps =>
    typeof data.order === 'object'

const translations = {
    en: {
        title: 'Your Order Has Shipped!',
        greeting: 'Hi',
        message: 'Good news! Your order has been shipped and is on its way to you.',
        tracking: 'Tracking Number:',
        provider: 'Carrier:',
        viewOrder: 'View your order',
        footer: 'Thank you for shopping with TeraPrintStudio!',
        rights: 'All rights reserved.',
    },
    fr: {
        title: 'Votre commande a été expédiée !',
        greeting: 'Bonjour',
        message: 'Bonne nouvelle ! Votre commande a été expédiée et est en route vers chez vous.',
        tracking: 'Numéro de suivi :',
        provider: 'Transporteur :',
        viewOrder: 'Voir votre commande',
        footer: 'Merci d\'avoir commandé chez TeraPrintStudio !',
        rights: 'Tous droits réservés.',
    }
}

const formatProvider = (provider: string) => {
    if (provider === 'manual_manual') return 'Manual'
    return provider.charAt(0).toUpperCase() + provider.slice(1)
}

export const OrderShippedTemplate = ({
    order,
    trackingNumber,
    trackingUrl,
    shippingProvider,
    preview = "Your order is on its way!",
    locale = 'en',
    storeUrl = 'http://localhost:8000',
}: OrderShippedTemplateProps) => {
    const t = translations[locale] || translations.en
    const logoUrl = `${storeUrl}/logo.PNG`
    const formattedProvider = shippingProvider ? formatProvider(shippingProvider) : undefined

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

                            {(trackingNumber || formattedProvider) && (
                                <Section className="bg-gray-50 rounded-lg p-6 mb-6">
                                    {trackingNumber && (
                                        <Text className="text-sm text-gray-600 mb-2">
                                            <span className="font-semibold">{t.tracking}</span>{' '}
                                            {trackingUrl ? (
                                                <Link href={trackingUrl} className="text-blue-600 underline">
                                                    {trackingNumber}
                                                </Link>
                                            ) : (
                                                trackingNumber
                                            )}
                                        </Text>
                                    )}
                                    {formattedProvider && (
                                        <Text className="text-sm text-gray-600">
                                            <span className="font-semibold">{t.provider}</span> {formattedProvider}
                                        </Text>
                                    )}
                                </Section>
                            )}

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

export default OrderShippedTemplate
