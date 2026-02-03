"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { getDictionary } from "@lib/dictionary"

const Newsletter = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const { countryCode } = useParams()
    const dictionary = getDictionary(countryCode as string)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        try {
            await fetch("/api/newsletter", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            })
            setStatus("success")
            setEmail("")
        } catch (error) {
            console.error(error)
            setStatus("error")
        }
    }

    return (
        <section className="bg-neutral-100 dark:bg-neutral-900 py-20 w-full transition-colors duration-200">
            <div className="content-container mx-auto flex flex-col items-center text-center px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4 tracking-wide">
                    {dictionary.newsletter.title}
                </h2>
                <p className="text-gray-400 mb-10 max-w-lg text-sm md:text-base font-light tracking-wide leading-relaxed">
                    {dictionary.newsletter.subtitle}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md relative flex items-center border-b border-gray-600 focus-within:border-white transition-colors duration-300"
                >
                    <input
                        type="email"
                        placeholder={dictionary.newsletter.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent text-gray-900 dark:text-white py-4 pr-12 focus:outline-none focus:ring-0 placeholder-gray-500 font-light text-lg"
                        required
                        aria-label="Email address"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="absolute right-0 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 p-2 disabled:opacity-50"
                        aria-label={dictionary.newsletter.cta}
                    >
                        {status === "loading" ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : status === "success" ? (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        )}
                    </button>
                </form>

                {status === "error" && (
                    <p className="text-red-400 mt-4 text-xs tracking-wide">
                        {dictionary.newsletter.error}
                    </p>
                )}
                {status === "success" && (
                    <p className="text-gray-400 mt-4 text-xs tracking-wide animate-fade-in-top">
                        {dictionary.newsletter.success}
                    </p>
                )}
            </div>
        </section>
    )
}

export default Newsletter
