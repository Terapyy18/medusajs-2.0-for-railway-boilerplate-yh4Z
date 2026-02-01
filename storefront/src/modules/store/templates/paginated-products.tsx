import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import NarrativeBanner from "@modules/store/components/narrative-banner"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  // Extend for custom filters
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  theme,
  type
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  theme?: string
  type?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  // Narrative Grid Logic
  // Chunk products into groups of 6
  const chunkSize = 6
  const productChunks = []
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize))
  }

  return (
    <>
      <div className="flex flex-col w-full gap-8" data-testid="products-list">
        {productChunks.map((chunk, index) => (
          <div key={`chunk-${index}`} className="flex flex-col gap-12">
            <ul className="grid grid-cols-2 w-full small:grid-cols-3 gap-x-6 gap-y-8">
              {chunk.map((p) => (
                <li key={p.id}>
                  <ProductPreview product={p} region={region} />
                </li>
              ))}
            </ul>
            {/* Insert Banner after first chunk (index 0) */}
            {index === 0 && products.length >= 6 && (
              <NarrativeBanner />
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
