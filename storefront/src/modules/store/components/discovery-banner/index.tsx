import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function DiscoveryBanner() {
    return (
        <div className="flex flex-col gap-6 md:flex-row mb-12 w-full">
            {/* Nouveautés */}
            <div className="relative flex-1 bg-primary h-[300px] rounded-lg overflow-hidden group">
                {/* Placeholder for background image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                    <Text className="text-accent-gold uppercase text-sm tracking-widest mb-2 font-bold">Nouveauté</Text>
                    <h3 className="text-3xl font-serif text-white mb-4">La Collection Égypte</h3>
                    <LocalizedClientLink href="/collections/egypt">
                        <Button variant="secondary" className="bg-accent-gold text-primary hover:bg-white border-none">
                            Découvrir
                        </Button>
                    </LocalizedClientLink>
                </div>
            </div>

            {/* Sélection */}
            <div className="relative flex-1 bg-gray-900 h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                    <Text className="text-gray-300 uppercase text-sm tracking-widest mb-2 font-bold">Sélectionnés pour vous</Text>
                    <h3 className="text-3xl font-serif text-white mb-4">Pièces d'Exception</h3>
                    <LocalizedClientLink href="/store?type=set">
                        <Button variant="transparent" className="text-white border-white hover:bg-white hover:text-primary">
                            Voir la sélection
                        </Button>
                    </LocalizedClientLink>
                </div>
            </div>
        </div>
    )
}
