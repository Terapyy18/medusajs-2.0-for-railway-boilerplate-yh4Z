"use client"

import { useSearchParams } from "next/navigation"
import { Text } from "@medusajs/ui"

export default function NarrativeBanner() {
    const searchParams = useSearchParams()
    const theme = searchParams.get("theme")

    // Content logic based on theme
    const content = {
        title: "L'Art de l'Impression 3D",
        description: "Chaque pièce est produite avec une précision de 50 microns dans notre atelier parisien. Nous utilisons des résines biosourcées pour allier luxe et responsabilité.",
        bgClass: "bg-primary"
    }

    if (theme === "zombies") {
        content.title = "L'Invasion Commence"
        content.description = "Saviez-vous que notre set Zombie a nécessité plus de 200 heures de modélisation pour capturer chaque détail putréfié ? Gare à la Reine Infectée..."
        content.bgClass = "bg-accent-green/20"
    } else if (theme === "egypt") {
        content.title = "Sables du Temps"
        content.description = "Inspiré par les découvertes de la Vallée des Rois, ce set rend hommage à la grandeur des Pharaons. L'accent doré est appliqué à la main."
        content.bgClass = "bg-accent-gold/20"
    } else if (theme === "rome") {
        content.title = "Gloire de l'Empire"
        content.description = "Revivez les conquêtes de César. Les pièces rouges impériales symbolisent le sang versé par les légions pour la gloire de Rome."
        content.bgClass = "bg-accent-red/20"
    }

    return (
        <div className={`w-full py-16 my-12 rounded-lg ${content.bgClass} relative overflow-hidden`}>
            <div className="content-container flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
                <Text className="uppercase tracking-[0.2em] mb-4 font-bold opacity-70">
                    {theme ? `Thème : ${theme}` : "Savoir-faire TeraPrint"}
                </Text>
                <h2 className="text-4xl font-serif mb-6 text-ui-fg-base">
                    {content.title}
                </h2>
                <p className="text-lg leading-relaxed text-ui-fg-subtle">
                    {content.description}
                </p>
            </div>
            {/* Decorative elements could be added here */}
        </div>
    )
}
