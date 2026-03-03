import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

import { Dictionary } from "@lib/dictionary"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
  dictionary: Dictionary
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region, dictionary }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4 color-white">
        <AddAddress region={region} dictionary={dictionary} />
        {customer.addresses.map((address) => {
          return (
            <EditAddress region={region} address={address} key={address.id} dictionary={dictionary} />
          )
        })}
      </div>
    </div>
  )
}

export default AddressBook
