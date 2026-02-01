import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Reassurance from "@modules/layout/components/reassurance"
import { ArrowRight } from "lucide-react"
import { getDictionary } from "@lib/dictionary"

export default async function Footer({ countryCode }: { countryCode: string }) {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)
  const dictionary = getDictionary(countryCode)

  return (
    <footer className="w-full bg-primary text-white border-t border-ui-border-base">
      <Reassurance countryCode={countryCode} />

      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-20">

          {/* Logo & Newsletter */}
          <div className="flex flex-col gap-6 max-w-sm">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-accent-gold uppercase font-serif tracking-widest text-2xl"
            >
              TeraPrint
            </LocalizedClientLink>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-accent-gold uppercase tracking-wider">{dictionary.footer.newsletter.label}</span>
              <p className="text-sm text-gray-400">{dictionary.footer.newsletter.text}</p>
              <form className="flex items-center gap-2 mt-2 border-b border-gray-600 pb-1 max-w-[300px]">
                <input
                  type="email"
                  placeholder={dictionary.footer.newsletter.placeholder}
                  className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500 focus:ring-0 px-0"
                />
                <button type="button" className="text-accent-gold hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {/* Columns */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-accent-gold uppercase">{dictionary.footer.columns.about.title}</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-400 txt-small">
                {dictionary.footer.columns.about.links.map((link, i) => (
                  <li key={i}><LocalizedClientLink href={link.href} className="hover:text-white">{link.text}</LocalizedClientLink></li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-accent-gold uppercase">{dictionary.footer.columns.service.title}</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-400 txt-small">
                {dictionary.footer.columns.service.links.map((link, i) => (
                  <li key={i}><LocalizedClientLink href={link.href} className="hover:text-white">{link.text}</LocalizedClientLink></li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-accent-gold uppercase">{dictionary.footer.columns.legal.title}</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-400 txt-small">
                {dictionary.footer.columns.legal.links.map((link, i) => (
                  <li key={i}><LocalizedClientLink href={link.href} className="hover:text-white">{link.text}</LocalizedClientLink></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-8 justify-between text-gray-500 border-t border-gray-800 pt-8">
          <Text className="txt-compact-small">
            {dictionary.footer.copyright}
          </Text>
        </div>
      </div>
    </footer>
  )
}
