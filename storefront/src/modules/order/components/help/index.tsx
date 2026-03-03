import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = ({ orderConfirmedDictionary }: { orderConfirmedDictionary: any }) => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{orderConfirmedDictionary.help.title}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">{orderConfirmedDictionary.help.contact}</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {orderConfirmedDictionary.help.returns}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
