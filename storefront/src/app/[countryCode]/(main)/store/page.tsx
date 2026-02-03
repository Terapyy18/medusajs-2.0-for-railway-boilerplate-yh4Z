import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    theme?: string
    type?: string
  }
  params: {
    countryCode: string
  }
}

import { getCollectionsList } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page, theme, type } = searchParams

  const { collections } = await getCollectionsList(0, 100)
  const categories = await listCategories()

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      theme={theme}
      type={type}
      collections={collections}
      categories={categories}
    />
  )
}
