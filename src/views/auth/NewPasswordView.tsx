import { useState } from "react"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { ConfirmToken } from "@/types/index"

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Reset Password Code</h1>
      <p className="text-2xl font-light text-white mt-5 text-center">
        Put the code we sent you and{''}
        <span className="text-yellow-400 font-bold"> reset your password</span>
      </p>

      {!isValidToken ? 
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> : 
        <NewPasswordForm token={token} />
      }
    </>
  )
}
