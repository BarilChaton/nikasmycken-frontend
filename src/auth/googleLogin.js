import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../firebase'

export const googleLogin = async () => {
  try {
    const result = await GoogleSignIn.signIn()
    console.log("Google Sign-In result:", result)

    const credential = GoogleAuthProvider.credential(
      result.idToken
    )

    const userCredential = await signInWithCredential(
      auth,
      credential
    )

    return userCredential.user

  } catch (error) {
    console.error("Google login failed:", error)
    throw error
  }
}