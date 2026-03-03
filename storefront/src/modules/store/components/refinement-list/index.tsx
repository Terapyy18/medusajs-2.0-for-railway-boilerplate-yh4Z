"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
  collections?: HttpTypes.StoreCollection[]
  categories?: HttpTypes.StoreProductCategory[]
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
  collections = [],
  categories = []
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />

      {/* Collections Filter (Themes) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base-semi">Thèmes</h3>
        <div className="flex flex-col gap-2">
          {collections.map((collection) => (
            <label key={collection.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={collection.handle}
                checked={searchParams.get("theme") === collection.handle}
                onChange={(e) => {
                  if (e.target.checked) setQueryParams("theme", collection.handle)
                }}
                className="accent-primary"
              />
              <span className="capitalize text-ui-fg-subtle text-sm">{collection.title}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value=""
              checked={!searchParams.get("theme")}
              onChange={() => {
                const params = new URLSearchParams(searchParams)
                params.delete("theme")
                router.push(`${pathname}?${params.toString()}`)
              }}
              className="accent-primary"
            />
            <span className="text-ui-fg-subtle text-sm">Tous</span>
          </label>
        </div>
      </div>

      {/* Categories Filter (Type) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base-semi">Catégorie</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={category.handle}
                checked={searchParams.get("type") === category.handle}
                onChange={(e) => {
                  if (e.target.checked) setQueryParams("type", category.handle)
                }}
                className="accent-primary"
              />
              <span className="capitalize text-ui-fg-subtle text-sm">{category.name}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value=""
              checked={!searchParams.get("type")}
              onChange={() => {
                const params = new URLSearchParams(searchParams)
                params.delete("type")
                router.push(`${pathname}?${params.toString()}`)
              }}
              className="accent-primary"
            />
            <span className="text-ui-fg-subtle text-sm">Tous</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
