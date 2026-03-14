"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
  dictionary: Record<string, string>
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
  dictionary,
}: SortProductsProps) => {
  const sortOptions = [
    {
      value: "created_at",
      label: dictionary.new_in,
    },
    {
      value: "price_asc",
      label: dictionary.price_asc,
    },
    {
      value: "price_desc",
      label: dictionary.price_desc,
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={dictionary.sort_by}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
