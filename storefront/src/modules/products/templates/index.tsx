import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import Storytelling from "@modules/products/components/storytelling"
import Manufacturing from "@modules/products/components/manufacturing"
import StructuredData from "@modules/products/components/structured-data"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <StructuredData product={product} />
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative gap-x-12"
        data-testid="product-container"
      >
        {/* Left Column: Sticky Gallery */}
        <div className="block w-full small:w-1/2 relative small:sticky small:top-24 self-start">
          <ImageGallery images={product?.images || []} />
        </div>

        {/* Right Column: Info & Actions */}
        <div className="flex flex-col small:w-1/2 py-8 gap-y-12">
          <ProductInfo product={product} />

          <div className="flex flex-col gap-y-6">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Reassurance Bar (Compact) */}
            <div className="border-t  pt-6">
              {/* Reusing main reassurance logic or a simpler version here if needed. 
                     For now, let's keep it clean or import specific small icons if requested.
                     The prompt asked for "ReassuranceBar (version compacte)". 
                     I'll verify if I should import the main one or just render icons.
                     Given I don't have a specific compact reassurance component, I'll add a simple text row.
                 */}
              <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-wider">
                <span>Livraison Sécurisée</span>
                <span>•</span>
                <span>Retour sous 30j</span>
                <span>•</span>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>

          <ProductTabs product={product} />
          <ProductOnboardingCta />
        </div>
      </div>

      {/* Storytelling Section */}
      <Storytelling />

      {/* Manufacturing Section */}
      <Manufacturing />

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
