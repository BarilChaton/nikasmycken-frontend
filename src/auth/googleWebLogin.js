import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export const googleWebLogin = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(
    auth,
    provider
  )

  return result.user
}