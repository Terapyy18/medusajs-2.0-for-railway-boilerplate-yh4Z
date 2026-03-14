"use client"

import { XMark } from "@medusajs/icons"
import React from "react"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
  orderConfirmedDictionary: any
  countryCode: string
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
  orderConfirmedDictionary,
  countryCode
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">{orderConfirmedDictionary?.order_details_title || 'Order details'}</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> {orderConfirmedDictionary?.back_to_overview || 'Back to overview'}
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 h-full w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus orderConfirmedDictionary={orderConfirmedDictionary} countryCode={countryCode} />
        <Items items={order.items} />
        <ShippingDetails order={order} orderConfirmedDictionary={orderConfirmedDictionary} />
        <OrderSummary order={order} />
        <Help orderConfirmedDictionary={orderConfirmedDictionary} />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
