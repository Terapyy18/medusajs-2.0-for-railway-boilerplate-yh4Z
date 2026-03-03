import { useActionState } from "react"
import { useParams } from "next/navigation"
import { getDictionary } from "@lib/dictionary"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const params = useParams()
  const countryCode = params?.countryCode as string
  const dictionary = getDictionary(countryCode)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6 text-gray-900 dark:text-white">{dictionary.account.login.title}</h1>
      <p className="text-center text-base-regular text-gray-400 mb-8">
        {dictionary.account.login.subtitle}
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </form>
      <button
        className="underline text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mt-2 self-start text-small-regular"
        onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
      >
        {dictionary.account.login.forgot_password}
      </button>
      <span className="text-center text-gray-500 dark:text-gray-400 text-small-regular mt-6 flex flex-col gap-2">
        {dictionary.account.login.no_account}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="w-full py-2 bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          data-testid="register-button"
        >
          {dictionary.account.register.cta}
        </button>
      </span>
    </div>
  )
}

export default Login
