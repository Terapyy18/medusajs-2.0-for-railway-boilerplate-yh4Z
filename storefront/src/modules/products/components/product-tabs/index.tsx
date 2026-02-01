"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Spécifications Techniques",
      component: <TechnicalSpecsTab product={product} />,
    },
    {
      label: "L'Histoire de ce Design",
      component: <DesignHistoryTab />,
    },
    {
      label: "Livraison & Soin",
      component: <ShippingAndCareTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const TechnicalSpecsTab = ({ product }: ProductTabsProps) => {
  const getMetadata = (key: string, fallback: string) => {
    if (!product.metadata || !product.metadata[key]) return fallback
    const value = product.metadata[key]
    return typeof value === "string" || typeof value === "number" ? value : fallback
  }

  return (
    <div className="text-small-regular py-8">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
        {/* Hauteur du Roi */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Hauteur du Roi</dt>
          <dd>{`${getMetadata("king_height", "95")} mm`}</dd>
        </div>

        {/* Diamètre de Base */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Diamètre de Base</dt>
          <dd>{`${getMetadata("base_diameter", "40")} mm`}</dd>
        </div>

        {/* Poids du Set */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Poids du Set</dt>
          <dd>{product.weight ? `${product.weight} g` : "1.2 kg"}</dd>
        </div>

        {/* Matériaux */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Matériaux</dt>
          <dd>{product.material ? product.material : "Bois précieux"}</dd>
        </div>

        {/* Finitions */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Finitions</dt>
          <dd>{getMetadata("finishes", "Polissage manuel et feutre vert") as string}</dd>
        </div>

        {/* Origin */}
        <div className="flex flex-col gap-y-1">
          <dt className="font-semibold text-ui-fg-subtle">Origine</dt>
          <dd>{product.origin_country ? product.origin_country : "Europe Artisanale"}</dd>
        </div>
      </dl>
    </div>
  )
}

const DesignHistoryTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="font-serif text-base leading-relaxed text-ui-fg-base max-w-prose">
        <p className="mb-4">
          Ce design reprend les codes du style 'Dubrovnik', célèbre pour sa robustesse et son ergonomie, plébiscité par les grands maîtres pour sa lisibilité tactique.
        </p>
        <p>
          Chaque pièce est sculptée avec une attention méticuleuse aux détails, honorant la tradition des échecs de compétition tout en apportant une touche de raffinement moderne. L'équilibre des pièces a été étudié pour offrir une expérience de jeu fluide et satisfaisante.
        </p>
      </div>
    </div>
  )
}

const ShippingAndCareTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Livraison Premium</span>
            <p className="max-w-sm">
              Votre colis arrivera sous 3 à 5 jours ouvrables, emballé avec soin dans notre coffret signature pour une protection optimale.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Entretien & Soin</span>
            <p className="max-w-sm">
              Pour préserver l'éclat du bois, nous recommandons un léger cirage annuel. Évitez l'exposition directe et prolongée au soleil pour prévenir la décoloration des essences précieuses.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Retours Simplifiés</span>
            <p className="max-w-sm">
              Si le produit ne vous convient pas, vous disposez de 30 jours pour nous le retourner dans son état d'origine.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
