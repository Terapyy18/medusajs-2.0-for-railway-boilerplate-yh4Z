"use client"

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { clx } from "@medusajs/ui"

type ImageComparisonProps = {
  firstImage: string
  firstImageAlt: string
  secondImage: string
  secondImageAlt: string
  className?: string
}

const ImageComparison = ({
  firstImage,
  firstImageAlt,
  secondImage,
  secondImageAlt,
  className,
}: ImageComparisonProps) => {

  return (
    <div className={clx("w-full h-full rounded-lg overflow-hidden", className)}>
        <ReactCompareSlider
            itemOne={
              <div className="relative w-full h-full">
                <ReactCompareSliderImage src={firstImage} alt={firstImageAlt} style={{ objectFit: "cover" }} className="w-full h-full" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider pointer-events-none z-10">
                  {firstImageAlt}
                </div>
              </div>
            }
            itemTwo={
              <div className="relative w-full h-full">
                <ReactCompareSliderImage src={secondImage} alt={secondImageAlt} style={{ objectFit: "cover" }} className="w-full h-full" />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider pointer-events-none z-10">
                  {secondImageAlt}
                </div>
              </div>
            }
            style={{ width: "100%", height: "100%" }}
        />
    </div>
  )
}

export default ImageComparison
