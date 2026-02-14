import { Text, Section, Hr, Img } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_PLACED = 'order-placed'

interface OrderPlacedPreviewProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
}

export interface OrderPlacedTemplateProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
  preview?: string
  locale?: 'fr' | 'en'
  storeUrl?: string
}

export const isOrderPlacedTemplateData = (data: any): data is OrderPlacedTemplateProps =>
  typeof data.order === 'object' && typeof data.shippingAddress === 'object'

export const OrderPlacedTemplate: React.FC<OrderPlacedTemplateProps> & {
  PreviewProps: OrderPlacedPreviewProps
} = ({ order, shippingAddress, preview = 'Your order has been placed!', locale = 'en', storeUrl = 'http://localhost:8000' }) => {

  const translations = {
    en: {
      title: 'Order Confirmation',
      greeting: 'Dear',
      message: 'Thank you for your recent order! Here are your order details:',
      summary: 'Order Summary',
      orderId: 'Order ID:',
      date: 'Order Date:',
      total: 'Total:',
      shipping: 'Shipping Address',
      items: 'Order Items',
      itemCol: 'Item',
      qtyCol: 'Quantity',
      priceCol: 'Price',
      footer: 'Thank you for shopping with TeraPrintStudio!',
      rights: 'All rights reserved.'
    },
    fr: {
      title: 'Confirmation de commande',
      greeting: 'Cher/Chère',
      message: 'Merci pour votre commande récente ! Voici les détails de votre commande :',
      summary: 'Résumé de la commande',
      orderId: 'Numéro de commande :',
      date: 'Date de commande :',
      total: 'Total :',
      shipping: 'Adresse de livraison',
      items: 'Articles commandés',
      itemCol: 'Article',
      qtyCol: 'Quantité',
      priceCol: 'Prix',
      footer: 'Merci d\'avoir commandé chez TeraPrintStudio !',
      rights: 'Tous droits réservés.'
    }
  }

  const t = translations[locale] || translations.en
  const logoUrl = `${storeUrl}/logo.PNG`

  return (
    <Base preview={preview}>
      <Section className="px-10 py-6 text-center">
        <Img
          src={logoUrl}
          alt="TeraPrintStudio"
          height="60"
          className="mx-auto mb-4 object-contain"
        />
        <Hr className="border-gray-200 my-6" />
      </Section>
      <Section>
        <Text style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 30px' }}>
          {t.title}
        </Text>

        <Text style={{ margin: '0 0 15px' }}>
          {t.greeting} {shippingAddress.first_name} {shippingAddress.last_name},
        </Text>

        <Text style={{ margin: '0 0 30px' }}>
          {t.message}
        </Text>

        <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
          {t.summary}
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {t.orderId} {order.display_id}
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {t.date} {new Date(order.created_at).toLocaleDateString()}
        </Text>
        <Text style={{ margin: '0 0 20px' }}>
          {t.total} {order.summary.raw_current_order_total.value} {order.currency_code}
        </Text>

        <Hr style={{ margin: '20px 0' }} />

        <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
          {t.shipping}
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {shippingAddress.address_1}
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}
        </Text>
        <Text style={{ margin: '0 0 20px' }}>
          {shippingAddress.country_code}
        </Text>

        <Hr style={{ margin: '20px 0' }} />

        <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px' }}>
          {t.items}
        </Text>

        <div style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ddd',
          margin: '10px 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            padding: '8px',
            borderBottom: '1px solid #ddd'
          }}>
            <Text style={{ fontWeight: 'bold' }}>{t.itemCol}</Text>
            <Text style={{ fontWeight: 'bold' }}>{t.qtyCol}</Text>
            <Text style={{ fontWeight: 'bold' }}>{t.priceCol}</Text>
          </div>
          {order.items.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              borderBottom: '1px solid #ddd'
            }}>
              <Text>{item.title} - {item.product_title}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.unit_price} {order.currency_code}</Text>
            </div>
          ))}
        </div>

        <Section className="px-10 py-6 mt-8 border-t border-gray-100 text-center">
          <Text className="text-xs text-gray-400 mb-2">
            {t.footer}
          </Text>
          <Text className="text-xs text-gray-400">
            © {new Date().getFullYear()} TeraPrintStudio. {t.rights}
          </Text>
        </Section>
      </Section>
    </Base>
  )
}

OrderPlacedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'USD',
    items: [
      { id: 'item-1', title: 'Item 1', product_title: 'Product 1', quantity: 2, unit_price: 10 },
      { id: 'item-2', title: 'Item 2', product_title: 'Product 2', quantity: 1, unit_price: 25 }
    ],
    shipping_address: {
      first_name: 'Test',
      last_name: 'User',
      address_1: '123 Main St',
      city: 'Anytown',
      province: 'CA',
      postal_code: '12345',
      country_code: 'US'
    },
    summary: { raw_current_order_total: { value: 45 } }
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'US'
  }
} as OrderPlacedPreviewProps

export default OrderPlacedTemplate
