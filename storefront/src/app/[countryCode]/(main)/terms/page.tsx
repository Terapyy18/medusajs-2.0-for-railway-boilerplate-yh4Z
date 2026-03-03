import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Conditions Générales de Vente | TeraPrint Studio",
    description: "Nos conditions générales de vente.",
}

export default function TermsPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-3xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif text-center text-gray-900 dark:text-white mb-12">Conditions Générales de Vente</h1>

                <div className="prose dark:prose-invert prose-lg font-sans text-gray-600 dark:text-gray-300 max-w-none">
                    <h3>1. Objet</h3>
                    <p>
                        Les présentes conditions régissent les ventes par la société TeraPrint Studio de jeux d'échecs et accessoires de prestige.
                    </p>

                    <h3>2. Prix</h3>
                    <p>
                        Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.
                    </p>

                    <h3>3. Commandes</h3>
                    <p>
                        Vous pouvez passer commande sur notre site Internet. Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.
                    </p>

                    <h3>4. Validation de votre commande</h3>
                    <p>
                        Toute commande figurant sur le site Internet suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.
                    </p>

                    {/* Add more standard placeholder text as needed */}
                    <h3>5. Rétractation</h3>
                    <p>
                        Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.
                    </p>
                </div>
            </div>
        </div>
    )
}
