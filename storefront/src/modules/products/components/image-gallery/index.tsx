"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, IconButton } from "@medusajs/ui"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  if (!images.length) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom backface-hidden">
          {images.map((image, index) => {
            return (
              <div
                className="flex-[0_0_100%] min-w-0 relative pl-4 first:pl-0"
                key={image.id}
              >
                <Container
                  className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                >
                  {!!image.url && (
                    <Image
                      src={image.url}
                      priority={index === 0}
                      className="absolute inset-0 rounded-rounded"
                      alt={`Product image ${index + 1}`}
                      fill
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Container>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons for Larger Screens */}
      {images.length > 1 && (
        <>
          <IconButton
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-md z-10 hidden small:flex bg-ui-bg-base/80 hover:bg-ui-bg-base"
            onClick={scrollPrev}
          >
            <ArrowLeft className="w-5 h-5" />
          </IconButton>
          <IconButton
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-md z-10 hidden small:flex bg-ui-bg-base/80 hover:bg-ui-bg-base"
            onClick={scrollNext}
          >
            <ArrowRight className="w-5 h-5" />
          </IconButton>
        </>
      )}

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? "bg-ui-fg-base w-4" : "bg-ui-fg-muted"
              }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
