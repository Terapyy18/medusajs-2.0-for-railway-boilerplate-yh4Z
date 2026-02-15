import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Craftsmanship from "@modules/home/components/craftsmanship"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

import Newsletter from "@modules/home/components/newsletter"
import RecommendedProducts from "@modules/home/components/recommended-products"
import { getDictionary } from "@lib/dictionary"

export const metadata: Metadata = {
  title: "TeraPrint Studio",
  description:
    "Luxury 3D Printed Chess Sets & Art. Made in France.",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const dictionary = getDictionary(countryCode)

  // Allow rendering even if collections/region are missing to avoid empty page
  // if (!collections || !region) {
  //   return null
  // }

  return (
    <>
      <Hero dictionary={dictionary} />

      <ul className="flex flex-col gap-x-6">
        <RecommendedProducts countryCode={countryCode} />
      </ul>
      <Craftsmanship countryCode={countryCode} />
      <Newsletter dictionary={dictionary} />
    </>
  )
}
