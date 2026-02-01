"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
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

      {/* Themes Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base-semi">Thèmes</h3>
        <div className="flex flex-col gap-2">
          {["egypt", "zombies", "rome"].map((theme) => (
            <label key={theme} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={searchParams.get("theme") === theme}
                onChange={(e) => {
                  if (e.target.checked) setQueryParams("theme", theme)
                }}
                className="accent-primary"
              />
              <span className="capitalize text-ui-fg-subtle text-sm">{theme}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value=""
              checked={!searchParams.get("theme")}
              onChange={() => {
                // Remove param
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

      {/* Type Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base-semi">Type</h3>
        <div className="flex flex-col gap-2">
          {["set", "pieces", "board"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={searchParams.get("type") === type}
                onChange={(e) => {
                  if (e.target.checked) setQueryParams("type", type)
                }}
                className="accent-primary"
              />
              <span className="capitalize text-ui-fg-subtle text-sm">{type === 'set' ? 'Jeu Complet' : (type === 'pieces' ? 'Pièces Seules' : 'Plateau')}</span>
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
