import { HttpTypes } from "@medusajs/types"
import { Text, Button } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
  orderConfirmedDictionary: any
  countryCode: string
}

const OrderDetails = ({ order, showStatus, orderConfirmedDictionary, countryCode }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <Text>
            {orderConfirmedDictionary.details.sent_to}{" "}
            <span
              className="text-ui-fg-medium-plus font-semibold"
              data-testid="order-email"
            >
              {order.email}
            </span>
            .
          </Text>
          <Text className="mt-2">
            {orderConfirmedDictionary.details.date}{" "}
            <span data-testid="order-date">
              {new Date(order.created_at).toDateString()}
            </span>
          </Text>
          <Text className="mt-2 text-ui-fg-interactive">
            {orderConfirmedDictionary.details.number} <span data-testid="order-id">{order.display_id}</span>
          </Text>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* Points to the local Next.js API route directly */}
          <a
            href={`/api/invoice/${order.id}?locale=${countryCode}`}
            download
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary" className="w-full">
              {orderConfirmedDictionary.download_invoice || 'Download Invoice'}
            </Button>
          </a>
        </div>
      </div>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {orderConfirmedDictionary.details.status}{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {/* TODO: Check where the statuses should come from */}
                {/* {formatStatus(order.fulfillment_status)} */}
              </span>
            </Text>
            <Text>
              {orderConfirmedDictionary.details.payment_status}{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {/* {formatStatus(order.payment_status)} */}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
