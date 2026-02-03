"use client"

import { useActionState } from "react"
import { useParams } from "next/navigation"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { getDictionary } from "@lib/dictionary"
// import { resetPassword } from "@lib/data/customer" // To be implemented

type Props = {
    setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
    // const [message, formAction] = useActionState(resetPassword, null) // To be implemented
    const { countryCode } = useParams()
    // const dictionary = getDictionary(countryCode as string) // To be added to dictionary

    return (
        <div
            className="max-w-sm flex flex-col items-center"
            data-testid="forgot-password-page"
        >
            <h1 className="text-large-semi uppercase mb-6 text-gray-900 dark:text-white">
                Forgot Password
            </h1>
            <p className="text-center text-base-regular text-gray-500 dark:text-gray-400 mb-4">
                Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.
            </p>
            <form className="w-full flex flex-col" /* action={formAction} */>
                <div className="flex flex-col w-full gap-y-2">
                    <Input
                        label="Email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        data-testid="email-input"
                    />
                </div>
                {/* <ErrorMessage error={message} data-testid="forgot-password-error" /> */}
                <SubmitButton className="w-full mt-6" data-testid="submit-button">
                    Send Instructions
                </SubmitButton>
            </form>
            <span className="text-center text-gray-500 dark:text-gray-400 text-small-regular mt-6">
                Remember your password?{" "}
                <button
                    onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                    className="underline text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Sign in
                </button>
                .
            </span>
        </div>
    )
}

export default ForgotPassword
