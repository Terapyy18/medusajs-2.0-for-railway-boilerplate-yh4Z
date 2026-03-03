import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values?.map((v) => v.value)
  const isMaterial = ["Material", "Wood", "Essence de bois", "Materials", "Matériaux"].includes(title)

  const getMaterialColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "ebony":
      case "ébène":
      case "ebene":
        return "bg-grey-90" // Approx neutral-900
      case "boxwood":
      case "buis":
        return "bg-[#E3C099]"
      case "rosewood":
      case "palissandre":
        return "bg-[#58181F]"
      default:
        return "bg-grey-20"
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions?.map((v) => {
          if (isMaterial) {
            return (
              <button
                key={v}
                onClick={() => updateOption(option.title ?? "", v ?? "")}
                className={clx(
                  "h-12 w-12 rounded-full border-2 transition-all duration-200 focus:outline-none",
                  getMaterialColor(v ?? ""),
                  {
                    "ring-2 ring-offset-2 ring-luxury-gold border-transparent": v === current,
                    "border-transparent hover:border-grey-40": v !== current,
                    "opacity-50 cursor-not-allowed": disabled,
                  }
                )}
                disabled={disabled}
                data-testid="option-button"
                title={v}
                aria-label={`Select ${v}`}
              />
            )
          }

          return (
            <button
              onClick={() => updateOption(option.title ?? "", v ?? "")}
              key={v}
              className={clx(
                " bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 min-w-[3rem]",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
