import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Livraison & Retours | TeraPrint Studio",
    description: "Informations sur la livraison et les retours.",
}

export default function ShippingPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-3xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif text-center text-white mb-12">Livraison & Retours</h1>

                <div className="flex flex-col gap-12">
                    <div>
                        <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Expédition</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            Chaque commande est une priorité. Une fois votre pièce fabriquée (compter 10 à 15 jours pour la fabrication artisanale), elle est confiée à nos partenaires logistiques de confiance (DHL Express ou UPS).
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Vous recevrez un numéro de suivi dès l'expédition. La livraison en France est offerte pour toute commande supérieure à 200€.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Emballage</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Nos pièces voyagent dans des coffrets sur-mesure, conçus pour résister aux chocs tout en offrant une expérience de déballage inoubliable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Retours</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            Votre satisfaction est notre seule boussole. Si toutefois vous changiez d'avis, vous disposez de 14 jours à réception pour nous retourner votre pièce dans son état d'origine.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Les frais de retour sont à votre charge, sauf en cas de défaut avéré de la pièce. Veuillez contacter notre service client pour initier la procédure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
