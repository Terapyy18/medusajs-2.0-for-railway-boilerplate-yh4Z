import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { getCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

import { getDictionary } from "@lib/dictionary"

export default async function OverviewTemplate({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const customer = await getCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  const dictionary = getDictionary(countryCode)

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} dictionary={dictionary} />
}
