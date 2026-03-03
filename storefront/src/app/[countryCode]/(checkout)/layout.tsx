import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

import { getDictionary } from "@lib/dictionary"
import { ThemeToggle } from "@modules/layout/components/theme-toggle"
import LanguageSelector from "@modules/layout/components/language-select"

export default async function CheckoutLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params;

  const { children } = props;

  const dictionary = getDictionary(params.countryCode)
  return (
    <div className="w-full bg-ui-bg-base dark:bg-neutral-900 relative small:min-h-screen">
      <div className="h-16 bg-ui-bg-base dark:bg-neutral-900 border-b dark:border-gray-800">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base dark:text-white flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90 text-ui-fg-subtle dark:text-gray-400" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle dark:text-gray-400 hover:text-ui-fg-base dark:hover:text-white transition-colors duration-200">
              {dictionary.checkout.back_to_cart}
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle dark:text-gray-400 hover:text-ui-fg-base dark:hover:text-white transition-colors duration-200">
              {dictionary.checkout.back}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-ui-fg-subtle dark:text-gray-400 hover:text-ui-fg-base dark:hover:text-white uppercase transition-colors duration-200"
            data-testid="store-link"
          >
            TeraPrintStudio
          </LocalizedClientLink>
          <div className="flex-1 basis-0 flex justify-end gap-x-2 items-center">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div >
  )
}
