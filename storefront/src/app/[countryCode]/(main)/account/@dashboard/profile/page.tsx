import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

import { getDictionary } from "@lib/dictionary"

export default async function Profile({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const customer = await getCustomer()
  const regions = await listRegions()
  const dictionary = getDictionary(countryCode)

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{dictionary.account.profile.title}</h1>
        <p className="text-base-regular">
          {dictionary.account.profile.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} dictionary={dictionary} />
        <Divider />
        <ProfileEmail customer={customer} dictionary={dictionary} />
        <Divider />
        <ProfilePhone customer={customer} dictionary={dictionary} />
        <Divider />
        <ProfilePassword customer={customer} dictionary={dictionary} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} dictionary={dictionary} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
