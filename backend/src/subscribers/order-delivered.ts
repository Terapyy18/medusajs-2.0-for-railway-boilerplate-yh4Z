import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService, IFulfillmentModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function orderDeliveredHandler({
    event: { data },
    container,
}: SubscriberArgs<any>) {
    const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
    const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
    const fulfillmentModuleService: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT)

    // Retrieve fulfillment with items to get line item IDs
    console.log('Order Delivered Subscriber: Triggered', JSON.stringify(data, null, 2))

    const fulfillmentId = data.id
    const fulfillment = await fulfillmentModuleService.retrieveFulfillment(fulfillmentId, {
        relations: ['items']
    })



    if (!fulfillment.items?.length) {
        return
    }

    // Find the order containing the first line item from the fulfillment
    const orders = await orderModuleService.listOrders({
        items: {
            id: fulfillment.items[0].line_item_id
        }
    } as any, {
        relations: ['items', 'summary', 'shipping_address']
    })

    if (!orders.length) {
        return
    }

    const order = orders[0]

    console.log('Order Delivered Subscriber: Sending email to', order.email)

    const locale = order.shipping_address?.country_code === 'fr' ? 'fr' : 'en'
    const storeUrl = process.env.STORE_CORS?.split(',')[0] || 'http://localhost:8000'

    try {
        await notificationModuleService.createNotifications({
            to: order.email,
            channel: 'email',
            template: EmailTemplates.ORDER_DELIVERED,
            data: {
                emailOptions: {
                    replyTo: 'info@example.com',
                    subject: locale === 'fr'
                        ? `Votre commande #${order.display_id} a été livrée`
                        : `Your order #${order.display_id} has been delivered`
                },
                order,
                locale,
                storeUrl,
                preview: locale === 'fr' ? 'Votre commande est arrivée !' : 'Your order has arrived!'
            }
        })
    } catch (error) {
        console.error('Error sending order delivered notification:', error)
    }
}

export const config: SubscriberConfig = {
    event: 'delivery.created'
}
