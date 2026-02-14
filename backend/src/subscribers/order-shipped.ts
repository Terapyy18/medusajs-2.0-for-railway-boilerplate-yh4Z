import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService, IFulfillmentModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

console.log('Order Shipped Subscriber: File loaded')

export default async function orderShippedHandler({
    event: { data },
    container,
}: SubscriberArgs<any>) {
    const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
    const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
    const fulfillmentModuleService: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT)

    console.log('Order Shipped Subscriber: Triggered', JSON.stringify(data, null, 2))

    // Retrieve fulfillment with items to get line item IDs
    // Note: Payload for shipment.created might be { id: string, ... } or { fulfillment_id: string, ... }
    // We'll trust it has 'id' for now based on events.js comments, but logging will confirm.
    const fulfillmentId = data.id
    const fulfillment = await fulfillmentModuleService.retrieveFulfillment(fulfillmentId, {
        relations: ['items', 'labels']
    })

    console.log('Order Shipped Subscriber: Fulfillment retrieved', fulfillment?.id, 'Items:', fulfillment?.items?.length)

    if (!fulfillment.items?.length) {
        console.log('Order Shipped Subscriber: No items in fulfillment')
        return
    }

    const lineItemId = fulfillment.items[0].line_item_id
    console.log('Order Shipped Subscriber: looking for order with line item', lineItemId)

    // Find the order containing the first line item from the fulfillment
    // We assume all items in a fulfillment belong to the same order
    const orders = await orderModuleService.listOrders({
        items: {
            id: lineItemId
        }
    } as any, {
        relations: ['items', 'summary', 'shipping_address']
    })

    console.log('Order Shipped Subscriber: Orders found', orders.length)

    if (!orders.length) {
        console.log('Order Shipped Subscriber: Order not found')
        return
    }

    const order = orders[0]

    // Get tracking info if available
    const trackingNumber = fulfillment.labels?.[0]?.tracking_number
    const trackingUrl = fulfillment.labels?.[0]?.tracking_url
    const shippingProvider = fulfillment.provider_id

    console.log('Order Shipped Subscriber: Tracking info', { trackingNumber, trackingUrl, shippingProvider, labels: fulfillment.labels })

    console.log('Order Shipped Subscriber: Sending email to', order.email)

    const locale = order.shipping_address?.country_code === 'fr' ? 'fr' : 'en'
    // Use STORE_CORS or default to localhost:8000 for the logo base URL
    const storeUrl = process.env.STORE_CORS?.split(',')[0] || 'http://localhost:8000'

    try {
        const result = await notificationModuleService.createNotifications({
            to: order.email,
            channel: 'email',
            template: EmailTemplates.ORDER_SHIPPED,
            data: {
                emailOptions: {
                    replyTo: 'info@example.com',
                    subject: locale === 'fr'
                        ? `Votre commande #${order.display_id} a été expédiée`
                        : `Your order #${order.display_id} has been shipped`
                },
                order,
                trackingNumber,
                trackingUrl,
                shippingProvider,
                locale,
                storeUrl,
                preview: locale === 'fr' ? 'Votre commande est en route !' : 'Your order is on its way!'
            }
        })
        console.log('Order Shipped Subscriber: Notification created', result)
    } catch (error) {
        console.error('Error sending order shipped notification:', error)
    }
}

export const config: SubscriberConfig = {
    event: 'shipment.created'
}
