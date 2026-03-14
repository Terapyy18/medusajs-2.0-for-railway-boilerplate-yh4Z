import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import DiscoveryBanner from "@modules/store/components/discovery-banner"
import NarrativeBanner from "@modules/store/components/narrative-banner"
import { getDictionary } from "@lib/dictionary"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  theme,
  type,
  collections,
  categories
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  theme?: string
  type?: string
  collections?: HttpTypes.StoreCollection[]
  categories?: HttpTypes.StoreProductCategory[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const dictionary = getDictionary(countryCode)

  return (
    <div
      className="flex flex-col py-6 content-container"
      data-testid="category-container"
    >
      <DiscoveryBanner />

      <div className="flex flex-col small:flex-row small:items-start py-6">
        <RefinementList sortBy={sort} collections={collections} categories={categories} dictionary={dictionary.store} />
        <div className="w-full">
          <div className="mb-8 text-2xl-semi">
            <h1 data-testid="store-page-title">{dictionary.store.our_creations}</h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              theme={theme}
              type={type}
              collections={collections}
              categories={categories}
            />
          </Suspense>
        </div>
      </div>
      <NarrativeBanner />
    </div>
  )
}

export default StoreTemplate
