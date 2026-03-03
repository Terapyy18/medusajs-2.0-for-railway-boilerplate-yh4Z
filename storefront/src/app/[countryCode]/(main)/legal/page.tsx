import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mentions Légales | TeraPrint Studio",
    description: "Mentions légales de TeraPrint Studio.",
}

export default function LegalPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-3xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif text-center text-gray-900 dark:text-white mb-12">Mentions Légales</h1>

                <div className="prose dark:prose-invert prose-lg font-sans text-gray-600 dark:text-gray-300 max-w-none">
                    <h3>Éditeur du site</h3>
                    <p>
                        <strong>TeraPrint Studio</strong><br />
                        Société par actions simplifiée (SAS) au capital de 10 000 €<br />
                        Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
                        RCS Paris B 123 456 789<br />
                        TVA Intracommunautaire : FR 12 123456789
                    </p>

                    <h3>Directeur de la publication</h3>
                    <p>
                        M. Théodore (Fondateur)
                    </p>

                    <h3>Hébergement</h3>
                    <p>
                        Le site est hébergé par Vercel Inc.<br />
                        340 S Lemon Ave #4133<br />
                        Walnut, CA 91789<br />
                        USA
                    </p>

                    <h3>Propriété intellectuelle</h3>
                    <p>
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                    </p>
                </div>
            </div>
        </div>
    )
}
