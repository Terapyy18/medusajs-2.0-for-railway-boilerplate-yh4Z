"use client"

import { useActionState } from "react"
import { useParams } from "next/navigation"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { getDictionary } from "@lib/dictionary"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const { countryCode } = useParams()
  const dictionary = getDictionary(countryCode as string)

  // Create a displayable error string. If message is an object (customer), it's not an error.
  const errorMessage = typeof message === "string" ? message : null

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6 text-gray-900 dark:text-white">
        {dictionary.account.register.title}
      </h1>
      <p className="text-center text-base-regular text-gray-500 dark:text-gray-400 mb-4">
        {dictionary.account.register.subtitle}
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={dictionary.account.register.first_name}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={dictionary.account.register.last_name}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={dictionary.account.register.email}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={dictionary.account.register.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={dictionary.account.register.password}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={errorMessage} data-testid="register-error" />
        <span className="text-center text-gray-500 dark:text-gray-400 text-small-regular mt-6">
          {dictionary.account.register.agreement_text}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
          >
            {dictionary.account.register.privacy_policy}
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
          >
            {dictionary.account.register.terms_of_use}
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {dictionary.account.register.cta}
        </SubmitButton>
      </form>
      <span className="text-center text-gray-500 dark:text-gray-400 text-small-regular mt-6">
        {dictionary.account.register.already_member}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
        >
          {dictionary.account.register.sign_in}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
