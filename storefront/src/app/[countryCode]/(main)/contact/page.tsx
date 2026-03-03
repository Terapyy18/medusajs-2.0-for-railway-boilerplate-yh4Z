import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact | TeraPrint Studio",
    description: "Contactez-nous pour toute question.",
}

export default function ContactPage() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-white min-h-screen pt-32 pb-20 transition-colors duration-200">
            <div className="content-container max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-serif text-center text-white mb-8">Contactez-nous</h1>
                <p className="text-center text-gray-300 mb-12">
                    Notre équipe est à votre écoute pour vous accompagner dans vos choix ou répondre à vos questions.
                </p>

                <form className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm uppercase tracking-wider text-gray-400">Nom</label>
                            <input
                                type="text"
                                id="name"
                                className="bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-600"
                                placeholder="Votre nom"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-600"
                                placeholder="Votre email"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Message</label>
                        <textarea
                            id="message"
                            rows={6}
                            className="bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white transition-colors resize-none placeholder:text-gray-500 dark:placeholder:text-gray-600"
                            placeholder="Comment pouvons-nous vous aider ?"
                        />
                    </div>

                    <button className="self-center mt-8 px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase tracking-widest text-sm hover:bg-neutral-800 dark:hover:bg-gray-200 transition-colors">
                        Envoyer
                    </button>
                </form>

                <div className="mt-16 text-center text-sm text-gray-400">
                    <p>Ou par email directement :</p>
                    <a href="mailto:contact@teraprintstudio.com" className="text-white hover:underline">contact@teraprintstudio.com</a>
                </div>
            </div>
        </div>
    )
}
