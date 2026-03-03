import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { getCollectionsList } from "@lib/data/collections"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSelector from "@modules/layout/components/language-select"
import Megamenu from "@modules/layout/components/megamenu"
import { getDictionary } from "@lib/dictionary"
import { ThemeToggle } from "@modules/layout/components/theme-toggle"

import { getBlogPosts } from "@lib/data/blog"

export default async function Nav({ countryCode }: { countryCode: string }) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await getCollectionsList(0, 6)
  const posts = await getBlogPosts().catch(() => []) // Handle errors gracefully
  const dictionary = getDictionary(countryCode)

  return (
    <div className="absolute top-0 inset-x-0 z-50 group">
      <header className="relative h-18 mx-auto border-b duration-200 bg-transparent border-transparent text-gray-900 dark:text-white hover:bg-primary/90  transition-all">
        <nav className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-x-4">
            {/* Mobile Menu Trigger - kept for small screens */}
            <div className="small:hidden">
              <SideMenu regions={regions} posts={posts} />
            </div>
            {/* Logo - Aligned Left or Centered on Mobile */}
            <LocalizedClientLink
              href="/"
              className="hover:opacity-80 transition-opacity"
              data-testid="nav-store-link"
            >
              <div className="relative w-64 h-24">
                <Image
                  src="/logo.png"
                  alt="TeraPrint Studio logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* Centered Navigation for Desktop */}
          <div className="hidden small:flex items-center h-full justify-center gap-x-8">
            <Megamenu collections={collections} dictionary={dictionary.megamenu} />
            <LocalizedClientLink href="/store" className="hover:text-accent-gold uppercase transition-colors">
              {dictionary.nav.catalogue}
            </LocalizedClientLink>

            <LocalizedClientLink href="/craftsmanship" className="hover:text-accent-gold uppercase transition-colors">
              {dictionary.nav.workshop}
            </LocalizedClientLink>

            {/* Blog Posts Links */}
            {posts && posts.length > 0 && (
              <div className="flex gap-x-6">
                {posts.map((post: any) => (
                  <LocalizedClientLink
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="hover:text-accent-gold uppercase transition-colors"
                  >
                    {post.title}
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-accent-gold"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  {dictionary.nav.search}
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-accent-gold"
                href="/account"
                data-testid="nav-account-link"
              >
                {dictionary.nav.account}
              </LocalizedClientLink>
            </div>

            <LanguageSelector />

            <ThemeToggle />

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-accent-gold flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {dictionary.cart.title} (0)
                </LocalizedClientLink>
              }
            >
              <CartButton cartDictionary={dictionary.cart} />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
