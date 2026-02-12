import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"

import Hero from "@modules/home/components/hero"
import Craftsmanship from "@modules/home/components/craftsmanship"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

import Newsletter from "@modules/home/components/newsletter"


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

  // Allow rendering even if collections/region are missing to avoid empty page
  // if (!collections || !region) {
  //   return null
  // }

  return (
    <>
      <Hero />

      <ul className="flex flex-col gap-x-6">
        {collections && region && (
          <FeaturedProducts collections={collections} region={region} countryCode={countryCode} />
        )}
      </ul>
      <Craftsmanship countryCode={countryCode} />
      <Newsletter />
    </>
  )
}
