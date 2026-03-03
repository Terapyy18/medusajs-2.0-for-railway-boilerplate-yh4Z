import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = ({ cartDictionary }: { cartDictionary: any }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {cartDictionary.sign_in.heading}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {cartDictionary.sign_in.text}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {cartDictionary.sign_in.button}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
