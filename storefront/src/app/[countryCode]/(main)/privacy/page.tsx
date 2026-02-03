import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Politique de Confidentialité | TeraPrint Studio",
    description: "Notre politique de confidentialité.",
}

export default function PrivacyPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-3xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif text-center text-gray-900 dark:text-white mb-12">Politique de Confidentialité</h1>

                <div className="prose dark:prose-invert prose-lg font-sans text-gray-600 dark:text-gray-300 max-w-none">
                    <p>
                        La protection de vos données personnelles est au cœur de nos préoccupations. TeraPrint Studio s'engage à assurer le meilleur niveau de protection à vos données personnelles en conformité avec les réglementations européennes et françaises applicables en matière de protection des données personnelles.
                    </p>

                    <h3>Collecte des données</h3>
                    <p>
                        Nous collectons certaines informations lorsque vous passez commande, vous inscrivez à notre newsletter ou naviguez sur notre site (cookies).
                    </p>

                    <h3>Utilisation des données</h3>
                    <div>
                        Vos données sont utilisées pour :
                        <ul>
                            <li>Gérer vos commandes et livraisons</li>
                            <li>Vous envoyer des informations sur nos offres (avec votre accord)</li>
                            <li>Améliorer votre expérience sur notre site</li>
                        </ul>
                    </div>

                    <h3>Vos droits</h3>
                    <p>
                        Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification, d'effacement, et de portabilité de vos données.
                    </p>
                </div>
            </div>
        </div>
    )
}
