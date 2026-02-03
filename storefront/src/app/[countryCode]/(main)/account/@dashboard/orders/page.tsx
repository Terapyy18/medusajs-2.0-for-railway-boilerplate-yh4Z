import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { getDictionary } from "@lib/dictionary"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const orders = await listOrders()
  const dictionary = getDictionary(countryCode)

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{dictionary.account.orders.title}</h1>
        <p className="text-base-regular">
          {dictionary.account.orders.description}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} dictionary={dictionary} />
      </div>
    </div>
  )
}
