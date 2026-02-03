"use client"

import React, { useActionState, useEffect } from "react"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
// import { useFormState } from "react-dom"
import { HttpTypes } from "@medusajs/types"

import { Dictionary } from "@lib/dictionary"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  dictionary: Dictionary
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer, dictionary }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const [state, formAction] = useActionState((() => { }) as any, {
    customer,
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label={dictionary.account.profile.password}
        currentInfo={
          <span>{dictionary.account.profile.password_not_shown}</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? undefined}
        clearState={clearState}
        data-testid="account-password-editor"
        dictionary={dictionary}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={dictionary.account.profile.old_password}
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            label={dictionary.account.profile.new_password}
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            label={dictionary.account.profile.confirm_password}
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
