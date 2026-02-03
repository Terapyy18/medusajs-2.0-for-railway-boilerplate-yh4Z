import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getBanners, Banner } from "@lib/data/banners"
import Image from "next/image"

export default async function DiscoveryBanner() {
    const banners = await getBanners()

    // If no banners from backend, show default banners
    if (!banners || banners.length === 0) {
        return <DefaultBanners />
    }

    return (
        <div className="flex flex-col gap-6 md:flex-row w-full py-20">
            {banners.map((banner) => (
                <BannerCard key={banner.id} banner={banner} />
            ))}
        </div>
    )
}

function BannerCard({ banner }: { banner: Banner }) {
    return (
        <div
            className="relative flex-1 h-[300px] rounded-lg overflow-hidden group"
            style={{ backgroundColor: banner.background_color || "#1a1a1a" }}
        >
            {/* Background Image */}
            {banner.image_url && (
                <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover"
                />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-all duration-300 group-hover:bg-primary/20 group-hover:from-black/90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 z-20">
                {banner.badge_text && (
                    <Text
                        className="uppercase text-sm tracking-widest mb-2 font-bold"
                        style={{ color: banner.badge_color || "#D4AF37" }}
                    >
                        {banner.badge_text}
                    </Text>
                )}
                <h3
                    className="text-3xl font-serif mb-4"
                    style={{ color: banner.text_color || "#FFFFFF" }}
                >
                    {banner.title}
                </h3>
                {banner.subtitle && (
                    <p
                        className="text-sm mb-4"
                        style={{ color: banner.text_color || "#FFFFFF" }}
                    >
                        {banner.subtitle}
                    </p>
                )}
                <LocalizedClientLink href={banner.link_url}>
                    <Button
                        variant={banner.button_variant as any || "secondary"}
                        className={
                            banner.button_variant === "secondary"
                                ? "bg-accent-gold text-primary hover:bg-white border-none"
                                : "text-white border-white hover:bg-white hover:text-primary"
                        }
                    >
                        {banner.link_text}
                    </Button>
                </LocalizedClientLink>
            </div>
        </div>
    )
}

// Fallback default banners
function DefaultBanners() {
    return (
        <div className="flex flex-col gap-6 md:flex-row w-full py-20">
            {/* Nouveautés */}
            <div className="relative flex-1 bg-primary h-[300px] rounded-lg overflow-hidden group">
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
