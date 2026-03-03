import { PenTool, Printer, Brush } from "lucide-react"

export default function Manufacturing() {
    const steps = [
        {
            title: "Modélisation",
            description: "Sculpture numérique haute définition.",
            icon: PenTool,
        },
        {
            title: "Impression 3D",
            description: "Précision 50 microns, résine biosourcée.",
            icon: Printer,
        },
        {
            title: "Finitions Main",
            description: "Peinture et vernis appliqués par nos artistes.",
            icon: Brush,
        },
    ]

    return (
        <div className="w-full py-24 bg-white">
            <div className="content-container">
                <h2 className="text-2xl font-serif text-center mb-16 text-primary">Le Processus de Création</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-ui-border-base -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-white">
                            <div className="w-16 h-16 rounded-full bg-primary text-accent-gold flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-primary uppercase tracking-wide">{step.title}</h3>
                            <p className="text-ui-fg-subtle">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
