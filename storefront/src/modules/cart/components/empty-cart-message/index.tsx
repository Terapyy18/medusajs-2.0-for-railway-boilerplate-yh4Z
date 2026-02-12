import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = ({
  cartDictionary
}: {
  cartDictionary: {
    title: string
    empty_msg: string
    explore_products: string
  }
}) => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {cartDictionary.title}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {cartDictionary.empty_msg}
      </Text>
      <div>
        <InteractiveLink href="/store">{cartDictionary.explore_products}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
