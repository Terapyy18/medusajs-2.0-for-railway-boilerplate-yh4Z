import { Metadata } from "next"

export const metadata: Metadata = {
    title: "FAQ | TeraPrint Studio",
    description: "Questions fréquentes.",
}

const faqs = [
    {
        question: "Quels sont les délais de fabrication ?",
        answer: "Chaque pièce est fabriquée à la commande. Comptez entre 1 à 2 semaines pour la fabrication et l'expédition de votre commande."
    },
    {
        question: "Livrez-vous à l'international ?",
        answer: "Oui, nous livrons dans le monde entier. Les frais de port sont calculés lors du passage à la caisse."
    },
    {
        question: "Puis-je personnaliser ma commande ?",
        answer: "Absolument. Contactez-nous avant de passer commande pour discuter de vos besoins spécifiques de personnalisation."
    },
    {
        question: "Quelle est votre politique de retour ?",
        answer: "Nous acceptons les retours sous 14 jours si les pièces sont dans leur état d'origine. Les pièces personnalisées ne sont ni reprises ni échangées."
    }
]

export default function FAQPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-serif text-center text-white mb-16">Questions Fréquentes</h1>

                <div className="flex flex-col gap-8">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0">
                            <h3 className="text-lg font-serif text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
