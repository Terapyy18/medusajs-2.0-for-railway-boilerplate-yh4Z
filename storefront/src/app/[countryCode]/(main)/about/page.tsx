import { Metadata } from "next"

export const metadata: Metadata = {
    title: "À propos | TeraPrint Studio",
    description: "L'histoire de TeraPrint Studio.",
}

export default function AboutPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-4xl mx-auto px-4 text-center mb-16">

                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">Notre Histoire</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    De la passion du jeu à l'excellence de l'artisanat.
                </p>
            </div>

            <div className="content-container max-w-3xl mx-auto px-4 prose dark:prose-invert prose-lg font-sans text-gray-600 dark:text-gray-300 max-w-none">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-gray-900 dark:first-letter:text-white first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                    TeraPrint Studio est né d'une fascination pour le jeu d'échecs, non seulement en tant que duel intellectuel, mais aussi en tant qu'objet d'art.
                    Notre mission est de redonner au jeu ses lettres de noblesse à travers des matériaux d'exception et un design intemporel.
                </p>

                <h3>Une Vision Moderne</h3>
                <p>
                    Nous croyons que le luxe réside dans les détails. C'est pourquoi chaque échiquier, chaque pièce est dessinée avec une attention obsessionnelle pour l'équilibre, le poids et la texture.
                    Nous marions techniques artisanales traditionnelles et design contemporain pour créer des pièces qui traversent le temps.
                </p>

                <h3>L'Engagement</h3>
                <p>
                    Au-delà de l'esthétique, nous nous engageons pour une production responsable. Nos bois sont issus de forêts gérées durablement, et chaque artisan avec qui nous collaborons partage nos valeurs d'excellence et de respect de la matière.
                </p>
            </div>
        </div>
    )
}
