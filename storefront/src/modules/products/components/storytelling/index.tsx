import { Text } from "@medusajs/ui"
import Image from "next/image"

export default function Storytelling() {
    return (
        <div className="w-full bg-paper py-24 border-t ">
            <div className="content-container flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 flex flex-col gap-6">
                    <Text className="text-accent-gold uppercase tracking-widest font-bold text-sm">
                        L'Histoire de cette Pièce
                    </Text>
                    <h2 className="text-3xl font-serif text-primary">Un Héritage Immortel</h2>
                    <p className="text-lg text-ui-fg-subtle leading-relaxed">
                        Chaque courbe de ce jeu d'échecs raconte une histoire ancienne. Inspiré par les légendes oubliées et sculpté numériquement avec une précision chirurgicale, ce set n'est pas qu'un jeu : c'est une œuvre d'art.
                    </p>
                    <p className="text-md text-ui-fg-subtle leading-relaxed">
                        Imprimé dans notre atelier parisien, nous utilisons des résines de haute qualité pour garantir un toucher froid et minéral, rappelant l'albâtre ou l'obsidienne.
                    </p>
                </div>
                <div className="flex-1 h-[400px] w-full bg-ui-bg-subtle rounded-lg overflow-hidden relative">
                    {/* Placeholder for story image */}
                    <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
                        <Image
                            src="/rome_view.jpg"
                            alt="Hero Background Dark"
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                            quality={75}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
